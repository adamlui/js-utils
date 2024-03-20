# > generate-pw

### Randomly generate cryptographically-secure passwords.

<a href="#%EF%B8%8F-mit-license"><img height=28 src="https://img.shields.io/badge/License-MIT-orange.svg?logo=internetarchive&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://www.npmjs.com/package/generate-pw?activeTab=versions"><img height=28 src="https://img.shields.io/badge/Latest_Build-1.0.0-44cc11.svg?logo=icinga&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://www.npmjs.com/package/generate-pw?activeTab=code"><img height=28 src="https://img.shields.io/npm/unpacked-size/generate-pw?style=for-the-badge&logo=ebox&logoColor=white&labelColor=464646&color=blue"></a>
<a href="https://sonarcloud.io/component_measures?metric=new_vulnerabilities&id=adamlui_js-utils:generate-pw/generate-pw.js"><img height=28 src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fsonarcloud.io%2Fapi%2Fmeasures%2Fcomponent%3Fcomponent%3Dadamlui_js-utils%3Agenerate-pw%2Fgenerate-pw.js%26metricKeys%3Dvulnerabilities&query=%24.component.measures.0.value&style=for-the-badge&logo=sonarcloud&logoColor=white&labelColor=464646&label=Vulnerabilities&color=gold"></a>

## ⚡ Installation

As a **global utility**:

```
$ npm install -g generate-pw
```

As a **dev dependency**, from your project root:

```
$ npm install -D generate-pw
```

As a **runtime dependency**, from your project root:

```
$ npm install generate-pw
```

## 🔌 API reference

**generate-pw** can be imported into your app as an ECMAScript module or a CommonJS module.

#### ESM:

```js
import * as pw from 'generate-pw';
```

#### CJS:

```js
const pw = require('generate-pw');
```

### `generatePassword([options])`

Generates **one** password if `qty` option is not given, returning a string:

```js
const password = pw.generatePassword({ length: 11, numbers: true });
console.log(password); // sample output: 'bAsZmsmqoQn'
```

...or **multiple** passwords if `qty` option is given, returning an array of strings:

```js
const passwords = pw.generatePassword({ qty: 5, length: 8, symbols: true });
console.log(passwords); // sample output: [ '!zSf@Q.s', '!,HT\\;m=', '?Lq&FV>^', 'gf}Y;}Ne', 'Stsx(GqE' ]
```

**💡 Note:** If no options are passed, passwords will be 8-chars long, consisting of upper/lower cased letters.

### `generatePasswords(qty[, options])`

Generates **multiple** passwords based on `qty` given, returning an array of strings:

```js
const passwords = pw.generatePasswords(5, { length: 3, uppercase: false });
console.log(passwords); // sample output: [ 'yilppxru', 'ckvkyjfp', 'zolcpyfb' ]
```

### Available options

Any of these can be passed into the options object for each function:

Name | Description | Default Value
---|---|---
`length` | Integer, length of password. | `8`
`qty`* | Integer, number of passwords to generate. | `1`
`charset` | String, only characters to be included in password. | ''
`exclude` | String, characters to be excluded from password. | ''
`numbers` | Boolean, allow numbers in password. | `false`
`symbols` | Boolean, allow symbols in password. | `false`
`lowercase` | Boolean, allow lowercase letters in password. | `true`
`uppercase` | Boolean, allow uppercase letters in password. | `true`
`strict` | Boolean, password must include at least one character from each included character set. | `false`

##### _*Only available in [`generatePassword([options])`](#generatepasswordoptions) since [`generatePasswords(qty[, options])`](#generatepasswordsqty-options) takes a `qty` argument_

<br>

## 💻 Command line usage

**generate-pw** can also be used from the command line. The basic **global command** is:

```
$ generate-pw
```

**💡 Note:** To generate multiple results, pass `--qty=n` where `n` is the number of passwords to generate.
<br><br>

## 🏛️ MIT License

**Copyright © 2024 [Adam Lui](https://github.com/adamlui)**

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

<br>

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

<a href="https://github.com/adamlui/js-utils">**Home**</a> /
<a href="https://github.com/adamlui/js-utils/discussions">Discuss</a> /
<a href="#-generate-pw">Back to top ↑</a>
