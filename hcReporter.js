module.exports = hcReporter;

const mocha = require('mocha');
const winston = require('winston');

const env = process.env.NODE_ENV || 'development';
const logDir = 'logs';

const tsFormat = () => (new Date()).toLocaleTimeString('en-US',{timeZone:'America/New_York'});
const msgFormat = (options) => (options.timestamp() +' '+ options.level.toUpperCase() +' '+ (undefined !== options.message ? options.message : '') +
          (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : ''));
const logger = new (winston.Logger)({
  transports: [
    new (require('winston-daily-rotate-file'))({
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
  let results = {
    passed: 0,
    failed: 0,
    msgs: []
  }

  runner.on('pass', function(test){
    results.passed++;
    logger.info(`Passed: ${test.fullTitle()} (${test.duration})ms`);
  });

  runner.on('fail', function(test, err){
    results.failed++;
    results.msgs.push(test.fullTitle() + ': ' + test.err);
    logger.info(`Failed: ${test.fullTitle()} (${test.duration})ms`);
  });

  runner.on('end', function(){
    runner.testResults = results;
  });
}