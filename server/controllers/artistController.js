// -----------------------------------------------------
// アーティストの詳細情報を取得するコントローラ
// -----------------------------------------------------
import axios from "axios";

// -----------------------------------------------------
// getArtistDetail：
// 1. Spotify のアーティスト詳細情報を取得するAPI
// 2. 認証トークンはフロントから受け取る
//
// 【リクエスト】
// ・headers.authorization : Bearer access_token
// ・params.id             : アーティストID
// 【レスポンス】
// ・Spotify API の artist データ（そのまま返却）
// -----------------------------------------------------
export const getArtistDetail = async (req, res) => {
	try {
		// リクエストヘッダーから Authorization を取得
		const authHeader = req.headers.authorization;
		// "Bearer " を除外してアクセストークンのみを取り出す
		const accessToken = authHeader?.split(" ")[1];

		// アクセストークンが存在しない場合は認証エラーを返す
		if (!accessToken) {
			return res.status(401).json({ error: "Access token missing" });
		}

		// URL パラメータからアーティスト ID を取得
		const artistId = req.params.id;

		// Spotify API（アーティスト詳細）を呼び出す
		const response = await axios.get(
			`https://api.spotify.com/v1/artists/${artistId}`,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			},
		);

		// Spotify から返却されたデータをそのままフロントへ返す
		res.json(response.data);
	} catch (error) {
		// エラー内容をログに出力
		console.error("artist API error:", error.response?.data || error);
		// 取得失敗時のレスポンス
		res.status(500).json({ error: "Failed to fetch artist detail" });
	}
};
