<div align="center">
    <h6>
        <picture>
            <source type="image/svg+xml" media="(prefers-color-scheme: dark)" srcset="https://media.scsstocss.org/images/icons/earth/white/icon32.svg?52b67bc">
            <img height=14 src="https://media.scsstocss.org/images/icons/earth/black/icon32.svg?52b67bc">
        </picture>
        &nbsp;繁體中文 |
        <a href="../..#readme">English</a> |
        <a href="../zh-cn#readme">简体中文</a> |
        <a href="../ja#readme">日本語</a> |
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

### 將所有 SCSS 檔案遞歸編譯為縮小的 CSS。

<a href="https://www.npmjs.com/package/@adamlui/scss-to-css"><img height=31 src="https://img.shields.io/npm/dm/%40adamlui%2Fscss-to-css?label=%E4%B8%8B%E8%BC%89&logo=npm&color=af68ff&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="#%EF%B8%8F-mit-%E8%AE%B8%E5%8F%AF%E8%AF%81"><img height=31 src="https://img.shields.io/badge/許可證-MIT-orange.svg?logo=internetarchive&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://github.com/adamlui/js-utils/releases/tag/scss-to-css-1.10.21"><img height=31 src="https://img.shields.io/badge/最新版本-1.10.21-44cc11.svg?logo=icinga&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://www.npmjs.com/package/@adamlui/scss-to-css?activeTab=code"><img height=31 src="https://img.shields.io/npm/unpacked-size/%40adamlui%2Fscss-to-css?label=%E6%8B%86%E5%B0%81%E5%B0%BA%E5%AF%B8&style=for-the-badge&logo=ebox&logoColor=white&color=blue&labelColor=464646"></a>
<a href="https://sonarcloud.io/component_measures?metric=new_vulnerabilities&id=adamlui_scss-to-css:node.js/src/scss-to-css.js"><img height=31 src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fsonarcloud.io%2Fapi%2Fmeasures%2Fcomponent%3Fcomponent%3Dadamlui_scss-to-css%3Anode.js%2Fsrc%2Fscss-to-css.js%26metricKeys%3Dvulnerabilities&query=%24.component.measures.0.value&style=for-the-badge&logo=sonarcloud&logoColor=white&labelColor=464646&label=%E6%BC%8F%E6%B4%9E&color=gold"></a>
<a href="https://github.com/toolleeo/cli-apps#conversion"><img height=31 src="https://img.shields.io/badge/中提到-Awesome-c4a2bd?logo=awesomelists&logoColor=white&labelColor=464646&style=for-the-badge"></a>

<img height=6px width="100%" src="https://media.scsstocss.org/images/separators/gradient-aqua.png?52b67bc">

## ⚡ 如何安裝

作為**全域實用程式**：

```
$ npm install -g @adamlui/scss-to-css
```

作為**開發人員依賴**（例如，對於建置腳本），從專案根目錄：

```
$ npm install -D @adamlui/scss-to-css
```

作為**運行時依賴**（例如，用於動態編譯），從專案根目錄：

```
$ npm install @adamlui/scss-to-css
```

<br>

<a href="https://github.com/sponsors/adamlui"><img src="https://media.scsstocss.org/images/banners/sponsor/$10/banner1660x260.png?2cba0ae"></a>

<img height=6px width="100%" src="https://media.scsstocss.org/images/separators/gradient-aqua.png?52b67bc">

## 💻 命令列使用

基本的**全域命令**是：

```
$ scss-to-css
```

範例輸出：

<img src="https://cdn.jsdelivr.net/gh/adamlui/scss-to-css@b74edea/node.js/media/images/screenshots/cli/scss-to-css-docs-cmd-output.png">

**📝 筆記：**預設也會產生來源映射，除非傳遞 `-S` 或 `--no-source-maps`。

#

指定**輸入/輸出**路徑：
   
```
$ scss-to-css [input_path] [output_path]
```

- `[input_path]`: SCSS 檔案或包含要編譯的 SCSS 檔案的目錄的路徑，相對於目前工作目錄。
- `[output_path]`: 將儲存 CSS + 來源對應檔案的檔案或目錄的路徑，相對於原始檔案位置（如果未提供，則使用 `css/`）。

**📝 注意:** 如果傳遞資料夾，檔案將被遞歸處理，除非傳遞 `-R` 或 `--no-recursion`。

#

若要用作 **套件腳本**，請在專案的 `package.json` 中：

```json
  "scripts": {
    "build:css": "<scss-to-css-cmd>"
  },
```

將 `<scss-to-css-cmd>` 替換為 `scss-to-css` + 可選參數。 然後，可以使用 `npm run build:css` 來執行該指令。

