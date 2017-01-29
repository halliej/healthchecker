/* eslint prefer-template: 0 */
/* eslint no-param-reassign: 0 */
module.exports = hcReporter;

const mocha = require('mocha');
const winston = require('winston');
const rotate = require('winston-daily-rotate-file');

const logDir = 'logs';

const tsFormat = () => (new Date()).toLocaleTimeString('en-US', { timeZone: 'America/New_York' });
const msgFormat = (options) =>
  (options.timestamp() + ' ' + options.level.toUpperCase() + ' ' +
  (undefined !== options.message ? options.message : '') +
  (options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : ''));
const logger = new (winston.Logger)({
  transports: [
    new rotate({
      filename: `${logDir}/-testlatency.log`,
      timestamp: tsFormat,
      datePattern: 'yyyy-MM-dd',
      prepend: true,
      formatter: msgFormat,
      level: 'info',
      json: false
    })
  ]
});

function hcReporter(runner) {
  mocha.reporters.Base.call(this, runner);
  const results = {
    passed: 0,
    failed: 0,
    msgs: []
  };

  runner.on('pass', (test) => {
    results.passed++;
    logger.info(`Passed: ${test.fullTitle()} (${test.duration})ms`);
  });

  runner.on('fail', (test) => {
    results.failed++;
    results.msgs.push(test.fullTitle() + ': ' + test.err);
    logger.info(`Failed: ${test.fullTitle()} (${test.duration})ms`);
  });

  runner.on('end', () => {
    runner.testResults = results;
  });
}
