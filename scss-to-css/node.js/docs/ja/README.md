<div align="center">
    <h6>
        <picture>
            <source type="image/svg+xml" media="(prefers-color-scheme: dark)" srcset="https://assets.scsstocss.org/images/icons/earth/white/icon32.svg?v=7e4a141">
            <img height=14 src="https://assets.scsstocss.org/images/icons/earth/black/icon32.svg?v=7e4a141">
        </picture>
        &nbsp;日本語 |
        <a href="../..#readme">English</a> |
        <a href="../zh-cn#readme">简体中文</a> |
        <a href="../zh-tw#readme">繁體中文</a> |
        <a href="../hi#readme">हिंदी</a> |
        <a href="../bn#readme">বাংলা</a> |
        <a href="../mr#readme">मराठी</a> |
        <a href="../pa#readme">ਪੰਜਾਬੀ</a> |
        <a href="../de#readme">Deutsch</a> |
        <a href="../es#readme">Español</a> |
        <a href="../fr#readme">Français</a> |
        <a href="../it#readme">Italiano</a> |
        <a href="../nl#readme">Nederlands</a> |
        <a href="../pt#readme">Português</a>
    </h6>
</div>

# { } scss-to-css

### すべての SCSS ファイルを再帰的に圧縮された CSS にコンパイルします。

<a href="https://www.npmjs.com/package/@adamlui/scss-to-css">
    <img height=31 src="https://img.shields.io/npm/dm/%40adamlui%2Fscss-to-css?logo=npm&color=af68ff&logoColor=white&labelColor=464646&style=for-the-badge&label=%E3%83%80%E3%82%A6%E3%83%B3%E3%83%AD%E3%83%BC%E3%83%89"></a>
<a href="#%EF%B8%8F-mit-ライセンス">
    <img height=31 src="https://img.shields.io/badge/ライセンス-MIT-orange.svg?logo=internetarchive&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://github.com/adamlui/js-utils/releases/tag/scss-to-css-1.10.29">
    <img height=31 src="https://img.shields.io/badge/最新のビルド-1.10.29-44cc11.svg?logo=icinga&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://www.npmjs.com/package/@adamlui/scss-to-css?activeTab=code">
    <img height=31 src="https://img.shields.io/npm/unpacked-size/%40adamlui%2Fscss-to-css?style=for-the-badge&logo=ebox&logoColor=white&color=blue&labelColor=464646&label=%E9%96%8B%E6%A2%B1%E5%BE%8C%E3%81%AE%E3%82%B5%E3%82%A4%E3%82%BA"></a>
<a href="https://sonarcloud.io/component_measures?metric=new_vulnerabilities&id=adamlui_scss-to-css:node.js/src/scss-to-css.js">
    <img height=31 src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fsonarcloud.io%2Fapi%2Fmeasures%2Fcomponent%3Fcomponent%3Dadamlui_scss-to-css%3Anode.js%2Fsrc%2Fscss-to-css.js%26metricKeys%3Dvulnerabilities&query=%24.component.measures.0.value&style=for-the-badge&logo=sonarcloud&logoColor=white&labelColor=464646&label=%E8%84%86%E5%BC%B1%E6%80%A7&color=gold"></a>
<a href="https://github.com/toolleeo/cli-apps#conversion">
    <img height=31 src="https://img.shields.io/badge/で言及-Awesome-c4a2bd?logo=awesomelists&logoColor=white&labelColor=464646&style=for-the-badge"></a>

<img height=6px width="100%" src="https://assets.scsstocss.org/images/separators/aqua-gradient.png?v=7e4a141">

## ⚡ インストール

**グローバル ユーティリティ**として:

```
$ npm install -g @adamlui/scss-to-css
```

**開発者の依存関係** (ビルド スクリプトなど) として、プロジェクト ルートから次のようにします:

```
$ npm install -D @adamlui/scss-to-css
```

