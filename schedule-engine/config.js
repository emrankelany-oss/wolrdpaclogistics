const fs = require('fs');
const path = require('path');

const CONFIG_FILENAME = 'schedule.config.json';

const DEFAULTS = {
  enabled: true,
  startDate: null,
  intervalDays: 7,
  publishHour: 9,
  timezone: 'UTC',
  ordering: 'alphabetical',
  autoScheduleNewArticles: true,
  articleRoots: [],
  listingPages: [],
};

function getConfigPath(projectRoot) {
  return path.join(projectRoot || process.cwd(), CONFIG_FILENAME);
}

function load(projectRoot) {
  const configPath = getConfigPath(projectRoot);
  if (!fs.existsSync(configPath)) return null;
  try {
    return JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  } catch {
    return null;
  }
}

function save(config, projectRoot) {
  const configPath = getConfigPath(projectRoot);
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2) + '\n', 'utf-8');
  return configPath;
}

function createDefault(overrides) {
  return Object.assign({}, DEFAULTS, overrides || {});
}

function validate(config) {
  const errors = [];
  if (!config.startDate) errors.push('startDate is required');
  if (typeof config.intervalDays !== 'number' || config.intervalDays < 1) {
    errors.push('intervalDays must be a positive number');
  }
  if (typeof config.publishHour !== 'number' || config.publishHour < 0 || config.publishHour > 23) {
    errors.push('publishHour must be between 0 and 23');
  }
  if (!config.timezone) errors.push('timezone is required');
  var validOrderings = ['alphabetical', 'detection', 'existing'];
  if (!validOrderings.includes(config.ordering)) {
    errors.push('ordering must be one of: ' + validOrderings.join(', '));
  }
  return errors;
}

module.exports = { load, save, createDefault, validate, getConfigPath, CONFIG_FILENAME, DEFAULTS };
