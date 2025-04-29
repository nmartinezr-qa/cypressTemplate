const { defineConfig } = require('cypress');
const Logger = require('./cypress/support/logger');
const path = require('path');

require('dotenv').config({
  path: path.resolve(__dirname, `.env.${process.env.NODE_ENV || 'test'}`),
});

const logger = new Logger({
  logDir: 'cypress/logs',
  logLevel: 'info',
  filename: 'cypress-tests',
  overwrite: true,
});

module.exports = defineConfig({
  projectId: 'd1azcx',
  e2e: {
    specPattern: 'cypress/e2e/**/*.spec.{js,jsx,ts,tsx}',
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      on('task', {
        logInfo: (message) => {
          logger.info(message);
          return null;
        },
        logWarn: (message) => {
          logger.warn(message);
          return null;
        },
        logError: (message) => {
          logger.error(message);
          return null;
        },
        logDebug: (message) => {
          logger.debug(message);
          return null;
        },
        logVerbose: (message) => {
          logger.verbose(message);
          return null;
        },
      });

      require('cypress-grep/src/plugin')(config);
      config.env = { ...config.env, ...process.env };
      return config;
    },
    baseUrl: process.env.CYPRESS_BASE_URL,
    viewportWidth: 1920,
    viewportHeight: 1080,
    env: {
      userName: process.env.CYPRESS_USERNAME,
      password: process.env.CYPRESS_PASSWORD,
      grepFilterSpecs: true,
    },
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      charts: true,
      reportPageTitle: 'Cypress Test Report',
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: false,
      reportDir: 'cypress/reports', // Carpeta donde se guardarán los reportes
      overwrite: true, // Se sobre escribe el reporte para tener un unico reporte por ejecucion
    },
  },
});
