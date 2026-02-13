import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import SearchView from '@/views/SearchView.vue';
import LogoutView from '@/views/LogoutView.vue';

// -------------------------------------------------------------
// ルーティング定義
// 各 URL パスと表示する画面コンポーネントの対応表
// -------------------------------------------------------------
const routes = [
  // ログイン画面
  { path: '/', name: 'login', component: LoginView },
  // 新規登録画面
  {
    path: '/register',
    name: 'Register',
    component: RegisterView,
  },
  // 検索画面
  {
    path: '/search',
    name: 'Search',
    component: SearchView,
  },
  // 楽曲 アーティスト アルバム 詳細画面
  {
    path: '/detail/:type/:id',
    name: 'Detail',
    component: () => import('@/views/DetailView.vue'),
  },
  // ログアウト画面
  {
    path: '/logout',
    name: 'logout',
    component: LogoutView,
  },
];

// -------------------------------------------------------------
// ルーターインスタンス作成
// -------------------------------------------------------------
const router = createRouter({
  history: createWebHistory(),
  routes,

  // -------------------------------------------------------------
  // scrollBehavior：
  // 画面遷移時のスクロール位置制御（画面遷移後は必ず先頭に戻す）
  // -------------------------------------------------------------
  scrollBehavior() {
    return { top: 0 };
  },
});

// -------------------------------------------------------------
// ルーターをアプリ全体で使用できるようにエクスポート
// -------------------------------------------------------------
export default router;
