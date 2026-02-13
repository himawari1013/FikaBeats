// -----------------------------------------------------
// 楽曲の詳細情報を取得するコントローラ
// -----------------------------------------------------
import axios from "axios";

// -----------------------------------------------------
// getTrackDetail：
// 1. Spotify の曲（トラック）詳細情報を取得するAPI
// 2. 認証トークンはフロントから受け取る
//
// 【リクエスト】
// ・headers.authorization : Bearer access_token
// ・params.id             : トラックID
// 【レスポンス】
// ・Spotify API の track データ（そのまま返却）
// -----------------------------------------------------
export const getTrackDetail = async (req, res) => {
	try {
		// リクエストヘッダーから認証情報を取得
		const authHeader = req.headers.authorization;
		// "Bearer " を除いたアクセストークン部分のみを取得
		const accessToken = authHeader?.split(" ")[1];

		// アクセストークンが存在しない場合はエラー返却
		if (!accessToken) {
			return res.status(401).json({ error: "Access token missing" });
		}

		// URL パラメータからトラックIDを取得
		const trackId = req.params.id;

		// Spotify API（トラック詳細）を呼び出す
		const response = await axios.get(
			`https://api.spotify.com/v1/tracks/${trackId}`,
			{
				headers: {
					// Spotify API 認証用ヘッダー
					Authorization: `Bearer ${accessToken}`,
				},
			},
		);

		// 取得したトラック情報をフロントへ返却
		res.json(response.data);
	} catch (error) {
		// Spotify API 取得失敗時のエラーハンドリング
		console.error("spotify API Error:", error.response?.data || error);
		res.status(500).json({ error: "Failed to fetch track detail" });
	}
};
