// Access control helper for Next.js article pages
// Import this in your article page files to gate unpublished content
//
// Usage in a page.js / page.tsx:
//
//   const { isPublished, guardArticle } = require('../schedule-engine/access-control');
//   // or: import { isPublished, guardArticle } from '@/schedule-engine/access-control';
//
//   export default function ArticlePage() {
//     guardArticle('/blog/my-article');  // calls notFound() if not published
//     return <div>...</div>;
//   }

var fs = require('fs');
var path = require('path');

var REGISTRY_FILENAME = 'schedule.registry.json';
var CONFIG_FILENAME = 'schedule.config.json';

// Resolve project root by walking up from this file's location
function findProjectRoot() {
  var dir = __dirname;
  for (var i = 0; i < 10; i++) {
    if (fs.existsSync(path.join(dir, 'package.json'))) return dir;
    var parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return process.cwd();
}

// Load registry data (cached per process to avoid repeated disk reads)
var _registryCache = null;
var _registryCacheTime = 0;
var CACHE_TTL_MS = 5000; // refresh every 5s in dev

function loadRegistry() {
  var now = Date.now();
  if (_registryCache && (now - _registryCacheTime) < CACHE_TTL_MS) {
    return _registryCache;
  }

  var projectRoot = findProjectRoot();
  var registryPath = path.join(projectRoot, REGISTRY_FILENAME);

  if (!fs.existsSync(registryPath)) {
    _registryCache = { articles: [] };
    _registryCacheTime = now;
    return _registryCache;
  }

  try {
    _registryCache = JSON.parse(fs.readFileSync(registryPath, 'utf-8'));
    if (!_registryCache.articles) _registryCache.articles = [];
  } catch {
    _registryCache = { articles: [] };
  }
  _registryCacheTime = now;
  return _registryCache;
}

function loadConfig() {
  var projectRoot = findProjectRoot();
  var configPath = path.join(projectRoot, CONFIG_FILENAME);
  if (!fs.existsSync(configPath)) return null;
  try {
    return JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  } catch {
    return null;
  }
}

// Check if a specific article route is published
function isPublished(route) {
  var registry = loadRegistry();
  var entry = registry.articles.find(function(a) { return a.route === route; });

  // If no registry entry exists, allow access (untracked page)
  if (!entry) return true;

  if (entry.status === 'published') return true;

  // Check if scheduled and past due
  if (entry.status === 'scheduled' && entry.publishAt) {
    return Date.now() >= new Date(entry.publishAt).getTime();
  }

  return false;
}

// Check if a specific slug is published (convenience)
function isSlugPublished(slug) {
  var registry = loadRegistry();
  var entry = registry.articles.find(function(a) { return a.slug === slug; });
  if (!entry) return true;
  if (entry.status === 'published') return true;
  if (entry.status === 'scheduled' && entry.publishAt) {
    return Date.now() >= new Date(entry.publishAt).getTime();
  }
  return false;
}

// Get all currently published articles (for listing pages)
function getPublishedArticles() {
  var registry = loadRegistry();
  var now = Date.now();

  return registry.articles.filter(function(a) {
    if (a.status === 'published') return true;
    if (a.status === 'scheduled' && a.publishAt) {
      return now >= new Date(a.publishAt).getTime();
    }
    return false;
  });
}

// Get all articles regardless of status (for admin/preview)
function getAllArticles() {
  var registry = loadRegistry();
  return registry.articles.slice();
}

// Guard function: call at the top of an article page to block unpublished
// This is designed to work with Next.js notFound()
// Usage: guardArticle('/blog/my-article') — throws notFound-compatible error if not published
function guardArticle(route) {
  if (!isPublished(route)) {
    // In Next.js, import { notFound } from 'next/navigation' and call it
    // Since we can't import next/navigation here generically, we throw
    // a recognizable error that integration code can catch
    var err = new Error('SCHEDULE_ENGINE_NOT_PUBLISHED');
    err.code = 'NOT_PUBLISHED';
    err.route = route;
    throw err;
  }
}

// Clear the registry cache (useful in tests or after publish runs)
function clearCache() {
  _registryCache = null;
  _registryCacheTime = 0;
}

module.exports = {
  isPublished,
  isSlugPublished,
  getPublishedArticles,
  getAllArticles,
  guardArticle,
  clearCache,
};
