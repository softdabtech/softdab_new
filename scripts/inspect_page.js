(async function(){
  const url = process.argv[2] || 'http://localhost:4173/';
  const { chromium } = require('playwright');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'load' });
  await page.waitForTimeout(400);
  const metas = await page.$$eval('meta[name="description"]', els => els.map(e => e.getAttribute('content')));
  const title = await page.title();
  const canonical = await page.$eval('link[rel="canonical"]', el => el.href).catch(()=>null);
  console.log('url:', url);
  console.log('title:', title);
  console.log('metas:', metas);
  console.log('canonical:', canonical);
  await browser.close();
})();