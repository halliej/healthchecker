const http = require('http');

const apiPort = 3002;
const status = '{"status":"success"}';

http.createServer((request, response) => {
   response.writeHead(200, { 'Content-Type': 'text/json' });
   response.end(status);
}).listen(apiPort);

console.log(`API 2 running on port ${apiPort}.`);
