<div align="right">
    <h6>
        <picture>
            <source type="image/svg+xml" media="(prefers-color-scheme: dark)" srcset="https://assets.js-utils.org/images/icons/earth/white/icon32.svg?v=7c33be0">
            <img height=14 src="https://assets.js-utils.org/images/icons/earth/black/icon32.svg?v=7c33be0">
        </picture>
        &nbsp;简体中文 |
        <a href="../..#readme">English</a> |
        <a href="../zh-tw#readme">繁體中文</a> |
        <a href="../hi#readme">हिंदी</a> |
        <a href="../bn#readme">বাংলা</a> |
        <a href="../de#readme">Deutsch</a> |
        <a href="../es#readme">Español</a> |
        <a href="../fr#readme">Français</a>
    </h6>
</div>

# > generate-pw

### 随机生成、强化和验证加密安全密码。

<a href="https://www.npmjs.com/package/generate-pw">
    <img height=31 src="https://img.shields.io/npm/dm/generate-pw?label=%E4%B8%8B%E8%BD%BD&logo=npm&color=af68ff&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="#%EF%B8%8F-mit-%E8%AE%B8%E5%8F%AF%E8%AF%81">
    <img height=31 src="https://img.shields.io/badge/许可证-MIT-fc4f2d.svg?logo=internetarchive&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://github.com/adamlui/js-utils/releases/tag/generate-pw-1.5.12">
    <img height=31 src="https://img.shields.io/badge/最新版本-1.5.12-44cc11.svg?logo=icinga&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://www.npmjs.com/package/generate-pw?activeTab=code">
    <img height=31 src="https://img.shields.io/npm/unpacked-size/generate-pw?label=%E6%8B%86%E5%B0%81%E5%B0%BA%E5%AF%B8&style=for-the-badge&logo=ebox&logoColor=white&labelColor=464646&color=blue"></a>
<a href="https://github.com/adamlui/js-utils/blob/generate-pw-1.5.12/generate-pw/dist/generate-pw.min.js">
    <img height=31 src="https://img.shields.io/github/size/adamlui/js-utils/generate-pw/dist/generate-pw.min.js?branch=generate-pw-1.5.12&label=%E7%BC%A9%E5%B0%8F%E5%B0%BA%E5%AF%B8&logo=databricks&logoColor=white&labelColor=464646&color=ff69b4&style=for-the-badge"></a>
<a href="https://sonarcloud.io/component_measures?metric=new_vulnerabilities&id=adamlui_js-utils:generate-pw/src/generate-pw.js">
    <img height=31 src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fsonarcloud.io%2Fapi%2Fmeasures%2Fcomponent%3Fcomponent%3Dadamlui_js-utils%3Agenerate-pw%2Fsrc%2Fgenerate-pw.js%26metricKeys%3Dvulnerabilities&query=%24.component.measures.0.value&style=for-the-badge&logo=sonarcloud&logoColor=white&labelColor=464646&label=%E6%BC%8F%E6%B4%9E&color=gold"></a>
<a href="https://github.com/toolleeo/cli-apps#password-managers">
    <img height=31 src="https://img.shields.io/badge/中提到-Awesome-c4a2bd?logo=awesomelists&logoColor=white&labelColor=464646&style=for-the-badge"></a>

<br>

<img height=6px width="100%" src="https://assets.js-utils.org/images/separators/aqua-gradient.png?v=0d36e26">

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

<a href="https://github.com/sponsors/adamlui"><img src="https://assets.js-utils.org/images/banners/sponsor/$10/banner1660x260.png?v=0d36e26"></a>

<img height=6px width="100%" src="https://assets.js-utils.org/images/separators/aqua-gradient.png?v=0d36e26">

## 🔌 导入 API

### <img height=18 src="https://assets.js-utils.org/images/icons/platforms/node.js/icon25x28.png?v=0d36e26"> Node.js

#### ECMAScript*:

```js
import pw from 'generate-pw';
```

#### CommonJS:

```js
const pw = require('generate-pw');
```

###### _*需要 Node.js 版本 14 或更高版本_

