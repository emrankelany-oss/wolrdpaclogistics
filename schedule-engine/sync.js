#!/usr/bin/env node

// Sync script: discover articles, update registry, auto-schedule new entries,
// auto-install GitHub Actions workflow, and check access control wiring.
// Usage: node schedule-engine/sync.js [projectRoot]

var fs = require('fs');
var path = require('path');
var config = require('./config');
var discover = require('./discover');
var registry = require('./registry');
var schedule = require('./schedule');

// Detect the directory name this engine lives in, relative to project root.
// e.g. if installed at /myproject/schedule-engine/, returns "schedule-engine"
function detectEngineDirName(projectRoot) {
  return path.relative(projectRoot, __dirname).split(path.sep).join('/');
}

// --- Workflow auto-install ---------------------------------------------------

// Convert a local hour + timezone to a UTC hour for cron
function localHourToUtc(hour, timezone) {
  // Create a date at the given hour in the user's timezone, then read the UTC hour
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth();
  var day = now.getDate();

  // Build a date string at the desired local hour
  var local = new Date(Date.UTC(year, month, day, hour, 0, 0));

  // Get the offset: format the same instant in both UTC and target timezone
  var utcStr = local.toLocaleString('en-US', { timeZone: 'UTC' });
  var tzStr = local.toLocaleString('en-US', { timeZone: timezone });
  var offsetMs = new Date(utcStr).getTime() - new Date(tzStr).getTime();

  var utcHour = (hour + Math.round(offsetMs / 3600000)) % 24;
  if (utcHour < 0) utcHour += 24;
  return utcHour;
}

function ensureWorkflow(projectRoot, cfg) {
  var workflowDir = path.join(projectRoot, '.github', 'workflows');
  var workflowDest = path.join(workflowDir, 'schedule-publish.yml');

  if (fs.existsSync(workflowDest)) {
    console.log('[schedule-engine] GitHub Actions workflow already installed.');
    return false;
  }

  var engineDir = detectEngineDirName(projectRoot);
  var templateSrc = path.join(__dirname, 'templates', 'schedule-publish.yml');

  if (!fs.existsSync(templateSrc)) {
    console.warn('[schedule-engine] Workflow template not found at ' + templateSrc);
    return false;
  }

  // Convert user's publish hour + timezone to UTC for cron
  var publishHour = (cfg && cfg.publishHour != null) ? cfg.publishHour : 0;
  var timezone = (cfg && cfg.timezone) ? cfg.timezone : 'UTC';
  var cronHour = localHourToUtc(publishHour, timezone);
  var cronMinute = 0;

  var template = fs.readFileSync(templateSrc, 'utf-8');
  var rendered = template
    .replace(/\{\{ENGINE_DIR\}\}/g, engineDir)
    .replace(/\{\{CRON_HOUR\}\}/g, String(cronHour))
    .replace(/\{\{CRON_MINUTE\}\}/g, String(cronMinute));

  // Ensure .github/workflows/ exists
  fs.mkdirSync(workflowDir, { recursive: true });
  fs.writeFileSync(workflowDest, rendered, 'utf-8');

  console.log('[schedule-engine] Installed GitHub Actions workflow -> .github/workflows/schedule-publish.yml');
  console.log('[schedule-engine] Cron set to run at ' + cronHour + ':00 UTC (= ' + publishHour + ':00 ' + timezone + ')');
  return true;
}

// --- Import path helpers -----------------------------------------------------

// Detect whether the engine directory lives inside src/ or outside it.
// Returns true if engineDir starts with 'src/' (e.g. 'src/schedule-engine').
function isEngineInsideSrc(projectRoot) {
  var engineDir = detectEngineDirName(projectRoot);
  return engineDir.startsWith('src/') || engineDir.startsWith('src\\');
}

// Build the correct import path for access-control from a given file.
// If the engine is inside src/, use the @/ alias. Otherwise, compute a
// relative path from the importing file back to the engine directory.
function buildImportPath(projectRoot, fromFile, exportName) {
  var engineDir = detectEngineDirName(projectRoot);

  if (isEngineInsideSrc(projectRoot)) {
    // Engine is inside src/, @/ alias works
    return '@/' + engineDir + '/access-control';
  }

  // Engine is outside src/ — compute relative path from the importing file
  // fromFile is relative to projectRoot (forward slashes), e.g. 'src/app/blog/page.tsx'
  var fromDir = path.dirname(fromFile);
  var targetPath = engineDir + '/access-control';

  // path.relative works with OS separators, so normalize
  var rel = path.relative(
    path.join(projectRoot, fromDir),
    path.join(projectRoot, targetPath)
  ).split(path.sep).join('/');

  // Ensure it starts with ./ or ../
  if (!rel.startsWith('.')) {
    rel = './' + rel;
  }

  return rel;
}

