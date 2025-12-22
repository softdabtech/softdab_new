#!/usr/bin/env node
const fetch = require('node-fetch');
const { JSDOM } = require('jsdom');
const fs = require('fs');

(async function(){
  const sitemapUrl = 'https://www.softdab.tech/sitemap.xml';
  console.log('Fetching sitemap:', sitemapUrl);
  const res = await fetch(sitemapUrl);
  if (!res.ok) throw new Error('Failed to fetch sitemap: ' + res.status);
  const xml = await res.text();
  const urls = Array.from(xml.matchAll(/<loc>(.*?)<\/loc>/g)).map(m => m[1]);
  console.log('Found', urls.length, 'URLs');

  const results = [];
  let hasPlaywright = false;
  try {
    require.resolve('playwright');
    hasPlaywright = true;
  } catch (e) {}

  if (hasPlaywright) console.log('Playwright available: rendering pages for full JS evaluation');
  else console.log('Playwright not installed: running static fetch (no JS rendering). Install playwright for full checks.');

  for (const url of urls) {
    try {
      if (hasPlaywright) {
        const { chromium } = require('playwright');
        const browser = await chromium.launch();
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
        const html = await page.content();
        await browser.close();
        const dom = new JSDOM(html);
        const doc = dom.window.document;
        const title = doc.querySelector('title') ? doc.querySelector('title').textContent.trim() : '';
        const meta = doc.querySelector('meta[name="description"]') ? doc.querySelector('meta[name="description"]').getAttribute('content') : '';
        const canonical = doc.querySelector('link[rel="canonical"]') ? doc.querySelector('link[rel="canonical"]').href : '';
        const jsonld = doc.querySelectorAll('script[type="application/ld+json"]').length;
        results.push({url, title, meta_len: meta.length, canonical, jsonld});
      } else {
        const r = await fetch(url);
        const html = await r.text();
        const dom = new JSDOM(html);
        const doc = dom.window.document;
        const title = doc.querySelector('title') ? doc.querySelector('title').textContent.trim() : '';
        const meta = doc.querySelector('meta[name="description"]') ? doc.querySelector('meta[name="description"]').getAttribute('content') : '';
        const canonical = doc.querySelector('link[rel="canonical"]') ? doc.querySelector('link[rel="canonical"]').getAttribute('href') : '';
        const jsonld = doc.querySelectorAll('script[type="application/ld+json"]').length;
        results.push({url, title, meta_len: meta.length, canonical, jsonld});
      }
    } catch (e) {
      results.push({url, error: String(e)});
    }
  }

  const out = 'seo_check_results.json';
  fs.writeFileSync(out, JSON.stringify(results, null, 2));
  console.log('Saved results to', out);
})();
