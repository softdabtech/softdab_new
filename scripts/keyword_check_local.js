#!/usr/bin/env node
const fs = require('fs');
let fetchFn = globalThis.fetch;
if (!fetchFn) fetchFn = (...args) => import('node-fetch').then(m => m.default(...args));
(async function(){
  const sitemapUrl = 'https://www.softdab.tech/sitemap.xml';
  const localHost = process.argv[2] || 'http://localhost:4173';
  console.log('Fetching sitemap:', sitemapUrl);
  const res = await fetchFn(sitemapUrl);
  if (!res.ok) throw new Error('Failed to fetch sitemap: ' + res.status);
  const xml = await res.text();
  const urls = Array.from(xml.matchAll(/<loc>(.*?)<\/loc>/g)).map(m => m[1]);
  console.log('Found', urls.length, 'URLs');

  const localUrls = urls.map(u => u.replace(/^https?:\/\/www\.softdab\.tech/,'').replace(/\/$/,'')).map(p => (p === ''? localHost : localHost + p));

  console.log('Local URLs to check:', localUrls.length);

  // Load keywords from file if present (allows region-specific lists) or use defaults
  let keywords;
  try {
    const kwPath = __dirname + '/keywords_americas.json';
    if (require('fs').existsSync(kwPath)) {
      keywords = JSON.parse(require('fs').readFileSync(kwPath,'utf8'));
      console.log('Loaded', keywords.length, 'keywords from', kwPath);
    } else {
      keywords = [
        'SoftDAB','software development','outsourcing','outstaffing','dedicated teams','web development','mobile development',
        'React','Node.js','Python','C#','C++','JavaScript','IoT','US','EU','custom software','software development studio','IoT solutions','software engineering'
      ];
    }
  } catch (e) {
    console.error('Error loading keywords file, using defaults', e.message);
    keywords = [
      'SoftDAB','software development','outsourcing','outstaffing','dedicated teams','web development','mobile development',
      'React','Node.js','Python','C#','C++','JavaScript','IoT','US','EU','custom software','software development studio','IoT solutions','software engineering'
    ];
  }

  const { chromium } = require('playwright');
  const browser = await chromium.launch();
  const results = [];

  for (const url of localUrls) {
    try {
      const page = await browser.newPage();
      await page.goto(url, { waitUntil: 'load', timeout: 30000 });
      // allow client-side React to hydrate and update head tags
      await page.waitForTimeout(300);
      const title = await page.title();
      const meta = await page.$$eval('meta[name="description"]', els => {
        if (!els || els.length === 0) return '';
        return els[els.length-1].getAttribute('content') || '';
      }).catch(()=>'');
      const bodyText = await page.$eval('body', el => el.innerText).catch(()=>'');

      const presence = {};
      for (const kw of keywords) {
        const re = new RegExp(kw.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'), 'i');
        presence[kw] = {
          in_title: re.test(title),
          in_meta: re.test(meta),
          in_body: re.test(bodyText),
          count_in_body: (bodyText.match(new RegExp(kw.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'), 'ig'))||[]).length
        };
      }

      const canonical = await page.$eval('link[rel="canonical"]', el=>el.href).catch(()=>'');
      results.push({url, title, meta_len: (meta||'').length, canonical, presence});
      await page.close();
      console.log('Checked', url);
    } catch (e) {
      console.error('Error checking', url, e.message);
      results.push({url, error: String(e)});
    }
  }

  await browser.close();
  const out = 'keyword_check_results_local.json';
  fs.writeFileSync(out, JSON.stringify(results, null, 2));
  console.log('Saved results to', out);
})();