// Get file path relative to project root (forward slashes)
function fileRelativeToRoot(projectRoot, filePath) {
  return path.relative(projectRoot, filePath).split(path.sep).join('/');
}

// --- Access control wiring checks -------------------------------------------

function checkAccessControl(projectRoot, articles, sections, cfg) {
  var warnings = [];
  var engineDir = detectEngineDirName(projectRoot);

  // 1. Check each article page.js for an isPublished guard
  for (var i = 0; i < articles.length; i++) {
    var article = articles[i];
    var filePath = article.filePath;
    // Normalize to OS path for reading
    var osPath = filePath.split('/').join(path.sep);

    try {
      var content = fs.readFileSync(osPath, 'utf-8');
      if (content.indexOf('isPublished') === -1) {
        warnings.push({
          type: 'page-guard',
          file: filePath,
          route: article.route,
        });
      }
    } catch {
      // File unreadable, skip
    }
  }

  // 2. Check listing pages from config (explicit) and section parent routes (auto-detected)
  var listingPagesToCheck = [];
  var checkedFiles = {};

  // 2a. Explicit listing pages from config
  var configListingPages = (cfg && cfg.listingPages) || [];
  for (var ci = 0; ci < configListingPages.length; ci++) {
    var configPage = configListingPages[ci];
    var osConfigPath = configPage.split('/').join(path.sep);
    var fullConfigPath = path.isAbsolute(osConfigPath)
      ? osConfigPath
      : path.join(projectRoot, osConfigPath);

    if (fs.existsSync(fullConfigPath)) {
      var normalizedPath = fullConfigPath.split(path.sep).join('/');
      if (!checkedFiles[normalizedPath]) {
        checkedFiles[normalizedPath] = true;
        listingPagesToCheck.push({
          file: normalizedPath,
          route: configPage,
          source: 'config',
        });
      }
    }
  }

  // 2b. Auto-detected section parent routes
  for (var j = 0; j < sections.length; j++) {
    var section = sections[j];
    var parentRoute = section.parentRoute;

    var appDir = discover.findAppDir(projectRoot);
    if (!appDir) continue;

    var listingDir = path.join(appDir, parentRoute.replace(/^\//, ''));
    var listingFile = null;
    var candidates = ['page.js', 'page.jsx', 'page.ts', 'page.tsx'];
    for (var k = 0; k < candidates.length; k++) {
      var candidate = path.join(listingDir, candidates[k]);
      if (fs.existsSync(candidate)) {
        listingFile = candidate;
        break;
      }
    }

    if (listingFile) {
      var normalizedListFile = listingFile.split(path.sep).join('/');
      if (!checkedFiles[normalizedListFile]) {
        checkedFiles[normalizedListFile] = true;
        listingPagesToCheck.push({
          file: normalizedListFile,
          route: parentRoute,
          source: 'auto',
        });
      }
    }
  }

  // Check each listing page for getPublishedArticles
  var listFilters = [];
  var injectedFiles = [];

  for (var li = 0; li < listingPagesToCheck.length; li++) {
    var listing = listingPagesToCheck[li];
    try {
      var listContent = fs.readFileSync(listing.file, 'utf-8');
      if (listContent.indexOf('getPublishedArticles') === -1) {
        var relFile = fileRelativeToRoot(projectRoot, listing.file);
        var importPath = buildImportPath(projectRoot, relFile);

        // Try to auto-inject the import and wiring
        var injected = tryInjectListingImport(listing.file, listContent, importPath);
        if (injected) {
          injectedFiles.push(relFile);
        } else {
          listFilters.push({
            file: relFile,
            route: listing.route,
            importPath: importPath,
          });
        }
      }
    } catch {
      // skip
    }
  }

  // Print warnings with copy-paste snippets
  var pageGuards = warnings.filter(function(w) { return w.type === 'page-guard'; });
  var hasWarnings = pageGuards.length > 0 || listFilters.length > 0;

  if (injectedFiles.length > 0) {
    console.log('');
    console.log('[schedule-engine] Auto-injected getPublishedArticles in ' + injectedFiles.length + ' listing page(s):');
    for (var ai = 0; ai < injectedFiles.length; ai++) {
      console.log('  ' + injectedFiles[ai]);
    }
  }

  if (hasWarnings) {
    console.log('');
    console.log('[schedule-engine] ===== ACCESS CONTROL WARNINGS =====');
    console.log('');

    if (pageGuards.length > 0) {
      console.log('[schedule-engine] ' + pageGuards.length + ' article page(s) missing isPublished guard:');
      console.log('');
      for (var p = 0; p < pageGuards.length; p++) {
        var pg = pageGuards[p];
        var pgRelFile = fileRelativeToRoot(projectRoot, pg.file);
        var pgImportPath = buildImportPath(projectRoot, pgRelFile);
        console.log('  ' + pg.file);
      }
      console.log('');
      console.log('  Add this to the top of each article page\'s default export:');
      console.log('');
      // Show a representative example using the first file's import path
      var examplePgFile = fileRelativeToRoot(projectRoot, pageGuards[0].file);
      var examplePgImport = buildImportPath(projectRoot, examplePgFile);
      console.log('    import { notFound } from \'next/navigation\';');
      console.log('    import { isPublished } from \'' + examplePgImport + '\';');
      console.log('');
      console.log('    export default function ArticlePage() {');
      console.log('      if (!isPublished(\'/section/slug\')) notFound();');
      console.log('      // ... rest of page');
      console.log('    }');
      console.log('');
      // If paths vary per file, show each one
      if (pageGuards.length > 1 && !isEngineInsideSrc(projectRoot)) {
        console.log('  Import paths per file (relative, since schedule-engine is outside src/):');
        for (var pi = 0; pi < pageGuards.length; pi++) {
          var piRelFile = fileRelativeToRoot(projectRoot, pageGuards[pi].file);
          var piImport = buildImportPath(projectRoot, piRelFile);
          console.log('    ' + piRelFile + '  ->  ' + piImport);
        }
        console.log('');
      }
    }

    if (listFilters.length > 0) {
      console.log('[schedule-engine] ' + listFilters.length + ' listing page(s) missing getPublishedArticles filter:');
      console.log('');
      for (var l = 0; l < listFilters.length; l++) {
        var lf = listFilters[l];
        console.log('  ' + lf.file + '  (section: ' + lf.route + ')');
        console.log('');
        console.log('  Add this to ' + lf.file + ':');
        console.log('');
        console.log('    import { getPublishedArticles } from \'' + lf.importPath + '\';');
        console.log('');
        console.log('    // Replace your hardcoded article array with:');
        console.log('    const articles = getPublishedArticles();');
        console.log('');
      }
    }

    console.log('[schedule-engine] ===================================');
  } else if (articles.length > 0 && injectedFiles.length === 0) {
    console.log('[schedule-engine] All article pages have access control wired up.');
  }

  return { warnings: warnings, listFilters: listFilters, injectedFiles: injectedFiles };
}

// Try to auto-inject getPublishedArticles import and wiring into a listing page.
// Returns true if injection was successful, false if the structure is unclear.
function tryInjectListingImport(filePath, content, importPath) {
  // Look for a hardcoded array pattern that looks like an article list:
  // const articles = [ ... ] or let articles = [ ... ] or var articles = [ ... ]
  var arrayPattern = /^([ \t]*)(const|let|var)\s+(articles|posts|entries|items|allArticles|allPosts)\s*=\s*\[/m;
  var match = content.match(arrayPattern);

  if (match) {
    // Found a hardcoded array — replace with getPublishedArticles()
    var indent = match[1];
    var keyword = match[2];
    var varName = match[3];

    // Find the full array declaration (from match start to closing bracket)
    var startIdx = content.indexOf(match[0]);
    var bracketCount = 0;
    var endIdx = startIdx;
    var foundStart = false;
    for (var i = startIdx; i < content.length; i++) {
      if (content[i] === '[') { bracketCount++; foundStart = true; }
      if (content[i] === ']') { bracketCount--; }
      if (foundStart && bracketCount === 0) {
        // Include trailing semicolon if present
        endIdx = i + 1;
        if (content[endIdx] === ';') endIdx++;
        break;
      }
    }

    var importLine = "import { getPublishedArticles } from '" + importPath + "';\n";
    var replacement = indent + keyword + ' ' + varName + ' = getPublishedArticles();';

    // Add import at the top (after existing imports or at the very top)
    var lastImportIdx = content.lastIndexOf('\nimport ');
    var insertPos;
    if (lastImportIdx !== -1) {
      // Find end of last import line
      var nextNewline = content.indexOf('\n', lastImportIdx + 1);
      insertPos = nextNewline + 1;
    } else {
      insertPos = 0;
    }

    var newContent = content.slice(0, insertPos) +
      importLine +
      content.slice(insertPos, startIdx) +
      replacement +
      content.slice(endIdx);

    fs.writeFileSync(filePath, newContent, 'utf-8');
    return true;
  }

  // Structure unclear — cannot auto-inject
  return false;
}

// --- Main sync function ------------------------------------------------------

function sync(projectRoot) {
  projectRoot = projectRoot || process.cwd();

  // Load config
  var cfg = config.load(projectRoot);
  if (!cfg) {
    console.error('[schedule-engine] No config found. Run /schedule first.');
    process.exit(1);
  }

  if (!cfg.enabled) {
    console.log('[schedule-engine] Scheduling is disabled in config.');
    process.exit(0);
  }

  // Auto-install GitHub Actions workflow (uses config for cron timing)
  ensureWorkflow(projectRoot, cfg);

  // Load existing registry
  var reg = registry.load(projectRoot);
  var existingCount = reg.articles.length;

  // Discover articles
  var result = discover.discoverArticles(projectRoot, cfg.articleRoots);
  if (result.error) {
    console.error('[schedule-engine] Discovery error: ' + result.error);
    process.exit(1);
  }

  console.log('[schedule-engine] App dir: ' + result.appDir);
  console.log('[schedule-engine] Found ' + result.articles.length + ' article candidates in ' + result.sections.length + ' section(s)');

  // Track new articles
  var newArticles = [];

  for (var i = 0; i < result.articles.length; i++) {
    var article = result.articles[i];
    var existing = registry.findByRoute(reg, article.route);

    if (!existing) {
      // Infer title if possible
      var title = discover.inferTitle(article.filePath);

      var entry = registry.addEntry(reg, {
        slug: article.slug,
        route: article.route,
        filePath: article.filePath,
        title: title,
      });
      newArticles.push(entry);
      console.log('[schedule-engine] New article: ' + article.route);
    } else {
      // Update file path if it changed (e.g., file renamed from .js to .tsx)
      if (existing.filePath !== article.filePath) {
        registry.updateEntry(reg, article.route, { filePath: article.filePath });
      }
    }
  }

  // Auto-schedule new articles if enabled
  if (cfg.autoScheduleNewArticles && newArticles.length > 0) {
    var unscheduled = newArticles.filter(function(a) { return !a.publishAt; });

    if (unscheduled.length > 0) {
      var sorted = schedule.sortArticles(unscheduled, cfg.ordering);
      var nextSlot = schedule.getNextSlot(reg, cfg);
      var assignments = schedule.assignDates(sorted, cfg, nextSlot);

      for (var j = 0; j < assignments.length; j++) {
        var assignment = assignments[j];
        registry.updateEntry(reg, assignment.article.route, {
          publishAt: assignment.publishAt,
          status: 'scheduled',
        });
        console.log('[schedule-engine] Scheduled: ' + assignment.article.route + ' -> ' + assignment.publishDate);
      }
    }
  }

  // Save registry
  var regPath = registry.save(reg, projectRoot);

  console.log('[schedule-engine] Registry: ' + existingCount + ' existing, ' + newArticles.length + ' new');
  console.log('[schedule-engine] Saved: ' + regPath);

  // Check access control wiring
  checkAccessControl(projectRoot, result.articles, result.sections, cfg);

  return {
    existing: existingCount,
    newArticles: newArticles.length,
    total: reg.articles.length,
    registryPath: regPath,
  };
}

// Run if called directly
if (require.main === module) {
  var projectRoot = process.argv[2] || process.cwd();
  sync(projectRoot);
}

module.exports = sync;
