/*
Power Shell または Command Prompt で SQLファイルのあるフォルダに移動後、以下のコマンドを実行してください。
> mysql -h localhost -u root -p データベース名 < SQLファイル名

または、
> mysql -h localhost -u root -p 
で MySQL に接続後、以下のコマンドを実行します。

mysql> source SQLファイルの絶対パス（C:\…\SQLファイル名）

*/

/* DB作成 */
DROP DATABASE IF EXISTS fika_beats;
CREATE DATABASE fika_beats CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

/* ユーザを作成 */
DROP USER IF EXISTS 'fika_member'@'localhost';
CREATE USER 'fika_member'@'localhost' IDENTIFIED BY 'fika_sleep01';

/* 権限付与 */
GRANT ALL PRIVILEGES ON fika_beats.* TO 'fika_member'@'localhost';
FLUSH PRIVILEGES;

/* AUTOCOMMIT無効化 */
SET AUTOCOMMIT=0;

/* DB選択 */
USE fika_beats;

/**********************************/
/* テーブル名: ユーザ情報 (users)   */
/**********************************/
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    login_id VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

/**********************************/
/* テーブル名: プレイリスト (playlists) */
/**********************************/
CREATE TABLE playlists (
    playlist_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    playlist_name VARCHAR(50) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_playlists_users
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);

/**********************************/
/* テーブル名: プレイリストトラック (playlist_tracks) */
/**********************************/
CREATE TABLE playlist_tracks (
    playlist_track_id INT AUTO_INCREMENT PRIMARY KEY,
    playlist_id INT NOT NULL,
    track_id VARCHAR(100) NOT NULL,
    track_name VARCHAR(200) NOT NULL,
    artist_name VARCHAR(200) NOT NULL,
    album_name VARCHAR(200) NOT NULL,
    preview_url VARCHAR(300) NOT NULL,
    external_url VARCHAR(300) NOT NULL,
    added_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_playlist_tracks_playlists
        FOREIGN KEY (playlist_id)
        REFERENCES playlists(playlist_id)
        ON DELETE CASCADE,
    UNIQUE (playlist_id, track_id)
);

/**********************************/
/* テーブル名: Spotify認証 (spotify_credentials) */
/**********************************/
CREATE TABLE spotify_credentials (
    user_id INT PRIMARY KEY,
    client_id VARCHAR(100) NOT NULL,
    secret_id VARCHAR(100) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_spotify_credentials_users
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);

/**********************************/
/* INSERT文(動確): ユーザ情報 (users) */
/**********************************/
INSERT INTO users (user_name, login_id, password, created_at)
VALUES 
('天海祐希', 'Aniki001', 'p01', NOW()),
('JIHYO', 'Thomas002', 'hashed_password_sample', NOW());


/**********************************/
/* INSERT文(動確): プレイリスト (playlists) */
/**********************************/
INSERT INTO playlists (user_id, playlist_name, created_at)
VALUES
(1, 'My First Playlist', NOW()),
(2, 'Test First Playlist', NOW());


/**********************************/
/* INSERT文(動確): プレイリストトラック (playlist_tracks) */
/**********************************/
INSERT INTO playlist_tracks 
(playlist_id, track_id, track_name, artist_name, album_name, preview_url, external_url, added_at)
VALUES
(1, '3n3Ppam7vgaVa1iaRUc9Lp', 'Shape of You', 'Ed Sheeran', 'Divide',
 'https://p.scdn.co/mp3-preview/sample1', 'https://open.spotify.com/track/3n3Ppam7vgaVa1iaRUc9Lp', NOW()),
(1, '7qiZfU4dY1lWllzX7mPBI3', 'Believer', 'Imagine Dragons', 'Evolve',
 'https://p.scdn.co/mp3-preview/sample2', 'https://open.spotify.com/track/7qiZfU4dY1lWllzX7mPBI3', NOW()),
(2, '6habFhsOp2NvshLv26DqMb', 'Havana', 'Camila Cabello', 'Havana',
 'https://p.scdn.co/mp3-preview/sample3', 'https://open.spotify.com/track/6habFhsOp2NvshLv26DqMb', NOW());


/**********************************/
/* INSERT文(動確): Spotify認証 (spotify_credentials) */
/**********************************/
INSERT INTO spotify_credentials (user_id, client_id, secret_id, created_at)
VALUES
(1, 'dummy_client_id_123', 'dummy_secret_id_123', NOW());


/* 終了処理 */
/* AUTOCOMMIT有効化 */
SET AUTOCOMMIT=1;
