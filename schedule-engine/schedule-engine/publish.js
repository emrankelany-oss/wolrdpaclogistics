#!/usr/bin/env node

// Publish script: mark due scheduled articles as published
// Usage: node schedule-engine/publish.js [projectRoot]

var config = require('./config');
var registry = require('./registry');
var scheduleMod = require('./schedule');

function publish(projectRoot) {
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

  // Load registry
  var reg = registry.load(projectRoot);
  var scheduled = registry.getScheduled(reg);
  var published = [];

  console.log('[schedule-engine] Checking ' + scheduled.length + ' scheduled article(s)...');

  for (var i = 0; i < scheduled.length; i++) {
    var entry = scheduled[i];

    if (scheduleMod.isDue(entry, cfg.timezone)) {
      registry.updateEntry(reg, entry.route, {
        status: 'published',
        publishedAt: new Date().toISOString(),
      });
      published.push(entry);
      console.log('[schedule-engine] Published: ' + entry.route + ' (was scheduled for ' + entry.publishAt + ')');
    }
  }

  if (published.length > 0) {
    var regPath = registry.save(reg, projectRoot);
    console.log('[schedule-engine] ' + published.length + ' article(s) published. Registry saved.');
  } else {
    console.log('[schedule-engine] No articles due for publishing right now.');
  }

  return {
    checked: scheduled.length,
    published: published.length,
  };
}

// Run if called directly
if (require.main === module) {
  var projectRoot = process.argv[2] || process.cwd();
  publish(projectRoot);
}

module.exports = publish;
