<template>
  <div class="wrapper">
    <!-- タイトル -->
    <h1>Fika Beats...</h1>
    <!-- サブタイトル -->
    <div class="sub-title">
      <h2>ふわっと、あなたの気分にぴったりの音楽を</h2>
      <div>一息つきたいティータイムのように、気分に寄り添った音楽体験を届けるアプリ。</div>
    </div>
    <!-- 入力フォーム -->
    <UserForm
      title="Sign up"
      description="ユーザ情報を登録してください。"
      buttonText="登録する"
      :isSignup="true"
      :showRegisterLink="false"
      @submit="handleRegister"
    />
    <!-- ログイン画面へ戻る -->
    <button class="back-login" @click="goToLogin">← ログイン画面に戻る</button>
  </div>
</template>

<script setup lang="ts">
// -----------------------------------------------------
// 使用コンポーネント / ライブラリ
// -----------------------------------------------------
import UserForm from '@/components/UserForm.vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

// -----------------------------------------------------
// Router（画面遷移用）
// -----------------------------------------------------
const router = useRouter();

// -----------------------------------------------------
// 登録フォームから受け取るデータ型
// loginId  : ログインID
// password : パスワード
// username : 表示名（任意）
// -----------------------------------------------------
interface RegisterPayload {
  loginId: string;
  password: string;
  username?: string;
}

// -----------------------------------------------------
// handleRegister：登録ボタン押下時の処理
// 1. フォーム入力データを受け取る
// 2. バックエンドの登録APIへ POST
// 3. 成功ならログイン画面へ遷移
// -----------------------------------------------------
const handleRegister = async (payload: RegisterPayload) => {
  // フォーム入力内容の確認
  // console.log('送信された登録情報:', payload);

  // 登録APIのURL
  const url = 'http://localhost:3000/auth/regist';

  // バックエンドへ登録リクエスト送信
  const res = await axios.post(url, payload);

  // レスポンスが取得できなかった場合
  if (!res) {
    console.log('ユーザー登録に失敗しました。');
    // レスポンスが取得できた場合
  } else {
    // ログイン画面に遷移
    router.push('/');
    console.log('ユーザー登録に成功しました。');
  }
};

// -----------------------------------------------------
// goToLogin：ログイン画面へ戻る
// -----------------------------------------------------
const goToLogin = () => {
  router.push('/');
};
</script>

<style scoped>
/* 大枠 */
.wrapper {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 24px;
  box-sizing: border-box;
  text-align: center;
  font-size: 14px;
  overflow-wrap: break-word;
  word-break: break-word;
}

/* タイトル */
h1 {
  font-size: 100px;
}

/* サブタイトル */
h2 {
  font-size: 24px;
  margin-bottom: 0px;
}

/* サブタイトル(大枠) */
.sub-title {
  line-height: 1.8;
  margin-bottom: 32px;
}

/* (ログイン画面へ)戻るリンク */
.back-login {
  background: none;
  border: none;
  color: #2849ab;
  font-size: 16px;
  cursor: pointer;
  text-decoration: none;
  transition:
    color 0.2s ease,
    text-decoration-color 0.2s ease;
}

/* ★ ホバー時 */
.back-login:hover {
  color: #1e3a8a;
  text-decoration: underline;
}

/* ★ クリック時 */
.back-login:active {
  opacity: 0.6;
}

/* モバイル調整 */
@media (max-width: 768px) {
  /* タイトル */
  h1 {
    font-size: 32px;
  }

  /* サブタイトル */
  h2 {
    font-size: 16px;
  }

  /* サブタイトル */
  .sub-title {
    text-align: left;
    max-width: 28em;
    margin: 0 auto 1.2em;
    font-size: 16px;
  }
}
</style>
