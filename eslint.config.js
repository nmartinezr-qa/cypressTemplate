const eslint = require('@eslint/js');
const prettierConfig = require('eslint-config-prettier');
const prettierPlugin = require('eslint-plugin-prettier');
const cypressPlugin = require('eslint-plugin-cypress');
const filenamesPlugin = require('eslint-plugin-filenames');

module.exports = [
  eslint.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        // Globales de Cypress
        cy: 'readonly',
        Cypress: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        // Globales de Node.js
        require: 'readonly',
        module: 'readonly',
        process: 'readonly',
        console: 'readonly',
        __dirname: 'readonly', // Agregado __dirname como global
      },
    },
    plugins: {
      prettier: prettierPlugin,
      cypress: cypressPlugin,
      filenames: filenamesPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
      // Para clases en PascalCase
      'new-cap': ['error', { newIsCap: true, capIsNew: false }],
      // Para nombres de variables y funciones en camelCase
      camelcase: ['error', { properties: 'never' }],
      // Para nombres de archivos en PascalCase
      // 'filenames/match-regex': ['error', '^[A-Z][a-zA-Z0-9]*$', { "case": "pascal" }]
    },
  },
  {
    files: ['cypress/**/*.js'],
    languageOptions: {
      globals: {
        cy: 'readonly',
        Cypress: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        console: 'readonly',
      },
    },
    plugins: {
      cypress: cypressPlugin,
    },
    rules: {
      ...cypressPlugin.configs.recommended.rules,
    },
  },
  prettierConfig,
];
