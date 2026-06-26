export interface Surah {
  id: number;
  name_latin: string;
  name_arabic: string;
  start_page: number;
  end_page: number;
  juz_number: number;
  revelation_type: 'Makkiyah' | 'Madaniyah';
  total_verses: number;
}

export interface MushafPage {
  page_number: number;
  image_url: string;
  juz_number: number;
  surah_ids: number[];
}

export interface Bookmark {
  surahId: number;
  pageNumber: number;
  timestamp: number;
}

export interface LastRead {
  surahId: number;
  pageNumber: number;
  timestamp: number;
  surahName: string;
}
