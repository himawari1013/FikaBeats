<template>
  <!-- 検索項目 -->
  <div class="search-bar">
    <!-- 検索欄テキストボックス -->
    <input
      type="text"
      placeholder="曲 / アーティスト / アルバムを検索"
      v-model="keyword"
      @keyup.enter="onSearch"
    />
    <!-- [検索する]ボタン -->
    <button @click="onSearch">検索する</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const keyword = ref('');
const emit = defineEmits(['search']);
// -------------------------------------------------------------
// onSearch：
// enterキーもしくは、[検索する]ボタン押下時
// -------------------------------------------------------------
function onSearch() {
  if (keyword.value.trim() === '') return;
  emit('search', keyword.value);
}
</script>

<style scoped>
/* 検索項目 */
.search-bar {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  justify-content: center;
  width: 100%;
}

/* 検索欄テキストボックス */
input {
  font-size: 16px;
  width: 500px;
  height: 50px;
  padding: 0 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

/* ボタン */
button {
  font-size: 14px;
  width: 150px;
  padding: 12px;
  background: #2849ab;
  color: #fff;
  border-radius: 24px;
  cursor: pointer;
  border: none;
  cursor: pointer;
}

/* ボタン ホバー時 */
button:hover {
  background: #1f3a8a;
}

/* モバイル調整 */
@media (max-width: 768px) {
  input {
    width: 250px;
    height: 40px;
    padding: 0 12px;
    border-radius: 6px;
    border: 1px solid #ccc;
    box-sizing: border-box;
  }

  /* ボタン */
  button {
    font-size: 14px;
    width: 80px;
    padding: 6px;
  }
}
</style>
