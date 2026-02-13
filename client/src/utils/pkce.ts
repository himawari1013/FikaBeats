// -------------------------------------------------------------
// PKCE 用の
// code_verifier：秘密鍵（後でトークン取得時に使用）
// code_challenge：公開鍵（ログインURLに付けて送る）
// を生成
// -------------------------------------------------------------
export const generatePkce = async (): Promise<{
  codeVerifier: string;
  codeChallenge: string;
}> => {
  // ---------------------------------------------------
  // 1. ランダムな数値配列を生成
  // Uint32Array → セキュアな乱数用
  // ---------------------------------------------------
  const array = new Uint32Array(56 / 2);
  crypto.getRandomValues(array);
  // ---------------------------------------------------
  // 2. 数値を16進数文字列に変換して連結
  //    code_verifier（秘密鍵）
  // ---------------------------------------------------
  const codeVerifier = Array.from(array, (dec) => ('0' + dec.toString(16)).slice(-2)).join('');

  // ---------------------------------------------------
  // 3. code_verifier を SHA-256 でハッシュ化
  // ---------------------------------------------------
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(codeVerifier));

  // ---------------------------------------------------
  // 4. Base64URL 形式に変換
  // + / = を URL 安全文字に置換
  //    code_challenge（公開鍵）
  // ---------------------------------------------------
  const codeChallenge = btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  // ---------------------------------------------------
  // 5. 両方を返す
  // ---------------------------------------------------
  return { codeVerifier, codeChallenge };
};