**実行時の依存関係** (たとえば、オンザフライ コンパイルの場合) として、プロジェクト ルートから次のようにします:

```
$ npm install @adamlui/scss-to-css
```

<br>

<a href="https://github.com/sponsors/adamlui"><img src="https://assets.scsstocss.org/images/banners/sponsor/$10/banner1660x260.png?v=2cba0ae"></a>

<img height=6px width="100%" src="https://assets.scsstocss.org/images/separators/aqua-gradient.png?v=7e4a141">

## 💻 コマンドラインの使用法

基本的な **グローバル コマンド**は次のとおりです:

```
$ scss-to-css
```

サンプル出力:

<img src="https://cdn.jsdelivr.net/gh/adamlui/scss-to-css@b74edea/node.js/media/images/screenshots/cli/scss-to-css-docs-cmd-output.png">

**📝 注:** `-S` または `--no-source-maps` が渡されない限り、ソース マップもデフォルトで生成されます。

#

**入力/出力** パスを指定するには:

```
$ scss-to-css [input_path] [output_path]
```

- `[input_path]`: 現在の作業ディレクトリを基準とした、コンパイル対象の SCSS ファイルまたは SCSS ファイルを含むディレクトリへのパス。
- `[output_path]`: CSS + ソース マップ ファイルが保存されるファイルまたはディレクトリへのパス (元のファイルの場所を基準とした相対パス) (指定しない場合は、`css/` が使用されます)。

**📝 注:** フォルダーが渡された場合、`-R` または `--no-recursion` が渡されない限り、ファイルは再帰的に処理されます。

#

**パッケージ スクリプト**として使用するには、プロジェクトの `package.json` で次のようにします:

```json
  "scripts": {
    "build:css": "<scss-to-css-cmd>"
  },
```

`<scss-to-css-cmd>` を `scss-to-css` + オプションの引数に置き換えます。 次に、`npm run build:css` を使用してコマンドを実行できます。

#

### コマンド例

**現在のディレクトリ** にあるすべての SCSS ファイルをコンパイルします (`css/` に出力します):

```
$ scss-to-css
```

**特定のディレクトリ**内のすべての SCSS ファイルをコンパイルします (`path/to/your/directory/css/` に出力されます):

```
$ scss-to-css path/to/your/directory
```

**特定のファイル**をコンパイルします (`path/to/your/css/file.min.css` に出力されます):

```
$ scss-to-css path/to/your/file.scss
```

**入力ディレクトリと出力** ディレクトリの両方を指定します (出力は `output_folder/` にあります):

```
$ scss-to-css input_folder output_folder
```

**📝 注:** 出力 CSS は、`-M` または `--no-minify` が渡されない限り縮小されます。

#

### コマンドラインオプション

```
ブール値のオプション:
 -n, --dry-run                            実際にファイルをコンパイルするのではなく、ファイルが処理されるかどうかを示すだけです。
 -d, --include-dotfolders                 ファイル検索にドットフォルダーを含めます。
 -S, --no-source-maps                     ソース マップが生成されないようにします。
 -M, --no-minify                          出力 CSS の縮小を無効にします。
 -R, --no-recursion                       再帰的なファイル検索を無効にします。
 -c, --copy                               単一のソース ファイルが処理される場合は、コンパイルされた CSS をファイルに書き込むのではなく、クリップボードにコピーします。
 -q, --quiet                              エラーを除くすべてのログを抑制します。

パラメータオプション:
 --ignore-files="file1.scss,file2.scss"   コンパイルから除外するファイル。
 --comment="comment"                      コンパイルされた CSS の先頭にヘッダー コメントを追加します。'\n' を使用して行で区切ります。

情報コマンド:
 -h, --help                               ヘルプ画面を表示します。
 -v, --version                            バージョン番号を表示します。
```

<br>

<img height=6px width="100%" src="https://assets.scsstocss.org/images/separators/aqua-gradient.png?v=7e4a141">

