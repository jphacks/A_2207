# サンプル（プロダクト名）

[![IMAGE ALT TEXT HERE](https://jphacks.com/wp-content/uploads/2022/08/JPHACKS2022_ogp.jpg)](https://www.youtube.com/watch?v=LUPQFB4QyVo)

## 製品概要
### 背景(製品開発のきっかけ、課題等）
### 製品説明（具体的な製品の説明）
### 特長
#### 1. 特長1
#### 2. 特長2
#### 3. 特長3

### 解決出来ること
### 今後の展望
### 注力したこと（こだわり等）
* 
* 

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

#### デバイス
* 
* 

### 独自技術
#### ハッカソンで開発した独自機能・技術
* 複数のアニメーションをvrmモデルに適応し管理したreactアプリ
  * @pixiv/three-vrm公式が[mixamoのアニメーションを動かすコード](https://github.com/pixiv/three-vrm/tree/dev/packages/three-vrm-core/examples/humanoidAnimation)を出していたが以下の点が課題だった。
    1. あくまでこれは「**単一のアニメーション**」だけを動かすものだった。
    2. このコードはバニラjavascriptで「**reactに最適化されていないコード**」だった。
    3. 最終更新日が2022年の10月4日とかなり直近で、ドキュメントなどもなく、「**実際に使用しているWEBアプリも見当たらなかった**」。
  * そのため今回のアプリのようにmixamoの「複数のアニメーション」を「vrmモデルに適応」し「管理」までしたことは独自機能だと思っている。

#### 製品に取り入れた研究内容（データ・ソフトウェアなど）（※アカデミック部門の場合のみ提出必須）
* 
* 
