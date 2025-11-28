#!/usr/bin/env node
/**
 * Script to generate og-image.jpg from og-image-template.html
 * Usage: node scripts/generate-og-image.js
 * 
 * Requires: puppeteer (npm install puppeteer --save-dev)
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function generateOGImage() {
  console.log('🚀 Starting OG image generation...');

  const templatePath = path.join(__dirname, '../public/og-image-preloader.html');
  const outputPath = path.join(__dirname, '../public/og-image.jpg');

  if (!fs.existsSync(templatePath)) {
    console.error('❌ Template file not found:', templatePath);
    process.exit(1);
  }

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    
    // Set viewport to exact OG image dimensions
    await page.setViewport({
      width: 1200,
      height: 630,
      deviceScaleFactor: 2 // Higher quality
    });

    // Load the template
    const templateUrl = `file://${templatePath}`;
    await page.goto(templateUrl, {
      waitUntil: 'networkidle0'
    });

    // Wait a bit for fonts and styles to fully render
    await page.waitForTimeout(1000);

    // Take screenshot
    await page.screenshot({
      path: outputPath,
      type: 'jpeg',
      quality: 90,
      clip: {
        x: 0,
        y: 0,
        width: 1200,
        height: 630
      }
    });

    console.log('✅ OG image generated successfully!');
    console.log('📍 Location:', outputPath);
    console.log('📏 Size: 1200x630px');
    
    // Show file size
    const stats = fs.statSync(outputPath);
    const fileSizeInKB = (stats.size / 1024).toFixed(2);
    console.log(`📦 File size: ${fileSizeInKB} KB`);

  } catch (error) {
    console.error('❌ Error generating OG image:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

generateOGImage();
