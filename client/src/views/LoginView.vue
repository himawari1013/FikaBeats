<template>
  <div class="wrapper">
    <!-- タイトル -->
    <h1>Fika Beats...</h1>
    <!-- サブタイトル -->
    <div class="sub-title">
      <h2>ふわっと、あなたの気分にぴったりの音楽を</h2>
      <div>一息つきたいティータイムのように、気分に寄り添った音楽体験を届けるアプリ。</div>
    </div>
    <!-- コンセプト -->
    <div class="consept-text">
      <p>FikaBeats（フィーカビーツ）は、</p>
      <p>
        「ちょっとした癒し時間に、自分の聴きたい曲を気兼ねなく見つける！聴ける！」をコンセプトに
      </p>
      <p>
        曲提供をいただいたSpotify Technology社 が運営するスウェーデンを取り入れ、 スウェーデン語で
      </p>
      <p>ティータイム・休憩・ほっこりする時間 という意味を持つ「Fika」</p>
      <p>そして音楽を楽しむイメージのある「Beats」 を組み合わせた名前です。</p>
      <p>忙しい日常の中で、ちょっと一息つきたい瞬間、FikaBeatsで検索し、</p>
      <p>30秒のプレビューで気軽に試聴でき、気に入った曲は公式Spotifyでフル再生。</p>
      <p>Fikaの時間のように、リラックスしながら小さな発見を楽しめるアプリです。</p>
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
// 使用コンポーネント / ライブラリ
// -----------------------------------------------------
import UserForm from '@/components/UserForm.vue';
import axios from 'axios';
import { generatePkce } from '@/utils/pkce';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';

// -----------------------------------------------------
// Router（画面遷移用）
// -----------------------------------------------------
const router = useRouter();

// -----------------------------------------------------
// ログインフォームから受け取るデータ型
// -----------------------------------------------------
interface LoginPayload {
  loginId: string;
  password: string;
}

// -----------------------------------------------------
// onMounted：初期処理
// 1. Spotify 認証後にリダイレクトされたかを判定
// 2. code があればアクセストークン交換を行う
// -----------------------------------------------------
onMounted(async () => {
  // 現在のURLを取得
  const url = new URL(window.location.href);
  // クエリパラメータから "code" を取得
  const code = url.searchParams.get('code');

  // code が存在する（=Spotifyから戻ってきた）場合
  if (code) {
    const codeVerifier = sessionStorage.getItem('pkce_verifier');
    console.log('codeVerifier: ' + codeVerifier);

    // PKCEのverifierがない場合
    if (!codeVerifier) {
      return null;
    }

    // Spotify トークン取得エンドポイント
    const url = 'https://accounts.spotify.com/api/token';

    // API に送るパラメータ
    const body = new URLSearchParams({
      client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
      grant_type: 'authorization_code',
      code,
      redirect_uri: import.meta.env.VITE_SPOTIFY_REDIRECT_URI,
      code_verifier: codeVerifier,
    });

    try {
      // アクセストークン取得リクエスト
      const response = await axios.post(url, body, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      // アクセストークンをセッションストレージに保存（後のAPIで使用）
      sessionStorage.setItem('access_token', response.data.access_token);
      // エラーの場合
    } catch (err) {
      // トークン取得失敗時
      console.error('token exchange error:', err);
    }
    // 認証完了後、検索画面へ遷移
    router.push('/search');
  }
});

// -----------------------------------------------------
//  handleLogin：[送信する]ボタン押下時
//  UserFormから submit を受け取る関数
//  1. APIへログイン試行
//  2. 成功したら Spotify 認証フローへ
// -----------------------------------------------------
// サーバ側にログイン
const handleLogin = async (payload: LoginPayload) => {
  try {
    // 入力内容の確認用ログ
    console.log('送信:', payload);

    // ログインAPIにPOST
    const res = await axios.post('http://localhost:3000/auth/login', payload);

    // ログイン失敗時
    if (!res.data?.success) {
      alert('ログイン失敗');
      return;
    }
    // ログイン成功時、Spotify認証開始
    await startSpotifyAuthFlow();
  } catch (err) {
    // エラー内容を表示
    console.error('login error:', err);
    alert('ログイン中にエラー');
  }
};

// -----------------------------------------------------
// startSpotifyAuthFlow：Spotify 認証フロー開始
// 1. PKCE の生成
// 2. 認可URL を作成
// 3. Spotify 認証ページへリダイレクト
// -----------------------------------------------------
const startSpotifyAuthFlow = async () => {
  try {
    // PKCE（code_verifier / code_challenge）生成
    const { codeVerifier, codeChallenge } = await generatePkce();

    // verifier を後続処理用に保存
    sessionStorage.setItem('pkce_verifier', codeVerifier);

    // Spotify アプリ情報
    const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    // Spotify から返ってくるURL
    const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;

    // 必要なアクセス権（scope）
    const scope = ['user-read-email', 'user-read-private', 'playlist-read-private'].join(' ');

    // 認可URLのパラメータ設定
    const params = new URLSearchParams({
      client_id: clientId,
      response_type: 'code',
      redirect_uri: redirectUri,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
      scope,
    });

    // Spotify の認可画面へ遷移
    window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
    // エラーの場合
  } catch (err) {
    // ログに詳細を表示
    console.error('pkce auth error:', err);
    // アラート表示
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

/* コンセプト */
.consept-text {
  line-height: 1.6;
  margin-bottom: 32px;
}

/* コンセプト文 */
.consept-text p {
  margin-bottom: 4px;
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

  /* コンセプト / サブタイトル */
  .consept-text,
  .sub-title {
    text-align: left;
    max-width: 28em;
    margin: 0 auto 1.2em;
  }

  /* コンセプト */
  .consept-text {
    line-height: 1.7;
    margin-bottom: 1.2em;
  }

  /* コンセプト文 */
  .consept-text p {
    line-height: 1.8;
    word-break: break-word;
    overflow-wrap: anywhere;
  }

  /* コンセプト文間隔調整 */
  .consept-text p + p {
    margin-top: 0;
  }
}
</style>
