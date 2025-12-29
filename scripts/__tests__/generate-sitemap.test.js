const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

describe('generate-sitemap.js', () => {
  const OUT = path.resolve(__dirname, '../..', 'frontend/public/sitemap.generated.xml');
  afterEach(() => {
    try { if (fs.existsSync(OUT)) fs.unlinkSync(OUT); } catch(e){}
  });

  test('generates localized sitemap file', () => {
    execSync('node scripts/generate-sitemap.js', { stdio: 'inherit' });
    expect(fs.existsSync(OUT)).toBe(true);
    const content = fs.readFileSync(OUT, 'utf8');
    expect(content.includes('xhtml:link')).toBe(true);
    expect(content.includes('hreflang="en-US"')).toBe(true);
    expect(content.includes('hreflang="de-DE"')).toBe(true);
  });
});
