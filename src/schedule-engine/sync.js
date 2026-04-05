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

function ensureWorkflow(projectRoot) {
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

  var template = fs.readFileSync(templateSrc, 'utf-8');
  // Replace the placeholder with the actual engine directory path
  var rendered = template.replace(/\{\{ENGINE_DIR\}\}/g, engineDir);

  // Ensure .github/workflows/ exists
  fs.mkdirSync(workflowDir, { recursive: true });
  fs.writeFileSync(workflowDest, rendered, 'utf-8');

  console.log('[schedule-engine] Installed GitHub Actions workflow -> .github/workflows/schedule-publish.yml');
  return true;
}

// --- Access control wiring checks -------------------------------------------

function checkAccessControl(projectRoot, articles, sections) {
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

  // 2. Check article listing pages (parent route pages) for getPublishedArticles
  for (var j = 0; j < sections.length; j++) {
    var section = sections[j];
    var parentRoute = section.parentRoute;

    // Try to find the listing page for this section
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
      try {
        var listContent = fs.readFileSync(listingFile, 'utf-8');
        if (listContent.indexOf('getPublishedArticles') === -1) {
          warnings.push({
            type: 'list-filter',
            file: listingFile.split(path.sep).join('/'),
            route: parentRoute,
          });
        }
      } catch {
        // skip
      }
    }
  }

  // Print warnings with copy-paste snippets
  if (warnings.length > 0) {
    console.log('');
    console.log('[schedule-engine] ===== ACCESS CONTROL WARNINGS =====');
    console.log('');

    var pageGuards = warnings.filter(function(w) { return w.type === 'page-guard'; });
    var listFilters = warnings.filter(function(w) { return w.type === 'list-filter'; });

    if (pageGuards.length > 0) {
      console.log('[schedule-engine] ' + pageGuards.length + ' article page(s) missing isPublished guard:');
      console.log('');
      for (var p = 0; p < pageGuards.length; p++) {
        var pg = pageGuards[p];
        console.log('  ' + pg.file);
      }
      console.log('');
      console.log('  Add this to the top of each article page\'s default export:');
      console.log('');
      console.log('    import { notFound } from \'next/navigation\';');
      console.log('    import { isPublished } from \'@/' + engineDir + '/access-control\';');
      console.log('');
      console.log('    export default function ArticlePage() {');
      console.log('      if (!isPublished(\'/section/slug\')) notFound();');
      console.log('      // ... rest of page');
      console.log('    }');
      console.log('');
    }

    if (listFilters.length > 0) {
      console.log('[schedule-engine] ' + listFilters.length + ' listing page(s) missing getPublishedArticles filter:');
      console.log('');
      for (var l = 0; l < listFilters.length; l++) {
        var lf = listFilters[l];
        console.log('  ' + lf.file + '  (section: ' + lf.route + ')');
      }
      console.log('');
      console.log('  Add this to filter unpublished articles from listings:');
      console.log('');
      console.log('    import { getPublishedArticles } from \'@/' + engineDir + '/access-control\';');
      console.log('');
      console.log('    // Replace your hardcoded article array with:');
      console.log('    const articles = getPublishedArticles();');
      console.log('');
    }

    console.log('[schedule-engine] ===================================');
  } else if (articles.length > 0) {
    console.log('[schedule-engine] All article pages have access control wired up.');
  }

  return warnings;
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

  // Auto-install GitHub Actions workflow
  ensureWorkflow(projectRoot);

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
  checkAccessControl(projectRoot, result.articles, result.sections);

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
