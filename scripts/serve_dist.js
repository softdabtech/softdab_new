#!/usr/bin/env node
const http = require('http');
const fs = require('fs');
const path = require('path');
const port = process.argv[2] || 4173;
const root = path.join(__dirname, '..', 'frontend', 'dist');

const mime = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2'
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/index.html';
  const filePath = path.join(root, decodeURIComponent(reqPath));

  fs.stat(filePath, (err, stat) => {
    if (!err && stat.isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, { 'Content-Type': mime[ext] || 'application/octet-stream' });
      fs.createReadStream(filePath).pipe(res);
    } else {
      // Fallback to index.html for SPA
      const indexPath = path.join(root, 'index.html');
      fs.readFile(indexPath, (e, data) => {
        if (e) {
          res.writeHead(500);
          res.end('Index not found');
          return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      });
    }
  });
});

server.listen(port, () => {
  console.log(`Serving dist at http://localhost:${port}`);
});

process.on('SIGINT', () => { server.close(() => process.exit(0)); });