# FikaBeats

## 概要
Spotify Web APIを利用し、
楽曲・アーティスト・アルバム検索ができる音楽検索Webアプリケーションです。

「ちょっとした癒し時間に、気軽に音楽を探せる体験」を
コンセプトに制作しました。  
フロントエンドとバックエンドを分離した構成で実装しています。

---

## 使用技術

### フロントエンド
- HTML
- CSS
- JavaScript
- TypeScript
- Vue.js

### バックエンド
- Node.js
- Express

### データベース
- MySQL

### その他
- Spotify Web API
- Git / GitHub

---

## アプリ内容・機能

- Spotify認証機能（OAuth2.0）
- 楽曲検索機能
- アーティスト検索機能
- アルバム検索機能
- 各項目詳細表示機能
- レスポンシブ対応

---

## 工夫した点

- フロントとバックエンドを分離し、責務を明確にした構成
- Vueのコンポーネント設計を意識し、再利用可能な構造
- Spotify利用規約を確認し、アートワーク表示ルールに配慮
- PC・Mobile双方で最適化されたUI設計

---

## 苦労した点

- OAuth認証フローの理解と実装
- APIレスポンスのネスト構造の理解
- 非同期処理（async/await）の制御

---

## セットアップ方法

```
1. リポジトリをクローン  
　　git clone https://github.com/himawari1013/FikaBeats.git  
　　cd FikaBeats
  
2. 依存パッケージのインストール  
　　▶︎サーバー側  
　　　cd server  
　　　npm install  

　　▶︎クライアント側  
　　　cd ../client  
　　　npm install  
  
3. データベースの作成（初回のみ）
　　プロジェクトルートで以下を実行し、  
　　schema.sql を実行してデータベースを作成。

　　mysql -u root -p < server/resources/sql/schema.sql  
  
4. サーバー / クライアント 各時起動
　　▶︎サーバー側  
　　　cd server  
　　　npm run dev  
  
　　▶︎クライアント側  
　　　cd ../client  
　　　npm run dev
