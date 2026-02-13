<script setup lang="ts">
import FooterView from './views/FooterView.vue';
import HeaderView from './views/HeaderView.vue';
</script>

<template>
  <div class="wrap">
    <!-- ヘッダー -->
    <HeaderView />
    <!-- メイン -->
    <router-view />
    <!-- フッター -->
    <FooterView />
  </div>
</template>

<style scoped>
/* 全体のスタイル */
.wrap {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #fcf2eb;
  color: #2849ab;
  overflow-x: hidden;
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}
</style>
