<div align="right">
    <h6>
        <picture>
            <source type="image/svg+xml" media="(prefers-color-scheme: dark)" srcset="https://assets.minify-js.org/images/icons/earth/white/icon32.svg?v=ad67551">
            <img height=14 src="https://assets.minify-js.org/images/icons/earth/black/icon32.svg?v=ad67551">
        </picture>
        &nbsp;繁體中文 |
        <a href="../..#readme">English</a> |
        <a href="../zh-cn#readme">简体中文</a> |
        <a href="../hi#readme">हिंदी</a> |
        <a href="../bn#readme">বাংলা</a> |
        <a href="../mr#readme">मराठी</a> |
        <a href="../pa#readme">ਪੰਜਾਬੀ</a> |
        <a href="../de#readme">Deutsch</a> |
        <a href="../es#readme">Español</a> |
        <a href="../fr#readme">Français</a>
    </h6>
</div>

<a id="top"></a>

# </> minify.js

### 遞歸地縮小所有 JavaScript 檔案。

<a href="https://npmstar.com/compare/@adamlui%2Fminify.js">
    <img height=31 src="https://img.shields.io/npm/dm/%40adamlui%2Fminify.js?label=%E4%B8%8B%E8%BC%89&logo=npm&color=af68ff&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="#%EF%B8%8F-mit-%E8%AE%B8%E5%8F%AF%E8%AF%81">
    <img height=31 src="https://img.shields.io/badge/許可證-MIT-orange.svg?logo=internetarchive&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://github.com/adamlui/minify.js/releases/tag/node-v2.4.1">
    <img height=31 src="https://img.shields.io/badge/最新版本-2.4.1-44cc11.svg?logo=icinga&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://www.npmjs.com/package/@adamlui/minify.js?activeTab=code">
    <img height=31 src="https://img.shields.io/npm/unpacked-size/%40adamlui%2Fminify.js?label=%E6%8B%86%E5%B0%81%E5%B0%BA%E5%AF%B8&style=for-the-badge&logo=ebox&logoColor=white&labelColor=464646&color=blue"></a>
<a href="https://sonarcloud.io/component_measures?metric=new_vulnerabilities&id=adamlui_minify.js:node.js/src/minify.js">
    <img height=31 src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fsonarcloud.io%2Fapi%2Fmeasures%2Fcomponent%3Fcomponent%3Dadamlui_minify.js%3Anode.js%2Fsrc%2Fminify.js%26metricKeys%3Dvulnerabilities&query=%24.component.measures.0.value&style=for-the-badge&logo=sonarcloud&logoColor=white&labelColor=464646&label=Vulnerabilities&color=gold"></a>
<a href="https://github.com/toolleeo/cli-apps#programming">
    <img height=31 src="https://img.shields.io/badge/中提到-Awesome-ff69b4?logo=awesomelists&logoColor=white&labelColor=464646&style=for-the-badge"></a>

<img src="https://cdn.jsdelivr.net/gh/adamlui/minify.js@3d56890/node.js/media/images/screenshots/cli/minify-js-docs-cmd-output.png">

<br>

<img height=6px width="100%" src="https://assets.minify-js.org/images/separators/aqua-gradient.png?v=ad67551">

## ⚡ 如何安裝

作為**全域實用程式**：

```
$ npm install -g @adamlui/minify.js
```

作為**開發人員依賴**（例如，對於建置腳本），從專案根目錄：

```
$ npm install -D @adamlui/minify.js
```

作為**運行時依賴**（例如，用於動態縮小），從專案根目錄：

```
$ npm install @adamlui/minify.js
```

<br>

<a href="https://github.com/sponsors/adamlui"><img src="https://assets.minify-js.org/images/banners/sponsor/$10/banner1660x260.png?v=63bbeed"></a>

<img height=6px width="100%" src="https://assets.minify-js.org/images/separators/aqua-gradient.png?v=ad67551">

## 💻 命令列使用

基本的**全域命令**是：

```
$ minify-js
```

