// -----------------------------------------------------
// 楽曲（トラック）詳細取得 API のルーティング定義
// -----------------------------------------------------
// Express から Router 機能を読み込む
import { Router } from "express";
// 楽曲詳細を取得するコントローラを読み込む
import { getTrackDetail } from "../controllers/trackController.js";
// ルーターインスタンスを作成
const router = Router();

// -----------------------------------------------------
// get：楽曲詳細取得 API
// 【エンドポイント】
// ・GET /api/tracks/:id
// 【URL パラメータ】
// ・id : Spotify のトラックID
// -----------------------------------------------------
router.get("/tracks/:id", getTrackDetail);

// ルーターを外部から利用できるようにエクスポート
export default router;
