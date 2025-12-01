#!/bin/bash

echo "📸 Створення OG Image для SoftDAB"
echo "=================================="
echo ""
echo "✅ Файл preloader-screenshot.html відкрито у браузері"
echo ""
echo "📝 ПОКРОКОВА ІНСТРУКЦІЯ:"
echo ""
echo "1️⃣  У відкритому вікні браузера натисніть:"
echo "    • macOS: Cmd+Option+I (або F12)"
echo "    • Windows: F12"
echo ""
echo "2️⃣  Увімкніть Device Mode:"
echo "    • macOS: Cmd+Shift+M"
echo "    • Windows: Ctrl+Shift+M"
echo ""
echo "3️⃣  Встановіть розмір:"
echo "    • Width: 1200"
echo "    • Height: 630"
echo "    • DPR (zoom): 1"
echo ""
echo "4️⃣  Відкрийте Command Palette:"
echo "    • macOS: Cmd+Shift+P"
echo "    • Windows: Ctrl+Shift+P"
echo ""
echo "5️⃣  Введіть: screenshot"
echo "    Виберіть: 'Capture screenshot'"
echo ""
echo "6️⃣  Збережіть файл як:"
echo "    og-image.jpg"
echo "    у папку: frontend/public/"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🎯 Результат повинен бути:"
echo "   frontend/public/og-image.jpg"
echo "   Розмір: 1200 x 630 пікселів"
echo "   Формат: JPEG"
echo ""
echo "🔍 Після створення перевірте:"

# Check if file exists
TARGET_FILE="/Users/oleksii/Documents/SOFTDAB/Website new/Git/softdab_new/frontend/public/og-image.jpg"

if [ -f "$TARGET_FILE" ]; then
    echo "   ✅ og-image.jpg створено!"
    SIZE=$(ls -lh "$TARGET_FILE" | awk '{print $5}')
    echo "   📦 Розмір файлу: $SIZE"
    
    # Get image dimensions using sips (macOS)
    if command -v sips &> /dev/null; then
        DIMENSIONS=$(sips -g pixelWidth -g pixelHeight "$TARGET_FILE" 2>/dev/null | grep -E 'pixel' | awk '{print $2}' | tr '\n' 'x' | sed 's/x$//')
        echo "   📏 Розміри: $DIMENSIONS пікселів"
    fi
else
    echo "   ⏳ Очікую створення файлу..."
fi

echo ""
echo "🚀 Після створення запустіть:"
echo "   npm run build"
echo "   або продовжіть з деплоєм"
