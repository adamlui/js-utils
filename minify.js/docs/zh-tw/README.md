<div align="right">
    <h6>
        <picture>
            <source type="image/svg+xml" media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/earth-icon/white/icon32.svg">
            <img height=14 src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/earth-icon/black/icon32.svg">
        </picture>
        &nbsp;繁體中文 |
        <a href="../..#readme">English</a> |
        <a href="../zh-cn#readme">简体中文</a> |
        <a href="../hi#readme">हिंदी</a> |
        <a href="../bn#readme">বাংলা</a> |
        <a href="../mr#readme">मराठी</a> |
        <a href="../pa#readme">ਪੰਜਾਬੀ</a>
    </h6>
</div>

# </> minify.js

### 遞歸地縮小所有 JavaScript 檔案。

<a href="https://www.npmjs.com/package/@adamlui/minify.js"><img height=31 src="https://img.shields.io/npm/dt/%40adamlui%2Fminify.js?label=%E4%B8%8B%E8%BC%89&logo=npm&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="#%EF%B8%8F-mit-%E8%AE%B8%E5%8F%AF%E8%AF%81"><img height=31 src="https://img.shields.io/badge/許可證-MIT-red.svg?logo=internetarchive&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://www.npmjs.com/package/@adamlui/minify.js?activeTab=versions"><img height=31 src="https://img.shields.io/badge/最新版本-1.4.1-fc7811.svg?logo=icinga&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://www.npmjs.com/package/@adamlui/minify.js?activeTab=code"><img height=31 src="https://img.shields.io/npm/unpacked-size/%40adamlui%2Fminify.js?label=%E6%8B%86%E5%B0%81%E5%B0%BA%E5%AF%B8&style=for-the-badge&logo=ebox&logoColor=white&labelColor=464646&color=blue"></a>
<a href="https://sonarcloud.io/component_measures?metric=new_vulnerabilities&id=adamlui_js-utils:minify.js/minify.js"><img height=31 src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fsonarcloud.io%2Fapi%2Fmeasures%2Fcomponent%3Fcomponent%3Dadamlui_js-utils%3Aminify.js%2Fminify.js%26metricKeys%3Dvulnerabilities&query=%24.component.measures.0.value&style=for-the-badge&logo=sonarcloud&logoColor=white&labelColor=464646&label=%E6%BC%8F%E6%B4%9E&color=gold"></a>

<img src="https://github.com/adamlui/js-utils/blob/main/minify.js/media/images/minify.js-docs-demo.png">

<br>

<img height=8px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

## ⚡ 如何安裝

作為**全域實用程式**：

```
npm install -g @adamlui/minify.js
```

作為**開發人員依賴**（例如，對於建置腳本），從專案根目錄：

```
npm install -D @adamlui/minify.js
```

作為**運行時依賴**（例如，用於動態縮小），從專案根目錄：

```
npm install @adamlui/minify.js
```

## 💻 命令列使用

基本的**全域命令**是：

```
minify-js
```

**💡 注意：** 透過 `-n` 或 `--dry-run` 來只查看將處理哪些檔案。

#

指定**輸入/輸出**路徑：
   
```
minify-js [input_path] [output_path]
```

- `[input_path]`: 相對於目前工作目錄的 JS 檔案或包含要縮小的 JS 檔案的目錄的路徑。
- `[output_path]`: 將儲存縮小檔案的檔案或目錄的路徑，相對於原始檔案位置（如果未提供，則使用 `min/`）。

**💡 注意：** 如果传递文件夹，文件将被递归处理，除非传递 `-R` 或 `--no-recursion`。

#

若要用作 **套件腳本**，請在專案的 `package.json` 中：

```json
  "scripts": {
    "build:js": "<minify-js-cmd>"
  },
```

將 `<minify-js-cmd>` 替換為 `minify-js` + 可選參數。 然後，可以使用 `npm run build:js` 來執行該指令。
<br><br>

### 命令範例

縮小**目前目錄**中的所有 JavaScript 檔案（輸出到 `min/`）：

```
minify-js
```

縮小**特定目錄**中的所有 JavaScript 檔案（輸出到 `path/to/your/directory/min/`）：

```
minify-js path/to/your/directory
```

縮小**特定檔案**（輸出到 `path/to/your/min/file.min.js`）：

```
minify-js path/to/your/file.js
```

指定**輸入和輸出**目錄（輸出到 `output_folder/`）：

```
minify-js input_folder output_folder
```

### 命令列選項

