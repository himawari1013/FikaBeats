<template>
  <div class="wrapper">
    <h1>Logout...</h1>
    <div class="logout-sub-title">
      <p class="logout-msg">ログアウトしました。</p>
      <p>今日も素敵なメロディに包まれますように！</p>
    </div>
    <!-- ロゴ -->
    <h2>Fika Beats...</h2>
    <!-- サブタイトル -->
    <div class="sub-title">
      <p>ふわっと、あなたの気分にぴったりの音楽を</p>
      <p>一息つきたいティータイムのように、気分に寄り添った音楽体験を届けるアプリ。</p>
    </div>
    <!-- 入力フォーム -->
    <UserForm
      title="Login"
      description="登録している情報を以下に入力してください。"
      buttonText="送信する"
      :showRegisterLink="true"
      @submit="handleLogin"
    />
  </div>
</template>
<script setup lang="ts">
// -----------------------------------------------------
// Vue / Router / 外部モジュール
// -----------------------------------------------------
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import UserForm from '@/components/UserForm.vue';
import axios from 'axios';
import { generatePkce } from '@/utils/pkce';

// -----------------------------------------------------
// Router（画面遷移用）
// -----------------------------------------------------
const router = useRouter();

// -----------------------------------------------------
// onMounted：ログアウト処理
// 1. LogoutView が表示された瞬間セッションストレージに
// 保存されている認証情報をすべて削除する
// -----------------------------------------------------
onMounted(() => {
  console.log('--- LogoutView mounted ---');

  // 削除前値確認用
  // console.log('[before logout] access_token:', sessionStorage.getItem('access_token'));
  // console.log('[before logout] pkce_verifier:', sessionStorage.getItem('pkce_verifier'));

  // tokenを削除
  sessionStorage.removeItem('access_token');
  sessionStorage.removeItem('pkce_verifier');

  // 削除後値確認用
  // console.log('[after logout] access_token:', sessionStorage.getItem('access_token'));
  // console.log('[after logout] pkce_verifier:', sessionStorage.getItem('pkce_verifier'));
  // console.log('--- Logout completed ---');
});

// -----------------------------------------------------
// LoginPayload：
// フォームから受け取るデータ型
// -----------------------------------------------------
interface LoginPayload {
  loginId: string;
  password: string;
}

// -----------------------------------------------------
// handleLogin：再ログイン処理
// 1. 自前ログインAPIに認証
// 2. 成功したら Spotify 認証フローを開始
// -----------------------------------------------------
const handleLogin = async (payload: LoginPayload) => {
  try {
    // // フォーム入力内容確認
    // console.log('[login submit]', payload);

    // ログインAPIへリクエスト
    const res = await axios.post('http://localhost:3000/auth/login', payload);
    // ログイン失敗時
    if (!res.data?.success) {
      alert('ログイン失敗');
      return;
    }

    // ログイン成功時、Spotify 認証開始
    await startSpotifyAuthFlow();
  } catch (err) {
    // ログイン処理エラー
    console.error('login error:', err);
    alert('ログイン中にエラー');
  }
};

// -----------------------------------------------------
// startSpotifyAuthFlow：Spotify 認証開始
// 1. PKCE を生成
// 2. Spotify 認可URLを作成
// 3. Spotify 認証画面へリダイレクト
// -----------------------------------------------------
const startSpotifyAuthFlow = async () => {
  try {
    // PKCE（verifier / challenge）生成
    const { codeVerifier, codeChallenge } = await generatePkce();

    // 後続処理用に verifier を保存
    sessionStorage.setItem('pkce_verifier', codeVerifier);

    // Spotify 認可リクエスト用パラメータ
    const params = new URLSearchParams({
      client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
      response_type: 'code',
      redirect_uri: import.meta.env.VITE_SPOTIFY_REDIRECT_URI,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
      scope: ['user-read-email', 'user-read-private', 'playlist-read-private'].join(' '),
    });

    // Spotify 認証画面へ遷移
    window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
  } catch (err) {
    // PKCE 認証開始エラー
    console.error('pkce auth error:', err);
    alert('Spotify 認証開始に失敗');
  }
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
  overflow-wrap: break-word;
  word-break: break-word;
}

/* タイトル */
h1 {
  font-size: 100px;
  margin-bottom: 50px;
}

.logout-sub-title {
  margin-bottom: 300px;
}

.logout-msg {
  font-size: 24px;
  margin-bottom: 0px;
}

h2 {
  font-size: 48px;
  margin: 0px 0px 20px 0px;
}

/* サブタイトル(大枠) */
.sub-title {
  margin-bottom: 50px;
  /* line-height: 2.5; */
}

.sub-title > p:first-child {
  font-size: 24px;
  font-weight: bold;
  margin: 0px;
}

.sub-title > p:last-child {
  font-size: 18px;
  margin: 0px;
}

/* コンセプト */
.consept-text {
  margin-bottom: 50px;
  line-height: 2.5;
}

/* モバイル調整 */
@media (max-width: 768px) {
  /* タイトル */
  h1 {
    font-size: 32px;
    margin-bottom: 30px;
  }

  /* タイトル */
  h2 {
    font-size: 32px;
  }

  .logout-sub-title {
    font-size: 14px;
    margin-bottom: 250px;
  }

  .logout-msg {
    font-size: 18px;
    margin-bottom: 0px;
  }

  .sub-title > p:first-child {
    font-size: 17px;
    font-weight: bold;
    margin: 0px;
  }

  .sub-title > p:last-child {
    font-size: 16px;
    margin: 0px;
  }
}
</style>