## 🔌 API の使用法

**scss-to-css** をアプリにインポートして、ECMAScript モジュールまたは CommonJS モジュールの両方として API メソッドを使用することもできます。

#### ECMAScript*:

```js
import scssToCSS from '@adamlui/scss-to-css';
```

#### CJS:

```js
const scssToCSS = require('@adamlui/scss-to-css');
```

###### _*Node.js バージョン 14 以降が必要_

#

### `compile(input[, options])`

💡 指定された文字列入力に基づいて SCSS をコンパイルします。

**ソース コード** が渡された場合、それは直接コンパイルされ、`srcPath` + `code` + `srcMap` + `error` を含むオブジェクトが返されます:

```js
const srcCode = 'h1 { font-size: 40px ; code { font-face: Roboto Mono }}',
      compileResult = scssToCSS.compile(srcCode);

console.log(compileResult.error); // 実行時エラーを出力するか、エラーがない場合は `undefined` を出力します
console.log(compileResult.code);  // 縮小されたCSSを出力します: 'h1{font-size:40px}h1 code{font-face:Roboto Mono}'
```

**ファイル パス**が渡された場合、ファイルのコードがロードされて CSS にコンパイルされ、上記のようなオブジェクトが返されます。

**ディレクトリ パス**が渡された場合、SCSS ファイルが検索され (デフォルトでは再帰的)、それぞれのコードがロードされてコンパイルされ、`srcPath` + `code` + `srcMap` + `error` を含むオブジェクトの配列が返されます:

```js
// 作業ディレクトリ + ネストされたすべてのディレクトリ内の SCSS ファイルへのパスを出力します
const compileResults = scssToCSS.compile('.');
compileResults.forEach(result => console.log(result.srcPath));

// 見つかった場合は 2 番目の SCSS ファイルからコンパイルされた CSS を出力し、見つからなかった場合は `undefined` を出力します
console.log(compileResults[1].code);
```

オプションはブール値であり、オブジェクトのプロパティとして渡されます。 例えば：

```js
// `.code` に縮小されていない CSS が含まれるデータ オブジェクトの配列を返します
scssToCSS.compile(inputDir, { minify: false });
```

利用可能なパラメータ (およびそのデフォルト設定) は次のとおりです:

名前          | タイプ    | 説明                                                                             | デフォルト値
--------------|----------|----------------------------------------------------------------------------------|-------------
`recursive`   | ブール値 | ディレクトリパスが渡された場合、ネストされたファイルを再帰的に検索します。              | `true`
`verbose`     | ブール値 | コンソール/ターミナルにログを表示します。                                            | `true`
`dotFolders`  | ブール値 | ファイル検索にドットフォルダーを含めます。                                           | `false`
`minify`      | ブール値 | 出力 CSS を縮小します。                                                            | `true`
`sourceMaps`  | ブール値 | CSS ソースマップを生成します。                                                      | `true`
`ignoreFiles` | 配列     | コンパイルから除外するファイル (名前別)。                                            | `[]`
`comment`     | 文字列   | コンパイルされた CSS の先頭に追加するヘッダー コメント。'\n' を使用して行で区切ります。 | `''`

#

### `findSCSS(searchDir[, options])`

