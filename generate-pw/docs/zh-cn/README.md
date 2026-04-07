<a id="top"></a>

<div align="right">
    <h6>
        <picture>
            <source type="image/svg+xml" media="(prefers-color-scheme: dark)" srcset="https://cdn.jsdelivr.net/gh/adamlui/js-utils@f2dc346/assets/images/icons/earth/white/icon32.svg">
            <img height=14 src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@f2dc346/assets/images/icons/earth/black/icon32.svg">
        </picture>
        &nbsp;简体中文 |
        <a href="../..#readme">English</a> |
        <a href="../zh-tw/#readme">繁體中文</a> |
        <a href="../hi/#readme">हिंदी</a> |
        <a href="../bn/#readme">বাংলা</a> |
        <a href="../de/#readme">Deutsch</a> |
        <a href="../es/#readme">Español</a> |
        <a href="../fr/#readme">Français</a>
    </h6>
</div>

# > generate-pw

### 随机生成、强化和验证加密安全密码。

<a href="https://npmstar.com/compare/generate-pw">
    <img height=31 src="https://img.shields.io/npm/dm/generate-pw?label=%E4%B8%8B%E8%BD%BD&logo=npm&color=af68ff&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://github.com/adamlui/js-utils/releases/tag/generate-pw-2.3.1">
    <img height=31 src="https://img.shields.io/badge/最新版本-2.3.1-44cc11.svg?logo=icinga&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="#%EF%B8%8F-mit-%E8%AE%B8%E5%8F%AF%E8%AF%81">
    <img height=31 src="https://img.shields.io/badge/许可证-MIT-orange.svg?logo=internetarchive&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://www.npmjs.com/package/generate-pw?activeTab=code">
    <img height=31 src="https://img.shields.io/npm/unpacked-size/generate-pw?label=%E6%8B%86%E5%B0%81%E5%B0%BA%E5%AF%B8&style=for-the-badge&logo=ebox&logoColor=white&labelColor=464646&color=blue"></a>
<a href="https://sonarcloud.io/component_measures?metric=vulnerabilities&selected=adamlui_js-utils%3Agenerate-pw&id=adamlui_js-utils">
    <img height=31 src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fsonarcloud.io%2Fapi%2Fmeasures%2Fcomponent%3Fcomponent%3Dadamlui_js-utils%3Agenerate-pw%2Fsrc%2Fgenerate-pw.js%26metricKeys%3Dvulnerabilities&query=%24.component.measures.0.value&style=for-the-badge&logo=sonar&logoColor=white&labelColor=464646&label=%E6%BC%8F%E6%B4%9E&color=gold"></a>
<a href="https://github.com/toolleeo/cli-apps/#password-managers">
    <img height=31 src="https://img.shields.io/badge/中提到-Awesome-ff69b4?logo=awesomelists&logoColor=white&labelColor=464646&style=for-the-badge"></a>

<br>

<img height=6px width="100%" src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@0d36e26/assets/images/separators/aqua-gradient.png">

## 💡 关于

**generate-pw** 是一个轻量级、易于使用的库，允许您随机生成、加强和验证加密安全密码。

- **无外部依赖项 —** 仅用于安全随机化的内置加密方法
- **高度可定制 —** 指定长度、数量、要使用的字符集等。
- **多环境支持 —** 在 Node.js 或 Web 浏览器中使用
- **可用命令行 —** 只需输入`generate-pw`即可

## ⚡ 安装

作为**全局实用程序**：

```
$ npm install -g generate-pw
```

作为 **运行时依赖项**，从项目根目录：

```
$ npm install generate-pw
```

<br>

<a href="https://github.com/sponsors/adamlui"><img src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@0d36e26/assets/images/banners/sponsor/$10/banner1660x260.png"></a>

<img height=6px width="100%" src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@0d36e26/assets/images/separators/aqua-gradient.png">

## 🔌 导入 API

### <img height=18 src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@0d36e26/assets/images/icons/platforms/node.js/icon25x28.png"> Node.js

#### ECMAScript*:

```js
import pw from 'generate-pw'
```

#### CommonJS:

```js
const pw = require('generate-pw')
```

###### _*需要 Node.js 版本 14 或更高版本_

