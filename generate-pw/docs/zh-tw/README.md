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
        <a href="../de#readme">Deutsch</a> |
        <a href="../es#readme">Español</a>
    </h6>
</div>

# > generate-pw

### 隨機產生、強化和驗證加密安全密碼。

<a href="#%EF%B8%8F-mit-%E8%AE%B8%E5%8F%AF%E8%AF%81"><img height=31 src="https://img.shields.io/badge/許可證-MIT-orange.svg?logo=internetarchive&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://github.com/adamlui/js-utils/releases/tag/generate-pw-1.4.3"><img height=31 src="https://img.shields.io/badge/最新版本-1.4.3-44cc11.svg?logo=icinga&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://www.npmjs.com/package/generate-pw?activeTab=code"><img height=31 src="https://img.shields.io/npm/unpacked-size/generate-pw?label=%E6%8B%86%E5%B0%81%E5%B0%BA%E5%AF%B8&style=for-the-badge&logo=ebox&logoColor=white&labelColor=464646&color=blue"></a>
<a href="https://github.com/adamlui/js-utils/blob/generate-pw-1.4.3/generate-pw/dist/generate-pw.min.js"><img height=31 src="https://img.shields.io/github/size/adamlui/js-utils/generate-pw/dist/generate-pw.min.js?branch=generate-pw-1.4.3&label=%E7%B8%AE%E5%B0%8F%E5%B0%BA%E5%AF%B8&logo=databricks&logoColor=white&labelColor=464646&color=ff69b4&style=for-the-badge"></a>
<a href="https://sonarcloud.io/component_measures?metric=new_vulnerabilities&id=adamlui_js-utils:generate-pw/src/generate-pw.js"><img height=31 src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fsonarcloud.io%2Fapi%2Fmeasures%2Fcomponent%3Fcomponent%3Dadamlui_js-utils%3Agenerate-pw%2Fsrc%2Fgenerate-pw.js%26metricKeys%3Dvulnerabilities&query=%24.component.measures.0.value&style=for-the-badge&logo=sonarcloud&logoColor=white&labelColor=464646&label=%E6%BC%8F%E6%B4%9E&color=gold"></a>
<a href="https://github.com/toolleeo/cli-apps#password-managers"><img height=31 src="https://img.shields.io/badge/中提到-Awesome-c4a2bd?logo=awesomelists&logoColor=white&labelColor=464646&style=for-the-badge"></a>

<br>

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

## 💡 關於

**generate-pw** 是一個輕量級、易於使用的函式庫，可讓您隨機產生、加強和驗證加密安全密碼。

- **無外部相依性 —** 僅用於安全隨機化的內建加密方法
- **高度可自訂 —** 指定長度、數量、要使用的字元集等。
- **多重環境支援 —** 在 Node.js 或 Web 瀏覽器中使用
- **可用命令列 —** 只需輸入`generate-pw`即可

## ⚡ 安裝

作為**全域實用程式**：

```
$ npm install -g generate-pw
```

作為 **運行時依賴項**，從專案根目錄：

```
$ npm install generate-pw
```

<br>

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

## 🔌 導入 API

### <img height=18 src="https://i.imgur.com/JIeAdsr.png"> Node.js

#### ECMAScript*:

```js
import * as pw from 'generate-pw';
```

#### CommonJS:

```js
const pw = require('generate-pw');
```

###### _*需要 Node.js 版本 14 或更高版本_

### <picture><source media="(prefers-color-scheme: dark)" srcset="https://i.imgur.com/JSEb19A.png"><img width=16 src="https://i.imgur.com/5VPxf9y.png"></picture> Web

#### <>  腳本標籤:

```html
<script src="https://cdn.jsdelivr.net/npm/generate-pw@1.4.3/dist/generate-pw.min.js"></script>
```

#### ES6:

```js
(async () => {
    await import('https://cdn.jsdelivr.net/npm/generate-pw@1.4.3/dist/generate-pw.min.js');
    // 你的程式碼在這裡...
})();
```

### <img height=17 src="https://raw.githubusercontent.com/KudoAI/chatgpt.js/main/starters/media/images/icons/tampermonkey-icon28.png"><img height=17.5 src="https://raw.githubusercontent.com/KudoAI/chatgpt.js/main/starters/media/images/icons/violentmonkey-icon100.png"> Greasemonkey

```js
...
// @require https://cdn.jsdelivr.net/npm/generate-pw@1.4.3/dist/generate-pw.min.js
// ==/UserScript==

// 你的程式碼在這裡...
```

