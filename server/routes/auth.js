// ---------------------------------------------
// 認証系 API のルーティング
// ---------------------------------------------
// ExpressからRouter機能を取得
import { Router } from "express";

// 認証に関する処理ロジック（コントローラ）を読み込む
// ・login  : ログイン処理
// ・regist : 新規ユーザー登録処理
import { login, regist } from "../controllers/authController.js";
// ルーターインスタンス
const router = Router();

// ---------------------------------------------
// post：ログイン API
// 【エンドポイント】
// ・POST /auth/login
//
// 【フロントから受け取る値】
// ・loginId
// ・password
// ---------------------------------------------
router.post("/login", login);

// ---------------------------------------------
// post：新規ユーザー登録 API
// 【エンドポイント】
// ・POST /auth/regist
//
// 【フロントから受け取る値】
// ・loginId
// ・password
// ・username
// ---------------------------------------------
router.post("/regist", regist);

// 外部で使用できるように、ルーターをエキスポート
export default router;
