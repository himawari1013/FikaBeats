<template>
  <header class="header">
    <!-- 波 -->
    <HeaderWave />
    <!-- 波の上レイヤー -->
    <div class="header-overlay">
      <!-- ロゴ -->
      <h1 class="logo">Fika Beats...</h1>
      <!-- ナビゲーション：ログイン時のみ -->
      <nav v-if="isLoggedIn" class="nav">
        <ul class="nav-list">
          <li><button @click="goSearch">検索</button></li>
          <li><button @click="logout">ログアウト</button></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
// -----------------------------------------------------
//  Vue / Routerモジュール
// -----------------------------------------------------
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import HeaderWave from '@/components/HeaderWave.vue';

// -----------------------------------------------------
// Router 情報の取得
// -----------------------------------------------------
const route = useRoute();
const router = useRouter();

// -----------------------------------------------------
// ログイン状態フラグ
// true  : ログイン中（ナビ表示）
// false : 未ログイン（ナビ非表示）
// -----------------------------------------------------
const isLoggedIn = ref(false);

// -----------------------------------------------------
// checkLogin：
// sessionStorageに保存されているtokenを確認し、
// ログイン状態を判定する
// -----------------------------------------------------
const checkLogin = () => {
  // アクセストークン取得
  const token = sessionStorage.getItem('access_token');
  // デバッグ確認用ログ
  console.log('[Header] access_token:', token);
  // token が存在すれば true、なければ false
  isLoggedIn.value = !!token;
};

// -----------------------------------------------------
// onMounted：
// ヘッダー初回表示時にログイン状態をチェック
// （リロード / 直アクセス対策）
// -----------------------------------------------------
onMounted(checkLogin);

// -----------------------------------------------------
// watch：
// 画面遷移（URL変更）を監視し、
// ルートが変わるたびにログイン状態を再チェック
// -----------------------------------------------------
watch(() => route.fullPath, checkLogin);

// -----------------------------------------------------
// goSearch：
// 「検索」ボタン押下時、検索画面へ遷移
// -----------------------------------------------------
const goSearch = () => {
  console.log('[Header] goSearch');
  router.push('/search');
};

// -----------------------------------------------------
// logout：
// 「ログアウト」ボタン押下時
// ・認証情報を削除
// ・ログイン状態をリセット
// ・ログアウト画面へ遷移
// -----------------------------------------------------
const logout = () => {
  console.log('[Header] logout');

  // 認証情報削除
  sessionStorage.removeItem('access_token');
  sessionStorage.removeItem('pkce_verifier');

  // ログイン状態を未ログイン(false)に変更
  isLoggedIn.value = false;
  // ログアウト画面へ遷移
  router.push('/logout');
};
</script>

<style scoped>
/* ヘッダー全体 */
.header {
  position: relative;
  width: 100%;
}

/* 波ヘッダー */
.header :deep(svg) {
  position: relative;
  z-index: 1;
}

/* 波の上レイヤー */
.header-overlay {
  position: absolute;
  top: 20px;
  left: 40px;
  right: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 2;
  color: white;
}

/* ロゴ */
.logo {
  font-size: 50px;
  font-weight: bold;
  margin: 0;
}

/* ナビゲーションリスト */
.nav-list {
  display: flex;
  gap: 24px;
  list-style: none;
  margin: 0;
  padding: 0;
}

/* ボタン */
button {
  width: 100px;
  padding: 12px;
  background: #c9c74f;
  color: #fff;
  border-radius: 24px;
  cursor: pointer;
  font-size: 14px;
  border: none;
  cursor: pointer;
}

/* ボタン ホバー時 */
button:hover {
  background: #b6b43f;
}

/* モバイル調整 */
@media (max-width: 768px) {
  /* 波の上レイヤー */
  .header-overlay {
    top: 8px;
    left: 10px;
    right: 10px;
  }

  /* ロゴ */
  .logo {
    font-size: 20px;
  }

  .nav-list {
    gap: 10px;
  }

  /* ボタン */
  button {
    width: 45px;
    padding: 5px 0px;
    border-radius: 10px;
    cursor: pointer;
    font-size: 8px;
    border: none;
    cursor: pointer;
  }
}
</style>
