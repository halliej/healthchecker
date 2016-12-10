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

NOTE: Install http-server and start in the logs directory to provide an easy way to view the
log files in your browser.

**Customizing**
##
Of course you will need to make changes to this application for it to monitor the APIs you
are interested in rather than the dummy APIs supplied. To do this you will need to make several
changes:

First, open the config.json file and edit the entries to supply the values needed for your API. Be sure to name each entry appropriately for your API.

Next create a new test for your API. This is what Mocha will be calling to run and evaluate
your test. Make sure the api variable is pointing to the correct test for your API. Also
change the labels as required. If you are familiar with Mocha you will know what to do. Otherwise
run the test manually and you will see what you need to do. You may need to adjust the timeout
value if your test takes more than 5 seconds to run. This is all standard Mocha stuff so refer
to the docs if in doubt. You will probably also need to change the assertions to match what your API
is returning.

Now if you run mocha from the root of the project you should see the default spec report. If not
you may have issues with the previous steps but you should be able to figure it out. The Mocha docs should help.

Once you can successfully run your Mocha test manually you can start automatic mode by typing:
`node healthchecker.js`. In a production environment you will probably want to use a process manager
such as pm2.
