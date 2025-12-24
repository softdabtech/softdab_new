(async function(){
  const url = process.argv[2] || 'http://localhost:4173/';
  const { chromium } = require('playwright');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'load' });
  await page.waitForTimeout(3000);
  const html = await page.content();
  console.log(html.slice(0,400));
  await browser.close();
})();