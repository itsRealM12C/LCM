const http = require('http');
const { exec } = require('child_process');

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/launch') {
    exec('./run.sh', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        res.writeHead(500);
        res.end(`Error: ${error.message}`);
        return;
      }
      res.writeHead(200);
      res.end('run.sh executed successfully');
    });
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
