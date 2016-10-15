
const Mocha = require('mocha'),
    fs = require('fs'),
    path = require('path'),
    hcreporter = require('./hcReporter.js');

    //hcreporter = require('./hcReporter.js');

// Instantiate a Mocha instance.
let mocha = new Mocha({
  reporter: 'hcReporter'
});

const testDir = 'test';

// Add each .js file to the mocha instance
fs.readdirSync(testDir).filter(function(file){
    // Only keep the .js files
    return file.substr(-3) === '.js';
}).forEach(function(file){
    mocha.addFile(
        path.join(testDir, file)
    );
});

mocha.run()
  .on('end', function() {
    console.log(JSON.stringify(this.testResults));
    process.exit();
  });

