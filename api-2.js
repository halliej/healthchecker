const http = require('http');

let apiPort = 3002;
let status = '{"status":"success"}';

http.createServer(function (request, response) {
   response.writeHead(200, {'Content-Type': 'text/json'});
   response.end(status);
}).listen(apiPort);

console.log(`API 2 running on port ${apiPort}.`);