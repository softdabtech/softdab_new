<!-- PR template: SEO quick-wins checklist -->
## Summary
- Adds localized hreflang links and analytics consent-aware loader
- Adds sitemap generator and SEO checks
- Adds analytics client and E2E head checks

## Reviewer checklist
- [ ] Confirm `SEOHead` renders expected hreflang links (en-US, en-GB, de-DE, fr-FR, es-ES, x-default)
- [ ] Confirm GA is loaded only after cookie consent (use Network tab and `window.__softdab_analytics`)
- [ ] Run `node scripts/generate-sitemap.js` and review `frontend/public/sitemap.generated.xml`
- [ ] Run unit tests: `cd frontend && npm run test:ci`
- [ ] Run E2E head checks: `node scripts/e2e_head_check.js http://localhost:4173`

Notes: GA will not collect analytics until consent is granted. `sitemap.generated.xml` is generated to allow review before overwriting production sitemap.xml.
