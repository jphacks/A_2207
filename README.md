# VRooM (リモートワーク × Tech)

[![](https://img.youtube.com/vi/9WgERDJqyWw/0.jpg)](https://www.youtube.com/watch?v=9WgERDJqyWw)

* デモは[こちら](https://jphacks-2022-4839e.web.app/)
* 紹介動画は[こちら](https://www.youtube.com/watch?v=9WgERDJqyWw)

## 製品概要
### 背景(製品開発のきっかけ、課題等）
コロナ以降，在宅での一人作業の増加により，家にいながらでも誰かと一緒に作業をしたいというニーズ（zoom勉強会など）が顕在化しました．

集中力が切れてしまいなかなか進まない作業でも，誰かと一緒に取り組むことで捗ったという経験がある人は多いと思います．

しかし，オンライン作業会にはいくつかの課題があります．
- 一緒に作業しよう！と誘うことが難しい
    - 連絡が億劫．断られるのが怖いという心理
- 生活リズムの違いなどにより，作業をするタイミングが合わない
    - リモート化により，生活リズムが多様になった（朝型，夜型など）
- 友達と取り組むとついついおしゃべりをしてしまい，集中できない

こうした課題を解決しながら，誰かと一緒に作業している感覚をいつでもどこでも提供する，そんなアプリの開発を目指しました．

### 製品説明（具体的な製品の説明）
VRooM（webアプリ）は，誰かと一緒に作業をしている感覚を提供します．

また，作業を効率的に進めるための様々な工夫を実装しています．
### 特長
#### 1. アバターがあなたの作業を見守ってくれます
- 作業モード，スクワットモードなどの各種画面にアバターが表示される
- アバターが声で作業や運動の応援をしてくれる
#### 2. 休憩に適した活動を促し，作業効率を向上させます
- スクワットモードが実装済み．肩や肘の位置を認識し，一定の基準を満たすことでカウントされる．
    - 休憩は個人の意識でも行えるものではある．しかし，VRooMは，タイマー機能との連動により半強制的に作業から休憩への移行ができることや，回数表示，モデルからの声かけなどがあることから，より効果的に休憩することができる．
#### 3. 作業支援機能が作業環境向上を向上させます
- タイマー機能により，作業→休憩→作業→休憩…のサイクルを回しやすくする．
    - [ポモドーロ作業法](https://ja.wikipedia.org/wiki/%E3%83%9D%E3%83%A2%E3%83%89%E3%83%BC%E3%83%AD%E3%83%BB%E3%83%86%E3%82%AF%E3%83%8B%E3%83%83%E3%82%AF)などを手軽に実践できる
- 最初に目標を宣言することでやるべき作業を明確化する．入力した内容が常に作業画面に表示されているため，強い意識づけができる．
- 継続日数，作業時間の可視化によって作業を行うモチベーションを保つことができる．
    - Googleアカウントでの認証が必要
    - データベースとの連携や，本番環境への統合は間に合わなかったため，イメージページのみ作成
#### 4. 誰でも簡単に利用できます
- webアプリのため，URLからページにアクセスするだけですぐに利用を開始できる．
    - 現在はパソコンでの利用を想定した実装になっている．レスポンシブデザインの導入を完了させ，スマホやタブレットでも最適なUIで利用できるように拡張予定．

|  初期画面  |  作業画面  |  スクワット画面  |  休憩画面  |　統計画面
| ---- | ---- | ---- | ---- | ---- |
|  <img width="1425" alt="start" src="https://user-images.githubusercontent.com/60843722/197320182-804fd11c-9658-4ef2-a664-6afb6ecee740.png">  |  <img width="1427" alt="timer" src="https://user-images.githubusercontent.com/60843722/197320187-8f1fe341-ef8b-417b-a12c-f547c8274f96.png">   |  <img width="1431" alt="squat" src="https://user-images.githubusercontent.com/60843722/197320192-22aa494c-6b27-470f-b491-124af22dcc98.png">  |  <img width="1436" alt="break" src="https://user-images.githubusercontent.com/60843722/197320202-f72e6024-0553-4ff8-990c-32ae2a90cdfe.png">   |  <img width="1336" alt="analytics" src="https://user-images.githubusercontent.com/60843722/197320212-5c7e3406-cf15-4dc2-9167-d82a9ea4d618.png">   |

### 解決出来ること
- 在宅の一人作業では，なかなか取りかかることが出来ない・集中力が切れてしまうという問題
- 誰かと一緒に勉強したいというニーズ
- オンライン勉強会を行いたいが，様々な要因により友達を誘うことができないという問題．
    - 誘うことの心理的負担
    - 作業タイミングのずれ
- おしゃべりをしてしまうなど，友達とのオンライン作業会では集中できないという問題．
### 競合に対する優位性
- 動画配信サイトにある「一緒に勉強しよう」系の動画
    - 動画配信サイトの場合，おすすめ動画などの誘惑が目に入ってしまうが，VROOMの場合は余計な情報が表示されないため，作業に集中できる
    - 作業開始時に目標を宣言してもらい，作業画面で目標を常に表示させておくことで，その時間に何をすべきか強く意識付けできる．
    - VRooMは作業→休憩，休憩→作業の遷移がスムーズであり，その間に誘惑が無い．動画配信サイトにも一緒に運動をする動画などがあるが，それらを見つけるためには検索が必要になり，誘惑になる可能性がある．
    - キャラクターにセリフを話してもらう機能を実装しており，ユーザーの名前を含めて応援コメントをしてもらうなど，一緒に作業をする相手としてより親近感を持つことができる．（本開発期間においては，固定文を話す機能のみ実装済みで，アカウントに応じて話す内容を変えるなどの機能は未実装）
    - 統計画面を通じて作業量を可視化することで，継続へのモチベーションを保つことができる
### 新規性
「誰かと一緒に作業したい」というニーズを解決するサービスにおいて，既存のものは「一緒に作業してくれる相手を探す」ことに着目したものが多い（例：[開催されているもくもく会を探せるプラットフォーム（techplay）](https://techplay.jp/tag/mokumoku)，[JPHACKS2021におけるチームC_2102が開発したMokuMoku-α](https://github.com/jphacks/C_2102)）．

その一方で，VRooMは「一緒に作業してくれるパートナーを擬似的に作り出す」ことで「誰かと一緒に作業したい」というニーズを満たすサービスである．
### 今後の展望
- アバターの挙動を改善する
    - アバターに椅子に座ってもらったうえでペンを持たせるなど，一緒に作業している感をより明確にする
    - 表情変化を実装し，より人間らしく見えるようにする
- VRMモデルの選択肢を増やす
    - ＜可能性1＞　運営側でたくさんのモデルを用意し，ユーザーがその中から選択する形式．VRMモデルは有料での売買が行われている（例：[BOOTH](https://booth.pm/ja/browse/3D%E3%83%A2%E3%83%87%E3%83%AB)）ほど，市場として大きな発展性があるため，VRooM内で使用できるモデルを課金アイテムとすることで，マネタイズも可能となり得る．
    - ＜可能性2＞　アプリ利用者がモデルを簡単にアップロードできる形式（現在実装済み）．自分の好きなキャラクターと一緒に作業ができるようになり，ユーザー体験の向上が期待できる．

- 作業の合間に行うことで効果的な休憩になり得るモードの数を増やす（現状はスクワットモードのみ）
    - 深呼吸モード
    - ストレッチモード
    - 腕立て伏せモード
    - 目のストレッチモード（例：[参天製薬](https://www.santen.co.jp/ja/healthcare/eye/eyecare/stretch/)）
- パフォーマンスチューニングをし，軽く動作するように改善する
- レスポンシブデザインの導入を完了させ，スマホやタブレットでも最適なUIでアプリを利用できるようにする．
    - 現状はパソコンでの利用を想定した実装が主で，レスポンシブ対応は一部のみとなっている．
- firebaseのデータベースを利用しユーザーのアプリ使用状況を可視化する機能を本番環境に統合する
    - 現状は，可視化単体の実装（値は決めうち）が完了しており，Googleアカウント，データベースとの連携は未実装
### 注力したこと（こだわり等）
- 特定のタイミングにアバターが動くことで，アバターに対して親近感を感じやすくした．
- 集中力を高めるためにシンプルなデザイン，機能設計を心がけた．

## 開発技術
### 活用した技術
#### API・データ
* animationデータ:[mixamo](https://www.mixamo.com/#/)
* 音声データ:[CoeFont](https://coefont.cloud/)
* モデルデータ
  * [AliciaSolid](https://3d.nicovideo.jp/works/td32797)
  * [ミライ小町](https://www.miraikomachi.com/download/)

#### フレームワーク・ライブラリ・モジュール
* nextjs
* zustand
* three
  * @pixiv/three-vrm
  * @react-three/fiber
* @mediapipe

#### インフラ
* Firebase
* 

### 独自技術
#### ハッカソンで開発した独自機能・技術
* 複数のアニメーションをvrmモデルに適応し管理したreactアプリ
  * @pixiv/three-vrm公式が[mixamoのアニメーションを動かすコード](https://github.com/pixiv/three-vrm/tree/dev/packages/three-vrm-core/examples/humanoidAnimation)を出していたが以下の点が課題だった。
    1. あくまでこれは「**単一のアニメーション**」だけを動かすものだった。
    2. このコードはバニラjavascriptで「**reactに最適化されていないコード**」だった。
    3. 最終更新日が2022年の10月4日とかなり直近で、ドキュメントなどもなく、「**実際に使用しているWEBアプリも見当たらなかった**」。
  * そのため今回のアプリのようにmixamoの「複数のアニメーション」を「vrmモデルに適応」し「管理」までしたことは独自機能だと思っている。
* スクワットモードのスクワット回数判定の最適化
  * [Pradnya1208/Squats\-angle\-detection\-using\-OpenCV\-and\-mediapipe\_v1](https://github.com/Pradnya1208/Squats-angle-detection-using-OpenCV-and-mediapipe_v1) は膝を曲げる角度を算出して判定しているが、一般的にWebカメラの角度で膝を映すことは難しい。
  * 肘の位置を動的に認識することで、スクワットモード開始時点の肘のラインを基準とした肩の高さ（UP/DOWN）で判定するようなアルゴリズムを開発した。
  * 我々が採用した方法は、直観的かつ合理的な方法であった。
