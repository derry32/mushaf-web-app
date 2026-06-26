/**
 * Script untuk mengunduh file SVG Mushaf dari repositori GitHub publik (batoulapps/quran-svg)
 * dan mengunggahnya langsung ke Supabase Storage bucket `mushaf-pages`.
 * 
 * Jalankan dengan: npx tsx scripts/upload-svgs.ts
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load env vars
dotenv.config({ path: resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Halaman-halaman yang kita butuhkan untuk Surat Pilihan & Juz Amma
const pagesToFetch = [
  // Al-Kahfi
  293, 294, 295, 296, 297, 298, 299, 300, 301, 302, 303, 304,
  // Ya Sin
  440, 441, 442, 443, 444, 445,
  // Al-Waqi'ah
  534, 535, 536, 537,
  // Al-Mulk
  562, 563, 564,
  // Juz Amma
  582, 583, 584, 585, 586, 587, 588, 589, 590, 591, 592, 593, 594, 595,
  596, 597, 598, 599, 600, 601, 602, 603, 604
];

async function uploadSVGs() {
  console.log('🚀 Memulai proses download dan upload SVG...\n');
  console.log(`Banyaknya halaman yang akan diproses: ${pagesToFetch.length} halaman\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const pageNum of pagesToFetch) {
    const pageString = pageNum.toString().padStart(3, '0');
    const githubUrl = `https://raw.githubusercontent.com/batoulapps/quran-svg/main/svg/${pageString}.svg`;
    const targetPath = `svg/page-${pageNum}.svg`;

    try {
      // 1. Download dari GitHub
      process.stdout.write(`Sedang memproses Halaman ${pageNum}... `);
      const response = await fetch(githubUrl);
      
      if (!response.ok) {
        throw new Error(`Gagal download dari GitHub: ${response.statusText}`);
      }
      
      const svgText = await response.text();

      // 2. Upload ke Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('mushaf-pages')
        .upload(targetPath, svgText, {
          contentType: 'image/svg+xml',
          upsert: true,
        });

      if (uploadError) {
        throw new Error(`Gagal upload ke Supabase: ${uploadError.message}`);
      }

      console.log('✅ Sukses');
      successCount++;
    } catch (error: any) {
      console.log(`❌ Error: ${error.message}`);
      errorCount++;
    }
    
    // Beri jeda 300ms agar tidak terkena rate limit GitHub API
    await new Promise(r => setTimeout(r, 300));
  }

  console.log('\n🎉 Proses Selesai!');
  console.log(`✅ Berhasil: ${successCount}`);
  console.log(`❌ Gagal: ${errorCount}`);
  
  if (errorCount > 0) {
    console.log('\n💡 Pastikan Anda sudah membuat Storage Bucket bernama "mushaf-pages" dan mengaturnya ke Public.');
  }
}

uploadSVGs().catch(console.error);
