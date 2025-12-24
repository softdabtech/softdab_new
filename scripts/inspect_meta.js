(async function(){
  const { chromium } = require('playwright');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:4173/services/custom-development', { waitUntil: 'load' });
  await page.waitForTimeout(300);
  const meta = await page.$eval('meta[name="description"]', el => el.getAttribute('content')).catch(()=>null);
  console.log('meta:', meta);
  const title = await page.title();
  console.log('title:', title);
  const canonical = await page.$eval('link[rel="canonical"]', el => el.href).catch(()=>null);
  console.log('canonical:', canonical);
  await browser.close();
})();