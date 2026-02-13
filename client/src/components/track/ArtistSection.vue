<template>
  <!-- アーティスト項目 -->
  <section class="artist-section">
    <h1>Artist</h1>
    <div class="artist-info">
      <!-- アーティスト情報_左側 -->
      <div class="artist-info-left">
        <!-- アーティスト名 -->
        <div class="name-info">
          <p class="detail-info-title">アーティスト名</p>
          <h2>{{ data.name }}</h2>
          <!-- ジャンル -->
          <p class="detail-info-title">ジャンル</p>
          <p>{{ data.genres?.join(', ') }}</p>
        </div>
        <div class="detail-info">
          <!-- フォロワー数 -->
          <p class="detail-info-title">フォロワー数</p>
          <p>{{ formattedFollowers }}</p>
          <!-- 人気度 -->
          <p class="detail-info-title">人気レベル(最大数値100)</p>
          <p>{{ formattedPopularity }}</p>
          <!-- spotify試聴ボタン -->
          <button v-if="data.external_urls?.spotify" @click="openSpotify" class="spotify-btn">
            Spotifyで聴く
          </button>
        </div>
      </div>
      <!-- アーティスト写真 -->
      <img
        v-if="data.images?.[0]?.url"
        :src="data.images[0].url"
        alt="artist image"
        class="album-img"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
// アーティスト情報の型定義
import type { ArtistItem } from '@/types/artist';
// 算出プロパティ
import { computed } from 'vue';

// -------------------------------------------------------------
// props：
// 親コンポーネントから受け取る Props
// -------------------------------------------------------------
const props = defineProps<{
  data: ArtistItem;
}>();

// -------------------------------------------------------------
// formattedFollowers：
// フォロワー数をカンマ区切り＋「人」表記に変換
// -------------------------------------------------------------
const formattedFollowers = computed(() => {
  return props.data.followers?.total ? props.data.followers.total.toLocaleString() + '人' : '0人';
});

// // -------------------------------------------------------------
//   formattedPopularity：
//   人気度を表示用の文字列に整形
// -------------------------------------------------------------
const formattedPopularity = computed(() => {
  return typeof props.data.popularity === 'number'
    ? `Score：${props.data.popularity}`
    : 'Score：不明';
});

// -------------------------------------------------------------
// openSpotify：
// Spotifyの公式アーティストページを新しいタブで開く
// -------------------------------------------------------------
const openSpotify = () => {
  if (props.data?.external_urls?.spotify) {
    window.open(props.data.external_urls.spotify, '_blank');
  }
};
</script>

<style scoped>
/* タイトル */
h1 {
  font-size: 64px;
  margin-bottom: 16px;
}

/* アーティスト名 */
h2 {
  font-size: 48px;
  margin: 0px;
}

/* アーティスト項目 */
.artist-section {
  font-size: 18px;
  min-height: 100vh;
  flex-direction: column;
  margin-bottom: 50px;
}

/* アーティスト情報 */
.artist-info {
  display: flex;
  justify-content: space-between;
  gap: 30px;
}

/* アーティスト名
ジャンル枠 */
.name-info {
  width: 450px;
  padding: 20px 50px;
  background-color: #fff;
  border-radius: 8px;
  margin-bottom: 50px;
}

/* アーティスト名
ジャンル枠 */
.name-info > p {
  margin: 0px;
}

/* フォロワー数
人気度枠 */
.detail-info {
  width: 450px;
  padding: 20px 50px;
  background-color: #fff;
  border-radius: 8px;
}

/* フォロワー数
人気度枠 */
.detail-info > p {
  margin-top: 0px;
}

/* アーティスト写真 */
.album-img {
  width: 500px;
  border-radius: 8px;
}

/* 詳細情報の各タイトル */
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

  /* 曲名 */
  h2 {
    font-size: 24px;
  }
  /* トラック詳細情報 */
  .artist-info {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  /* アーティスト写真 */
  .album-img {
    order: 1;
  }

  /* アーティスト情報_左側 */
  .artist-info-left {
    order: 2;
  }

  /* アートワーク
  アーティスト情報_左側 */
  .album-img,
  .artist-info-left {
    width: 100%;
    margin-bottom: 20px;
  }

  /* 曲名
  アーティスト名枠
  リリース詳細情報枠 */
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
