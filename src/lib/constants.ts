import { Surah } from './types';

// ===== COLOR TOKENS =====
export const COLORS = {
  light: {
    background: '#FBF8F1',
    foreground: '#2C3E50',
    accent: '#16A085',
    accentLight: '#1ABC9C',
    cardBg: '#FFFFFF',
    cardBorder: '#E8E2D6',
    muted: '#7F8C8D',
    overlay: 'rgba(251, 248, 241, 0.95)',
  },
  dark: {
    background: '#121212',
    foreground: '#E0E0E0',
    accent: '#1ABC9C',
    accentLight: '#16A085',
    cardBg: '#1E1E1E',
    cardBorder: '#2D2D2D',
    muted: '#888888',
    overlay: 'rgba(18, 18, 18, 0.95)',
  },
} as const;

// ===== SVG DARK MODE FILTER =====
export const DARK_MODE_SVG_FILTER = 'invert(1) sepia(0.2) brightness(0.8)';

// ===== SURAT PILIHAN (4 main surahs) =====
export const SURAT_PILIHAN: Surah[] = [
  {
    id: 18,
    name_latin: 'Al-Kahfi',
    name_arabic: 'الكهف',
    start_page: 293,
    end_page: 304,
    juz_number: 15,
    revelation_type: 'Makkiyah',
    total_verses: 110,
  },
  {
    id: 36,
    name_latin: 'Ya Sin',
    name_arabic: 'يس',
    start_page: 440,
    end_page: 445,
    juz_number: 22,
    revelation_type: 'Makkiyah',
    total_verses: 83,
  },
  {
    id: 56,
    name_latin: "Al-Waqi'ah",
    name_arabic: 'الواقعة',
    start_page: 534,
    end_page: 537,
    juz_number: 27,
    revelation_type: 'Makkiyah',
    total_verses: 96,
  },
  {
    id: 67,
    name_latin: 'Al-Mulk',
    name_arabic: 'الملك',
    start_page: 562,
    end_page: 564,
    juz_number: 29,
    revelation_type: 'Makkiyah',
    total_verses: 30,
  },
];