#

### 命令範例

編譯 **目前目錄** 中的所有 SCSS 檔案（輸出到 `css/`）：

```
$ scss-to-css
```

編譯 **特定目錄** 中的所有 SCSS 檔案（輸出到 `path/to/your/directory/css/`）：

```
$ scss-to-css path/to/your/directory
```

編譯一個**特定檔案**（輸出到 `path/to/your/css/file.min.css`）：

```
$ scss-to-css path/to/your/file.scss
```

指定 **輸入和輸出** 目錄（輸出到 `output_folder/`）：

```
$ scss-to-css input_folder output_folder
```

**📝 注意:** 除非傳遞 `-M` 或 `--no-minify` ，否則輸出 CSS 會被縮小。

#

### 命令列選項

```
布林選項：
 -n, --dry-run                            實際上並不會縮小文件，只是顯示它們是否會被處理。
 -d, --include-dotfolders                 在檔案搜尋中包含點資料夾。
 -S, --no-source-maps                     防止產生來源映射。
 -M, --no-minify                          禁用輸出 CSS 的縮小。
 -R, --no-recursion                       停用遞歸檔案搜尋。
 -c, --copy                               如果處理單一原始文件，則將編譯後的 CSS 複製到剪貼簿，而不是寫入檔案。
 -q, --quiet                              禁止錯誤以外的所有日誌記錄。

參數選項：
 --ignore-files="file1.scss,file2.scss"   要從編譯中排除的檔案。
 --comment="comment"                      將標頭註釋新增到已編譯的 CSS 中。使用 '\n' 按行分隔。

訊息命令：
 -h, --help                               顯示幫助畫面。
 -v, --version                            顯示版本號。
```

<br>

<img height=6px width="100%" src="https://media.scsstocss.org/images/separators/gradient-aqua.png?52b67bc">

## 🔌 API 使用

您也可以將 **scss-to-css** 匯入您的應用程式以使用其 API 方法，無論是作為 ECMAScript 模組還是 CommonJS 模組。

#### ECMAScript*:

```js
import scssToCSS from '@adamlui/scss-to-css';
```

#### CJS:

```js
const scssToCSS = require('@adamlui/scss-to-css');
```

###### _*需要 Node.js 版本 14 或更高版本_

#

### `compile(input[, options])`

💡 根據提供的字串輸入編譯 SCSS。

如果傳入**原始碼**，則直接編譯，然後傳回一個包含 `srcPath` + `code` + `srcMap` + `error` 的物件：

```js
const srcCode = 'h1 { font-size: 40px ; code { font-face: Roboto Mono }}',
      compileResult = scssToCSS.compile(srcCode);

console.log(compileResult.error); // 輸出運行時錯誤，如果沒有錯誤則輸出 `undefined`
console.log(compileResult.code);  // 輸出縮小的 CSS: 'h1{font-size:40px}h1 code{font-face:Roboto Mono}'
```

如果傳遞了 **檔案路徑**，則檔案的程式碼將被加載，然後編譯為 CSS，傳回一個像上面一樣的物件。

如果传递 **目录路径**，则搜索 SCSS 文件（默认情况下递归），加载每个文件的代码并编译，然后返回包含 `srcPath` + `code` + `srcMap` + `error` 的对象数组：

```js
// 輸出工作目錄 + 所有巢狀目錄中 SCSS 檔案的路徑
const compileResults = scssToCSS.compile('.');
compileResults.forEach(result => console.log(result.srcPath));

// 如果找到，則輸出從第二個 SCSS 檔案編譯的 CSS，如果未找到，則輸出 `undefined`
console.log(compileResults[1].code);
```

選項是布林值，作為物件屬性傳遞。 例如：

```js
// 傳回資料物件數組，其中 `.code` 包含未縮小的 CSS
scssToCSS.compile(inputDir, { minify: false });
```

可用的參數（及其預設設定）是：

姓名          | 類型    | 描述                                              | 預設值
--------------|--------|---------------------------------------------------|--------
`recursive`   | 布林值 | 如果傳遞目錄路徑，則遞歸搜尋巢狀檔案。                | `true`
`verbose`     | 布林值 | 在控制台/終端機中顯示日誌記錄。                      | `true`
`dotFolders`  | 布林值 | 在檔案搜尋中包含點資料夾。                           | `false`
`minify`      | 布林值 | 縮小輸出 CSS。                                      | `true`
`sourceMaps`  | 布林值 | 產生 CSS 來源映射。                                 | `true`
`ignoreFiles` | 大批   | 要從編譯中排除的檔案（按名稱）。                     | `[]`
`comment`     | 字串   | 新增到已編譯 CSS 前面的標頭註解。使用 '\n' 按行分隔。 | `''`

