const http = require('http');

let apiPort = 3001;
let status = '{"status":"success"}';

http.createServer ((request, response) => {
   response.writeHead(200, {'Content-Type': 'text/json'});
   response.end(status);
}).listen(apiPort);

console.log(`API 1 running on port ${apiPort}.`);
