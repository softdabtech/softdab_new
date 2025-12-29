#!/usr/bin/env node
// generate-sitemap.js
// Safe sitemap generator that produces a localized sitemap with hreflang links
// Writes to frontend/public/sitemap.generated.xml (does NOT overwrite existing sitemap.xml)

const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.resolve(__dirname, '../frontend/public');
const SRC_SITEMAP = path.join(PUBLIC_DIR, 'sitemap.xml');
const OUT_SITEMAP = path.join(PUBLIC_DIR, 'sitemap.generated.xml');

const LOCALES = [
  { code: 'en-US', prefix: '' },
  { code: 'en-GB', prefix: '' },
  { code: 'de-DE', prefix: '/de' },
  { code: 'fr-FR', prefix: '/fr' },
  { code: 'es-ES', prefix: '/es' }
];

function loadBaseUrls() {
  if (!fs.existsSync(SRC_SITEMAP)) throw new Error('Source sitemap not found: ' + SRC_SITEMAP);
  const xml = fs.readFileSync(SRC_SITEMAP, 'utf8');
  return Array.from(xml.matchAll(/<loc>(.*?)<\/loc>/g)).map(m => m[1]);
}

function makeLocalizedLoc(baseUrl, prefix) {
  const origin = new URL(baseUrl).origin;
  const rel = new URL(baseUrl).pathname.replace(/^(\/)/, ''); // remove leading slash
  if (!prefix) return origin + (rel === '' ? '/' : '/' + rel.replace(/\/$/, ''));
  // ensure prefix and rel are combined properly
  if (rel === '' || rel === '/') return origin + prefix + '/';
  return origin + prefix + '/' + rel.replace(/^\//, '').replace(/\/$/, '');
}

function build() {
  const bases = loadBaseUrls();
  const header = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';
  const footer = '</urlset>\n';
  const parts = [header];

  for (const base of bases) {
    parts.push('  <url>\n');
    // For each locale, build a loc entry (we'll use first locale as main loc)
    const mainLoc = makeLocalizedLoc(base, LOCALES[0].prefix);
    parts.push(`    <loc>${mainLoc}</loc>\n`);

    // xhtml:link alternatives
    for (const loc of LOCALES) {
      const href = makeLocalizedLoc(base, loc.prefix);
      parts.push(`    <xhtml:link rel="alternate" hreflang="${loc.code}" href="${href}" />\n`);
    }
    // x-default
    parts.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${makeLocalizedLoc(base, '')}" />\n`);

    parts.push('  </url>\n');
  }

  parts.push(footer);
  fs.writeFileSync(OUT_SITEMAP, parts.join(''), 'utf8');
  console.log('Generated localized sitemap at', OUT_SITEMAP);
}

try { build(); } catch (e) { console.error('Error generating sitemap:', e.message); process.exit(1); }
