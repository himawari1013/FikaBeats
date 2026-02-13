// ---------------------------------------------
// アーティストの詳細 API のルーティング
// ---------------------------------------------
import { Router } from "express";
import { getArtistDetail } from "../controllers/artistController.js";

// -----------------------------------------------------
// router：
// 1. アーティスト詳細取得用エンドポイントを定義
// 2. 実際の処理は controller（getArtistDetail）に委譲
//
// 【エンドポイント】
// ・GET /api/artists/:id
//
// 【リクエスト】
// ・params.id             : アーティストID
// ・headers.authorization : Bearer access_token
// 【レスポンス】
// ・Spotify API の artist データ（そのまま返却）
// -----------------------------------------------------
const router = Router();

// アーティスト詳細取得
router.get("/:id", getArtistDetail);

// ルーターをエクスポート
export default router;
