<template>
  <!-- フッター全体 -->
  <footer class="footer-view">
    <!-- 波フッター -->
    <FooterWave />
  </footer>
</template>

<script setup lang="ts">
/* コンポーネントを読み込む */
import FooterWave from '@/components/FooterWave.vue';
</script>

<style scoped>
/* フッター全体 */
.footer-view {
  width: 100%;
  margin-top: auto;
}
</style>
