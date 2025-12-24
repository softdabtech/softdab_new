#!/usr/bin/env node
const fs=require('fs');
const data=JSON.parse(fs.readFileSync('keyword_check_results_local.json'));
const targets=[
  {url:'/services',kw:'software development'},
  {url:'/services/custom-development',kw:'custom software'},
  {url:'/services/dedicated-teams',kw:'dedicated teams'},
  {url:'/services/outsourcing',kw:'outsourcing'},
  {url:'/services/discovery',kw:'discovery'},
  {url:'/services/support',kw:'support'}
];
for(const t of targets){
  const rec=data.find(x=>x.url.endsWith(t.url));
  if(!rec){console.log(`${t.url} - not found`); continue;}
  const p = rec.presence[t.kw] || {in_title:false,in_meta:false,in_body:false};
  console.log(`${t.url} -> title: ${p.in_title}, meta: ${p.in_meta}, body_count: ${p.count_in_body}`);
}

// Also list case-studies that have low keyword coverage
console.log('\nCase study pages (missing technology keywords in title/meta):');
const cs = data.filter(x=> x.url.includes('/case-studies/') && !x.url.endsWith('/case-studies'));
for(const item of cs){
  const techs = Object.keys(item.presence).filter(k=> k.match(/^(React|Node|Python|C\+\+|JavaScript|IoT|C#)$/i));
  const presentInTitle = techs.filter(k=> item.presence[k] && item.presence[k].in_title);
  const presentInMeta = techs.filter(k=> item.presence[k] && item.presence[k].in_meta);
  if(presentInTitle.length===0 && presentInMeta.length===0){
    console.log(`- ${item.url} (no tech keywords in title/meta)`);
  }
}
