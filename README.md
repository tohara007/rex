# 招待制チャットアプリ
## 技術スタック
### 基本構成
- React + TypeScript + Vite + Tailwind CSS
### ルーティング
- tanstack-router
### 認証
- Firebase Authentication
### DB
- Firestore Database
### UIライブラリ
- Daisy UI

## 環境構築
### Firebase準備
1. Googleアカウントを用意
2. Firebase コンソールにアクセス
  • https://console.firebase.google.com
	•「プロジェクトを追加」をクリック
	•	任意のプロジェクト名を入力（例: chat-app-dev）
	•	Google アナリティクス → 「無効にする」でOK
	•	「プロジェクトを作成」を押す
3. Firebase プロジェクト内でサービスを有効化
  【認証（Authentication）】
	  •	左メニュー「Authentication」 → 「始める」
	  •	サインイン方法 → 「Email/Password」を有効化
  【Firestore（データベース）】
	  •	左メニュー「Firestore Database」 → 「データベースの作成」
	  •	モード：テストモード（開発中はこれでOK）
	  •	リージョンは近い場所を選択（例：asia-northeast1）
4. Firebase Webアプリを登録
	•	プロジェクト設定（歯車アイコン）→「全般」→「アプリを追加」→「</>（Web）」を選ぶ
	•	アプリ名は chat-web など任意でOK
	•	「Hosting の設定」は スキップしてOK
	•	最後に出てくる設定スニペットをメモ（下記のような構成）
  ```
  apiKey: 'xxxxx',
  authDomain: 'xxxxx.firebaseapp.com',
  projectId: 'xxxxx',
  storageBucket: 'xxxxx.appspot.com',
  messagingSenderId: 'xxxxx',
  appId: 'xxxxx',
  ```

### アプリ起動
1. `.envsample`をコピーして`.env`を作成し、「Firebase準備-4」で取得した内容をそれぞれの項目へ記載する。
2. `npm install` で必要な依存関係をインストールする。
3. `npm run dev` でアプリ起動する。
4. http://localhost:5173/ へアクセスする。