### <picture><source media="(prefers-color-scheme: dark)" srcset="https://assets.js-utils.org/images/icons/platforms/web/light/icon25.png?v=0d36e26"><img width=16 src="https://assets.js-utils.org/images/icons/platforms/web/dark/icon25.png?v=0d36e26"></picture> Web

#### <> HTML 脚本标签:

```html
<script src="https://cdn.jsdelivr.net/npm/generate-pw@1.5.12/dist/generate-pw.min.js"></script>
```

#### ES6:

```js
(async () => {
    await import('https://cdn.jsdelivr.net/npm/generate-pw@1.5.12/dist/generate-pw.min.js');
    // 你的代码在这里...
})();
```

### <img height=17 src="https://assets.js-utils.org/images/icons/platforms/tampermonkey/icon28.png?v=0d36e26"><img height=17.5 src="https://assets.js-utils.org/images/icons/platforms/violentmonkey/icon25.png?v=0d36e26"> Greasemonkey

```js
...
// @require https://cdn.jsdelivr.net/npm/generate-pw@1.5.12/dist/generate-pw.min.js
// ==/UserScript==

// 你的代码在这里...
```

<br>

**💡 注意:** 要始终导入最新版本（不建议在生产中使用！），请从 jsDelivr URL 中删除 `@1.5.12` 版本标签：`https://cdn.jsdelivr.net/npm/generate-pw/dist/generate-pw.min.js`

<br>

<img height=6px width="100%" src="https://assets.js-utils.org/images/separators/aqua-gradient.png?v=0d36e26">

## 📋 API 使用

### `generatePassword([options])`

如果未给出 `qty` 选项，则生成**一个**密码，并返回一个字符串：

```js
const password = pw.generatePassword({ length: 11, numbers: true });
console.log(password); // 示例输出：'bAsZm3mq6Qn'
```

...或 **多个** 密码（如果给出了 `qty` 选项），返回一个字符串数组：

```js
const passwords = pw.generatePassword({ qty: 5, length: 8, symbols: true });
console.log(passwords);
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
const passwords = pw.generatePasswords(5, { length: 3, uppercase: false });
console.log(passwords);
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
const strictPW = pw.strictify('abcdef', ['numbers', 'symbols']);
console.log(strictPW); // 示例输出：'a!c2ef'
```

**💡注意:**如果没有传递 `requiredCharTypes` 数组，则所有可用类型都将是必需的。

可用的 `requiredCharTypes` 有：`['number', 'symbol', 'lower', 'upper']`

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
const pwStrength = pw.validateStrength('Aa?idsE');
console.log(pwStrength);

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
`qty`*                | 整数   | 要生成的密码数量。                                | `1`
`charset`             | 字符串 | 密码中包含的字符。                                | `''`
`exclude`             | 字符串 | 要从密码中排除的字符。                            | `''`
`numbers`             | 布尔值 | 允许密码中包含数字。                              | `false`
`symbols`             | 布尔值 | 允许密码中包含符号。                              | `false`
`lowercase`           | 布尔值 | 密码中允许使用小写字母。                          | `true`
`uppercase`           | 布尔值 | 密码中允许使用大写字母。                          | `true`
`excludeSimilarChars` | 布尔值 | 排除密码中的相似字符（例如 o、0、O、i、l、1、\|）。 | `false`
`strict`              | 布尔值 | 要求密码中每个允许的字符集中至少有一个字符。        | `false`

##### _*仅在 [`generatePassword([options])`](#generatepasswordoptions) 中可用，因为 [`generatePasswords(qty[, options])`](#generatepasswordsqty-options) 采用 `qty` 参数_

<br>

<img height=6px width="100%" src="https://assets.js-utils.org/images/separators/aqua-gradient.png?v=0d36e26">

## 💻 命令行使用

全局安装时，**generate-pw** 也可以从命令行使用。 基本命令是：

```
$ generate-pw
```

<img src="https://media.generatepw.org/images/screenshots/cli/generate-pw-cmd-output.png?0d36e26">

#

### 命令行选项

