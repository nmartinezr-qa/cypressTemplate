// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';
import 'cypress-mochawesome-reporter/register';
require('cypress-grep')();

afterEach(function () {
  const testInfo = {
    suite: this.currentTest.parent.title,
    title: this.currentTest.title,
    state: this.currentTest.state || 'unknown',
    duration: `${(this.currentTest.duration / 1000).toFixed(2)}s`,
  };

  cy.task('logInfo', {
    message: `Completed test: ${testInfo.title} (${testInfo.state})`,
    meta: testInfo,
  });

  if (this.currentTest.state === 'failed') {
    cy.task('logError', {
      message: `Test failed: ${testInfo.title}`,
      meta: {
        error: this.currentTest.err?.message || 'Unknown error',
      },
    });
  }
});
