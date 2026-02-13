// -----------------------------------------------------
// アルバムの詳細情報を取得するコントローラ
// -----------------------------------------------------
import axios from "axios";

// -----------------------------------------------------
// getAlbumDetail：
// 1. Spotify のアルバム詳細情報を取得するAPI
// 2. 認証トークンはフロントから受け取る
//
// 【リクエスト】
// ・headers.authorization : Bearer access_token
// ・params.albumId        : アルバムID
// 【レスポンス】
// ・Spotify API の album データ（そのまま返却）
// -----------------------------------------------------
export const getAlbumDetail = async (req, res) => {
	try {
		// フロントから送られてきた Authorization ヘッダを取得
		const authHeader = req.headers.authorization;
		// 加工し、tokenを取得
		const accessToken = authHeader?.split(" ")[1];

		// トークンが存在しない場合は認証エラー
		if (!accessToken) {
			return res.status(401).json({ error: "Access token missing" });
		}

		// -------------------------------------------------
		// URL パラメータから albumId を取得
		// 例: /albums/:albumId
		// -------------------------------------------------
		const albumId = req.params.albumId;

		// -------------------------------------------------
		// Spotify API：アルバム詳細取得
		// -------------------------------------------------
		const response = await axios.get(
			`https://api.spotify.com/v1/albums/${albumId}`,
			{
				headers: {
					// SpotifyAPI用の認証トークンを付与
					Authorization: `Bearer ${accessToken}`,
				},
			},
		);
		// Spotify から返ってきたアルバムデータをフロントへそのまま返却
		res.json(response.data);
	} catch (error) {
		// エラー発生時
		console.error("Album取得エラー:", error.message);
		res.status(500).json({ message: "Album取得に失敗しました" });
	}
};