**📝 注意:** 透過 `-n` 或 `--dry-run` 來只查看將處理哪些檔案。

#

指定**輸入/輸出**路徑：
   
```
$ minify-js [input_path] [output_path]
```

- `[input_path]`: 相對於目前工作目錄的 JS 檔案或包含要縮小的 JS 檔案的目錄的路徑。
- `[output_path]`: 儲存壓縮後檔案的檔案或目錄路徑，相對於輸入檔案的根目錄（如果未提供，則使用 `min/`）。

**📝 注意:** 如果传递文件夹，文件将被递归处理，除非传递 `-R` 或 `--no-recursion`。

#

若要用作 **套件腳本**，請在專案的 `package.json` 中：

```json
  "scripts": {
    "build:js": "<minify-js-cmd>"
  },
```

將 `<minify-js-cmd>` 替換為 `minify-js` + 可選參數。 然後，可以使用 `npm run build:js` 來執行該指令。

#

### 命令範例

縮小**目前目錄**中的所有 JavaScript 檔案（輸出到 `min/`）：

```
$ minify-js
```

縮小**特定目錄**中的所有 JavaScript 檔案（輸出到 `min/path/to/your/directory/`）：

```
$ minify-js path/to/your/directory
```

縮小**特定檔案**（輸出到 `min/path/to/your/file.min.js`）：

```
$ minify-js path/to/your/file.js
```

指定**輸入和輸出**目錄（輸出到 `output_folder/`）：

```
$ minify-js input_folder output_folder
```

#

### 命令列選項

```
布林選項：
 -n, --dry-run                        實際上並沒有縮小文件，只是顯示它們是否會被處理。
 -d, --include-dotfolders             在文件搜尋中包含點資料夾。
 -D, --include-dotfiles               在文件搜尋中包含點文件。
 -R, --no-recursion                   禁用遞歸文件搜尋。
 -M, --no-mangle                      禁用修改名稱。
 -X, --no-filename-change             禁止將檔案副檔名更改為 .min.js
 -i, --rewrite-imports                將導入路徑從 .js 更新為 .min.js
 -c, --copy                           如果處理單一來源文件，則將縮小的程式碼複製到剪貼簿而不是寫入文件。
 -r, --relative-output                輸出檔案相對於每個來源檔案的路徑，而不是相對於輸入檔案的根目錄。
 -q, --quiet                          禁止除錯誤之外的所有日誌記錄。

參數選項：
 --ignores="dir/,file1.js,file2.js"   要排除在壓縮之外的檔案/目錄。
 --comment="comment"                  將標題註解新增到縮小的程式碼中。使用 '\n' 按行分隔。
 --ui-lang="code"                     用於顯示使用者介面的語言的 ISO 639-1 代碼。
 --config="path/to/file"              Load custom config file.

訊息命令：
     --init                           Create config file (in project root).
 -h, --help                           顯示幫助畫面。
 -v, --version                        顯示版本號。
     --stats                          顯示 npm 統計資訊。
     --debug [targetKey]              顯示調試日誌。
```

#

### Configuration file

**minify.js** can be customized using a `minify.config.mjs` or `minify.config.js` placed in your project root.

Example defaults:

```js
export default {
    dryRun: false, // 並非實際壓縮文件，僅顯示是否會處理它們
    includeDotFolders: false, // 將點資料夾包含在檔案搜尋中
    includeDotFiles: false, // 將點檔案包含在檔案搜尋中
    noRecursion: false, // 停用遞迴文件搜索
    noMangle: false, // 停用名稱修飾
    noFilenameChange: false, // 停用將檔案副檔名變更為 .min.js
    rewriteImports: false, // 將導入路徑從 .js 更新為 .min.js
    copy: false, // 如果只處理一個文件，則將壓縮後的程式碼複製到剪貼簿而不是寫入文件
    relativeOutput: false, // 輸出檔案相對於每個來源檔案而不是輸入根目錄
    quietMo​​de: false, // 禁止記錄錯誤以外的所有日誌
    ignores: '', // 要從壓縮中排除的檔案/目錄
    comment: '' // 要加入壓縮後程式碼前面的頭部註釋
}
```

