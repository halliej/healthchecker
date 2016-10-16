const http = require('http');
const cp = require("child_process");
const process = require('process');
const util = require('util');
const winston = require('winston');
const fs = require('fs');
const env = process.env.NODE_ENV || 'development';
const logDir = 'logs';

let testInterval = 30000;   //how often test will be run
let statusPort = 3000;      //webserver is listening on this port
let status = '{"passed":0,"failed":0,"msgs":[]}';   //default status

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

//format for log timestamp
const tsFormat = () => (new Date()).toLocaleTimeString('en-US',{timeZone:'America/New_York'}); 
//format for log messages
const msgFormat = (options) => (options.timestamp() +' '+ options.level.toUpperCase() +' '+ (undefined !== options.message ? options.message : '') +
          (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : ''));
//create logger with console and 2 file transports
const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
        timestamp: tsFormat,
        colorize: true,
        level: 'debug',
        formatter: msgFormat
    }),
    new (require('winston-daily-rotate-file'))({
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

//start doing stuff
logger.verbose('Automatic test running...');
logger.verbose(`Status will be reported on port ${statusPort}`);

//run the test once
runTest();

//autotest loop
let interval = setInterval(function() {
    runTest();
}, testInterval);

//run the autotest as a seperate process
function runTest() {
    cp.exec('node ./autoTester', (err, stdout, stderr) => {
        if (err) {
            logger.error(err);
            return;
        }
        status = stdout; 
        logger.info(`${status.trim()}`);
    });
}

//results server
http.createServer(function (request, response) {
   response.writeHead(200, {'Content-Type': 'text/json'});
   response.end(status);
}).listen(statusPort);