### <picture><source media="(prefers-color-scheme: dark)" srcset="https://cdn.jsdelivr.net/gh/adamlui/js-utils@0d36e26/assets/images/icons/platforms/web/light/icon25.png"><img width=16 src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@0d36e26/assets/images/icons/platforms/web/dark/icon25.png"></picture> Web

#### <> HTML 脚本标签:

```html
<script src="https://cdn.jsdelivr.net/npm/generate-pw@2.3.1/dist/generate-pw.min.js"></script>
```

#### ES6:

```js
(async () => {
    await import('https://cdn.jsdelivr.net/npm/generate-pw@2.3.1/dist/generate-pw.min.js')
    // 你的代码在这里...
})()
```

### <img height=17 src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@0d36e26/assets/images/icons/platforms/tampermonkey/icon28.png"><img height=17.5 src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@0d36e26/assets/images/icons/platforms/violentmonkey/icon25.png"> Greasemonkey

```js
...
// @require https://cdn.jsdelivr.net/npm/generate-pw@2.3.1/dist/generate-pw.min.js
// ==/UserScript==

// 你的代码在这里...
```

<br>

**💡 注意:** 要始终导入最新版本（不建议在生产中使用！），请从 jsDelivr URL 中删除 `@2.3.1` 版本标签：`https://cdn.jsdelivr.net/npm/generate-pw/dist/generate-pw.min.js`

<br>

<img height=6px width="100%" src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@0d36e26/assets/images/separators/aqua-gradient.png">

## 📋 API 使用

### `generatePassword([options])`

如果未给出 `qty` 选项，则生成**一个**密码，并返回一个字符串：

```js
const password = pw.generatePassword({ length: 11, numbers: true })
console.log(password) // 示例输出：'bAsZm3mq6Qn'
```

...或 **多个** 密码（如果给出了 `qty` 选项），返回一个字符串数组：

```js
const passwords = pw.generatePassword({ qty: 5, length: 8, symbols: true })
console.log(passwords)
/* 示例输出：

generatePassword() » Generating passwords...
generatePassword() » Passwords generated!
generatePassword() » Check returned array.
[ '!zSf@Q.s', '!,HT\\;m=', '?Lq&FV>^', 'gf}Y;}Ne', 'Stsx(GqE' ]
*/
```

**💡 注意:** 如果不传递任何选项，密码将为 8 个字符长，由大小写字母组成。

