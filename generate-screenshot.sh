#!/bin/bash

# Generate og-image.jpg from preloader-screenshot.html using Chrome headless

echo "🎨 Generating og-image.jpg from preloader..."

INPUT="/Users/oleksii/Documents/SOFTDAB/Website new/Git/softdab_new/frontend/public/preloader-screenshot.html"
OUTPUT="/Users/oleksii/Documents/SOFTDAB/Website new/Git/softdab_new/frontend/public/og-image.jpg"

# Check if Chrome is installed
if [ -f "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" ]; then
    CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
elif command -v google-chrome &> /dev/null; then
    CHROME="google-chrome"
else
    echo "❌ Chrome not found. Please install Google Chrome."
    exit 1
fi

# Generate screenshot
"$CHROME" --headless --disable-gpu --screenshot="$OUTPUT" \
    --window-size=1200,630 \
    --default-background-color=0 \
    --hide-scrollbars \
    "file://$INPUT" 2>/dev/null

if [ -f "$OUTPUT" ]; then
    # Convert PNG to JPG if needed
    if command -v sips &> /dev/null; then
        # Check if it's PNG and convert to JPG
        FILE_TYPE=$(file "$OUTPUT" | grep -o "PNG\|JPEG")
        if [ "$FILE_TYPE" = "PNG" ]; then
            sips -s format jpeg -s formatOptions 90 "$OUTPUT" --out "$OUTPUT" >/dev/null 2>&1
        fi
    fi
    
    echo "✅ og-image.jpg created successfully!"
    
    SIZE=$(ls -lh "$OUTPUT" | awk '{print $5}')
    echo "📦 File size: $SIZE"
    
    if command -v sips &> /dev/null; then
        DIMENSIONS=$(sips -g pixelWidth -g pixelHeight "$OUTPUT" 2>/dev/null | grep -E 'pixel' | awk '{print $2}' | tr '\n' 'x' | sed 's/x$//')
        echo "📏 Dimensions: $DIMENSIONS pixels"
    fi
else
    echo "❌ Failed to generate screenshot"
    exit 1
fi
