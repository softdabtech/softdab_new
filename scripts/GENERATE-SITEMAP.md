generate-sitemap.js — Usage

This script generates a localized `sitemap.generated.xml` in `frontend/public/` based on the current `frontend/public/sitemap.xml`.

Usage:

  node scripts/generate-sitemap.js

Notes:
- The script writes to `frontend/public/sitemap.generated.xml` and does NOT overwrite `sitemap.xml`.
- Review `sitemap.generated.xml` before replacing your production `sitemap.xml`. This avoids accidental changes to production sitemap.
- The script currently supports locales: en-US, en-GB, de-DE, fr-FR, es-ES. Update `LOCALES` in the script if you want to add/remove locales.
- Run from project root.
