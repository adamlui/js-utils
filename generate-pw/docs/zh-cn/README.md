<div align="right">
    <h6>
        <picture>
            <source type="image/svg+xml" media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/earth-icon/white/icon32.svg">
            <img height=14 src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/earth-icon/black/icon32.svg">
        </picture>
        &nbsp;简体中文 |
        <a href="../..#readme">English</a> |
        <a href="../zh-tw#readme">繁體中文</a>
    </h6>
</div>

# > generate-pw

### 随机生成加密安全密码。

<a href="#%EF%B8%8F-mit-%E8%AE%B8%E5%8F%AF%E8%AF%81"><img height=31 src="https://img.shields.io/badge/许可证-MIT-orange.svg?logo=internetarchive&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://www.npmjs.com/package/generate-pw?activeTab=versions"><img height=31 src="https://img.shields.io/badge/最新版本-1.1.0-44cc11.svg?logo=icinga&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://www.npmjs.com/package/generate-pw?activeTab=code"><img height=31 src="https://img.shields.io/npm/unpacked-size/generate-pw?label=%E6%8B%86%E5%B0%81%E5%B0%BA%E5%AF%B8&style=for-the-badge&logo=ebox&logoColor=white&labelColor=464646&color=blue"></a>
<a href="https://sonarcloud.io/component_measures?metric=new_vulnerabilities&id=adamlui_js-utils:generate-pw/generate-pw.js"><img height=31 src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fsonarcloud.io%2Fapi%2Fmeasures%2Fcomponent%3Fcomponent%3Dadamlui_js-utils%3Agenerate-pw%2Fgenerate-pw.js%26metricKeys%3Dvulnerabilities&query=%24.component.measures.0.value&style=for-the-badge&logo=sonarcloud&logoColor=white&labelColor=464646&label=%E6%BC%8F%E6%B4%9E&color=gold"></a>

<br>

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

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

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

## 🔌 API 使用

**generate-pw** 可以作为 ECMAScript 模块或 CommonJS 模块导入到您的应用程序中。

#### ESM:

```js
import * as pw from 'generate-pw';
```

#### CJS:

```js
const pw = require('generate-pw');
```

#

### `generatePassword([options])`

如果未给出 `qty` 选项，则生成**一个**密码，并返回一个字符串：

```js
const password = pw.generatePassword({ length: 11, numbers: true });
console.log(password);
// 示例输出：'bAsZm3mq6Qn'
```

...或 **多个** 密码（如果给出了 `qty` 选项），返回一个字符串数组：

```js
const passwords = pw.generatePassword({ qty: 5, length: 8, symbols: true });
console.log(passwords);
// 示例输出：[ '!zSf@Q.s', '!,HT\\;m=', '?Lq&FV>^', 'gf}Y;}Ne', 'Stsx(GqE' ]
```

**💡 注意：**如果不传递任何选项，密码将为 8 个字符长，由大小写字母组成。

请参阅：[可用选项](#available-options-for-generate-functions)

#

### `generatePasswords(qty[, options])`

根据给定的 `qty` 生成**多个**密码，返回字符串数组：

```js
const passwords = pw.generatePasswords(5, { length: 3, uppercase: false });
console.log(passwords);
// 示例输出：[ 'yilppxru', 'ckvkyjfp', 'zolcpyfb' ]
```

**💡 注意：**如果没有传递 `qty` 参数，则只会生成一个密码，并以字符串形式返回。

请参阅：[可用选项](#available-options-for-generate-functions)

#

### `strictify(password[, requiredCharTypes])`

修改指定的 `password`，以使用传递的每个 `requiredCharTypes` 元素中的至少一个字符，返回一个字符串。

```js
const password = 'abcdef',
      strictPW = pw.strictify(password, ['numbers', 'symbols']);

console.log(strictPW);
// 示例输出：'a!c2eR'
```

可用的 `requiredCharTypes` 有：`['number', 'symbol', 'lower', 'upper']`

**💡注意：**如果没有传递 `requiredCharTypes` 数组，则所有可用类型都将是必需的。

#

### `validateStrength(password)`

验证密码的强度，返回一个包含 `strengthScore`（满分 100）+ `recommendations` 数组的对象。

```js
const password = 'AawiddsE',
      pwStrength = pw.validateStrength(password);

console.log(pwStrength);

/* 输出：
{
  strengthScore: 60,
  recommendations: [ 'Include at least one number.', 'Include at least one symbol.' ]
}
*/
```

#

### `generate*()` 函数的可用选项

其中任何一个都可以传递到每个 `generate*()` 函数的选项对象中：

姓名        | 类型   | 描述                                     | 默认值
------------|--------|-----------------------------------------|--------
`length`    | 整数   | 密码的长度。                              | `8`
`qty`*      | 整数   | 要生成的密码数量。                         | `1`
`charset`   | 字符串 | 密码中包含的字符。                         | `''`
`exclude`   | 字符串 | 要从密码中排除的字符。                     | `''`
`numbers`   | 布尔值 | 允许密码中包含数字。                       | `false`
`symbols`   | 布尔值 | 允许密码中包含符号。                       | `false`
`lowercase` | 布尔值 | 密码中允许使用小写字母。                   | `true`
`uppercase` | 布尔值 | 密码中允许使用大写字母。                   | `true`
`strict`    | 布尔值 | 要求密码中每个允许的字符集中至少有一个字符。 | `false`

##### _*仅在 [`generatePassword([options])`](#generatepasswordoptions) 中可用，因为 [`generatePasswords(qty[, options])`](#generatepasswordsqty-options) 采用 `qty` 参数_

<br>

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

## 💻 命令行使用

全局安装时，**generate-pw** 也可以从命令行使用。 基本命令是：

```
$ generate-pw
```

**💡 注意：**要生成多个结果，请传递 `--qty=n`，其中 `n` 是要生成的密码数量。

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
 -s, --include-symbols       允许密码中包含符号。
 -L, --no-lowercase          密码中不允许使用小写字母。
 -U, --no-uppercase          密码中不允许使用大写字母。

信息命令：
 -h, --help                  显示帮助屏幕。
 -v, --version               显示版本号。
```

<br>

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

## 🏛️ MIT 许可证

**版权所有 © 2024 [刘展鹏 (Adam Lui)](https://github.com/adamlui)**

特此免费向任何获得副本的人授予许可本软件和相关文档文件（『软件』），处理在软件中不受限制，包括但不限于权利使用、复制、修改、合并、发布、分发、再许可和/或出售该软件的副本，并允许该软件是提供这样做，但须满足以下条件：

上述版权声明和本许可声明应包含在所有软件的副本或重要部分。

本软件『按原样』提供，不提供任何形式的明示或保证暗示的，包括但不限于适销性保证，适用于特定目的和非侵权。 在任何情况下都不得作者或版权持有人对任何索赔、损害或其他责任，无论是在合同、侵权或其他方面的行为中，由以下原因引起，出于或与软件或使用或其他交易有关软件。

<br>

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

<a href="https://github.com/adamlui/js-utils">**家**</a> /
<a href="https://github.com/adamlui/js-utils/discussions">讨论</a> /
<a href="#-generate-pw">回到顶部 ↑</a>
