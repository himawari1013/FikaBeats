// -----------------------------------------------------
// アーティスト Top Tracks 取得用 API のルーティング定義
// -----------------------------------------------------
// Express から Router 機能を読み込む
import { Router } from "express";
// アーティストの Top Tracks を取得する処理ロジックを読み込む
import { getTopTracks } from "../controllers/topTracksController.js";
// ルーターインスタンスを作成
const router = Router();

// -----------------------------------------------------
// get：アーティストTopTracks 取得API
// 【エンドポイント】
// ・GET /api/top-tracks/:artistId
// 【URL パラメータ】
// ・artistId : Spotify のアーティストID
// -----------------------------------------------------
router.get("/:artistId/top-tracks", getTopTracks);

// ルーターを外部から使えるようにエクスポート
export default router;
