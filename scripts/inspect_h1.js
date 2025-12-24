(async function(){
  const url = process.argv[2] || 'http://localhost:4173/';
  const { chromium } = require('playwright');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'load' });
  await page.waitForTimeout(1500);
  const h1 = await page.$eval('h1', el => el.innerText).catch(()=>null);
  console.log('url:', url);
  console.log('h1:', h1);
  await browser.close();
})();