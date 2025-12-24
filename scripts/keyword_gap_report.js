#!/usr/bin/env node
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('keyword_check_results.json'));
const keywords = JSON.parse(fs.readFileSync(__dirname + '/keywords_americas.json'));

const csvLines = ['url,title,meta_len,canonical,keyword,in_title,in_meta,in_body,count_in_body'];
const perPageMissing = {};

for (const rec of data) {
  for (const kw of keywords) {
    const p = (rec.presence && rec.presence[kw]) || {in_title:false,in_meta:false,in_body:false,count_in_body:0};
    csvLines.push([rec.url, '"'+(rec.title||'')+'"', rec.meta_len||0, rec.canonical||'', '"'+kw+'"', p.in_title, p.in_meta, p.in_body, p.count_in_body].join(','));

    // Track missing important keywords per target pages
    const urlPath = (rec.url||'').replace(/^https?:\/\/[^/]+/,'');
    perPageMissing[urlPath] = perPageMissing[urlPath] || [];
    if(!p.in_title && !p.in_meta && !p.in_body) perPageMissing[urlPath].push(kw);
  }
}

fs.writeFileSync('keyword_page_matrix.csv', csvLines.join('\n'));
console.log('Wrote keyword_page_matrix.csv');

// Summarize for service pages
const targets = [
  '/services',
  '/services/custom-development',
  '/services/dedicated-teams',
  '/services/outsourcing',
  '/services/discovery',
  '/services/support'
];

let md = '# Keyword Gap Summary\n\n';
for (const t of targets) {
  const missing = perPageMissing[t] || [];
  md += `## ${t}\n`;
  if (missing.length === 0) md += '- No missing keywords detected (for current keyword list)\n\n';
  else {
    md += `- Missing ${missing.length} keywords: ${missing.slice(0,20).join(', ')}\n\n`;
    md += '### Recommendations\n';
    md += '- Add target keywords to **title** and **meta description** if relevant.\n';
    md += '- Add a short Hero paragraph mentioning the primary service keywords and location (e.g., "USA, Latin America, nearshore").\n';
    md += '- Add a short FAQ or schema where appropriate referencing the keywords.\n\n';
  }
}

fs.writeFileSync('keyword_gap_summary.md', md);
console.log('Wrote keyword_gap_summary.md');
