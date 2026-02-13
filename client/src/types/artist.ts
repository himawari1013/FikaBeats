// ---------------------------------------------
// アーティスト（Artist）の型定義
// ---------------------------------------------
export interface ArtistItem {
  id: string;
  name: string;
  genres: string[];
  popularity?: number;
  followers: {
    herf: string | null;
    total: number;
  };
  images?: { url: string }[];
  external_urls: {
    spotify: string;
  };
  href: string;
}
