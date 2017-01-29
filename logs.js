/* eslint prefer-template: 0 */
const winston = require('winston');
const fs = require('fs');
const rotate = require('winston-daily-rotate-file');

const logDir = 'logs';

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

//format for log timestamp
const tsFormat = () => (new Date()).toLocaleTimeString('en-US', { timeZone: 'America/New_York' });
//format for log messages
const msgFormat = (options) =>
  (options.timestamp() + ' ' + options.level.toUpperCase() + ' ' +
  (undefined !== options.message ? options.message : '') +
  (options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : ''));
//create logger with console and 2 file transports
const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
        timestamp: tsFormat,
        colorize: true,
        level: 'debug',
        formatter: msgFormat
    }),
    new rotate({
      filename: `${logDir}/-teststatus.log`,
      timestamp: tsFormat,
      formatter: msgFormat,
      level: 'info',
      datePattern: 'yyyy-MM-dd',
      prepend: true,
      json: false
    }),
    new (winston.transports.File)({
      name: 'error-file',
      filename: `${logDir}/error.log`,
      level: 'error',
      formatter: msgFormat,
      json: false
    })
  ]
});

module.exports = logger;