```
配置選項：
 -n, --dry-run               實際上並沒有縮小文件，只是顯示它們是否會被處理。
 -d, --include-dotfolders    在文件搜尋中包含點資料夾。
 -D, --include-dotfiles      在文件搜尋中包含點文件。
 -R, --no-recursion          禁用遞歸文件搜尋。
 -M, --no-mangle             禁用修改名稱。
 -q, --quiet                 禁止除錯誤之外的所有日誌記錄。

訊息命令：
 -h, --help                  顯示幫助畫面。
 -v, --version               顯示版本號。
```

## 🔌 API 參考

您也可以將 **minify.js** 匯入您的應用程式以使用其 API 方法，無論是作為 ECMAScript 模組還是 CommonJS 模組。

#### ESM:

```js
import * as minifyJS from '@adamlui/minify.js';
```

#### CJS:

```js
const minifyJS = require('@adamlui/minify.js');
```

### minify(input, options)

此函數根據提供的字串輸入來縮小 JavaScript 程式碼。

如果傳入**原始碼**，則直接縮小，然後傳回一個包含 `srcPath` + `code` + `error` 的物件：

```js
const srcCode = 'function add(first, second) { return first + second; }',
      minifyResult = minifyJS.minify(srcCode);
console.log(minifyResult.error); // 運行時錯誤，如果沒有錯誤則為 `undefined`
console.log(minifyResult.code);  // 縮小輸出： function add(n,d){return n+d}
```

如果傳遞了**檔案路徑**，則載入檔案的程式碼然後縮小，傳回一個像上面一樣的物件。

如果傳遞 **目錄路徑**，則會搜尋 JavaScript 檔案（預設遞歸），載入每個程式碼並縮小，然後傳回包含 `srcPath` + `code` + `error` 的物件陣列：

```js
const results = minifyJS.minify('.');
results.forEach(result =>
    console.log(result.srcPath) // 工作目錄 + 所有嵌套目錄中 JS 檔案的路徑
);
console.log(results[1].code) // 如果找到，則為第二個 JS 檔案的精簡程式碼，如果未找到，則為 `undefined`
```

選項是布林值，作為物件屬性傳遞。 例如：

```js
minifyJS.minify(input, { dotFiles: true });
// 如果 `input` 是路徑，則傳回資料對象，其中也會處理點文件
```

可能的參數（及其預設設定）有：

```
 recursive (true)     如果傳遞目錄路徑，則遞歸搜尋嵌套檔案。
 verbose (true)       在控制台/終端機中顯示日誌記錄。
 dotFolders (false)   在文件搜尋中包含點資料夾。
 dotFiles (false)     在文件搜尋中包含點文件。
 mangle (true)        縮短變數名稱（通常為一個字元）。
```

### findJS(searchDir, options)

此函數搜尋傳遞的 `searchDir` 字串中的所有未縮小的 JavaScript 檔案（對於發現 [`minify()`](#minifyinput-options) 將處理哪些檔案很有用）並傳回包含其檔案路徑的陣列。

選項是布林值，作為物件屬性傳遞。 例如：

```js
minifyJS.findJS(searchDir, { recursive: false });
// 傳回包含指向 `searchDir` 中未縮小的 JS 檔案的檔案路徑的陣列
```

可能的參數（及其預設設定）有：

```
 recursive (true)     如果傳遞目錄路徑，則遞歸搜尋嵌套檔案。
 verbose (false)      在控制台/終端機中顯示日誌記錄。
 dotFolders (false)   在文件搜尋中包含點資料夾。
 dotFiles (false)     在文件搜尋中包含點文件。
```

<br>

## 💖 支援

如果這對您有幫助，請考慮[給予 GitHub ⭐](https://github.com/adamlui/js-utils)！
<br><br>

## 🏛️ MIT 许可证

**版權所有 © 2023–2024 [刘展鹏 (Adam Lui)](https://github.com/adamlui)**

特此免費授予任何取得副本的人許可本軟體和相關文件文件（『軟體』），處理在軟體中不受限制，包括但不限於權利使用、複製、修改、合併、發布、分發、再授權和/或出售該軟體的副本，並允許該軟體是提供這樣做，但須滿足以下條件：

上述版權聲明和本許可聲明應包含在所有軟體的副本或重要部分。

本軟體『依現況』提供，不提供任何形式的明示或保證暗示的，包括但不限於適銷性保證，適用於特定目的和非侵權。 在任何情況下都不得作者或版權持有人對任何索賠、損害或其他責任，無論是在合約、侵權或其他方面的行為中，由以下原因引起，出於或與軟體或使用或其他交易有關軟體。

<br>

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

<a href="https://github.com/adamlui/js-utils">**家**</a> /
<a href="https://github.com/adamlui/js-utils/discussions">讨论</a> /
<a href="#-minifyjs">回到顶部 ↑</a>
