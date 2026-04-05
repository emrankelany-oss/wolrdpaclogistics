const fs = require('fs');
const path = require('path');

var REGISTRY_FILENAME = 'schedule.registry.json';

function getRegistryPath(projectRoot) {
  return path.join(projectRoot || process.cwd(), REGISTRY_FILENAME);
}

function load(projectRoot) {
  var registryPath = getRegistryPath(projectRoot);
  if (!fs.existsSync(registryPath)) return { articles: [] };
  try {
    var data = JSON.parse(fs.readFileSync(registryPath, 'utf-8'));
    if (!data.articles) data.articles = [];
    return data;
  } catch {
    return { articles: [] };
  }
}

function save(registry, projectRoot) {
  var registryPath = getRegistryPath(projectRoot);
  var output = {
    lastUpdated: new Date().toISOString(),
    articles: registry.articles || [],
  };
  fs.writeFileSync(registryPath, JSON.stringify(output, null, 2) + '\n', 'utf-8');
  return registryPath;
}

function findBySlug(registry, slug) {
  return registry.articles.find(function(a) { return a.slug === slug; }) || null;
}

function findByRoute(registry, route) {
  return registry.articles.find(function(a) { return a.route === route; }) || null;
}

function addEntry(registry, entry) {
  var existing = findByRoute(registry, entry.route);
  if (existing) return existing;

  var newEntry = {
    slug: entry.slug,
    route: entry.route,
    filePath: entry.filePath,
    status: entry.status || 'scheduled',
    publishAt: entry.publishAt || null,
    detectedAt: new Date().toISOString(),
    publishedAt: null,
    title: entry.title || null,
  };
  registry.articles.push(newEntry);
  return newEntry;
}

function updateEntry(registry, route, updates) {
  var entry = findByRoute(registry, route);
  if (!entry) return null;
  Object.assign(entry, updates);
  return entry;
}

function getScheduled(registry) {
  return registry.articles.filter(function(a) { return a.status === 'scheduled'; });
}

function getPublished(registry) {
  return registry.articles.filter(function(a) { return a.status === 'published'; });
}

function getLastScheduledDate(registry) {
  var scheduled = registry.articles
    .filter(function(a) { return a.publishAt; })
    .map(function(a) { return new Date(a.publishAt).getTime(); })
    .sort(function(a, b) { return b - a; });

  return scheduled.length > 0 ? new Date(scheduled[0]) : null;
}

module.exports = {
  load,
  save,
  findBySlug,
  findByRoute,
  addEntry,
  updateEntry,
  getScheduled,
  getPublished,
  getLastScheduledDate,
  getRegistryPath,
  REGISTRY_FILENAME,
};
