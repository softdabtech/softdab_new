/*
 * prerender.js
 * - Builds the site (expect `npm run build` to be run before or use --build flag)
 * - Starts `vite preview` on port 4173
 * - Reads `public/sitemap.generated.xml` to get URLs (fallback to key routes)
 * - Uses Playwright to visit each route, waits for network idle, and writes rendered HTML
 * - Writes to `dist/<path>/index.html` so static hosts serve per-route HTML with correct head
 */

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const fetch = require('node-fetch');
const { chromium } = require('playwright');

const DIST_DIR = path.resolve(__dirname, '../dist');
const SITEMAP = path.resolve(__dirname, '../public/sitemap.generated.xml');
const PREVIEW_URL = 'http://localhost:4173';
const VITE_PREVIEW_CMD = 'npm';
const VITE_PREVIEW_ARGS = ['run', 'preview'];

function parseSitemap(sitemapXml) {
  const urls = [];
  const locRegex = /<loc>(.*?)<\/loc>/g;
  let m;
  while ((m = locRegex.exec(sitemapXml)) !== null) {
    urls.push(m[1]);
  }
  return urls;
}

const net = require('net');
async function waitForServer(url, timeoutMs = 30000) {
  const { hostname, port } = new URL(url);
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    await new Promise((res) => {
      const socket = net.createConnection({ host: hostname, port: parseInt(port, 10) }, () => {
        socket.end();
        res(true);
      });
      socket.on('error', () => {
        socket.destroy();
        setTimeout(res, 300);
      });
    });
    // try an HTTP request to confirm server responds
    try {
      const res = await fetch(url, { method: 'GET' });
      if (res.ok) return;
    } catch (e) {
      // ignore and retry
    }
  }
  throw new Error(`Server did not become available at ${url}`);
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function writeRendered(html, outPath) {
  ensureDir(path.dirname(outPath));
  fs.writeFileSync(outPath, html, 'utf8');
  console.log('Wrote:', outPath);
}

async function prerender({ buildAlreadyRun = false } = {}) {
  try {
    if (!buildAlreadyRun) {
      console.log('Running `npm run build` (frontend)...');
      await new Promise((resolve, reject) => {
        const p = spawn('npm', ['run', 'build'], { cwd: path.resolve(__dirname, '..'), stdio: 'inherit' });
        p.on('exit', (code) => (code === 0 ? resolve() : reject(new Error('Build failed'))));
      });
    }

    console.log('Starting simple static server from dist...');

    // Start a simple static server serving dist with SPA fallback
    const http = require('http');

    const MIME = {
      '.html': 'text/html',
      '.css': 'text/css',
      '.js': 'application/javascript',
      '.json': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.svg': 'image/svg+xml',
      '.ico': 'image/x-icon',
      '.webp': 'image/webp',
      '.woff2': 'font/woff2',
      '.woff': 'font/woff'
    };

    const server = http.createServer((req, res) => {
      try {
        const reqPath = decodeURIComponent(new URL(req.url, PREVIEW_URL).pathname);
        const filePath = path.join(DIST_DIR, reqPath);
        let target = filePath;
        if (fs.existsSync(target) && fs.statSync(target).isDirectory()) {
          target = path.join(target, 'index.html');
        }
        if (!fs.existsSync(target)) {
          // SPA fallback
          target = path.join(DIST_DIR, 'index.html');
        }
        const ext = path.extname(target).toLowerCase();
        const contentType = MIME[ext] || 'application/octet-stream';
        const content = fs.readFileSync(target);
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Server error');
      }
    }).listen(4173);

    // Server is listening - proceed (if it's not ready, Playwright will retry navigation)
    if (server.listening) {
      console.log('Static server ready at', PREVIEW_URL);
    } else {
      console.log('Static server started, proceeding to prerender (server.listening=false)');
    }

    let urls = [];
    if (fs.existsSync(SITEMAP)) {
      const xml = fs.readFileSync(SITEMAP, 'utf8');
      urls = parseSitemap(xml);
    }

    // Fallback to key routes if sitemap missing
    if (!urls.length) {
      urls = [
        `${PREVIEW_URL}/`,
        `${PREVIEW_URL}/services`,
        `${PREVIEW_URL}/services/custom-development`,
        `${PREVIEW_URL}/case-studies`,
        `${PREVIEW_URL}/company/about`,
        `${PREVIEW_URL}/company/contact`,
        `${PREVIEW_URL}/company/careers`
      ];
    }

    // Normalize to just paths relative to origin
    urls = urls.map((u) => {
      try { return new URL(u).pathname.replace(/\/$/, '') || '/'; } catch (e) { return u; }
    });

    const browser = await chromium.launch();
    const page = await browser.newPage();

    for (const route of urls) {
      const url = `${PREVIEW_URL}${route}`.replace(/\/\/$/, '/');
      console.log('Rendering:', url);
      await page.goto(url, { waitUntil: 'networkidle' });
      // Give React a tick to ensure SEOHead runs any client side canonical fallback
      await page.waitForTimeout(200);
      const html = await page.content();

      const outRel = route === '/' ? '/' : `${route}/`;
      const outPath = path.join(DIST_DIR, outRel, 'index.html');
      writeRendered(html, outPath);
    }

    await browser.close();

    // Optional verification using scripts/e2e_head_check.js
    if (process.argv.includes('--verify')) {
      console.log('Running E2E head checks (--verify)...');
      const urlsToCheck = ['http://localhost:4173/','http://localhost:4173/company/about','http://localhost:4173/case-studies'];
      const { spawnSync } = require('child_process');
      let ok = true;
      for (const u of urlsToCheck) {
        console.log('Verifying', u);
        const r = spawnSync('node', [path.resolve(__dirname, '../../scripts/e2e_head_check.js'), u], { stdio: 'inherit' });
        if (r.status !== 0) ok = false;
      }
      if (!ok) {
        try { server.close(); } catch (e) {}
        console.error('Verification failed. Keep server up for debugging by running prerender.js manually.');
        process.exit(2);
      }
    }

    // Stop static server
    try { server.close(); } catch (e) {}
    console.log('Prerender complete.');
  } catch (err) {
    console.error('Pre-render failed:', err);
    try { server.close(); } catch (e) {}
    process.exit(1);
  }
}

// CLI
const argv = process.argv.slice(2);
const run = async () => {
  const buildAlreadyRun = argv.includes('--build-done');
  await prerender({ buildAlreadyRun });
};
run();
