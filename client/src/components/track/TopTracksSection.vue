<template>
  <div class="toptracks-section">
    <!-- タイトル -->
    <h1>Top Tracks</h1>
    <!-- テーブルヘッダ -->
    <div class="table-header">
      <!-- 順位カラム -->
      <span class="col-rank">Rank</span>
      <!-- 曲名カラム -->
      <span class="col-track">Track</span>
      <!-- Spotifyロゴ＋ラベル -->
      <span class="spotify-label">
        <!-- Spotify ロゴSVG -->
        <svg
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 236.05 225.25"
          class="spotify-logo"
        >
          <path
            class="cls-1"
            d="m122.37,3.31C61.99.91,11.1,47.91,8.71,108.29c-2.4,60.38,44.61,111.26,104.98,113.66,60.38,2.4,111.26-44.6,113.66-104.98C229.74,56.59,182.74,5.7,122.37,3.31Zm46.18,160.28c-1.36,2.4-4.01,3.6-6.59,3.24-.79-.11-1.58-.37-2.32-.79-14.46-8.23-30.22-13.59-46.84-15.93-16.62-2.34-33.25-1.53-49.42,2.4-3.51.85-7.04-1.3-7.89-4.81-.85-3.51,1.3-7.04,4.81-7.89,17.78-4.32,36.06-5.21,54.32-2.64,18.26,2.57,35.58,8.46,51.49,17.51,3.13,1.79,4.23,5.77,2.45,8.91Zm14.38-28.72c-2.23,4.12-7.39,5.66-11.51,3.43-16.92-9.15-35.24-15.16-54.45-17.86-19.21-2.7-38.47-1.97-57.26,2.16-1.02.22-2.03.26-3.01.12-3.41-.48-6.33-3.02-7.11-6.59-1.01-4.58,1.89-9.11,6.47-10.12,20.77-4.57,42.06-5.38,63.28-2.4,21.21,2.98,41.46,9.62,60.16,19.74,4.13,2.23,5.66,7.38,3.43,11.51Zm15.94-32.38c-2.1,4.04-6.47,6.13-10.73,5.53-1.15-.16-2.28-.52-3.37-1.08-19.7-10.25-40.92-17.02-63.07-20.13-22.15-3.11-44.42-2.45-66.18,1.97-5.66,1.15-11.17-2.51-12.32-8.16-1.15-5.66,2.51-11.17,8.16-12.32,24.1-4.89,48.74-5.62,73.25-2.18,24.51,3.44,47.99,10.94,69.81,22.29,5.12,2.66,7.11,8.97,4.45,14.09Z"
          />
        </svg>
        <!-- Spotify カラム名 -->
        <span class="col-spotify">Spotify</span>
      </span>
    </div>
    <!-- トラック順位一覧（最大5件まで表示） -->
    <div v-for="(track, index) in tracks.slice(0, 5)" :key="track.id" class="track-row">
      <!-- 順位 -->
      <span class="col-rank">{{ index + 1 }}</span>
      <!-- 曲名 -->
      <span class="col-track">
        {{ track.name }}
      </span>
      <!-- spotify試聴リンク -->
      <span class="col-spotify">
        <a :href="track.external_urls?.spotify" target="_blank" class="spotify-link">
          Spotifyで聴く
        </a>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
// -------------------------------------------------------------
// 親コンポーネントから受け取る props 定義
// tracks: Spotify API などから取得した曲配列
// -------------------------------------------------------------
defineProps<{
  tracks: any[];
}>();
</script>

<style scoped>
/* タイトル */
h1 {
  font-size: 64px;
  margin-bottom: 16px;
}

/* 人気ランキング曲項目 */
.toptracks-section {
  margin-bottom: 50px;
}

/* テーブルヘッダ */
.table-header {
  font-size: 20px;
  background: #ffffff;
  padding: 12px 16px;
  border-radius: 8px;
  font-weight: bold;
  color: #2b3a67;
  margin-bottom: 12px;
}

/* 各トラック行 */
.track-row {
  font-size: 18px;
  background: #fbfbfc;
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 8px;
}

/* テーブルヘッダ
各トラック行
共通3カラムグリッド */
.table-header,
.track-row {
  display: grid;
  grid-template-columns: 1fr 4fr 2fr;
  align-items: center;
}

/* 順位 */
.col-rank {
  font-weight: bold;
}

/* Spotifyラベル（ロゴ＋文字） */
.spotify-label {
  display: flex;
  align-items: center;
  gap: 6px;
}

/* Spotifyロゴ */
.spotify-logo {
  width: 30px;
  height: auto;
}

/* Spotify SVG */
.cls-1 {
  fill: #15c97f;
  stroke-width: 0px;
  width: 50px;
}

/* Spotifyリンク */
.spotify-link {
  color: #1d4ed8;
  text-decoration: none;
}

/* モバイル調整 */
@media (max-width: 768px) {
  /* タイトル */
  h1 {
    font-size: 32px;
  }

  /* テーブルヘッダ
  各トラック行
  共通3カラムグリッド */
  .table-header,
  .track-row {
    grid-template-columns: 32px 1fr 120px;
    font-size: 14px;
    padding: 10px 12px;
  }

  /* テーブルヘッダ */
  .table-header {
    font-size: 12px;
  }

  /* Spotifyリンク */
  .spotify-link {
    font-size: 12px;
    white-space: nowrap;
  }

  /* Spotifyロゴ */
  .spotify-logo {
    width: 20px;
  }

  /* 曲名を2行までに制限 */
  .col-track {
    display: -webkit-box;
    line-clamp: 2;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    padding-left: 10px;
  }

  /* Spotify列を右寄せ */
  .col-spotify {
    justify-self: end;
  }

  /* テーブルヘッダ
  Spotifyラベル（ロゴ＋文字） */
  .table-header .spotify-label {
    justify-self: end;
  }

  /* Spotifyラベル（ロゴ＋文字） */
  .spotify-label {
    display: flex;
    align-items: center;
    gap: 6px;
    padding-right: 10px;
  }
}
</style>
