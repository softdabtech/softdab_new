const { chromium } = require('playwright');
const base = process.env.BASE_URL || 'http://localhost:4173';
const paths = process.argv.slice(2).length ? process.argv.slice(2) : ['/', '/case-studies', '/case-studies/skycodec', '/case-studies/dab', '/services'];

(async ()=>{
  const browser = await chromium.launch();
  const page = await browser.newPage();
  for (const p of paths) {
    const url = base.replace(/\/$/, '') + p;
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
      const canonical = await page.$eval('link[rel="canonical"]', el => el.href).catch(()=>null);
      console.log(url, '->', canonical || '<none>');
    } catch (e) {
      console.log(url, '-> ERROR:', e.message);
    }
  }
  await browser.close();
})();