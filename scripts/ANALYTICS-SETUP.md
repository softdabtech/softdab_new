Analytics setup (GA4 + BigQuery + Server-side Tagging)

Overview
--------
This document explains recommended steps to configure Google Analytics 4 for advanced, privacy-first analytics covering USA & EU and how to wire it into this repo.

Goals
-----
- Highest fidelity event collection (page_view, engagement, conversions)
- Privacy-first: Consent Mode support (do not collect before consent in EU), IP anonymization by default
- Export raw events to BigQuery for ad-hoc analysis and modeling
- Optional server-side tagging (GTM Server) to improve data quality and privacy

Quick checklist
---------------
1. Create GA4 property and get Measurement ID (G-XXXXXXXX)
2. Enable BigQuery export (daily or streaming) in GA4 > Admin > BigQuery Links
3. Set environment variable in hosting (NETLIFY/Vercel) or in runtime to expose the measurement ID as `REACT_APP_GA_MEASUREMENT_ID` or set window.__GA_MANAGER.id in server-rendered head
4. Configure consent mode and ensure cookie banner triggers `softdab:analytics-consent-granted` and `softdab:analytics-consent-revoked`
5. Review `frontend/src/lib/analytics.js` and `frontend/src/lib/analytics-client.js` for event naming conventions

Event naming & recommended params
---------------------------------
- page_view: { page_location, page_path, page_title }
- generate_lead: { value?, currency?, method? }
- sign_up: { method? }
- contact_submit: { form_name?, success: true }
- purchase: { transaction_id, value, currency }

Server-side tagging (recommended for advanced privacy & reliability)
----------------------------------------------------------------------
- Deploy GTM Server container (Cloud Run, Google Cloud Run or Cloud Functions) or a lightweight collector that forwards to GA4 measurement protocol.
- Update analytics client to send to server endpoint (e.g., https://analytics.example.com/collect) for sensitive events.
- Benefits: hides client IDs from third-parties, supports server-side cookie setting, and easier integration with BigQuery / Cloud Tools.

Debugging & QA
--------------
- Use GA4 DebugView (enable `gtag('set',{'debug_mode':true})` locally) or use browser extension Tag Assistant.
- Verify that GA is not loaded before consent in EU (use Network tab to check requests to google-analytics.com/g/collect)
- Check BigQuery export for incoming events after link is configured

Notes for reviewers & infra
--------------------------
- The repo contains a consent-aware loader at `frontend/src/lib/analytics.js` and a thin API in `frontend/src/lib/analytics-client.js` to standardize event calls.
- Run `npm run generate-sitemap` and tests locally as part of QA.
- For GA4 BigQuery setup, ensure billing and permissions for the project are configured.
