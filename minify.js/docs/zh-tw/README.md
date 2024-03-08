<div align="right">
    <h6>
        <picture>
            <source type="image/svg+xml" media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/earth-icon/white/icon32.svg">
            <img height=14 src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/earth-icon/black/icon32.svg">
        </picture>
        &nbsp;繁體中文 |
        <a href="../..#readme">English</a> |
        <a href="../zh-cn#readme">简体中文</a>
    </h6>
</div>

# </> minify.js 

### 遞歸地縮小所有 JavaScript 檔案。

<a href="https://www.npmjs.com/package/@adamlui/minify.js"><img height=31 src="https://img.shields.io/npm/dt/%40adamlui%2Fminify.js?label=%E4%B8%8B%E8%BC%89&logo=npm&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="#%EF%B8%8F-mit-%E8%A8%B1%E5%8F%AF%E8%AD%89"><img height=31 src="https://img.shields.io/badge/許可證-MIT-red.svg?logo=internetarchive&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://www.npmjs.com/package/@adamlui/minify.js?activeTab=versions"><img height=31 src="https://img.shields.io/badge/最新版本-1.2.3-fc7811.svg?logo=icinga&logoColor=white&labelColor=464646&style=for-the-badge"></a>
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

作為**開發依賴**，從專案根目錄：

```
npm install -D @adamlui/minify.js
```

## 💻 用法

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

**💡 注意：** 如果傳遞資料夾，檔案將會被遞歸處理。 若要包含點資料夾，請傳遞 `-d` 或 `--include-dotfolders`。 若要包含點文件，請傳遞 `-D` 或 `--include-dotfiles`。

#

若要用作 **套件腳本**，請在專案的 `package.json` 中：

```json
  "scripts": {
    "build:js": "<minify-js-cmd>"
  },
```

將 `<minify-js-cmd>` 替換為 `minify-js` + 可選參數。 然後，可以使用 `npm run build:js` 來執行該指令。
<br><br>

## 📃 命令範例：

- 縮小**目前目錄**中的所有 JavaScript 檔案（輸出到 `min/`）：

   ```
   minify-js
   ```

- 縮小**特定目錄**中的所有 JavaScript 檔案（輸出到 `path/to/your/directory/min/`）：

   ```
   minify-js path/to/your/directory
   ```

- 縮小**特定檔案**（輸出到 `path/to/your/min/file.min.js`）：

   ```
   minify-js path/to/your/file.js
   ```

- 指定**輸入和輸出**目錄（輸出到 `output_folder/`）：

   ```
   minify-js input_folder output_folder
   ```

<br>

## 💖 支援

如果這對您有幫助，請考慮[給予 GitHub ⭐](https://github.com/adamlui/js-utils)！
<br><br>

## 🏛️ MIT 许可证

**版權所有 (c) 2023–2024 [刘展鹏 (Adam Lui)](https://github.com/adamlui)**

特此向任何獲得副本的人免費授予許可本軟件和相關文檔文件（『軟件』）的，以處理不受限制地使用軟件，包括但不限於權利使用、複製、修改、合併、發布、分發、再許可和/或出售該軟件的副本，並允許該軟件的使用者可以這樣做，但須滿足以下條件：

上述版權聲明和本許可聲明應包含在所有內容中軟件的副本或主要部分。

該軟件按『原樣』提供，不提供任何形式的明示或保證默示的保證，包括但不限於適銷性保證，適用於特定目的且不侵權。 在任何情況下都不得作者或版權所有者對任何索賠、損害或其他責任負責責任，無論是合同訴訟、侵權訴訟還是其他訴訟，均由以下原因引起：與本軟件無關或與之相關，或者與本軟件相關的使用或其他交易軟件。

<br>

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

<a href="https://github.com/adamlui/js-utils">**家**</a> /
<a href="https://github.com/adamlui/js-utils/discussions">讨论</a> /
<a href="#-minifyjs">回到顶部 ↑</a>
