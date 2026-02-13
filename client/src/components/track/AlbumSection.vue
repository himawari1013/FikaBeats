<template>
  <!-- アルバム項目 -->
  <section class="album-section">
    <h1>Album</h1>
    <div class="album-info">
      <!-- アートワーク -->
      <img
        v-if="data.images?.[0]?.url"
        :src="data.images[0].url"
        alt="album image"
        class="album-img"
      />
      <!-- アルバム情報_右側 -->
      <div class="album-info-right">
        <!-- アルバム名・アーティスト名表示エリア -->
        <div class="name-info">
          <!-- アルバム名 -->
          <h2>{{ data.name }}</h2>
          <!-- アーティスト名 -->
          <p class="artist" v-if="data.artists?.[0]">
            {{ data.artists[0].name }}
          </p>
        </div>
        <!-- リリース詳細情報 -->
        <div class="detail-info">
          <!-- リリース日 -->
          <p class="detail-info-title">リリース日</p>
          <p>
            {{ formatReleaseDate(data.release_date, data.release_date_precision) }}
          </p>
          <!-- 収録曲数 -->
          <p class="detail-info-title">収録曲数</p>
          <p>{{ data.total_tracks }} 曲</p>
          <!-- 人気度 -->
          <p class="detail-info-title">人気レベル(最大数値100)</p>
          <p>Score：{{ data.popularity }}</p>
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
/* --- Album 型定義の読み込み --- */
import type { AlbumItem } from '@/types/album';
// -------------------------------------------------------------
// props：
// 親コンポーネントからアルバム詳細データを受け取る
// -------------------------------------------------------------
const props = defineProps<{
  data: AlbumItem;
}>();

// -------------------------------------------------------------
// openInSpotify：
// Spotify の公式ページを新しいタブで開く
// -------------------------------------------------------------
const openInSpotify = () => {
  if (props.data.external_urls?.spotify) {
    window.open(props.data.external_urls.spotify, '_blank');
  }
};

// -------------------------------------------------------------
// formatReleaseDate：
// リリース日を precision（年／月／日）に応じて表示用に整形
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

/* アルバム名 */
h2 {
  font-size: 48px;
  margin: 0px;
}

/* アーティスト名 */
.artist {
  color: #888;
  font-size: 20px;
}

/* アルバム項目 */
.album-section {
  font-size: 18px;
  min-height: 100vh;
  flex-direction: column;
  margin-bottom: 50px;
}

/* アルバム詳細情報 */
.album-info {
  display: flex;
  justify-content: space-between;
  gap: 30px;
}

/* アートワーク */
.album-img {
  width: 500px;
  border-radius: 8px;
}

/* アルバム名
アーティスト名枠 */
.name-info {
  width: 450px;
  padding: 20px 50px;
  background-color: #fff;
  border-radius: 8px;
  margin-bottom: 30px;
}

/* アルバム詳細情報枠 */
.detail-info {
  width: 450px;
  padding: 20px 50px;
  background-color: #fff;
  border-radius: 8px;
}

/* アルバム詳細情報枠 */
.detail-info > p {
  margin-top: 0px;
}

/* アルバム詳細情報枠 */
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

/* spotify試聴ボタン ホバー時 */
.spotify-btn:hover {
  background: #057a3e;
}

/* モバイル調整 */
@media (max-width: 768px) {
  /* タイトル */
  h1 {
    font-size: 32px;
  }

  /* アルバム名 */
  h2 {
    font-size: 24px;
  }

  /* アーティスト名 */
  .artist {
    font-size: 16px;
  }

  /* アルバム詳細情報 */
  .album-info {
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
