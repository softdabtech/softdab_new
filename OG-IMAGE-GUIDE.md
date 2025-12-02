# OG Image Generation Guide

## Quick Method (Manual)

1. **Open the template in Chrome:**
   ```bash
   open frontend/public/og-image-template.html
   ```

2. **Set exact viewport:**
   - Press F12 to open DevTools
   - Press Cmd+Shift+M to toggle device toolbar
   - Set dimensions: 1200 x 630
   - Set DPR (Device Pixel Ratio): 2

3. **Take screenshot:**
   - Press Cmd+Shift+P to open Command Palette
   - Type "screenshot"
   - Select "Capture screenshot"
   - Save as `og-image.jpg` in `frontend/public/`

## Automated Method (using Puppeteer)

Install puppeteer (if not already installed):
```bash
cd frontend
npm install --save-dev puppeteer
```

Generate the image:
```bash
node scripts/generate-og-image.js
```

## Using Online Tools

### Option 1: Meta Tags Generator
https://metatags.io/
- Upload your HTML
- Preview and download

### Option 2: Social Media Preview
https://www.opengraph.xyz/
- Test your URL after deployment
- See how it appears on different platforms

### Option 3: Squoosh (for optimization)
https://squoosh.app/
- Compress the generated image
- Keep quality high (90%)
- Aim for < 300KB file size

## Validation

After generating and deploying, validate with:

1. **Facebook Debugger:**
   https://developers.facebook.com/tools/debug/
   
2. **Twitter Card Validator:**
   https://cards-dev.twitter.com/validator
   
3. **LinkedIn Post Inspector:**
   https://www.linkedin.com/post-inspector/

## Requirements Checklist

- ✅ Size: 1200 x 630 pixels
- ✅ Format: JPG
- ✅ File size: < 1MB (recommended < 300KB)
- ✅ Aspect ratio: 1.91:1
- ✅ Clear, readable text
- ✅ Brand colors and logo
- ✅ High contrast
- ✅ Safe margins (avoid text at edges)

## Current Template Features

- ✅ Matches hero section design
- ✅ Gradient background from site
- ✅ Company branding
- ✅ Key value propositions
- ✅ Clean, modern aesthetic
- ✅ Mobile-friendly preview
