# アプリケーション名
My Ecopla
# アプリケーション概要
使用した金額を登録し、感覚的に金銭感覚が身に付けることができる。
## URL
https://my-ecopla.onrender.com
## テスト用アカウント
ID: eco39057
Pass: Vgib9780
メールアドレス: nanka@tech.com
パスワード: nanka1234
# 利用方法
##
### アプリケーションを作成した背景
大学時代にお金を使う機会が増えることから、それに対応するためのアプリケーションを考えました。最初はExcelファイルで試作してみましたが、情報が見づらく使い勝手がよくありませんでした。一方、スマホアプリを見ると、金額表示が単一の色調で統一されていることに気づきました。そこで、アプリ制作において金額表示に色調の変化を導入することで、直感的に理解しやすくすることを考え、そのアイデアを実装しました。こうした背景から、新たなアプローチを取り入れることで、より使いやすく見やすいアプリを開発することができました。
### 洗い出した要件
要件定義をしたシート：
https://docs.google.com/spreadsheets/d/1ZzuvTxPaM-XKdWJZdxIX5OVldH2utiWFjX1BtrzAt0I/edit#gid=0
### 実装した機能についての画像やGIFおよびその説明
※	実装した機能について、それぞれどのような特徴があるのかを列挙する形で記載。画像はGyazoで、GIFはGyazoGIFで撮影すること。
### 実装予定の機能
洗い出した要件の中から、今後実装予定の機能がある場合は、その機能を記載。
# データベース設計
https://gyazo.com/e6fdf24318044f0ecee2b9df64ee4b5a
# 画面遷移図
https://gyazo.com/f6eade8179455fa7321200ee5bf8a888
# 開発環境
・サービスを記載。
### 使用した言語
・Ruby on Rails
・JavaScript
### 使用したGemファイル
・Active Hash
・Ancestry
・pry-rails
・Simple Calendar
・rails-i18n
# ローカルでの動作方法
以下のコマンドを順に入力
% git clone https://github.com/Yuya7124/my_ecopla
% cd my_ecopla
% bundle install
% yarn install
% rails db:seed
# 工夫したポイント
※	制作背景・使用技術・開発方法・タスク管理など、企業へ ＰＲしたい事柄を記載。