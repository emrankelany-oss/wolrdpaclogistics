#!/usr/bin/env node

// Sync script: discover articles, update registry, auto-schedule new entries
// Usage: node schedule-engine/sync.js [projectRoot]

var config = require('./config');
var discover = require('./discover');
var registry = require('./registry');
var schedule = require('./schedule');

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