// ===== JUZ AMMA SURAHS (Juz 30, pages 582-604) =====
export const JUZ_AMMA_SURAHS: Surah[] = [
  { id: 78, name_latin: 'An-Naba\'', name_arabic: 'النبأ', start_page: 582, end_page: 583, juz_number: 30, revelation_type: 'Makkiyah', total_verses: 40 },
  { id: 79, name_latin: 'An-Nazi\'at', name_arabic: 'النازعات', start_page: 583, end_page: 584, juz_number: 30, revelation_type: 'Makkiyah', total_verses: 46 },
  { id: 80, name_latin: '\'Abasa', name_arabic: 'عبس', start_page: 585, end_page: 585, juz_number: 30, revelation_type: 'Makkiyah', total_verses: 42 },
  { id: 81, name_latin: 'At-Takwir', name_arabic: 'التكوير', start_page: 586, end_page: 586, juz_number: 30, revelation_type: 'Makkiyah', total_verses: 29 },
  { id: 82, name_latin: 'Al-Infitar', name_arabic: 'الانفطار', start_page: 587, end_page: 587, juz_number: 30, revelation_type: 'Makkiyah', total_verses: 19 },
  { id: 83, name_latin: 'Al-Mutaffifin', name_arabic: 'المطففين', start_page: 587, end_page: 589, juz_number: 30, revelation_type: 'Makkiyah', total_verses: 36 },
  { id: 84, name_latin: 'Al-Insyiqaq', name_arabic: 'الانشقاق', start_page: 589, end_page: 589, juz_number: 30, revelation_type: 'Makkiyah', total_verses: 25 },
  { id: 85, name_latin: 'Al-Buruj', name_arabic: 'البروج', start_page: 590, end_page: 590, juz_number: 30, revelation_type: 'Makkiyah', total_verses: 22 },
  { id: 86, name_latin: 'At-Tariq', name_arabic: 'الطارق', start_page: 591, end_page: 591, juz_number: 30, revelation_type: 'Makkiyah', total_verses: 17 },
  { id: 87, name_latin: 'Al-A\'la', name_arabic: 'الأعلى', start_page: 591, end_page: 592, juz_number: 30, revelation_type: 'Makkiyah', total_verses: 19 },
  { id: 88, name_latin: 'Al-Ghasyiyah', name_arabic: 'الغاشية', start_page: 592, end_page: 592, juz_number: 30, revelation_type: 'Makkiyah', total_verses: 26 },
  { id: 89, name_latin: 'Al-Fajr', name_arabic: 'الفجر', start_page: 593, end_page: 594, juz_number: 30, revelation_type: 'Makkiyah', total_verses: 30 },
  { id: 90, name_latin: 'Al-Balad', name_arabic: 'البلد', start_page: 594, end_page: 594, juz_number: 30, revelation_type: 'Makkiyah', total_verses: 20 },
  { id: 91, name_latin: 'Asy-Syams', name_arabic: 'الشمس', start_page: 595, end_page: 595, juz_number: 30, revelation_type: 'Makkiyah', total_verses: 15 },
  { id: 92, name_latin: 'Al-Lail', name_arabic: 'الليل', start_page: 595, end_page: 596, juz_number: 30, revelation_type: 'Makkiyah', total_verses: 21 },
  { id: 93, name_latin: 'Ad-Duha', name_arabic: 'الضحى', start_page: 596, end_page: 596, juz_number: 30, revelation_type: 'Makkiyah', total_verses: 11 },
  { id: 94, name_latin: 'Asy-Syarh', name_arabic: 'الشرح', start_page: 596, end_page: 596, juz_number: 30, revelation_type: 'Makkiyah', total_verses: 8 },
  { id: 95, name_latin: 'At-Tin', name_arabic: 'التين', start_page: 597, end_page: 597, juz_number: 30, revelation_type: 'Makkiyah', total_verses: 8 },
  { id: 96, name_latin: 'Al-\'Alaq', name_arabic: 'العلق', start_page: 597, end_page: 597, juz_number: 30, revelation_type: 'Makkiyah', total_verses: 19 },
  { id: 97, name_latin: 'Al-Qadr', name_arabic: 'القدر', start_page: 598, end_page: 598, juz_number: 30, revelation_type: 'Makkiyah', total_verses: 5 },
  { id: 98, name_latin: 'Al-Bayyinah', name_arabic: 'البينة', start_page: 598, end_page: 599, juz_number: 30, revelation_type: 'Madaniyah', total_verses: 8 },
  { id: 99, name_latin: 'Az-Zalzalah', name_arabic: 'الزلزلة', start_page: 599, end_page: 599, juz_number: 30, revelation_type: 'Madaniyah', total_verses: 8 },
  { id: 100, name_latin: 'Al-\'Adiyat', name_arabic: 'العاديات', start_page: 599, end_page: 600, juz_number: 30, revelation_type: 'Makkiyah', total_verses: 11 },
  { id: 101, name_latin: 'Al-Qari\'ah', name_arabic: 'القارعة', start_page: 600, end_page: 600, juz_number: 30, revelation_type: 'Makkiyah', total_verses: 11 },
  { id: 102, name_latin: 'At-Takasur', name_arabic: 'التكاثر', start_page: 600, end_page: 600, juz_number: 30, revelation_type: 'Makkiyah', total_verses: 8 },
  { id: 103, name_latin: 'Al-\'Asr', name_arabic: 'العصر', start_page: 601, end_page: 601, juz_number: 30, revelation_type: 'Makkiyah', total_verses: 3 },
  { id: 104, name_latin: 'Al-Humazah', name_arabic: 'الهمزة', start_page: 601, end_page: 601, juz_number: 30, revelation_type: 'Makkiyah', total_verses: 9 },
  { id: 105, name_latin: 'Al-Fil', name_arabic: 'الفيل', start_page: 601, end_page: 601, juz_number: 30, revelation_type: 'Makkiyah', total_verses: 5 },
  { id: 106, name_latin: 'Quraisy', name_arabic: 'قريش', start_page: 602, end_page: 602, juz_number: 30, revelation_type: 'Makkiyah', total_verses: 4 },
  { id: 107, name_latin: 'Al-Ma\'un', name_arabic: 'الماعون', start_page: 602, end_page: 602, juz_number: 30, revelation_type: 'Makkiyah', total_verses: 7 },
  { id: 108, name_latin: 'Al-Kausar', name_arabic: 'الكوثر', start_page: 602, end_page: 602, juz_number: 30, revelation_type: 'Makkiyah', total_verses: 3 },
  { id: 109, name_latin: 'Al-Kafirun', name_arabic: 'الكافرون', start_page: 603, end_page: 603, juz_number: 30, revelation_type: 'Makkiyah', total_verses: 6 },
  { id: 110, name_latin: 'An-Nasr', name_arabic: 'النصر', start_page: 603, end_page: 603, juz_number: 30, revelation_type: 'Madaniyah', total_verses: 3 },
  { id: 111, name_latin: 'Al-Lahab', name_arabic: 'المسد', start_page: 603, end_page: 603, juz_number: 30, revelation_type: 'Makkiyah', total_verses: 5 },
  { id: 112, name_latin: 'Al-Ikhlas', name_arabic: 'الإخلاص', start_page: 604, end_page: 604, juz_number: 30, revelation_type: 'Makkiyah', total_verses: 4 },
  { id: 113, name_latin: 'Al-Falaq', name_arabic: 'الفلق', start_page: 604, end_page: 604, juz_number: 30, revelation_type: 'Makkiyah', total_verses: 5 },
  { id: 114, name_latin: 'An-Nas', name_arabic: 'الناس', start_page: 604, end_page: 604, juz_number: 30, revelation_type: 'Madaniyah', total_verses: 6 },
];

// ===== JUZ AMMA META =====
export const JUZ_AMMA_META = {
  id: 'juz-amma',
  name_latin: "Juz 'Amma",
  name_arabic: 'جزء عمّ',
  start_page: 582,
  end_page: 604,
  juz_number: 30,
  total_surahs: 37,
};

// ===== ALL SURAHS COMBINED =====
export const ALL_SURAHS: Surah[] = [...SURAT_PILIHAN, ...JUZ_AMMA_SURAHS];

// ===== HELPER: Get surah by ID =====
export function getSurahById(id: number): Surah | undefined {
  return ALL_SURAHS.find((s) => s.id === id);
}

// ===== HELPER: Get page range for a reading session =====
export function getPageRange(surahId: number | string): { start: number; end: number } {
  if (surahId === 'juz-amma' || surahId === 0) {
    return { start: JUZ_AMMA_META.start_page, end: JUZ_AMMA_META.end_page };
  }
  const surah = getSurahById(Number(surahId));
  if (!surah) return { start: 1, end: 1 };
  return { start: surah.start_page, end: surah.end_page };
}

// ===== SUPABASE STORAGE URL BUILDER =====
export function buildPageUrl(pageNumber: number, baseUrl?: string): string {
  const supabaseUrl = baseUrl || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  return `${supabaseUrl}/storage/v1/object/public/mushaf-pages/svg/page-${pageNumber}.svg`;
}
