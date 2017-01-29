const http = require('http');

const apiPort = 3001;
const status = '{"status":"success"}';

http.createServer((request, response) => {
   response.writeHead(200, { 'Content-Type': 'text/json' });
   response.end(status);
}).listen(apiPort);

console.log(`API 1 running on port ${apiPort}.`);
