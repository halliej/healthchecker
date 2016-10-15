# Healthchecker Proof of Concept

This is a *proof of concept* application that demonstrates the feasibility of using the Mocha
test framework to monitor the health of RESTful APIs. This application can easily be modified to 
work with almost any group of endpoint URLs.  


**Requirements**
##
+ [Node.js](https://nodejs.org)
+ [Mocha](https://mochajs.org) installed globally for manual operation 


**Installation**
##
+ Ensure node.js is installed and operating properly on the system where you will be 
running the application. 
+ Download this application from github.
+ Type `npm install` to install dependencies.

**NOTE:** If you plan to run the application in manual mode you will need to install Mocha globally:

`npm install -g mocha`   


**Start Demo APIs**
##
Start the demo APIs before running the manual or automatic test:

+ `node api-1.js`
+ `node api-2.js`

**Manual Operation**
##
To run the test manually simply type: `mocha`. The test will run once and results will be 
output to the console.


**Automatic Operation**
##
To have the application run the test periodically type `node healthchecker`. After startup test status will 
be output to the console. ie:

`10/03/2016 - 13:17:35: {"passes":7,"failures":0,"failed":[]}`


**Status Reporting**
##
When the application is running in automatic mode a small web server is created. This web server 
will output the status of the most recent set of test when accessed. ie: 

`http://localhost:3000`

will return:

`{"passes":7,"failures":0,"failed":[]}`


**Logging**
##
When running in automatic mode log files are created for test status and test latency. These logs 
are rotated daily and can be found in the logs directory named:

+ *yyyy-mm-dd-teststatus.log*   - same status reported via the web endpoint
+ *yyyy-mm-dd-testlatency.log*  - time in milliseconds each test took to run

