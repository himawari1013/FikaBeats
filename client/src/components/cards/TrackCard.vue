<template>
  <!-- 楽曲詳細ページへ遷移 -->
  <router-link :to="`/detail/track/${id}`" class="track-card-link">
    <!-- 楽曲カード全体 -->
    <div class="track-card">
      <!-- 楽曲ジャケット画像 -->
      <div class="thumb" :style="{ backgroundImage: image ? `url(${image})` : '' }"></div>
      <!-- 楽曲タイトル -->
      <p class="title">{{ title }}</p>
      <!-- アーティスト名 -->
      <p class="artist">{{ artist }}</p>
    </div>
  </router-link>
</template>

<script setup lang="ts">
// -------------------------------------------------
// 親コンポーネントから受け取る props 定義
// id     : 楽曲ID
// title  : 楽曲タイトル
// artist : アーティスト名
// image  : 楽曲ジャケット画像URL
// -------------------------------------------------
defineProps({
  id: String,
  title: String,
  artist: String,
  image: String,
});
</script>

<style scoped>
/* カード全体 */
.track-card-link {
  text-decoration: none;
  color: inherit;
  display: inline-block;
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;
}

/* カード全体 ホバー時 */
.track-card-link:hover {
  transform: translateY(-4px);
  opacity: 0.9;
}

/* 楽曲カード */
.track-card {
  width: 180px;
}

/* 正方形に整形 */
.thumb {
  width: 100%;
  aspect-ratio: 1 / 1;
  background: #dcdcdc;
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  transition: opacity 0.2s ease;
}

/* タイトル */
.title {
  font-size: 16px;
  margin: 6px 0px 0px 0px;
  font-weight: bold;
}

/* アーティスト名 */
.artist {
  font-size: 16px;
  color: #666;
  margin: 0px 0px 20px 0px;
}

/* モバイル調整 */
@media (max-width: 768px) {
  /* 楽曲カードの横幅を固定 */
  .track-card {
    width: 100%;
  }
}
</style>
