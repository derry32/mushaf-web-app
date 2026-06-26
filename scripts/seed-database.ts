/**
 * One-time seeding script untuk membuat tabel dan mengisi data ke Supabase.
 * 
 * Jalankan dengan: npx tsx scripts/seed-database.ts
 * 
 * Script ini akan:
 * 1. Membuat tabel `surahs` dan `pages` jika belum ada
 * 2. Mengisi data 4 surat pilihan + 37 surat Juz Amma
 * 3. Mengisi mapping halaman ke URL SVG di Supabase Storage
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load env vars
dotenv.config({ path: resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// ===== SURAH DATA =====
const surahs = [
  // Surat Pilihan
  { id: 18, name_latin: 'Al-Kahfi', name_arabic: 'الكهف', start_page: 293, end_page: 304, juz_number: 15, revelation_type: 'Makkiyah', total_verses: 110 },
  { id: 36, name_latin: 'Ya Sin', name_arabic: 'يس', start_page: 440, end_page: 445, juz_number: 22, revelation_type: 'Makkiyah', total_verses: 83 },
  { id: 56, name_latin: "Al-Waqi'ah", name_arabic: 'الواقعة', start_page: 534, end_page: 537, juz_number: 27, revelation_type: 'Makkiyah', total_verses: 96 },
  { id: 67, name_latin: 'Al-Mulk', name_arabic: 'الملك', start_page: 562, end_page: 564, juz_number: 29, revelation_type: 'Makkiyah', total_verses: 30 },
  // Juz Amma (Juz 30)
  { id: 78, name_latin: "An-Naba'", name_arabic: 'النبأ', start_page: 582, end_page: 583, juz_number: 30, revelation_type: 'Makkiyah', total_verses: 40 },
  { id: 79, name_latin: "An-Nazi'at", name_arabic: 'النازعات', start_page: 583, end_page: 584, juz_number: 30, revelation_type: 'Makkiyah', total_verses: 46 },
  { id: 80, name_latin: "'Abasa", name_arabic: 'عبس', start_page: 585, end_page: 585, juz_number: 30, revelation_type: 'Makkiyah', total_verses: 42 },
  { id: 81, name_latin: 'At-Takwir', name_arabic: 'التكوير', start_page: 586, end_page: 586, juz_number: 30, revelation_type: 'Makkiyah', total_verses: 29 },
  { id: 82, name_latin: 'Al-Infitar', name_arabic: 'الانفطار', start_page: 587, end_page: 587, juz_number: 30, revelation_type: 'Makkiyah', total_verses: 19 },
  { id: 83, name_latin: 'Al-Mutaffifin', name_arabic: 'المطففين', start_page: 587, end_page: 589, juz_number: 30, revelation_type: 'Makkiyah', total_verses: 36 },
  { id: 84, name_latin: 'Al-Insyiqaq', name_arabic: 'الانشقاق', start_page: 589, end_page: 589, juz_number: 30, revelation_type: 'Makkiyah', total_verses: 25 },
  { id: 85, name_latin: 'Al-Buruj', name_arabic: 'البروج', start_page: 590, end_page: 590, juz_number: 30, revelation_type: 'Makkiyah', total_verses: 22 },
  { id: 86, name_latin: 'At-Tariq', name_arabic: 'الطارق', start_page: 591, end_page: 591, juz_number: 30, revelation_type: 'Makkiyah', total_verses: 17 },
  { id: 87, name_latin: "Al-A'la", name_arabic: 'الأعلى', start_page: 591, end_page: 592, juz_number: 30, revelation_type: 'Makkiyah', total_verses: 19 },
  { id: 88, name_latin: 'Al-Ghasyiyah', name_arabic: 'الغاشية', start_page: 592, end_page: 592, juz_number: 30, revelation_type: 'Makkiyah', total_verses: 26 },
  { id: 89, name_latin: 'Al-Fajr', name_arabic: 'الفجر', start_page: 593, end_page: 594, juz_number: 30, revelation_type: 'Makkiyah', total_verses: 30 },
  { id: 90, name_latin: 'Al-Balad', name_arabic: 'البلد', start_page: 594, end_page: 594, juz_number: 30, revelation_type: 'Makkiyah', total_verses: 20 },
  { id: 91, name_latin: 'Asy-Syams', name_arabic: 'الشمس', start_page: 595, end_page: 595, juz_number: 30, revelation_type: 'Makkiyah', total_verses: 15 },
  { id: 92, name_latin: 'Al-Lail', name_arabic: 'الليل', start_page: 595, end_page: 596, juz_number: 30, revelation_type: 'Makkiyah', total_verses: 21 },
  { id: 93, name_latin: 'Ad-Duha', name_arabic: 'الضحى', start_page: 596, end_page: 596, juz_number: 30, revelation_type: 'Makkiyah', total_verses: 11 },
  { id: 94, name_latin: 'Asy-Syarh', name_arabic: 'الشرح', start_page: 596, end_page: 596, juz_number: 30, revelation_type: 'Makkiyah', total_verses: 8 },
  { id: 95, name_latin: 'At-Tin', name_arabic: 'التين', start_page: 597, end_page: 597, juz_number: 30, revelation_type: 'Makkiyah', total_verses: 8 },
  { id: 96, name_latin: "Al-'Alaq", name_arabic: 'العلق', start_page: 597, end_page: 597, juz_number: 30, revelation_type: 'Makkiyah', total_verses: 19 },
  { id: 97, name_latin: 'Al-Qadr', name_arabic: 'القدر', start_page: 598, end_page: 598, juz_number: 30, revelation_type: 'Makkiyah', total_verses: 5 },
  { id: 98, name_latin: 'Al-Bayyinah', name_arabic: 'البينة', start_page: 598, end_page: 599, juz_number: 30, revelation_type: 'Madaniyah', total_verses: 8 },
  { id: 99, name_latin: 'Az-Zalzalah', name_arabic: 'الزلزلة', start_page: 599, end_page: 599, juz_number: 30, revelation_type: 'Madaniyah', total_verses: 8 },
  { id: 100, name_latin: "Al-'Adiyat", name_arabic: 'العاديات', start_page: 599, end_page: 600, juz_number: 30, revelation_type: 'Makkiyah', total_verses: 11 },
  { id: 101, name_latin: "Al-Qari'ah", name_arabic: 'القارعة', start_page: 600, end_page: 600, juz_number: 30, revelation_type: 'Makkiyah', total_verses: 11 },
  { id: 102, name_latin: 'At-Takasur', name_arabic: 'التكاثر', start_page: 600, end_page: 600, juz_number: 30, revelation_type: 'Makkiyah', total_verses: 8 },
  { id: 103, name_latin: "Al-'Asr", name_arabic: 'العصر', start_page: 601, end_page: 601, juz_number: 30, revelation_type: 'Makkiyah', total_verses: 3 },
  { id: 104, name_latin: 'Al-Humazah', name_arabic: 'الهمزة', start_page: 601, end_page: 601, juz_number: 30, revelation_type: 'Makkiyah', total_verses: 9 },
  { id: 105, name_latin: 'Al-Fil', name_arabic: 'الفيل', start_page: 601, end_page: 601, juz_number: 30, revelation_type: 'Makkiyah', total_verses: 5 },
  { id: 106, name_latin: 'Quraisy', name_arabic: 'قريش', start_page: 602, end_page: 602, juz_number: 30, revelation_type: 'Makkiyah', total_verses: 4 },
  { id: 107, name_latin: "Al-Ma'un", name_arabic: 'الماعون', start_page: 602, end_page: 602, juz_number: 30, revelation_type: 'Makkiyah', total_verses: 7 },
  { id: 108, name_latin: 'Al-Kausar', name_arabic: 'الكوثر', start_page: 602, end_page: 602, juz_number: 30, revelation_type: 'Makkiyah', total_verses: 3 },
  { id: 109, name_latin: 'Al-Kafirun', name_arabic: 'الكافرون', start_page: 603, end_page: 603, juz_number: 30, revelation_type: 'Makkiyah', total_verses: 6 },
  { id: 110, name_latin: 'An-Nasr', name_arabic: 'النصر', start_page: 603, end_page: 603, juz_number: 30, revelation_type: 'Madaniyah', total_verses: 3 },
  { id: 111, name_latin: 'Al-Lahab', name_arabic: 'المسد', start_page: 603, end_page: 603, juz_number: 30, revelation_type: 'Makkiyah', total_verses: 5 },
  { id: 112, name_latin: 'Al-Ikhlas', name_arabic: 'الإخلاص', start_page: 604, end_page: 604, juz_number: 30, revelation_type: 'Makkiyah', total_verses: 4 },
  { id: 113, name_latin: 'Al-Falaq', name_arabic: 'الفلق', start_page: 604, end_page: 604, juz_number: 30, revelation_type: 'Makkiyah', total_verses: 5 },
  { id: 114, name_latin: 'An-Nas', name_arabic: 'الناس', start_page: 604, end_page: 604, juz_number: 30, revelation_type: 'Madaniyah', total_verses: 6 },
];

// ===== GENERATE PAGES DATA =====
function generatePagesData() {
  const pages: Array<{
    page_number: number;
    image_url: string;
    juz_number: number;
    surah_ids: number[];
  }> = [];

  // Collect all unique page numbers and map them to surah IDs
  const pageMap = new Map<number, { juz: number; surahIds: Set<number> }>();

  for (const surah of surahs) {
    for (let p = surah.start_page; p <= surah.end_page; p++) {
      if (!pageMap.has(p)) {
        pageMap.set(p, { juz: surah.juz_number, surahIds: new Set() });
      }
      pageMap.get(p)!.surahIds.add(surah.id);
    }
  }

  for (const [pageNum, data] of pageMap) {
    pages.push({
      page_number: pageNum,
      image_url: `${supabaseUrl}/storage/v1/object/public/mushaf-pages/svg/page-${pageNum}.svg`,
      juz_number: data.juz,
      surah_ids: Array.from(data.surahIds).sort((a, b) => a - b),
    });
  }

  return pages.sort((a, b) => a.page_number - b.page_number);
}

// ===== MAIN SEED FUNCTION =====
async function seed() {
  console.log('🌱 Starting database seed...\n');

  // 1. Seed surahs table
  console.log('📖 Seeding surahs table...');
  const { error: surahError } = await supabase
    .from('surahs')
    .upsert(surahs, { onConflict: 'id' });

  if (surahError) {
    console.error('❌ Error seeding surahs:', surahError.message);
    console.log('\n💡 Pastikan tabel `surahs` sudah dibuat di Supabase Dashboard.');
    console.log('   Jalankan SQL berikut di SQL Editor Supabase:\n');
    console.log(`CREATE TABLE IF NOT EXISTS public.surahs (
    id int8 PRIMARY KEY,
    name_latin varchar(100) NOT NULL,
    name_arabic varchar(100) NOT NULL,
    start_page int4 NOT NULL,
    end_page int4 NOT NULL,
    juz_number int4 NOT NULL,
    revelation_type varchar(50) CHECK (revelation_type IN ('Makkiyah', 'Madaniyah')),
    total_verses int4 NOT NULL
);`);
    return;
  }
  console.log(`  ✅ ${surahs.length} surahs inserted/updated\n`);

  // 2. Seed pages table
  console.log('📄 Seeding pages table...');
  const pagesData = generatePagesData();

  // Insert in batches of 50
  const batchSize = 50;
  let insertedCount = 0;

  for (let i = 0; i < pagesData.length; i += batchSize) {
    const batch = pagesData.slice(i, i + batchSize);
    const { error: pageError } = await supabase
      .from('pages')
      .upsert(batch, { onConflict: 'page_number' });

    if (pageError) {
      console.error('❌ Error seeding pages batch:', pageError.message);
      console.log('\n💡 Pastikan tabel `pages` sudah dibuat di Supabase Dashboard.');
      console.log('   Jalankan SQL berikut di SQL Editor Supabase:\n');
      console.log(`CREATE TABLE IF NOT EXISTS public.pages (
    page_number int4 PRIMARY KEY,
    image_url text NOT NULL,
    juz_number int4 NOT NULL,
    surah_ids int4[] NOT NULL
);`);
      return;
    }
    insertedCount += batch.length;
  }
  console.log(`  ✅ ${insertedCount} pages inserted/updated\n`);

  // 3. Summary
  console.log('🎉 Database seeding completed!');
  console.log(`   📖 Surahs: ${surahs.length} records`);
  console.log(`   📄 Pages:  ${pagesData.length} records`);
  console.log(`   📦 Page range: ${pagesData[0].page_number} – ${pagesData[pagesData.length - 1].page_number}`);
}

seed().catch(console.error);
