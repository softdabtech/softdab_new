(async function(){
  const { chromium } = require('playwright');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:4173/services/custom-development', { waitUntil: 'load' });
  await page.waitForTimeout(400);
  const metas = await page.$$eval('meta[name="description"]', els => els.map(e => e.getAttribute('content')));
  console.log('metas:', metas);
  await browser.close();
})();