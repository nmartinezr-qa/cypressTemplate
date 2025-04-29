// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
// En cypress/support/commands.js

Cypress.Commands.add('LoginGAS', () => {
  cy.request({
    method: 'POST',
    url: Cypress.env('apiUrl'),
    body: {
      email: Cypress.env('gasUserName'),
      password: Cypress.env('gasPassword'),
    },
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((resp) => {
    // Extrae la cookie HttpOnly de la respuesta
    const cookies = resp.headers['set-cookie'];
    const authCookie = cookies.find((c) => c.startsWith('authGAS='));

    if (authCookie) {
      const authGASValue = authCookie.split(';')[0].split('=')[1];
      cy.setCookie('authGAS', decodeURIComponent(authGASValue), {
        domain: 'impulsepoint.app',
        httpOnly: true,
        secure: true,
      });
    }
  });
});
Cypress.Commands.add('LoginOPS', () => {
  cy.request({
    method: 'POST',
    url: Cypress.env('apiUrl'),
    body: {
      email: Cypress.env('opsUserName'),
      password: Cypress.env('opsPassword'),
    },
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((resp) => {
    // Extrae la cookie HttpOnly de la respuesta
    const cookies = resp.headers['set-cookie'];
    const authCookie = cookies.find((c) => c.startsWith('authPS='));

    if (authCookie) {
      const authPSValue = authCookie.split(';')[0].split('=')[1];
      cy.setCookie('authPS', decodeURIComponent(authPSValue), {
        domain: 'impulsepoint.app',
        httpOnly: true,
        secure: true,
      });
    }
  });
});

Cypress.Commands.add('GoTo', (pageName) => {
  cy.contains('div', pageName).click({ force: true });
});

Cypress.Commands.add('logInfo', (message, meta = {}) => {
  cy.task('logInfo', { message, meta });
});

// Comando para log de nivel warn
Cypress.Commands.add('logWarn', (message, meta = {}) => {
  cy.task('logWarn', { message, meta });
});

// Comando para log de nivel error
Cypress.Commands.add('logError', (message, meta = {}) => {
  cy.task('logError', { message, meta });
});

// Comando para log de nivel debug
Cypress.Commands.add('logDebug', (message, meta = {}) => {
  cy.task('logDebug', { message, meta });
});

// Comando para log de nivel verbose
Cypress.Commands.add('logVerbose', (message, meta = {}) => {
  cy.task('logVerbose', { message, meta });
});

// No uses beforeEach/afterEach globales

// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
