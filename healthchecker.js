const http = require('http');
const cp = require('child_process');
const process = require('process');
//const util = require('util');
const logger = require('./logs');

//const env = process.env.NODE_ENV || 'development';

const testInterval = 30000;   //how often test will be run
const statusPort = process.env.PORT || 3000;      //webserver is listening on this port
let status = '{"passed":0,"failed":0,"msgs":[]}';   //default status

//start doing stuff
logger.verbose('Automatic test running...');
logger.verbose(`Status will be reported on port ${statusPort}`);

//run the test once
runTest();

//autotest loop
setInterval(() => {
    runTest();
}, testInterval);

//run the autotest as a seperate process
function runTest() {
    cp.exec('node ./autoTester', (err, stdout) => {
        if (err) {
            logger.error(err);
            return;
        }
        status = stdout;
        logger.info(`${status.trim()}`);
    });
}

//results server
http.createServer((request, response) => {
   response.writeHead(200, { 'Content-Type': 'text/json' });
   response.end(status);
}).listen(statusPort);
