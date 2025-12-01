#!/usr/bin/env python3
"""
Simple script to generate OG image using Selenium WebDriver
Requires: selenium, pillow
Install: pip install selenium pillow
"""

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from PIL import Image
import time
import os

def generate_og_image():
    print("🚀 Starting OG image generation...")
    
    script_dir = os.path.dirname(os.path.abspath(__file__))
    template_path = os.path.join(script_dir, '../public/og-image-preloader.html')
    output_path = os.path.join(script_dir, '../public/og-image.jpg')
    
    if not os.path.exists(template_path):
        print(f"❌ Template file not found: {template_path}")
        return
    
    # Setup Chrome options
    chrome_options = Options()
    chrome_options.add_argument('--headless')
    chrome_options.add_argument('--disable-gpu')
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('--window-size=1200,630')
    
    try:
        # Initialize driver
        driver = webdriver.Chrome(options=chrome_options)
        
        # Load the template
        template_url = f'file://{os.path.abspath(template_path)}'
        driver.get(template_url)
        
        # Wait for rendering
        time.sleep(2)
        
        # Take screenshot
        driver.save_screenshot(output_path.replace('.jpg', '.png'))
        
        # Convert PNG to JPG for better compression
        if os.path.exists(output_path.replace('.jpg', '.png')):
            img = Image.open(output_path.replace('.jpg', '.png'))
            rgb_img = img.convert('RGB')
            rgb_img.save(output_path, 'JPEG', quality=90)
            os.remove(output_path.replace('.jpg', '.png'))
            
            print("✅ OG image generated successfully!")
            print(f"📍 Location: {output_path}")
            
            # Show file size
            file_size = os.path.getsize(output_path) / 1024
            print(f"📦 File size: {file_size:.2f} KB")
        
        driver.quit()
        
    except Exception as e:
        print(f"❌ Error: {e}")
        print("\n💡 Alternative: Use Chrome DevTools to capture screenshot manually:")
        print("   1. Open og-image-preloader.html in Chrome")
        print("   2. Press F12 → Cmd+Shift+M")
        print("   3. Set size to 1200x630")
        print("   4. Press Cmd+Shift+P → 'Capture screenshot'")

if __name__ == '__main__':
    generate_og_image()
