// Scheduling logic: assign publish dates to articles based on config

// Get the current time in a specific timezone
function nowInTimezone(timezone) {
  var dateStr = new Date().toLocaleString('en-US', { timeZone: timezone });
  return new Date(dateStr);
}

// Create a date at the configured publish hour in the configured timezone
function createPublishDate(dateStr, hour, timezone) {
  // Parse the base date
  var parts = dateStr.split('-');
  var year = parseInt(parts[0], 10);
  var month = parseInt(parts[1], 10) - 1;
  var day = parseInt(parts[2], 10);

  // Create the date at the specified hour in UTC first, then adjust
  // We use a simple approach: create the date and set time
  var date = new Date(Date.UTC(year, month, day, hour, 0, 0, 0));

  // Adjust for timezone offset relative to UTC
  var utcStr = date.toLocaleString('en-US', { timeZone: 'UTC' });
  var tzStr = date.toLocaleString('en-US', { timeZone: timezone });
  var utcDate = new Date(utcStr);
  var tzDate = new Date(tzStr);
  var offsetMs = utcDate.getTime() - tzDate.getTime();

  return new Date(date.getTime() + offsetMs);
}

// Add days to a date string (YYYY-MM-DD) and return new YYYY-MM-DD
function addDays(dateStr, days) {
  var parts = dateStr.split('-');
  var date = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
  date.setDate(date.getDate() + days);
  var y = date.getFullYear();
  var m = String(date.getMonth() + 1).padStart(2, '0');
  var d = String(date.getDate()).padStart(2, '0');
  return y + '-' + m + '-' + d;
}

// Format Date to YYYY-MM-DD
function toDateString(date) {
  var y = date.getFullYear();
  var m = String(date.getMonth() + 1).padStart(2, '0');
  var d = String(date.getDate()).padStart(2, '0');
  return y + '-' + m + '-' + d;
}

// Sort articles by the chosen ordering strategy
function sortArticles(articles, ordering) {
  var sorted = articles.slice();

  switch (ordering) {
    case 'alphabetical':
      sorted.sort(function(a, b) { return a.slug.localeCompare(b.slug); });
      break;
    case 'detection':
      // Keep original discovery order (as-is)
      break;
    case 'existing':
      // Keep the order from the registry (as-is)
      break;
    default:
      sorted.sort(function(a, b) { return a.slug.localeCompare(b.slug); });
  }

  return sorted;
}

// Assign publish dates to a list of unscheduled articles
function assignDates(articles, config, startDateOverride) {
  var startDate = startDateOverride || config.startDate;
  var interval = config.intervalDays;
  var hour = config.publishHour;
  var timezone = config.timezone;

  var currentDate = startDate;
  var results = [];

  for (var i = 0; i < articles.length; i++) {
    var publishAt = createPublishDate(currentDate, hour, timezone);
    results.push({
      article: articles[i],
      publishAt: publishAt.toISOString(),
      publishDate: currentDate,
    });
    currentDate = addDays(currentDate, interval);
  }

  return results;
}

// Get the next available publish slot after all existing scheduled/published articles
function getNextSlot(registry, config) {
  var lastDate = null;

  for (var i = 0; i < registry.articles.length; i++) {
    var entry = registry.articles[i];
    if (entry.publishAt) {
      var entryDate = new Date(entry.publishAt);
      if (!lastDate || entryDate > lastDate) {
        lastDate = entryDate;
      }
    }
  }

  if (lastDate) {
    var nextDateStr = addDays(toDateString(lastDate), config.intervalDays);
    return nextDateStr;
  }

  return config.startDate;
}

// Check if an article is due for publishing right now
function isDue(entry, timezone) {
  if (!entry.publishAt) return false;
  if (entry.status !== 'scheduled') return false;

  var publishTime = new Date(entry.publishAt).getTime();
  var now = Date.now();

  return now >= publishTime;
}

module.exports = {
  nowInTimezone,
  createPublishDate,
  addDays,
  toDateString,
  sortArticles,
  assignDates,
  getNextSlot,
  isDue,
};
