<template>
  <div class="wrapper">
    <component
      v-for="section in visibleSections"
      :key="section.key"
      :is="section.component"
      v-bind="section.props()"
    />
    <TopTracksSection v-if="topTracks.length" :tracks="topTracks" />
    <!-- 戻るボタン -->
    <button class="back-button" @click="goBack">検索画面に戻る</button>
  </div>
</template>

<script setup lang="ts">
// Vue のリアクティブ機能・ライフサイクル・算出プロパティ
import { ref, onMounted, computed } from 'vue';

// ルーティング情報取得・画面遷移用
import { useRoute, useRouter } from 'vue-router';

// API 通信用
import axios from 'axios';

// 表示に使う各セクションコンポーネント
import TrackSection from '@/components/track/TrackSection.vue';
import AlbumSection from '@/components/track/AlbumSection.vue';
import ArtistSection from '@/components/track/ArtistSection.vue';
import TopTracksSection from '@/components/track/TopTracksSection.vue';

// 型定義
import type { TrackItem } from '@/types/track';
import type { ArtistItem } from '@/types/artist';

// -----------------------------------------------------
// ルート情報取得
// /detail/:type/:id から値を取得
// -----------------------------------------------------
const route = useRoute();
const router = useRouter();

// type：track / artist / album
const type = route.params.type as string;
// id：Spotify の各種 ID
const id = route.params.id as string;

// -----------------------------------------------------
// API 取得結果を保持する状態（リアクティブ）
// -----------------------------------------------------
const trackDetail = ref<TrackItem | null>(null);
const artistDetail = ref<ArtistItem | null>(null);
const albumDetail = ref<any | null>(null);

// アーティストの人気曲（TopTracks）
const topTracks = ref<TrackItem[]>([]);

// -----------------------------------------------------
// goBack：戻るボタン処理
// 履歴があれば1つ前へ、なければ検索画面へ
// -----------------------------------------------------
const goBack = () => {
  // 履歴があれば戻る、なければ検索画面へ
  if (window.history.length > 1) {
    router.back();
  } else {
    router.push('/search');
  }
};

// -----------------------------------------------------
// fetchArtistTopTracks：
// アーティストの人気曲（TopTracks）を取得
// -----------------------------------------------------
const fetchArtistTopTracks = async (artistId: string) => {
  // セッションに保存してあるアクセストークン取得
  const token = sessionStorage.getItem('access_token');
  if (!token) return [];
  // API 呼び出し
  const res = await axios.get(`http://localhost:3000/api/artists/${artistId}/top-tracks`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  // 上位5件だけ返す
  return res.data.tracks.slice(0, 5);
};

// -----------------------------------------------------
// fetchArtistDetail：アーティスト詳細取得
// -----------------------------------------------------
const fetchArtistDetail = async (artistId: string) => {
  const token = sessionStorage.getItem('access_token');
  if (!token) return;
  const res = await axios.get(`http://localhost:3000/api/artists/${artistId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  artistDetail.value = res.data;
};

// -----------------------------------------------------
// fetchTrackDetail：トラック詳細取得
// トラック → アーティスト → 人気曲 まで連鎖取得
// -----------------------------------------------------
const fetchTrackDetail = async (trackId: string) => {
  const token = sessionStorage.getItem('access_token');
  if (!token) return;
  // トラック情報取得
  const res = await axios.get(`http://localhost:3000/api/tracks/${trackId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  trackDetail.value = res.data;

  // トラックに紐づくアーティストID取得
  const artistId = res.data.artists?.[0]?.id;
  if (artistId) {
    await fetchArtistDetail(artistId);
    topTracks.value = await fetchArtistTopTracks(artistId);
  }
};

// -----------------------------------------------------
// fetchAlbumDetail：アルバム詳細取得
// アルバム → アーティスト → 人気曲 を取得
// -----------------------------------------------------
const fetchAlbumDetail = async (albumId: string) => {
  const token = sessionStorage.getItem('access_token');
  if (!token) return;
  // アルバム情報取得
  const res = await axios.get(`http://localhost:3000/api/albums/${albumId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  albumDetail.value = res.data;

  // アルバムに紐づくアーティスト取得
  const artistId = res.data.artists?.[0]?.id;
  if (artistId) {
    await fetchArtistDetail(artistId);
    // 人気曲取得
    const top = await fetchArtistTopTracks(artistId);
    // 表示用に代表トラックを1曲セット
    trackDetail.value = top[0] ?? null;
    topTracks.value = top;
  }
};

// -----------------------------------------------------
// sections：表示セクション定義
// type と visible 条件で描画を制御する
// -----------------------------------------------------
const sections = [
  {
    key: 'artist-main',
    type: 'artist',
    component: ArtistSection,
    props: () => ({ data: artistDetail.value, highlight: true }),
    visible: () => !!artistDetail.value,
  },
  {
    key: 'artist-track',
    type: 'artist',
    component: TrackSection,
    props: () => ({ data: trackDetail.value }),
    visible: () => !!trackDetail.value,
  },

  {
    key: 'album-main',
    type: 'album',
    component: AlbumSection,
    props: () => ({ data: albumDetail.value }),
    visible: () => !!albumDetail.value,
  },
  {
    key: 'album-artist',
    type: 'album',
    component: ArtistSection,
    props: () => ({ data: artistDetail.value }),
    visible: () => !!artistDetail.value,
  },

  {
    key: 'track-main',
    type: 'track',
    component: TrackSection,
    props: () => ({ data: trackDetail.value }),
    visible: () => !!trackDetail.value,
  },
  {
    key: 'track-artist',
    type: 'track',
    component: ArtistSection,
    props: () => ({ data: artistDetail.value }),
    visible: () => !!artistDetail.value,
  },
];

// -----------------------------------------------------
// visibleSections：
// 現在のtypeに応じて表示するセクションだけ抽出
// -----------------------------------------------------
const visibleSections = computed(() =>
  sections.filter((section) => section.type === type && section.visible())
);

// -----------------------------------------------------
// onMounted：画面初期表示時の処理
// URL の type に応じて取得処理を分岐
// -----------------------------------------------------
onMounted(async () => {
  // トラック詳細ページ
  if (type === 'track') {
    await fetchTrackDetail(id);
    // アーティスト詳細ページ
  } else if (type === 'artist') {
    await fetchArtistDetail(id);
    // アーティストの人気曲を取得
    const top = await fetchArtistTopTracks(id);
    // メイン表示用に先頭1曲をセット
    trackDetail.value = top[0] ?? null;
    // 一覧表示用
    topTracks.value = top;
    // アルバム詳細ページ
  } else if (type === 'album') {
    await fetchAlbumDetail(id);
  }
});
</script>

<style scoped>
/* 大枠 */
.wrapper {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  box-sizing: border-box;
  overflow-wrap: break-word;
  word-break: break-word;
}

/* 戻るボタン */
.back-button {
  font-size: 14px;
  width: 180px;
  padding: 20px;
  background: #2849ab;
  color: #fff;
  border-radius: 16px;
  cursor: pointer;
  border: none;
  display: block;
  margin: 0px auto;
}

/* ホバー時 */
.back-button:hover {
  background-color: #1f357f;
}

/* モバイル調整 */
@media (max-width: 768px) {
  /* 戻るボタン */
  .back-button {
    padding: 10px;
    width: 120px;
    border-radius: 8px;
  }
}
</style>
