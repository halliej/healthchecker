
const Mocha = require('mocha');
const fs = require('fs');
const path = require('path');

// Instantiate a Mocha instance.
const mocha = new Mocha({
  reporter: 'hcReporter'
});

const testDir = 'test';

// Add each .js file to the mocha instance
fs.readdirSync(testDir).filter((file) => {
    // Only keep the .js files
    return file.substr(-3) === '.js';
}).forEach((file) => {
    mocha.addFile(
        path.join(testDir, file)
    );
});

mocha.run()
  .on('end', function () {
    console.log(JSON.stringify(this.testResults));
    process.exit();
  });
