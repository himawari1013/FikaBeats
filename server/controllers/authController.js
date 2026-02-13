// -----------------------------------------------------
// 認証まわりの処理をまとめたコントローラ
// 1. ログイン
// 2. ユーザー登録
// -----------------------------------------------------
import bcrypt from "bcrypt";
import pool from "../db/db.js";

// -----------------------------------------------------
// login：ログイン処理
// 1. loginId / password を受け取る
// 2. DBからユーザー情報を取得
// 3. パスワードを照合
//
// 【リクエスト】
// ・body.loginId  : ログインID
// ・body.password : パスワード（平文）
// 【レスポンス】
// ・success : true / false
// ・user    : ユーザー情報（成功時）
// -----------------------------------------------------
export const login = async (req, res) => {
	try {
		// リクエストボディからログイン情報を取得
		const { loginId, password } = req.body;

		// 必須パラメータの存在チェック
		if (!loginId || !password) {
			return res.status(400).json({
				success: false,
				message: "loginId または password がありません",
			});
		}

		// DBからユーザー情報を取得（login_id で検索）
		const sql = `SELECT * FROM users WHERE login_id = ? LIMIT 1`;
		const [rows] = await pool.execute(sql, [loginId]);

		// 該当ユーザが存在しない場合
		if (rows.length === 0) {
			return res.status(401).json({
				success: false,
				message: "ユーザが存在しません",
			});
		}

		const user = rows[0];

		// パスワード照合
		const isMatch = await bcrypt.compare(password, user.password);

		// パスワード照合確認
		// console.log("isMatch" + isMatch);

		// パスワードが不一致の場合
		if (!isMatch) {
			return res.status(401).json({
				success: false,
				message: "パスワードが違います",
			});
		}

		// ログイン成功の場合、レスポンスを返却
		return res.json({
			success: true,
			message: "login ok",
			user: {
				userId: user.user_id,
				userName: user.user_name,
			},
		});
	} catch (error) {
		// 例外発生時の場合
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "サーバーエラー",
		});
	}
};

// -----------------------------------------------------
// regist：ユーザー登録処理
// 1. ユーザー情報を受け取る
// 2. パスワードをハッシュ化
// 3. DBにユーザー情報を登録
//
// 【リクエスト】
// ・body.loginId  : ログインID
// ・body.password : パスワード（平文）
// ・body.username : ユーザー名
// 【レスポンス】
// ・success : true
// ・userId  : 作成されたユーザーID
// -----------------------------------------------------
export const regist = async (req, res) => {
	// リクエストボディの内容確認
	// console.log("req.body: " + JSON.stringify(req.body));

	// リクエストボディから登録情報を取得
	const loginId = req.body.loginId;
	const password = req.body.password;
	const userName = req.body.username;

	// パスワードをハッシュ化
	const hashedPassword = await bcrypt.hash(password, 10);

	// ユーザー登録用の INSERT 文を作成
	const sql = `
      INSERT INTO users (user_name, login_id, password, created_at)
      VALUES (?, ?, ?, NOW())
    `;
	// 値の確認
	// console.log("INSERT 値:", { userName, loginId, hashedPassword });

	// SQLに渡すパラメータを定義
	const params = [userName, loginId, hashedPassword];

	// ユーザー情報をDBに登録
	const [result] = await pool.execute(sql, params);

	// 登録成功レスポンスを返却
	return res.json({
		success: true,
		userId: result.insertId,
		message: "user created",
	});
};
