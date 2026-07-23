import { promises as fs } from 'fs';
import path from 'path';

const pagesToFetch = [
  // Al-Kahfi
  293, 294, 295, 296, 297, 298, 299, 300, 301, 302, 303, 304,
  // Ya Sin
  440, 441, 442, 443, 444, 445,
  // Ar-Rahman & Al-Waqi'ah
  531, 532, 533, 534, 535, 536, 537,
  // Al-Mulk
  562, 563, 564,
  // Juz Amma
  582, 583, 584, 585, 586, 587, 588, 589, 590, 591, 592, 593, 594, 595,
  596, 597, 598, 599, 600, 601, 602, 603, 604
];

async function downloadSVGs() {
  console.log('🚀 Memulai proses download SVG ke lokal...\n');
  const targetDir = path.resolve(process.cwd(), 'public/svg');
  
  // Create dir if not exists
  await fs.mkdir(targetDir, { recursive: true });

  let successCount = 0;
  let errorCount = 0;

  for (const pageNum of pagesToFetch) {
    const pageString = pageNum.toString().padStart(3, '0');
    const githubUrl = `https://raw.githubusercontent.com/batoulapps/quran-svg/main/svg/${pageString}.svg`;
    const targetPath = path.join(targetDir, `page-${pageString}.svg`);

    try {
      process.stdout.write(`Mendownload Halaman ${pageNum}... `);
      const response = await fetch(githubUrl);
      
      if (!response.ok) throw new Error(`Gagal: ${response.statusText}`);
      
      const svgText = await response.text();
      await fs.writeFile(targetPath, svgText);

      console.log('✅ Sukses');
      successCount++;
    } catch (error: any) {
      console.log(`❌ Error: ${error.message}`);
      errorCount++;
    }
    
    // Beri jeda 100ms agar tidak terkena rate limit
    await new Promise(r => setTimeout(r, 100));
  }

  console.log('\n🎉 Proses Selesai!');
  console.log(`✅ Berhasil: ${successCount}`);
  console.log(`❌ Gagal: ${errorCount}`);
}

downloadSVGs().catch(console.error);
