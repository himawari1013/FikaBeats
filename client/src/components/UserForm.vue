<template>
  <div class="login-form-wrapper" :class="{ signup: isSignup }">
    <!-- タイトル -->
    <h1>{{ title }}</h1>
    <!-- 説明文 -->
    <p class="description-form">{{ description }}</p>

    <!-- 新規登録の場合 -->
    <div v-if="isSignup">
      <!-- 注意書き -->
      <div class="notice-text">
        <p>本サービスは個人情報の収集を目的としておりません。</p>
        <p>本フォームに氏名・住所・連絡先などの個人情報を</p>
        <p>入力しないようお願い致します。</p>
        <p>ユーザーが任意に個人情報を入力した場合、</p>
        <p>当サービスではその取扱いについて責任を負いません。</p>
      </div>
    </div>
    <!-- 入力フォーム -->
    <form @submit.prevent="submitForm">
      <!-- ユーザID -->
      <div class="form-field">
        <label for="loginId">ユーザID</label>
        <input
          id="loginId"
          class="login-id-input"
          type="text"
          v-model="loginId"
          placeholder="ユーザID"
          required
        />
      </div>
      <!-- パスワード -->
      <div class="form-field">
        <label for="password">パスワード</label>
        <input
          id="password"
          class="login-id-input"
          type="password"
          v-model="password"
          placeholder="パスワード"
          required
        />
      </div>
      <div class="form-field">
        <div v-if="isSignup">
          <!-- 表示用ユーザ名 -->
          <label for="username">ユーザ名（表示用）</label>
          <input
            id="username"
            class="login-id-input"
            type="text"
            v-model="username"
            placeholder="表示名"
            required
          />
        </div>
      </div>
      <!-- ボタン -->
      <button type="submit">{{ buttonText }}</button>
    </form>
    <!-- ログインの場合 -->
    <p v-if="showRegisterLink" class="new-user">
      ※初めて利用する方は
      <router-link to="/register">こちら</router-link>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// -------------------------------------------------------------
// submit で送るデータ型
// -------------------------------------------------------------
interface FormPayload {
  loginId: string;
  password: string;
  username?: string;
}

// -------------------------------------------------------------
// props：
// 親コンポーネントから受け取る Props
// -------------------------------------------------------------
const props = defineProps<{
  title: string;
  description?: string;
  buttonText: string;
  isSignup?: boolean;
  showRegisterLink?: boolean;
}>();

// -------------------------------------------------------------
// emit：
// 親コンポーネントへ submit イベントを通知する
// -------------------------------------------------------------
const emit = defineEmits<{ (e: 'submit', payload: FormPayload): void }>();

// -------------------------------------------------------------
// フォーム入力値（v-model と双方向バインディング）
// -------------------------------------------------------------
const loginId = ref('');
const password = ref('');
const username = ref('');

// -------------------------------------------------------------
// submitForm：
// フォーム送信時（ボタン押下時）に実行される処理
// -------------------------------------------------------------
const submitForm = () => {
  const payload: FormPayload = {
    loginId: loginId.value,
    password: password.value,
  };
  if (props.isSignup) {
    payload.username = username.value;
  }
  emit('submit', payload);
};
</script>

<style scoped>
/* タイトル */
h1 {
  font-size: 32px;
}

/* 各テキスト */
p,
input,
label,
.new-user {
  font-size: 16px;
}

/* 全体ラッパー */
.login-form-wrapper {
  width: 400px;
  margin: 60px auto;
  padding: 80px;
  background-color: #f9e8d9;
  border-radius: 24px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* タイトル */
.login-form-wrapper h1 {
  color: #2849ab;
  margin-bottom: 8px;
}

/* ユーザーフォーム内の共通スタイル */
.login-form-wrapper p {
  color: #2849ab;
}

/* 説明文下の余白 */
.description-form {
  margin-bottom: 50px;
}

/* 注意書き */
.notice-text {
  background-color: #fcf2ea;
  border-radius: 30px;
  padding: 30px 10px;
  margin-bottom: 70px;
}

/* 注意書き テキスト */
.notice-text > p {
  font-size: 15px;
}

/* ラベル */
label {
  display: block;
  text-align: left;
  color: #2849ab;
  margin-bottom: 4px;
}

/* 入力欄 */
input {
  width: 100%;
  padding: 10px;
  margin-bottom: 50px;
  border: 1px solid #f9e8d9;
  border-bottom: 2px solid #2849ab;
  border-radius: 6px;
  box-sizing: border-box;
}

/* ボタン */
button {
  font-size: 14px;
  width: 150px;
  padding: 12px;
  background-color: #2849ab;
  color: #fff;
  border: none;
  border-radius: 24px;
  cursor: pointer;
  transition: background-color 0.3s;
}

/* ボタン ホバー時 */
button:hover {
  background-color: #1f357f;
}

/* URL(新規登録画面へ遷移) */
.new-user {
  margin-top: 16px;
  color: #2849ab;
}

/* モバイル調整 */
@media (max-width: 768px) {
  /* 全体ラッパー */
  .login-form-wrapper {
    width: 100%;
    margin: 60px 0px 30px 0px;
    padding: 20px 20px 40px 20px;
    box-sizing: border-box;
  }

  /* 注意書き */
  .notice-text {
    padding: 20px 30px;
    margin-bottom: 100px;
    line-height: 1.9;
    text-align: left;
  }

  /* 注意書き(単体文) */
  .notice-text p {
    line-height: 1.8;
    margin-top: 0;
    margin-bottom: 3px;
    word-break: break-word;
    overflow-wrap: anywhere;
  }

  /* タイトル下の余白 */
  .login-form-wrapper.signup > p {
    margin-bottom: 50px;
  }

  /* 注意書き下の余白 */
  .login-form-wrapper.signup .notice-text {
    margin-bottom: 30px;
  }

  /* 各インプット枠下の余白 */
  .login-form-wrapper.signup .login-id-input {
    margin-bottom: 30px;
  }

  /* 最後のインプット枠下の余白 */
  .login-form-wrapper.signup .form-field:last-of-type input {
    margin-bottom: 50px;
  }
}
</style>
