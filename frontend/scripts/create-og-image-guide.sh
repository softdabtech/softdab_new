#!/bin/bash

echo "🎨 OG Image Generator for SoftDAB"
echo "=================================="
echo ""
echo "📝 Instructions to create og-image.jpg:"
echo ""
echo "METHOD 1: Chrome DevTools (Recommended)"
echo "----------------------------------------"
echo "1. Open og-image-preloader.html (already opened in browser)"
echo "2. Press F12 or Cmd+Option+I to open DevTools"
echo "3. Press Cmd+Shift+M to toggle device toolbar"
echo "4. Set dimensions to: 1200 x 630"
echo "5. Set DPR (zoom) to: 1"
echo "6. Press Cmd+Shift+P to open Command Palette"
echo "7. Type 'screenshot' and select 'Capture screenshot'"
echo "8. Save as 'og-image.jpg' in frontend/public/ folder"
echo ""
echo "METHOD 2: Using Puppeteer (Automated)"
echo "--------------------------------------"
echo "Run: npm install puppeteer --save-dev"
echo "Then: node scripts/generate-og-image.js"
echo ""
echo "METHOD 3: Online Tool"
echo "---------------------"
echo "1. Open: https://www.screenshotmachine.com/"
echo "2. Or use: https://metatags.io/"
echo ""
echo "✅ Once created, the file should be at:"
echo "   frontend/public/og-image.jpg"
echo ""
echo "🔍 Validate with:"
echo "   • Facebook: https://developers.facebook.com/tools/debug/"
echo "   • Twitter: https://cards-dev.twitter.com/validator"
echo ""

# Check if og-image.jpg exists
if [ -f "frontend/public/og-image.jpg" ]; then
    echo "✅ og-image.jpg already exists!"
    SIZE=$(ls -lh "frontend/public/og-image.jpg" | awk '{print $5}')
    echo "📦 File size: $SIZE"
else
    echo "⚠️  og-image.jpg not found yet"
fi
