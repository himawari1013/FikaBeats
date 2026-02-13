<template>
  <!-- アルバム詳細ページへ遷移 -->
  <router-link :to="`/detail/album/${id}`" class="album-card-link">
    <!-- アルバムカード全体 -->
    <div class="album-card">
      <!-- アルバム画像 -->
      <div class="thumb" :style="{ backgroundImage: image ? `url(${image})` : '' }"></div>
      <!-- アルバムタイトル -->
      <p class="title">{{ title }}</p>
      <!-- アーティスト名 -->
      <p class="artist">{{ artist }}</p>
    </div>
  </router-link>
</template>

<script setup lang="ts">
// -------------------------------------------------
// 親コンポーネントから受け取る props 定義
// id     : アルバムID
// title  : アルバム名
// artist : アーティスト名
// image  : アルバム画像URL
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
.album-card-link {
  text-decoration: none;
  color: inherit;
  display: inline-block;
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;
}

/* カード全体 ホバー時 */
.album-card-link:hover {
  transform: translateY(-4px);
  opacity: 0.9;
}

/* アルバムカード */
.album-card {
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
  /* アルバムカードの横幅を固定 */
  .album-card {
    width: 100%;
  }
}
</style>