```
参数选项：
 --length=n                  生成 n 长度的密码。
 --qty=n                     生成 n 个密码。
 --charset=chars             密码中仅包含 chars。
 --exclude=chars             从密码中排除 chars。

布尔选项：
 -n, --include-numbers       允许密码中包含数字。
 -y, --include-symbols       允许密码中包含符号。
 -L, --no-lowercase          密码中不允许使用小写字母。
 -U, --no-uppercase          密码中不允许使用大写字母。
 -S, --no-similar            排除密码中的相似字符。
 -s, --strict                要求密码中每个允许的字符集中至少有一个字符。
 -q, --quiet                 禁止除错误之外的所有日志记录。

信息命令：
 -h, --help                  显示帮助屏幕。
 -v, --version               显示版本号。
```

<br>

<img height=6px width="100%" src="https://assets.js-utils.org/images/separators/aqua-gradient.png?v=0d36e26">

## 🏛️ MIT 许可证

**版权所有 © 2024–2025 [刘展鹏 (Adam Lui)](https://github.com/adamlui) 和贡献者**

特此免费向任何获得副本的人授予许可本软件和相关文档文件（『软件』），处理在软件中不受限制，包括但不限于权利使用、复制、修改、合并、发布、分发、再许可和/或出售该软件的副本，并允许该软件是提供这样做，但须满足以下条件：

上述版权声明和本许可声明应包含在所有软件的副本或重要部分。

本软件『按原样』提供，不提供任何形式的明示或保证暗示的，包括但不限于适销性保证，适用于特定目的和非侵权。 在任何情况下都不得作者或版权持有人对任何索赔、损害或其他责任，无论是在合同、侵权或其他方面的行为中，由以下原因引起，出于或与软件或使用或其他交易有关软件。

<br>

<img height=6px width="100%" src="https://assets.js-utils.org/images/separators/aqua-gradient.png?v=0d36e26">

## 🛠️ 相关实用程序

### <picture><source media="(prefers-color-scheme: dark)" srcset="https://media.generate-ip.org/images/icons/node-graph/white/icon55x49.png?b4eb06e"><img height=21 src="https://media.generate-ip.org/images/icons/node-graph/black/icon55x49.png?b4eb06e"></picture> [generate-ip](https://js-utils.org/generate-ip) &nbsp;<a href="https://github.com/toolleeo/cli-apps#networking"><img height=18 src="https://assets.js-utils.org/images/badges/awesome/badge.svg?v=0d36e26"></a>

> 随机生成、格式化和验证 IPv4 + IPv6 + MAC 地址。
<br>[安装](https://docs.generate-ip.org/#-installation) /
[自述文件](https://docs.generate-ip.org/#readme) /
[API 使用](https://docs.generate-ip.org/#-api-usage) /
[CLI 用法](https://docs.generate-ip.org/#-command-line-usage) /
[讨论](https://github.com/adamlui/js-utils/discussions)

### <picture><source media="(prefers-color-scheme: dark)" srcset="https://media.geolocatejs.org/images/icons/wire-globe/white/icon32.png?0d36e26"><img height=22 src="https://media.geolocatejs.org/images/icons/wire-globe/black/icon32.png?0d36e26"></picture> [geolocate](https://js-utils.org/geolocate) &nbsp;<a href="https://github.com/toolleeo/cli-apps#networking"><img height=18 src="https://assets.js-utils.org/images/badges/awesome/badge.svg?v=0d36e26"></a>

> 从 CLI 获取 IP 地理位置数据。
<br>[安装](https://docs.geolocatejs.org/#-installation) /
[自述文件](https://docs.geolocatejs.org/#readme) /
[CLI 用法](https://docs.geolocatejs.org/#-command-line-usage) /
[API 使用](https://docs.geolocatejs.org/#-api-usage) /
[讨论](https://github.com/adamlui/js-utils/discussions)

<br>

<img height=6px width="100%" src="https://assets.js-utils.org/images/separators/aqua-gradient.png?v=0d36e26">

<picture><source media="(prefers-color-scheme: dark)" srcset="https://assets.js-utils.org/images/icons/home/white/icon32x27.png?v=0d36e26"><img height=13 src="https://assets.js-utils.org/images/icons/home/dark-gray/icon32x27.png?v=0d36e26"></picture> <a href="https://js-utils.org">**更多 JavaScript 实用程序**</a> /
<a href="https://github.com/adamlui/js-utils/discussions">讨论</a> /
<a href="#-generate-pw">回到顶部 ↑</a>
