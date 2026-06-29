/**
 * Script untuk generate ikon PWA dari satu gambar sumber ke berbagai ukuran.
 * Jalankan: npx tsx scripts/generate-icons.ts
 */

import sharp from 'sharp';
import { mkdirSync, existsSync } from 'fs';
import { resolve } from 'path';

const SOURCE_IMAGE = '/Users/badrinteractive/.gemini/antigravity-ide/brain/9ed4e706-7c71-4e41-b7af-f3045a8c9af8/mushaf_app_icon_1782703609231.png';
const OUTPUT_DIR = resolve(__dirname, '../public/icons');

const SIZES = [72, 96, 128, 144, 152, 192, 384, 512];

async function generateIcons() {
  // Create output directory
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  console.log('🎨 Generating PWA icons...\n');

  for (const size of SIZES) {
    const outputPath = resolve(OUTPUT_DIR, `icon-${size}x${size}.png`);
    await sharp(SOURCE_IMAGE)
      .resize(size, size, { fit: 'cover' })
      .png()
      .toFile(outputPath);
    console.log(`  ✅ icon-${size}x${size}.png`);
  }

  // Maskable icons (with padding for safe zone)
  for (const size of [192, 512]) {
    const outputPath = resolve(OUTPUT_DIR, `icon-maskable-${size}x${size}.png`);
    // Maskable icons need ~10% padding on each side (80% of canvas for the icon)
    const iconSize = Math.round(size * 0.8);
    const padding = Math.round((size - iconSize) / 2);
    
    await sharp(SOURCE_IMAGE)
      .resize(iconSize, iconSize, { fit: 'cover' })
      .extend({
        top: padding,
        bottom: padding,
        left: padding,
        right: padding,
        background: { r: 27, g: 67, b: 50, alpha: 1 } // #1B4332
      })
      .png()
      .toFile(outputPath);
    console.log(`  ✅ icon-maskable-${size}x${size}.png`);
  }

  // Favicon
  const faviconPath = resolve(__dirname, '../public/favicon.ico');
  await sharp(SOURCE_IMAGE)
    .resize(32, 32, { fit: 'cover' })
    .png()
    .toFile(faviconPath.replace('.ico', '.png'));
  console.log(`  ✅ favicon.png`);

  console.log('\n🎉 All icons generated!');
}

generateIcons().catch(console.error);