<br>

**💡 注意:** 若要始終匯入最新版本（不建議在生產中使用！），請從 jsDelivr URL 中刪除 `@1.4.3` 版本標籤：`https://cdn.jsdelivr.net/npm/generate-pw/dist/generate-pw.min.js`

<br>

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

## 📋 API 使用

### `generatePassword([options])`

如果未給予 `qty` 選項，則產生**一個**密碼，並傳回字串：

```js
const password = pw.generatePassword({ length: 11, numbers: true });
console.log(password); // 範例輸出：'bAsZm3mq6Qn'
```

...或 **多個** 密碼（如果給了 `qty` 選項），傳回一個字串陣列：

```js
const passwords = pw.generatePassword({ qty: 5, length: 8, symbols: true });
console.log(passwords);
/* 範例輸出：

generatePassword() » Generating passwords...
generatePassword() » Passwords generated!
generatePassword() » Check returned array.
[ '!zSf@Q.s', '!,HT\\;m=', '?Lq&FV>^', 'gf}Y;}Ne', 'Stsx(GqE' ]
*/
```

**💡注意:**如果不傳遞任何選項，密碼將為 8 個字元長，由大小寫字母組成。

請參閱：[可用選項](#generate-函數的可用選項)

#

### `generatePasswords(qty[, options])`

根據給定的 `qty` 產生**多個**密碼，傳回字串陣列：

```js
const passwords = pw.generatePasswords(5, { length: 3, uppercase: false });
console.log(passwords);
/* 範例輸出：

generatePasswords() » Generating passwords...
generatePasswords() » Passwords generated!
generatePasswords() » Check returned array.
[ 'yilppxru', 'ckvkyjfp', 'zolcpyfb' ]
*/
```

**💡 注意:** 如果沒有傳遞 `qty` 參數，則只會產生一個密碼，並以字串形式傳回。

請參閱：[可用選項](#generate-函數的可用選項)

#

### `strictify(password[, requiredCharTypes, options])`

修改指定的 `password`，以使用傳遞的每個 `requiredCharTypes` 元素中的至少一個字符，傳回一個字串：

```js
const strictPW = pw.strictify('abcdef', ['numbers', 'symbols']);
console.log(strictPW); // 範例輸出：'a!c2ef'
```

**💡注意:**如果沒有傳遞 `requiredCharTypes` 數組，則所有可用類型都將是必需的。

可用的 `requiredCharTypes` 有：`['number', 'symbol', 'lower', 'upper']`

可用選項（作為物件屬性傳遞）：

姓名      | 類型   | 描述                          | 預設值
----------|-------|-------------------------------|--------
`verbose` | 布林值 | 在控制台/終端機中顯示日誌記錄。 | `true`

#

### `validateStrength(password[, options])`

驗證密碼的強度，傳回一個包含以下內容的物件：
- `strengthScore` (0–100)
- `recommendations` 大批
- `isGood` 布尔值 (`true` 如果 `strengthScore` >= 80) 

Example:

```js
const pwStrength = pw.validateStrength('Aa?idsE');
console.log(pwStrength);

/* 輸出：

validateStrength() » Validating password strength...
validateStrength() » Password strength validated!
validateStrength() » Check returned object for score/recommendations.
{
  strengthScore: 60,
  recommendations: [
    'Make it at least 8 characters long.',
    'Include at least one number.'
  ],
  isGood: false
}
*/
```

可用選項（作為物件屬性傳遞）：

姓名      | 類型   | 描述                          | 預設值
----------|-------|-------------------------------|--------
`verbose` | 布林值 | 在控制台/終端機中顯示日誌記錄。 | `true`

#

### `generate*()` 函數的可用選項

其中任何一個都可以傳遞到每個 `generate*()` 函數的選項物件中：

姓名        | 類型   | 描述                                     | 預設值
------------|--------|-----------------------------------------|---------
`verbose`   | 布林值 | 在控制台/終端機中顯示日誌記錄。            | `true`
`length`    | 整數   | 密碼的長度。                             | `8`
`qty`*      | 整數   | 要產生的密碼數量。                        | `1`
`charset`   | 字串   | 密碼中包含的字元。                        | `''`
`exclude`   | 字串   | 要從密碼中排除的字元。                     | `''`
`numbers`   | 布林值 | 允許密碼中包含數字。                       | `false`
`symbols`   | 布林值 | 允許密碼中包含符號。                       | `false`
`lowercase` | 布林值 | 密碼中允許使用小寫字母。                   | `true`
`uppercase` | 布林值 | 密碼中允許使用大寫字母。                   | `true`
`strict`    | 布林值 | 要求密碼中每個允許的字元集中至少有一個字元。 | `false`

##### _*只在 [`generatePassword([options])`](#generatepasswordoptions) 中可用，因為 [`generatePasswords(qty[, options])`](#generatepasswordsqty-options) 採用 `qty` 參數_

<br>

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

## 💻 命令列使用

全域安裝時，**generate-pw** 也可以從命令列使用。 基本指令是：

```
$ generate-pw
```

**💡注意:**出於安全原因，產生的密碼儲存在剪貼簿中。

#

### 命令列選項

```
參數選項：
 --length=n                  產生 n 長度的密碼。
 --qty=n                     產生 n 個密碼。
 --charset=chars             密碼中僅包含 chars。
 --exclude=chars             從密碼中排除 chars。

布林選項：
 -n, --include-numbers       允許密碼中包含數字。
 -s, --include-symbols       允許密碼中包含符號。
 -L, --no-lowercase          密碼中不允許使用小寫字母。
 -U, --no-uppercase          密碼中不允許使用大寫字母。
 -s, --strict                要求密碼中每個允許的字元集中至少有一個字元。
 -q, --quiet                 禁止除錯誤之外的所有日誌記錄。

訊息命令：
 -h, --help                  顯示幫助畫面。
 -v, --version               顯示版本號。
```

<br>

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

## 🏛️ MIT 许可证

**版權所有 © 2024 [刘展鹏 (Adam Lui)](https://github.com/adamlui) 和貢獻者**

特此免費授予任何取得副本的人許可本軟體和相關文件文件（『軟體』），處理在軟體中不受限制，包括但不限於權利使用、複製、修改、合併、發布、分發、再授權和/或出售該軟體的副本，並允許該軟體是提供這樣做，但須滿足以下條件：

上述版權聲明和本許可聲明應包含在所有軟體的副本或重要部分。

本軟體『依現況』提供，不提供任何形式的明示或保證暗示的，包括但不限於適銷性保證，適用於特定目的和非侵權。 在任何情況下都不得作者或版權持有人對任何索賠、損害或其他責任，無論是在合約、侵權或其他方面的行為中，由以下原因引起，出於或與軟體或使用或其他交易有關軟體。

<br>

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

## 🛠️ 相關實用程式

### <img height=21px src="https://i.imgur.com/kvf7fXm.png"> [generate-ip](https://js-utils.com/generate-ip) <a href="https://github.com/toolleeo/cli-apps#networking"><img height=18 src="https://awesome.re/mentioned-badge.svg"></a>

> Randomly generate, format, and validate IPv4/I隨機產生、格式化和驗證 IPv4/IPv6 位址。Pv6 addresses.
<br>[安裝](https://github.com/adamlui/js-utils/tree/main/generate-ip#-installation) /
[自述文件](https://github.com/adamlui/js-utils/tree/main/generate-ip#readme) /
[API 使用](https://github.com/adamlui/js-utils/tree/main/generate-ip#-api-usage) /
[CLI 用法](https://github.com/adamlui/js-utils/tree/main/generate-ip#-command-line-usage) /
[討論](https://js-utils.com/discussions)

### <picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/adamlui/js-utils/main/geolocate/media/images/icons/wire-globe/white/icon32.png"><img height=22 src="https://raw.githubusercontent.com/adamlui/js-utils/main/geolocate/media/images/icons/wire-globe/black/icon32.png"></picture> [geolocate](https://js-utils.com/geolocate)

> 從 CLI 取得 IP 地理位置資料。
<br>[安裝](https://github.com/adamlui/js-utils/tree/main/geolocate#-installation) /
[自述文件](https://github.com/adamlui/js-utils/tree/main/geolocate#readme) /
[CLI 用法](https://github.com/adamlui/js-utils/tree/main/geolocate#-command-line-usage) /
[API 使用](https://github.com/adamlui/js-utils/tree/main/geolocate#-api-usage) /
[討論](https://js-utils.com/discussions)

<br>

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

<picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/adamlui/js-utils/main/media/images/icons/home/white/icon32x27.png"><img height=13 src="https://raw.githubusercontent.com/adamlui/js-utils/main/media/images/icons/home/dark-gray/icon32x27.png"></picture> <a href="https://js-utils.com">**更多 JavaScript 實用程式**</a> /
<a href="https://js-utils.com/discussions">討論</a> /
<a href="#-generate-pw">回到頂部 ↑</a>
