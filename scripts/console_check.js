(async function(){
  const url = process.argv[2] || 'http://localhost:4173/services/outsourcing';
  const { chromium } = require('playwright');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.type(), msg.text()));
  page.on('pageerror', err => { console.log('PAGE ERROR:', err.message); console.log(err.stack); });
  await page.goto(url, { waitUntil: 'load' });
  await page.waitForTimeout(2000);
  await browser.close();
})();