// ---------------------------------------------
// 楽曲（Track）の型定義
// ---------------------------------------------
export interface TrackItem {
  id: string;
  name: string;
  duration_ms: number;
  preview_url?: string;
  external_urls?: {
    spotify?: string;
  };
  album: {
    name: string;
    images?: { url: string }[];
    release_date: string;
    release_date_precision: 'year' | 'month' | 'day';
  };
  artists: {
    id: string;
    name: string;
    images?: { url: string }[];
  }[];
}
