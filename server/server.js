// ---------------------------------------------
// Express サーバーの初期設定
// ---------------------------------------------
import express from "express";
import cors from "cors";

// -----------------------------------------------------
// ルーティング定義ファイルの読み込み
// -----------------------------------------------------
// 認証（ログイン / 新規登録）
import authRoutes from "./routes/auth.js";

// 曲の詳細情報取得
import trackRoutes from "./routes/track.js";

// アーティスト詳細情報取得
import artistRoutes from "./routes/artist.js";

// アーティストのTopTracks取得
import topTracksRoute from "./routes/topTracks.js";

// アルバム詳細情報取得
import albumRoutes from "./routes/album.js";

// アプリケーション準備
const app = express();

// -----------------------------------------------------
// ミドルウェア設定
// -----------------------------------------------------
// CORS 設定
// フロントエンド（別ポート）からの通信を許可
app.use(cors());

// JSON 自動パース設定
// フロントから送られてきたJSONをreq.bodyに格納
app.use(express.json());

// -----------------------------------------------------
// ルーティング登録
// -----------------------------------------------------
// 認証系 API
app.use("/auth", authRoutes);

// 曲の詳細情報取得 API
app.use("/api", trackRoutes);

// アーティスト詳細情報取得 API
app.use("/api/artists", artistRoutes);

// アーティストTopTracks取得 API
app.use("/api/artists", topTracksRoute);

// アルバム詳細情報取得 API
app.use("/api/albums", albumRoutes);

// ---------------------------------------------
// サーバー起動
// ---------------------------------------------
const PORT = 3000;
app.listen(PORT, () => {
	console.log("server running at http://localhost:" + PORT);
});