请参阅：[可用选项](#generate-函数的可用选项)

#

### `generatePasswords(qty[, options])`

根据给定的 `qty` 生成**多个**密码，返回字符串数组：

```js
const passwords = pw.generatePasswords(5, { length: 3, uppercase: false })
console.log(passwords)
/* 示例输出：

generatePasswords() » Generating passwords...
generatePasswords() » Passwords generated!
generatePasswords() » Check returned array.
[ 'yilppxru', 'ckvkyjfp', 'zolcpyfb' ]
*/
```

**💡 注意:** 如果没有传递 `qty` 参数，则只会生成一个密码，并以字符串形式返回。

请参阅：[可用选项](#generate-函数的可用选项)

#

### `strictify(password[, requiredCharTypes, options])`

修改指定的 `password`，以使用传递的每个 `requiredCharTypes` 元素中的至少一个字符，返回一个字符串：

```js
const strictPW = pw.strictify('abcdef', ['numbers', 'symbols'])
console.log(strictPW) // 示例输出：'a!c2ef'
```

**💡注意:**如果没有传递 `requiredCharTypes` 数组，则所有可用类型都将是必需的。

可用的 `requiredCharTypes` 有：`['numbers', 'symbols', 'lower', 'upper']`

可用选项（作为对象属性传递）：

姓名      | 类型    | 描述                       | 默认值
----------|--------|----------------------------|--------
`verbose` | 布尔值 | 在控制台/终端中显示日志记录。 | `true`

#

### `validateStrength(password[, options])`

验证密码的强度，返回一个包含以下内容的对象：
- `strengthScore` (0–100)
- `recommendations` 大批
- `isGood` 布尔值 (`true` 如果 `strengthScore` >= 80) 

Example:

```js
const pwStrength = pw.validateStrength('Aa?idsE')
console.log(pwStrength)

/* 输出：

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

可用选项（作为对象属性传递）：

姓名      | 类型    | 描述                       | 默认值
----------|--------|----------------------------|--------
`verbose` | 布尔值 | 在控制台/终端中显示日志记录。 | `true`

#

### `generate*()` 函数的可用选项

其中任何一个都可以传递到每个 `generate*()` 函数的选项对象中：

姓名                  | 类型   | 描述                                             | 默认值
----------------------|-------|--------------------------------------------------|--------
`verbose`             | 布尔值 | 在控制台/终端中显示日志记录。                      | `true`
`length`              | 整数   | 密码的长度。                                     | `8`
`qty`                 | 整数   | 要生成的密码数量。                                | `1`
`strength`            | 字符串 | `<'weak'\|'basic'\|'strong'>` 应用强度预设。      | `''`
`charset`             | 字符串 | 密码中包含的字符。                                | `''`
`exclude`             | 字符串 | 要从密码中排除的字符。                            | `''`
`numbers`             | 布尔值 | 允许密码中包含数字。                              | `false`
`symbols`             | 布尔值 | 允许密码中包含符号。                              | `false`
`lowercase`           | 布尔值 | 密码中允许使用小写字母。                          | `true`
`uppercase`           | 布尔值 | 密码中允许使用大写字母。                          | `true`
`similarChars`        | 布尔值 | 密码中包含相似字符（例如 o、0、O、i、l、1、|）。    | `false`
`strict`              | 布尔值 | 要求密码中每个允许的字符集中至少有一个字符。        | `true`
`entropy`             | 布尔值 | 计算/记录估计熵。                                 | `true`

##### _*仅在 [`generatePassword([options])`](#generatepasswordoptions) 中可用，因为 [`generatePasswords(qty[, options])`](#generatepasswordsqty-options) 采用 `qty` 参数_

<br>

<img height=6px width="100%" src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@0d36e26/assets/images/separators/aqua-gradient.png">

## 💻 命令行使用

**generate-pw** 也可以直接从命令行使用。基本命令是：

```
$ generate-pw
```

<img src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@0d3424a/generate-pw/assets/images/screenshots/cli/generate-pw-cmd-output.png">

#

### 命令行选项

```
参数选项：
 --length=n                  生成 n 长度的密码。
 --qty=n                     生成 n 个密码。
 --charset=chars             密码中仅包含 chars。
 --exclude=chars             从密码中排除 chars。
 --ui-lang="code"            用于显示用户界面的语言的 ISO 639-1 代码。
 --config="path/to/file"     加载自定义配置文件。

布尔选项：
 -w, --weak                  生成弱密码。
 -b, --basic                 生成基本强度密码。
 -t, --strong                生成强密码。
 -N, --no-numbers            密码中不允许包含数字。
 -Y, --no-symbols            密码中不允许包含符号。
 -L, --no-lowercase          密码中不允许使用小写字母。
 -U, --no-uppercase          密码中不允许使用大写字母。
 -s, --similar-chars         密码中包含相似字符。
 -S, --unstrict              密码中无需包含每个允许字符集中的至少一个字符。
 -E, --no-entropy            计算/记录估计熵。
 -q, --quiet                 禁止除错误之外的所有日志记录。

命令：
 -i, --init                  创建配置文件（位于项目根目录）。
 -h, --help                  显示帮助屏幕。
 -v, --version               显示版本号。
     --stats                 显示 npm 统计信息。
     --debug [targetKey]     显示调试日志。
```

#

### 配置文件

您可以通过在项目根目录放置 `generate-pw.config.mjs` 或 `generate-pw.config.js` 文件来自定义 **generate-pw** 的配置。

默认配置示例：

```js
export default {
    length: 12,                 // 生成密码的长度
    qty: 1,                     // 生成密码的数量
    strength: '',               // <'weak'|'basic'|'strong'> 应用强度预设
    charset: '',                // 密码中仅包含指定的字符
    exclude: '',                // 密码中排除指定的字符
    excludeNums: false,         // 密码中不允许包含数字
    excludeSymbols: false,      // 密码中不允许包含符号
    excludeLowerChars: false,   // 密码中不允许包含小写字母
    excludeUpperChars: false,   // 密码中不允许包含大写字母
    similarChars: false,        // 密码中包含相似字符
    unstrict: false,            // 密码中无需包含每个允许字符集中的一个或多个字符
    noEntropy: false,           // 计算/记录估计熵
    quietMo​​de: false            // 除了错误信息外，抑制所有日志输出
}
```

💡 运行 `generate-pw init` 即可在项目根目录生成一个 `generate-pw.config.mjs` 模板文件。

<br>

<img height=6px width="100%" src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@0d36e26/assets/images/separators/aqua-gradient.png">

## 🏛️ MIT 许可证

**版权所有 © 2024–2026 [刘展鹏 (Adam Lui)](https://github.com/adamlui) 和贡献者**

特此免费向任何获得副本的人授予许可本软件和相关文档文件（『软件』），处理在软件中不受限制，包括但不限于权利使用、复制、修改、合并、发布、分发、再许可和/或出售该软件的副本，并允许该软件是提供这样做，但须满足以下条件：

上述版权声明和本许可声明应包含在所有软件的副本或重要部分。

本软件『按原样』提供，不提供任何形式的明示或保证暗示的，包括但不限于适销性保证，适用于特定目的和非侵权。 在任何情况下都不得作者或版权持有人对任何索赔、损害或其他责任，无论是在合同、侵权或其他方面的行为中，由以下原因引起，出于或与软件或使用或其他交易有关软件。

<br>

<img height=6px width="100%" src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@0d36e26/assets/images/separators/aqua-gradient.png">

## 🛠️ 相关实用程序

### <picture><source media="(prefers-color-scheme: dark)" srcset="https://cdn.jsdelivr.net/gh/adamlui/js-utils@5c34563/generate-ip/assets/images/icons/node-graph/white/icon55x49.png"><img height=21 src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@5c34563/generate-ip/assets/images/icons/node-graph/black/icon55x49.png"></picture> [generate-ip](https://github.com/adamlui/js-utils/tree/main/generate-ip/#readme) &nbsp;<a href="https://github.com/toolleeo/cli-apps/#networking"><img height=18 src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@0d36e26/assets/images/badges/awesome/badge.svg"></a>

> 随机生成、格式化和验证 IPv4 + IPv6 + MAC 地址。
<br>[安装](https://github.com/adamlui/js-utils/tree/main/generate-ip/docs/#-installation) /
[自述文件](https://github.com/adamlui/js-utils/tree/main/generate-ip/docs/#readme) /
[API 使用](https://github.com/adamlui/js-utils/tree/main/generate-ip/docs/#-api-usage) /
[CLI 用法](https://github.com/adamlui/js-utils/tree/main/generate-ip/docs/#-command-line-usage) /
[讨论](https://github.com/adamlui/js-utils/discussions)

### <picture><source media="(prefers-color-scheme: dark)" srcset="https://cdn.jsdelivr.net/gh/adamlui/js-utils@0d3424a/geolocate/assets/images/icons/wire-globe/white/icon32.png"><img height=22 src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@0d3424a/geolocate/assets/images/icons/wire-globe/black/icon32.png"></picture> [geolocate](https://github.com/adamlui/js-utils/tree/main/geolocate/#readme) &nbsp;<a href="https://github.com/toolleeo/cli-apps/#networking"><img height=18 src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@0d36e26/assets/images/badges/awesome/badge.svg"></a>

> 从 CLI 获取 IP 地理位置数据。
<br>[安装](https://github.com/adamlui/js-utils/tree/main/geolocate/docs/#-installation) /
[自述文件](https://github.com/adamlui/js-utils/tree/main/geolocate/docs/#readme) /
[CLI 用法](https://github.com/adamlui/js-utils/tree/main/geolocate/docs/#-command-line-usage) /
[API 使用](https://github.com/adamlui/js-utils/tree/main/geolocate/docs/#-api-usage) /
[讨论](https://github.com/adamlui/js-utils/discussions)

<br>

<img height=6px width="100%" src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@0d36e26/assets/images/separators/aqua-gradient.png">

<picture><source media="(prefers-color-scheme: dark)" srcset="https://cdn.jsdelivr.net/gh/adamlui/js-utils@0d36e26/assets/images/icons/home/white/icon32x27.png"><img height=13 src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@0d36e26/assets/images/icons/home/dark-gray/icon32x27.png"></picture> <a href="https://github.com/adamlui/js-utils/#readme">**更多 JavaScript 实用程序**</a> /
<a href="https://github.com/adamlui/js-utils/discussions">讨论</a> /
<a href="#top">回到顶部 ↑</a>
