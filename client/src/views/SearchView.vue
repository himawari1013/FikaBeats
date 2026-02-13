<template>
  <div class="wrapper">
    <div class="search-view">
      <h1>Search</h1>
      <main class="content">
        <SearchBar @search="doSearch" />

        <!-- トラック検索結果 -->
        <section class="section" v-if="tracks.length">
          <h2>Tracks</h2>
          <div class="card-row">
            <!-- TrackCard の一覧表示 -->
            <TrackCard
              v-for="t in tracks"
              :key="t.id"
              :id="t.id"
              :title="t.name"
              :artist="t.artists?.[0]?.name"
              :image="t.album?.images?.[0]?.url"
            />
          </div>
        </section>

        <!-- アーティスト検索結果 -->
        <section class="section" v-if="artists.length">
          <h2>Artists</h2>
          <div class="card-row">
            <!-- ArtistCard を一覧表示 -->
            <ArtistCard
              v-for="a in artists"
              :key="a.id"
              :id="a.id"
              :name="a.name"
              :image="a.images?.[0]?.url"
            />
          </div>
        </section>

        <!-- アルバム検索結果 -->
        <section class="section" v-if="albums.length">
          <h2>Albums</h2>
          <div class="card-row">
            <!-- AlbumCard の一覧表示 -->
            <AlbumCard
              v-for="al in albums"
              :key="al.id"
              :id="al.id"
              :title="al.name"
              :artist="al.artists?.[0]?.name"
              :image="al.images?.[0]?.url"
            />
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
// -----------------------------------------------------
// 使用ライブラリ / Vue 機能
// -----------------------------------------------------
import axios from 'axios';
import { ref } from 'vue';

// -----------------------------------------------------
// 使用コンポーネント
// -----------------------------------------------------
import SearchBar from '@/components/SearchBar.vue';
import ArtistCard from '@/components/cards/ArtistCard.vue';
import TrackCard from '@/components/cards/TrackCard.vue';
import AlbumCard from '@/components/cards/AlbumCard.vue';

// -----------------------------------------------------
// 型定義（Spotify API レスポンス用）
// -----------------------------------------------------
import type { TrackItem } from '@/types/track';
import type { ArtistItem } from '@/types/artist';
import type { AlbumItem } from '@/types/album';

// -----------------------------------------------------
// 検索結果を保持するリアクティブ変数
// -----------------------------------------------------
// トラック検索結果
const tracks = ref<TrackItem[]>([]);

// アーティスト検索結果
const artists = ref<ArtistItem[]>([]);

// アルバム検索結果
const albums = ref<AlbumItem[]>([]);

// -----------------------------------------------------
// doSearch：検索処理
// 1. 検索キーワードを受け取る
// 2. Spotify 検索 API を呼び出す
// 3. レスポンスを各配列に格納
// -----------------------------------------------------
async function doSearch(keyword: string) {
  // 検索キーワード確認用ログ
  // console.log('検索ワード:', keyword);

  // Spotify 検索APIのエンドポイント
  const url = 'https://api.spotify.com/v1/search';

  // Spotify 検索 API を実行
  const response = await axios.get(url, {
    params: {
      // 検索キーワード
      q: keyword,
      // 同時に検索する対象
      // track  : 曲
      // artist : アーティスト
      // album  : アルバム
      type: 'album,artist,track',
    },
    headers: {
      // セッションストレージに保存されたアクセストークンを付与
      Authorization: 'Bearer ' + sessionStorage.getItem('access_token'),
    },
  });

  // レスポンスの中身確認
  // console.log(response);

  // 取得した結果をそれぞれの配列に格納（取得できなければ空配列）
  tracks.value = response.data.tracks?.items || [];
  artists.value = response.data.artists?.items || [];
  albums.value = response.data.albums?.items || [];
}
</script>

<style scoped>
/* 検索項目 */
.search-view {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  margin-top: 50px;
}

/* 検索項目 スタイル調整 */
.content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}

/* タイトル */
h1 {
  font-size: 100px;
  max-width: 1200px;
  margin-left: 100px;
  margin-bottom: 10px;
  color: #1f3a93;
}

/* トラック アーティスト アルバム各項目 */
.section {
  margin-top: 32px;
}

/* 表示カード列 */
.card-row {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

/* 各項目名 */
h2 {
  font-size: 80px;
  margin-bottom: 0px;
}

/* モバイル調整 */
@media (max-width: 768px) {
  /* タイトル */
  h1 {
    font-size: 60px;
    margin-left: 30px;
  }

  /* 検索項目 スタイル調整 */
  .content {
    padding: 0px 24px;
  }

  /* 各項目名 */
  h2 {
    font-size: 35px;
    margin-bottom: 0px;
  }

  /* 表示カード列 */
  .card-row {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
  }
}
</style>
