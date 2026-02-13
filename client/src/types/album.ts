// ---------------------------------------------
// アルバム（Album）の型定義
// ---------------------------------------------
export type AlbumItem = {
  id: string;
  name: string;
  release_date: string;
  release_date_precision: 'year' | 'month' | 'day';
  popularity?: number;
  images?: {
    url: string;
  }[];
  artists?: {
    id: string;
    name: string;
  }[];
  external_urls?: {
    spotify: string;
  };
  total_tracks: number;
};
