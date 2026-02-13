<template>
  <!-- track項目 -->
  <section class="track-section">
    <h1>Track</h1>
    <div class="track-info">
      <!-- アートワーク -->
      <img
        v-if="data.album?.images?.[0]?.url"
        :src="data.album.images[0].url"
        alt="album image"
        class="album-img"
      />
      <!-- トラック情報_右側 -->
      <div class="track-info-right">
        <div class="name-info">
          <!-- 曲名 -->
          <h2>{{ data.name }}</h2>
          <!-- アーティスト名 -->
          <p class="artist" v-if="data.artists?.[0]">
            {{ data.artists[0].name }}
          </p>
        </div>
        <!-- リリース詳細情報 -->
        <div class="detail-info">
          <!-- アルバム名 -->
          <p class="detail-info-title">アルバム名</p>
          <p>{{ data.album.name }}</p>
          <!-- リリース日 -->
          <p class="detail-info-title">リリース日</p>
          <p>{{ formatReleaseDate(data.album.release_date, data.album.release_date_precision) }}</p>
          <!-- 再生時間 -->
          <p class="detail-info-title">再生時間</p>
          <p>{{ formatDuration(data.duration_ms) }}</p>
          <!-- spotify試聴ボタン -->
          <button v-if="data.external_urls?.spotify" @click="openInSpotify" class="spotify-btn">
            Spotifyで聴く
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { TrackItem } from '@/types/track';
// -------------------------------------------------------------
//  props：
//  親コンポーネントから
//  トラック1件分のデータを受け取る
// -------------------------------------------------------------
const props = defineProps<{
  data: TrackItem;
}>();

// -------------------------------------------------------------
// openInSpotify：
// Spotify の公式トラックページを新しいタブで開く
// -------------------------------------------------------------
const openInSpotify = () => {
  if (props.data?.external_urls?.spotify) {
    window.open(props.data.external_urls.spotify, '_blank');
  }
};

// -------------------------------------------------------------
// formatDuration：
// 再生時間（ミリ秒）を
// 「分:秒（mm:ss）」形式に変換
// -------------------------------------------------------------
const formatDuration = (ms: number) => {
  const totalSec = Math.floor(ms / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return `${min}:${sec.toString().padStart(2, '0')}`;
};

// -------------------------------------------------------------
// formatReleaseDate：
// release_date を
// precision（年／月／日）に応じて整形
// -------------------------------------------------------------
const formatReleaseDate = (date: string, precision: 'year' | 'month' | 'day') => {
  const [year, month, day] = date.split('-');
  if (precision === 'year') return `${year}年`;
  if (precision === 'month') return `${year}年${Number(month)}月`;
  return `${year}年${Number(month)}月${Number(day)}日`;
};
</script>

<style scoped>
/* タイトル */
h1 {
  font-size: 64px;
  margin-bottom: 16px;
}

/* 曲名 */
h2 {
  font-size: 48px;
  margin: 0px;
}

/* アーティスト名 */
.artist {
  color: #888;
  font-size: 20px;
}

/* トラック項目 */
.track-section {
  font-size: 18px;
  min-height: 100vh;
  flex-direction: column;
  margin-bottom: 50px;
}

/* トラック詳細情報 */
.track-info {
  display: flex;
  justify-content: space-between;
  gap: 50px;
}

/* アートワーク */
.album-img {
  width: 500px;
  border-radius: 8px;
}

/* 曲名_アーティスト名枠 */
.name-info {
  width: 450px;
  padding: 20px 50px;
  background-color: #fff;
  border-radius: 8px;
  margin-bottom: 50px;
}

/* リリース詳細情報 */
.detail-info {
  width: 450px;
  padding: 20px 50px;
  background-color: #fff;
  border-radius: 8px;
}

/* リリース詳細情報_スタイル調整*/
.detail-info > p {
  margin-top: 0px;
}

/* リリース詳細情報_スタイル調整*/
.detail-info-title {
  margin-bottom: 0px;
  font-weight: bold;
}

/* spotify試聴ボタン */
.spotify-btn {
  padding: 10px 20px;
  background: #06934ad3;
  color: white;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

/* spotify視聴ボタン ホバー時*/
.spotify-btn:hover {
  background: #057a3e;
}

/* モバイル調整 */
@media (max-width: 768px) {
  /* タイトル */
  h1 {
    font-size: 32px;
  }

  /* 曲名 */
  h2 {
    font-size: 24px;
  }

  /* アーティスト名 */
  .artist {
    font-size: 16px;
  }

  /* トラック項目 */
  .track-section {
    font-size: 16px;
  }

  /* トラック詳細情報 */
  .track-info {
    display: block;
    gap: 0;
  }

  /* アートワーク
  トラック情報_右側 */
  .album-img,
  .track-info-right {
    width: 100%;
    margin-bottom: 20px;
  }

  /* 曲名_アーティスト名枠
  リリース詳細情報 */
  .name-info,
  .detail-info {
    width: 100%;
    padding: 16px 20px;
    margin-bottom: 20px;
    box-sizing: border-box;
  }

  /* spotify試聴ボタン */
  .spotify-btn {
    width: 100%;
    text-align: center;
  }
}
</style>
