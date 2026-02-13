<template>
  <!-- アーティスト詳細ページへ遷移 -->
  <router-link :to="`/detail/artist/${id}`" class="artist-card-link">
    <!-- アーティストカード全体 -->
    <div class="artist-card">
      <!-- アーティスト画像 -->
      <div class="thumb" :style="{ backgroundImage: image ? `url(${image})` : '' }"></div>
      <!-- アーティスト名 -->
      <p class="name">{{ name }}</p>
    </div>
  </router-link>
</template>

<script setup lang="ts">
// -------------------------------------------------
// 親コンポーネントから受け取る props 定義
// id    : アーティストID
// name  : アーティスト名
// image : アーティスト画像URL
// -------------------------------------------------
defineProps({
  id: String,
  name: String,
  image: String,
});
</script>

<style scoped>
/* カード全体 */
.artist-card-link {
  text-decoration: none;
  color: inherit;
  display: inline-block;
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;
}

/* カード全体 ホバー時 */
.artist-card-link:hover {
  transform: translateY(-4px);
  opacity: 0.9;
}

/* アーティストカード */
.artist-card {
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

/* アーティスト名 */
.name {
  margin-top: 8px;
  font-weight: bold;
}

/* モバイル調整 */
@media (max-width: 768px) {
  /* アーティストカードの横幅を固定 */
  .artist-card {
    width: 100%;
  }
}
</style>
