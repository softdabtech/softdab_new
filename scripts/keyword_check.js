#!/usr/bin/env node
const fs = require('fs');
let fetchFn = globalThis.fetch;
if (!fetchFn) fetchFn = (...args) => import('node-fetch').then(m => m.default(...args));
(async function(){
  const sitemapUrl = 'https://www.softdab.tech/sitemap.xml';
  console.log('Fetching sitemap:', sitemapUrl);
  const res = await fetchFn(sitemapUrl);
  if (!res.ok) throw new Error('Failed to fetch sitemap: ' + res.status);
  const xml = await res.text();
  const urls = Array.from(xml.matchAll(/<loc>(.*?)<\/loc>/g)).map(m => m[1]);
  console.log('Found', urls.length, 'URLs');

  // Combined keywords from SEOHead.jsx and index.html (current defaults)
  const keywords = [
    'SoftDAB','software development','outsourcing','outstaffing','dedicated teams','web development','mobile development',
    'React','Node.js','Python','C#','C++','JavaScript','IoT','US','EU','custom software','software development studio','IoT solutions','software engineering'
  ];

  const { chromium } = require('playwright');
  const browser = await chromium.launch();
  const results = [];

  for (const url of urls) {
    try {
      const page = await browser.newPage();
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      const title = await page.title();
      const meta = await page.$eval('meta[name="description"]', el => el.getAttribute('content')).catch(()=>'');
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

      results.push({url, title, meta_len: (meta||'').length, canonical: await page.$eval('link[rel="canonical"]', el=>el.href).catch(()=>''), presence});
      await page.close();
      console.log('Checked', url);
    } catch (e) {
      console.error('Error checking', url, e.message);
      results.push({url, error: String(e)});
    }
  }

  await browser.close();
  const out = 'keyword_check_results.json';
  fs.writeFileSync(out, JSON.stringify(results, null, 2));
  console.log('Saved results to', out);
})();
