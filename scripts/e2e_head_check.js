#!/usr/bin/env node
// Simple E2E head check - fetches a page and validates hreflang and JSON-LD presence
const url = process.argv[2] || 'http://localhost:4173';
(async function(){
  try {
    console.log('Checking:', url);
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch ' + res.status);
    const html = await res.text();

    const checks = [
      { name: 'hreflang en-GB', re: /<link[^>]+hreflang=["']en-GB["'][^>]*>/i },
      { name: 'hreflang de-DE', re: /<link[^>]+hreflang=["']de-DE["'][^>]*>/i },
      { name: 'hreflang fr-FR', re: /<link[^>]+hreflang=["']fr-FR["'][^>]*>/i },
      { name: 'hreflang es-ES', re: /<link[^>]+hreflang=["']es-ES["'][^>]*>/i },
      { name: 'JSON-LD script', re: /<script[^>]+type=["']application\/ld\+json["'][^>]*>/i },
      { name: 'canonical link', re: /<link[^>]+rel=["']canonical["'][^>]*>/i },
      { name: 'og:image', re: /<meta[^>]+property=["']og:image["'][^>]*>/i }
    ];

    const failures = checks.filter(c => !c.re.test(html));
    if (failures.length) {
      console.error('E2E head checks failed:');
      for (const f of failures) console.error(' -', f.name);
      process.exit(2);
    }

    console.log('All head checks passed');
    process.exit(0);
  } catch (e) {
    console.error('Error during E2E head check:', e.message);
    process.exit(1);
  }
})();