💡 Run `minify-js init` to generate a template `minify.config.mjs` in your project root.

<br>

<img height=6px width="100%" src="https://assets.minify-js.org/images/separators/aqua-gradient.png?v=ad67551">

## 🔌 API 使用

您也可以將 **minify.js** 匯入您的應用程式以使用其 API 方法，無論是作為 ECMAScript 模組還是 CommonJS 模組。

#### ESM*:

```js
import minifyJS from '@adamlui/minify.js'
```

#### CJS:

```js
const minifyJS = require('@adamlui/minify.js')
```

###### _*需要 Node.js 版本 14 或更高版本_

#

### `minify(input[, options])`

💡 根據提供的字串輸入縮小 JavaScript 程式碼。

如果傳入**原始碼**，則直接縮小，然後傳回一個包含 `srcPath` + `code` + `error` 的物件：

```js
const srcCode = 'function add(first, second) { return first + second }',
      minifyResult = minifyJS.minify(srcCode)

console.log(minifyResult.error) // 輸出運行時錯誤，如果沒有錯誤則輸出 `undefined`
console.log(minifyResult.code)  // 輸出縮小的 JS：'function add(n,d){return n+d}'
```

如果傳遞了**檔案路徑**，則載入檔案的程式碼然後縮小，傳回一個像上面一樣的物件。

如果傳遞 **目錄路徑**，則會搜尋 JavaScript 檔案（預設遞歸），載入每個程式碼並縮小，然後傳回包含 `srcPath` + `code` + `error` 的物件陣列：

```js
// 輸出工作目錄+所有巢狀目錄下 JS 檔案的來源路徑
const minifyResults = minifyJS.minify('.')
minifyResults.forEach(result => console.log(result.srcPath))

// 如果找到，則輸出第二個 JS 檔案的精簡程式碼，如果未找到，則輸出 `undefined`
console.log(minifyResults[1].code)
```

選項是布林值，作為物件屬性傳遞。 例如：

```js
// 傳回資料物件數組，如果 `input` 是路徑，則也會處理點文件
minifyJS.minify(input, { dotFiles: true })
```

可用的參數（及其預設設定）是：

姓名             | 類型   | 描述                                                       | 預設值
-----------------|-------|------------------------------------------------------------|--------
`recursive`      | 布林值 | 如果傳遞目錄路徑，則遞歸搜尋嵌套檔案。                        | `true`
`verbose`        | 布林值 | 在控制台/終端機中顯示日誌記錄。                              | `true`
`dotFolders`     | 布林值 | 在文件搜尋中包含點資料夾。                                   | `false`
`dotFiles`       | 布林值 | 在文件搜尋中包含點文件。                                     | `false`
`mangle`         | 布林值 | 縮短變數名稱（通常為一個字元）。                              | `true`
`rewriteImports` | 布林值 | 將導入路徑從 .js 更新為 .min.js                              | `false`
`relativeOutput` | 布林值 | 輸出檔案相對於每個來源檔案的路徑，而不是相對於輸入檔案的根目錄。 | `false`
`ignores`        | 大批   | 要排除在壓縮之外的檔案/目錄。                                 | `[]`
`comment`        | 細繩   | 加入到縮小程式碼之前的標頭註解。使用 '\n' 按行分隔。            | `''`

#

### `findJS(searchDir[, options])`