#

### `findSCSS(searchDir[, options])`

💡 搜尋傳遞的 `searchDir` 字串中的所有 SCSS 檔案（對於發現 [`compile()`](#compileinput-options) 將處理哪些檔案很有用）並傳回包含其檔案路徑的陣列。

選項是布林值，作為物件屬性傳遞。 例如：

```js
// 在 assets/scss 中搜尋 SCSS 檔案
const searchResults = scssToCSS.findSCSS('assets/scss', { recursive: false });
console.log(searchResults);

/* 範例輸出：

findSCSS() » Searching for SCSS files...
findSCSS() » Search complete! 2 files found.
findSCSS() » Check returned array.
[
  'E:\\js\\utils\\scss-to-css\assets\\scss\\foo.scss',
  'E:\\js\\utils\\scss-to-css\assets\\scss\\bar.scss'
]
*/
```

可用的參數（及其預設設定）是：

姓名          | 類型    | 描述                                 | 預設值
--------------|--------|--------------------------------------|--------
`recursive`   | 布林值 | 遞歸搜尋傳遞的 searchDir 中的巢狀檔案。 | `true`
`verbose`     | 布林值 | 在控制台/終端機中顯示日誌記錄。         | `true`
`dotFolders`  | 布林值 | 在檔案搜尋中包含點資料夾。              | `false`
`ignoreFiles` | 大批   | 要從搜尋結果中排除的檔案（按名稱）。     | `[]`

<br>

<img height=6px width="100%" src="https://media.scsstocss.org/images/separators/gradient-aqua.png?52b67bc">

## 🏛️ MIT 许可证

**版權所有 © 2024 [刘展鹏 (Adam Lui)](https://github.com/adamlui) 和貢獻者**

特此免費授予任何取得副本的人許可本軟體和相關文件文件（『軟體』），處理在軟體中不受限制，包括但不限於權利使用、複製、修改、合併、發布、分發、再授權和/或出售該軟體的副本，並允許該軟體是提供這樣做，但須滿足以下條件：

上述版權聲明和本許可聲明應包含在所有軟體的副本或重要部分。

本軟體『依現況』提供，不提供任何形式的明示或保證暗示的，包括但不限於適銷性保證，適用於特定目的和非侵權。 在任何情況下都不得作者或版權持有人對任何索賠、損害或其他責任，無論是在合約、侵權或其他方面的行為中，由以下原因引起，出於或與軟體或使用或其他交易有關軟體。

<br>

<img height=6px width="100%" src="https://media.scsstocss.org/images/separators/gradient-aqua.png?52b67bc">

## 🛠️ 相關實用程式

### [🖼️ img-to-webp](https://imgtowebp.org)

> 遞歸地將所有影像壓縮為 WEBP。
<br>[下載](https://cdn.jsdelivr.net/gh/adamlui/js-utils/img-to-webp/img-to-webp.js) /
[討論](https://github.js-utils.org/discussions)

### [</> minify.js](https://minify-js.org) &nbsp;<a href="https://github.com/toolleeo/cli-apps#programming"><img height=18 src="https://media.scsstocss.org/images/badges/awesome/badge.svg?52b67bc"></a>

> 遞歸地縮小所有 JavaScript 檔案。
<br>[安裝](https://minify-js.org/docs/zh-tw#-%E5%A6%82%E4%BD%95%E5%AE%89%E8%A3%9D) /
[自述文件](https://minify-js.org/docs/zh-tw#readme) /
[CLI 用法](https://minify-js.org/docs/zh-tw#-%E5%91%BD%E4%BB%A4%E5%88%97%E4%BD%BF%E7%94%A8) /
[API 使用](https://minify-js.org/docs/zh-tw#-api-%E4%BD%BF%E7%94%A8) /
[討論](https://github.js-utils.org/discussions)

<br>

<img height=6px width="100%" src="https://media.scsstocss.org/images/separators/gradient-aqua.png?52b67bc">

<picture><source media="(prefers-color-scheme: dark)" srcset="https://media.scsstocss.org/images/icons/home/white/icon32x27.png?52b67bc"><img height=13 src="https://media.scsstocss.org/images/icons/home/dark-gray/icon32x27.png?52b67bc"></picture> <a href="https://js-utils.org">**更多 JavaScript 實用程式**</a> /
<a href="https://github.scsstocss.org/discussions">讨论</a> /
<a href="#--scss-to-css">回到顶部 ↑</a>
