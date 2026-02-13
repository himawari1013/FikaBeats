// -----------------------------------------------------
// アルバム詳細 API のルーティング定義
// ・/api/albums 配下のリクエストを受け取る
// ・実際の処理は controller に委譲する
// -----------------------------------------------------
import { Router } from "express";

// -----------------------------------------------------
// アルバム詳細取得用コントローラを読み込み
// controller 側の export 名と完全一致させる
// -----------------------------------------------------
import { getAlbumDetail } from "../controllers/albumController.js";

const router = Router();

// -----------------------------------------------------
// GET /api/albums/:albumId
// 1. URL パラメータから albumId を受け取る
// 2. getAlbumDetail コントローラへ処理を渡す
// -----------------------------------------------------
router.get("/:albumId", getAlbumDetail);

// ルーターをエクスポート
export default router;