💡 在傳遞的 `searchDir` 字串中搜尋所有未縮小的 JavaScript 檔案（對於發現 [`minify()`](#minifyinput-options) 將處理哪些檔案很有用）並傳回包含其檔案路徑的陣列。

選項是布林值，作為物件屬性傳遞。 例如：

```js
// 在 assets/js 中搜尋未縮小的 JavaScript 檔案
const searchResults = minifyJS.findJS('assets/js', { recursive: false })
console.log(searchResults)

/* 範例輸出：

findJS() » Searching for unminified JS files...
findJS() » Search complete! 2 files found.
findJS() » Check returned array.
[
  'E:\\js\\utils\\minify.js\\assets\\js\\foo.js',
  'E:\\js\\utils\\minify.js\\assets\\js\\bar.js'
]
*/
```

可用的參數（及其預設設定）是：

姓名          | 類型   | 描述                                   | 預設值
--------------|-------|----------------------------------------|--------
`recursive`   | 布林值 |  遞歸搜尋傳遞的 searchDir 中的巢狀檔案。 | `true`
`verbose`     | 布林值 | 在控制台/終端機中顯示日誌記錄。          | `true`
`dotFolders`  | 布林值 | 在文件搜尋中包含點資料夾。               | `false`
`dotFiles`    | 布林值 | 在文件搜尋中包含點文件。                 | `false`
`ignores`     | 大批   | 要排除在壓縮之外的檔案/目錄。            | `[]`

<br>

<img height=6px width="100%" src="https://assets.minify-js.org/images/separators/aqua-gradient.png?v=ad67551">

## 🏛️ MIT 许可证

**版權所有 © 2023–2026 [刘展鹏 (Adam Lui)](https://github.com/adamlui) 和貢獻者**

特此免費授予任何取得副本的人許可本軟體和相關文件文件（『軟體』），處理在軟體中不受限制，包括但不限於權利使用、複製、修改、合併、發布、分發、再授權和/或出售該軟體的副本，並允許該軟體是提供這樣做，但須滿足以下條件：

上述版權聲明和本許可聲明應包含在所有軟體的副本或重要部分。

本軟體『依現況』提供，不提供任何形式的明示或保證暗示的，包括但不限於適銷性保證，適用於特定目的和非侵權。 在任何情況下都不得作者或版權持有人對任何索賠、損害或其他責任，無論是在合約、侵權或其他方面的行為中，由以下原因引起，出於或與軟體或使用或其他交易有關軟體。

<br>

<img height=6px width="100%" src="https://assets.minify-js.org/images/separators/aqua-gradient.png?v=ad67551">

## 🛠️ 相關實用程式

### [</> minify.js (Gulp)](https://github.com/adamlui/minify.js/tree/main/gulp/) &nbsp;<a href="https://github.com/toolleeo/cli-apps#programming"><img height=18 src="https://assets.minify-js.org/images/badges/awesome/badge.svg?v=63bbeed"></a>

> Gulp 外掛程式可遞歸地縮小所有 JavaScript 檔案。
<br>[安裝](https://github.com/adamlui/minify.js/tree/main/gulp/#-installation) /
[自述文件](https://github.com/adamlui/minify.js/tree/main/gulp/#readme) /
[討論](https://github.com/adamlui/minify.js/discussions)

### [{ } scss-to-css](https://scsstocss.org) &nbsp;<a href="https://github.com/toolleeo/cli-apps#conversion"><img height=18 src="https://assets.minify-js.org/images/badges/awesome/badge.svg?v=63bbeed"></a>

> 將所有 SCSS 檔案遞歸編譯為縮小的 CSS。
<br>[安裝](https://node.scsstocss.org/#-installation) /
[自述文件](https://node.scsstocss.org/#readme) /
[CLI 使用](https://node.scsstocss.org/#-command-line-usage) /
[API 使用](https://node.scsstocss.org/#-api-usage) /
[討論](https://github.com/adamlui/scss-to-css/discussions)

<br>

<img height=6px width="100%" src="https://assets.minify-js.org/images/separators/aqua-gradient.png?v=ad67551">

<picture><source media="(prefers-color-scheme: dark)" srcset="https://assets.minify-js.org/images/icons/home/white/icon32x27.png?v=ad67551"><img height=13 src="https://assets.minify-js.org/images/icons/home/dark-gray/icon32x27.png?v=ad67551"></picture> <a href="https://js-utils.org">**更多 JavaScript 實用程式**</a> /
<a href="https://github.com/adamlui/minify.js/discussions">讨论</a> /
<a href="#top">回到顶部 ↑</a>
