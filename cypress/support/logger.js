const winston = require('winston');
const path = require('path');
const fs = require('fs');

/**
 * Logger class to provide centralized logging configuration for Cypress tests
 */
class Logger {
  constructor(options = {}) {
    this.options = {
      logDir: options.logDir || 'cypress/logs',
      logLevel: options.logLevel || 'info',
      filename: options.filename || 'cypress-tests',
      console: options.console !== undefined ? options.console : true,
      // Opción para sobrescribir logs en vez de rotarlos
      overwrite: options.overwrite !== undefined ? options.overwrite : true,
      ...options,
    };

    this.initialize();
  }

  /**
   * Initialize the logger and create necessary directories
   */
  initialize() {
    // Create log directory if it doesn't exist
    if (!fs.existsSync(this.options.logDir)) {
      fs.mkdirSync(this.options.logDir, { recursive: true });
    }

    // Define custom log format
    const customFormat = winston.format.combine(
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      winston.format.printf(({ level, message, timestamp, ...meta }) => {
        return `[${timestamp}] [${level.toUpperCase()}]: ${message} ${
          Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''
        }`;
      }),
    );

    // Define transports
    const transports = [
      new winston.transports.File({
        filename: path.join(this.options.logDir, `${this.options.filename}-error.log`),
        level: 'error',
        format: customFormat,
        // Flag para sobrescribir el archivo
        options: { flags: this.options.overwrite ? 'w' : 'a' },
      }),
      new winston.transports.File({
        filename: path.join(this.options.logDir, `${this.options.filename}.log`),
        level: this.options.logLevel,
        format: customFormat,
        // Flag para sobrescribir el archivo
        options: { flags: this.options.overwrite ? 'w' : 'a' },
      }),
    ];

    // Add console transport if enabled
    if (this.options.console) {
      transports.push(
        new winston.transports.Console({
          level: this.options.logLevel,
          format: winston.format.combine(winston.format.colorize(), customFormat),
        }),
      );
    }

    // Create logger instance
    this.logger = winston.createLogger({
      level: this.options.logLevel,
      levels: winston.config.npm.levels,
      transports,
      exitOnError: false,
    });

    // Log initialization message
    if (this.options.overwrite) {
      this.logger.info(`Logger initialized in overwrite mode at ${new Date().toISOString()}`);
    } else {
      this.logger.info(`Logger initialized in append mode at ${new Date().toISOString()}`);
    }
  }

  /**
   * Process log input which can be either a string or an object with message and meta
   * @param {string|object} input - Log input
   * @returns {object} - Processed message and metadata
   */
  processLogInput(input) {
    let message = '';
    let meta = {};

    if (typeof input === 'string') {
      message = input;
    } else if (input && typeof input === 'object') {
      message = input.message || '';
      meta = input.meta || {};
    }

    return { message, meta };
  }

  /**
   * Log message at 'info' level
   * @param {string|object} input - Log message or object with message and meta
   */
  info(input) {
    const { message, meta } = this.processLogInput(input);
    this.logger.info(message, meta);
  }

  /**
   * Log message at 'warn' level
   * @param {string|object} input - Log message or object with message and meta
   */
  warn(input) {
    const { message, meta } = this.processLogInput(input);
    this.logger.warn(message, meta);
  }

  /**
   * Log message at 'error' level
   * @param {string|object} input - Log message or object with message and meta
   */
  error(input) {
    const { message, meta } = this.processLogInput(input);
    this.logger.error(message, meta);
  }

  /**
   * Log message at 'debug' level
   * @param {string|object} input - Log message or object with message and meta
   */
  debug(input) {
    const { message, meta } = this.processLogInput(input);
    this.logger.debug(message, meta);
  }

  /**
   * Log message at 'verbose' level
   * @param {string|object} input - Log message or object with message and meta
   */
  verbose(input) {
    const { message, meta } = this.processLogInput(input);
    this.logger.verbose(message, meta);
  }
}

module.exports = Logger;