💡 渡された `searchDir` 文字列内のすべての SCSS ファイルを検索し ([`compile()`](#compileinput-options) が処理するファイルを見つけるのに役立ちます)、そのファイルパスを含む配列を返します。

オプションはブール値であり、オブジェクトのプロパティとして渡されます。 例えば：

```js
// 正確に assets/scss で SCSS ファイルを検索します
const searchResults = scssToCSS.findSCSS('assets/scss', { recursive: false });
console.log(searchResults);

/* サンプル出力:

findSCSS() » Searching for SCSS files...
findSCSS() » Search complete! 2 files found.
findSCSS() » Check returned array.
[
  'E:\\js\\utils\\scss-to-css\assets\\scss\\foo.scss',
  'E:\\js\\utils\\scss-to-css\assets\\scss\\bar.scss'
]
*/
```

利用可能なパラメータ (およびそのデフォルト設定) は次のとおりです:

名前          | タイプ   | 説明                                                         | デフォルト値
--------------|---------|--------------------------------------------------------------|-------------
`recursive`   | ブール値 | 渡された searchDir 内のネストされたファイルを再帰的に検索します。 | `true`
`verbose`     | ブール値 | コンソール/ターミナルにログを表示します。                        | `true`
`dotFolders`  | ブール値 | ファイル検索にドットフォルダーを含めます。                       | `false`
`ignoreFiles` | 配列     | 検索結果から除外するファイル (名前順)。                         | `[]`

<br>

<img height=6px width="100%" src="https://assets.scsstocss.org/images/separators/aqua-gradient.png?v=7e4a141">

## 🏛️ MIT ライセンス

**著作権 © 2024 [Adam Lui](https://github.com/adamlui) と貢献者**

本ソフトウェアおよび関連ドキュメント ファイル (以下「ソフトウェア」) のコピーを入手した人には、使用、コピー、変更、マージする権利を含むがこれらに限定されない、制限なくソフトウェアを取り扱う許可が、ここに無償で与えられます。 、以下の条件を条件として、本ソフトウェアのコピーを出版、配布、サブライセンス、および/または販売すること、および本ソフトウェアが提供される人物にそれを許可すること。

上記の著作権表示およびこの許可通知は、ソフトウェアのすべてのコピーまたは主要部分に含まれるものとします。

ソフトウェアは「現状のまま」提供され、明示的か黙示的かを問わず、商品性、特定目的への適合性、および非侵害の保証を含むがこれらに限定されない、いかなる種類の保証も行われません。 いかなる場合においても、作者または著作権所有者は、契約行為、不法行為、またはその他の行為であるかどうかにかかわらず、ソフトウェアまたはソフトウェアの使用またはその他の取引に起因または関連して生じる、いかなる請求、損害、またはその他の責任に対しても責任を負わないものとします。 ソフトウェア。

<br>

<img height=6px width="100%" src="https://assets.scsstocss.org/images/separators/aqua-gradient.png?v=7e4a141">

## 🛠️ 関連ユーティリティ

### [🖼️ img-to-webp](https://imgtowebp.org)

> すべての画像を再帰的に WEBP に圧縮します。
<br>[ダウンロード](https://cdn.jsdelivr.net/gh/adamlui/js-utils/img-to-webp/img-to-webp.js) /
[話し合う](https://github.js-utils.org/discussions)

### [</> minify.js](https://minify-js.org) &nbsp;<a href="https://github.com/toolleeo/cli-apps#programming"><img height=18 src="https://assets.scsstocss.org/images/badges/awesome/badge.svg?v=7e4a141"></a>

> すべての JavaScript ファイルを再帰的に縮小します。
<br>[インストール](https://node.minify-js.org/#-installation) /
[お読みください](https://node.minify-js.org/#readme) /
[CLI の使用法](https://node.minify-js.org/#-command-line-usage) /
[API の使用法](https://node.minify-js.org/#-api-usage) /
[話し合う](https://github.js-utils.org/discussions)

<br>

<img height=6px width="100%" src="https://assets.scsstocss.org/images/separators/aqua-gradient.png?v=7e4a141">

<picture><source media="(prefers-color-scheme: dark)" srcset="https://assets.scsstocss.org/images/icons/home/white/icon32x27.png?v=7e4a141"><img height=13 src="https://assets.scsstocss.org/images/icons/home/dark-gray/icon32x27.png?v=7e4a141"></picture> <a href="https://js-utils.org">**その他の JavaScript ユーティリティ**</a> /
<a href="https://github.scsstocss.org/discussions">話し合う</a> /
<a href="#--scss-to-css">トップに戻る ↑</a>
