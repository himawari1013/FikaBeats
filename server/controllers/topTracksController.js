// -----------------------------------------------------
// 人気ランキング曲の詳細情報を取得するコントローラ
// -----------------------------------------------------
import axios from "axios";

// -----------------------------------------------------
// getTopTracks：
// 1. 指定したアーティストのトップトラック一覧を取得するAPI
// 2. Spotify Web API（Top Tracks）を利用
// 3. 認証トークンはフロントから受け取る
//
// 【リクエスト】
// ・headers.authorization : Bearer access_token
// ・params.artistId       : アーティストID
// 【レスポンス】
// ・Spotify API の top-tracks データ（そのまま返却）
// -----------------------------------------------------
export const getTopTracks = async (req, res) => {
	try {
		// リクエストヘッダーから認証トークンを取得
		const authHeader = req.headers.authorization;
		// "Bearer xxx" → "xxx" のみを抽出
		const accessToken = authHeader?.split(" ")[1];

		// トークンが存在しない場合は認証エラー
		if (!accessToken) {
			return res.status(401).json({ error: "Access token missing" });
		}

		// URLパラメータからアーティストIDを取得
		const artistId = req.params.artistId;

		// Spotify API（アーティストのトップトラック）URLを生成
		const apiUrl = `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=JP`;

		// Spotify API を呼び出してトップトラックを取得
		const response = await axios.get(apiUrl, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
		// 取得したトップトラック一覧をフロントへ返却
		res.json(response.data);
	} catch (error) {
		// Spotify API 取得失敗時のエラーハンドリング
		console.error("TopTracks API Error:", error.response?.data || error);
		res.status(500).json({ error: "Failed to fetch top tracks" });
	}
};
