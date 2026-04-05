const fs = require('fs');
const path = require('path');

var PAGE_FILENAMES = ['page.js', 'page.jsx', 'page.ts', 'page.tsx'];
var SKIP_DIRS = ['node_modules', '.next', '.git', 'api', '_not-found'];
var SPECIAL_FILES = [
  'layout', 'loading', 'error', 'template', 'not-found',
  'route', 'default', 'global-error', 'middleware', 'instrumentation',
];

// Find the app directory (app/ or src/app/)
function findAppDir(projectRoot) {
  var candidates = [
    path.join(projectRoot, 'src', 'app'),
    path.join(projectRoot, 'app'),
  ];
  for (var i = 0; i < candidates.length; i++) {
    if (fs.existsSync(candidates[i]) && fs.statSync(candidates[i]).isDirectory()) {
      return candidates[i];
    }
  }
  return null;
}

// Recursively find all page files under a directory
function findAllPages(dir, appDir, results) {
  results = results || [];
  var entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return results;
  }

  for (var i = 0; i < entries.length; i++) {
    var entry = entries[i];
    var fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (entry.name.startsWith('.') || SKIP_DIRS.includes(entry.name)) continue;
      findAllPages(fullPath, appDir, results);
    } else if (PAGE_FILENAMES.includes(entry.name)) {
      var relativeDir = path.relative(appDir, dir);
      var segments = relativeDir.split(path.sep).filter(Boolean);

      // Skip root page (no segments = app/page.js)
      if (segments.length === 0) continue;

      // Build the public route by stripping route groups and intercepting routes
      var routeSegments = [];
      var skipPage = false;
      for (var j = 0; j < segments.length; j++) {
        var seg = segments[j];
        // Route groups like (marketing) are invisible in URLs
        if (seg.startsWith('(') && seg.endsWith(')')) continue;
        // Dynamic segments like [slug] indicate a dynamic route, not a static article
        if (seg.startsWith('[')) { skipPage = true; break; }
        // Intercepting routes like (.)photo are not articles
        if (seg.startsWith('(.)') || seg.startsWith('(..)')) { skipPage = true; break; }
        // Parallel routes like @modal
        if (seg.startsWith('@')) { skipPage = true; break; }
        routeSegments.push(seg);
      }

      if (skipPage) continue;
      if (routeSegments.length === 0) continue;

      results.push({
        filePath: fullPath.split(path.sep).join('/'),
        fileName: entry.name,
        segments: segments,
        routeSegments: routeSegments,
        route: '/' + routeSegments.join('/'),
        slug: routeSegments[routeSegments.length - 1],
        parentRoute: routeSegments.length > 1 ? '/' + routeSegments.slice(0, -1).join('/') : '/',
      });
    }
  }
  return results;
}

// Identify article sections: parent routes with 2+ child pages
function identifyArticleSections(pages, configuredRoots) {
  configuredRoots = configuredRoots || [];

  // Group pages by their parent route
  var groups = {};
  for (var i = 0; i < pages.length; i++) {
    var page = pages[i];
    var parent = page.parentRoute;
    if (!groups[parent]) groups[parent] = [];
    groups[parent].push(page);
  }

  var sections = [];
  var parentRoutes = Object.keys(groups);

  for (var j = 0; j < parentRoutes.length; j++) {
    var parentRoute = parentRoutes[j];
    var children = groups[parentRoute];

    // A section qualifies if it has 2+ children OR is explicitly configured
    var isConfigured = configuredRoots.some(function(root) {
      return parentRoute === root || parentRoute === '/' + root.replace(/^\//, '');
    });

    // When articleRoots are explicitly configured, only include those sections
    var hasConfiguredRoots = configuredRoots.length > 0;
    if (hasConfiguredRoots ? isConfigured : children.length >= 2) {
      sections.push({
        parentRoute: parentRoute,
        articles: children,
        count: children.length,
        isConfigured: isConfigured,
      });
    }
  }

  return sections;
}

// Main discovery: find all article candidates in a project
function discoverArticles(projectRoot, configuredRoots) {
  var appDir = findAppDir(projectRoot);
  if (!appDir) {
    return { error: 'No app directory found. Is this a Next.js App Router project?', articles: [], sections: [] };
  }

  var allPages = findAllPages(appDir, appDir);
  var sections = identifyArticleSections(allPages, configuredRoots);

  // Collect all articles from identified sections
  var articles = [];
  for (var i = 0; i < sections.length; i++) {
    for (var j = 0; j < sections[i].articles.length; j++) {
      articles.push(sections[i].articles[j]);
    }
  }

  return {
    error: null,
    appDir: appDir.split(path.sep).join('/'),
    articles: articles,
    sections: sections,
    totalPages: allPages.length,
  };
}

// Try to infer a title from a page file's content
function inferTitle(filePath) {
  try {
    var content = fs.readFileSync(filePath, 'utf-8');

    // Look for metadata/generateMetadata title
    var metaMatch = content.match(/title\s*[:=]\s*['"`]([^'"`]+)['"`]/);
    if (metaMatch) return metaMatch[1];

    // Look for h1 in JSX
    var h1Match = content.match(/<h1[^>]*>([^<]+)<\/h1>/);
    if (h1Match) return h1Match[1].trim();

    return null;
  } catch {
    return null;
  }
}

module.exports = {
  findAppDir,
  findAllPages,
  identifyArticleSections,
  discoverArticles,
  inferTitle,
  PAGE_FILENAMES,
};
