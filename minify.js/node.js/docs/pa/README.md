<div align="right">
    <h6>
        <picture>
            <source type="image/svg+xml" media="(prefers-color-scheme: dark)" srcset="https://media.minify-js.org/images/icons/earth/white/icon32.svg?d07ee82">
            <img height=14 src="https://media.minify-js.org/images/icons/earth/black/icon32.svg?d07ee82">
        </picture>
        &nbsp;ਪੰਜਾਬੀ |
        <a href="../..#readme">English</a> |
        <a href="../zh-cn#readme">简体中文</a> |
        <a href="../zh-tw#readme">繁體中文</a> |
        <a href="../hi#readme">हिंदी</a> |
        <a href="../bn#readme">বাংলা</a> |
        <a href="../mr#readme">मराठी</a> |
        <a href="../de#readme">Deutsch</a> |
        <a href="../es#readme">Español</a> |
        <a href="../fr#readme">Français</a>
    </h6>
</div>

# </> minify.js

### ਸਾਰੀਆਂ JavaScript ਫਾਈਲਾਂ ਨੂੰ ਆਵਰਤੀ ਤੌਰ 'ਤੇ ਛੋਟਾ ਕਰੋ।

<a href="https://www.npmjs.com/package/@adamlui/minify.js"><img height=31 src="https://img.shields.io/npm/dm/%40adamlui%2Fminify.js?logo=npm&color=af68ff&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="#%EF%B8%8F-mit-%E0%A8%B2%E0%A8%BE%E0%A8%87%E0%A8%B8%E0%A9%88%E0%A8%82%E0%A8%B8"><img height=31 src="https://img.shields.io/badge/License-MIT-orange.svg?logo=internetarchive&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://github.com/adamlui/minify.js/releases/tag/node-v1.8.1"><img height=31 src="https://img.shields.io/badge/Latest_Build-1.8.1-44cc11.svg?logo=icinga&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://www.npmjs.com/package/@adamlui/minify.js?activeTab=code"><img height=31 src="https://img.shields.io/npm/unpacked-size/%40adamlui%2Fminify.js?style=for-the-badge&logo=ebox&logoColor=white&labelColor=464646&color=blue"></a>
<a href="https://sonarcloud.io/component_measures?metric=new_vulnerabilities&id=adamlui_minify.js:node.js/src/minify.js"><img height=31 src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fsonarcloud.io%2Fapi%2Fmeasures%2Fcomponent%3Fcomponent%3Dadamlui_minify.js%3Anode.js%2Fsrc%2Fminify.js%26metricKeys%3Dvulnerabilities&query=%24.component.measures.0.value&style=for-the-badge&logo=sonarcloud&logoColor=white&labelColor=464646&label=Vulnerabilities&color=gold"></a>
<a href="https://github.com/toolleeo/cli-apps#programming"><img height=31 src="https://img.shields.io/badge/Mentioned_in-Awesome-c4a2bd?logo=awesomelists&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://minify-js.org"><img height=31 src="https://img.shields.io/badge/web-minify--js.org-lightgrey?logo=dribbble&logoColor=white&labelColor=464646&style=for-the-badge"></a>

<img src="https://cdn.jsdelivr.net/gh/adamlui/minify.js@3d56890/node.js/media/images/screenshots/cli/minify-js-docs-cmd-output.png">

<br>

<img height=6px width="100%" src="https://media.minify-js.org/images/separators/gradient-aqua.png?8b9ed02">

## ⚡ ਇੰਸਟਾਲੇਸ਼ਨ

ਇੱਕ **ਗਲੋਬਲ ਉਪਯੋਗਤਾ** ਦੇ ਰੂਪ ਵਿੱਚ:

```
$ npm install -g @adamlui/minify.js
```

ਤੁਹਾਡੇ ਪ੍ਰੋਜੈਕਟ ਰੂਟ ਤੋਂ **ਵਿਕਾਸਕਾਰ ਨਿਰਭਰਤਾ** (ਜਿਵੇਂ ਕਿ ਬਿਲਡ ਸਕ੍ਰਿਪਟਾਂ ਲਈ) ਵਜੋਂ:

```
$ npm install -D @adamlui/minify.js
```

ਤੁਹਾਡੇ ਪ੍ਰੋਜੈਕਟ ਰੂਟ ਤੋਂ **ਰਨਟਾਈਮ ਨਿਰਭਰਤਾ** ਦੇ ਤੌਰ 'ਤੇ (ਉਦਾਹਰਣ ਲਈ, ਆਨ-ਦ-ਫਲਾਈ ਮਿਨੀਫਿਕੇਸ਼ਨ ਲਈ):

```
$ npm install @adamlui/minify.js
```

<br>

<a href="https://github.com/sponsors/adamlui"><img src="https://media.minify-js.org/images/banners/sponsor/$10/banner1660x260.png?f6118ce"></a>

<img height=6px width="100%" src="https://media.minify-js.org/images/separators/gradient-aqua.png?8b9ed02">

## 💻 ਕਮਾਂਡ ਲਾਈਨ ਦੀ ਵਰਤੋਂ

ਮੂਲ **ਗਲੋਬਲ ਕਮਾਂਡ** ਹੈ:

```
$ minify-js
```

**📝 ਨੋਟ:** ਸਿਰਫ਼ ਇਹ ਦੇਖਣ ਲਈ ਕਿ ਕਿਹੜੀਆਂ ਫ਼ਾਈਲਾਂ 'ਤੇ ਪ੍ਰਕਿਰਿਆ ਕੀਤੀ ਜਾਵੇਗੀ, `-n` ਜਾਂ `--dry-run` ਪਾਸ ਕਰੋ।

#

**ਇਨਪੁਟ/ਆਉਟਪੁੱਟ** ਮਾਰਗ ਨਿਰਧਾਰਤ ਕਰਨ ਲਈ:

```
$ minify-js [input_path] [output_path]
```

- `[input_path]`: JS ਫਾਈਲ ਜਾਂ ਡਾਇਰੈਕਟਰੀ ਦਾ ਮਾਰਗ ਜਿਸ ਵਿੱਚ JS ਫਾਈਲਾਂ ਨੂੰ ਮਿਨਿਫਾਇਡ ਕੀਤਾ ਜਾਣਾ ਹੈ, ਮੌਜੂਦਾ ਕਾਰਜਸ਼ੀਲ ਡਾਇਰੈਕਟਰੀ ਦੇ ਅਨੁਸਾਰੀ।
- `[output_path]`: ਫਾਈਲ ਜਾਂ ਡਾਇਰੈਕਟਰੀ ਦਾ ਮਾਰਗ ਜਿੱਥੇ ਮਿੰਨੀਫਾਈਡ ਫਾਈਲਾਂ ਨੂੰ ਸਟੋਰ ਕੀਤਾ ਜਾਵੇਗਾ, ਅਸਲ ਫਾਈਲ ਟਿਕਾਣੇ ਦੇ ਅਨੁਸਾਰੀ (ਜੇ ਪ੍ਰਦਾਨ ਨਹੀਂ ਕੀਤਾ ਗਿਆ ਹੈ, `min/` ਵਰਤਿਆ ਜਾਂਦਾ ਹੈ)।

**📝 ਨੋਟ:** ਜੇਕਰ ਫੋਲਡਰਾਂ ਨੂੰ ਪਾਸ ਕੀਤਾ ਜਾਂਦਾ ਹੈ, ਤਾਂ ਫਾਈਲਾਂ 'ਤੇ ਮੁੜ-ਵਾਰ ਕਾਰਵਾਈ ਕੀਤੀ ਜਾਵੇਗੀ ਜਦੋਂ ਤੱਕ `-R` ਜਾਂ `--no-recursion` ਪਾਸ ਨਹੀਂ ਕੀਤਾ ਜਾਂਦਾ ਹੈ।
#

ਤੁਹਾਡੇ ਪ੍ਰੋਜੈਕਟ ਦੇ `package.json` ਵਿੱਚ, ਇੱਕ **ਪੈਕੇਜ ਸਕ੍ਰਿਪਟ** ਵਜੋਂ ਵਰਤਣ ਲਈ:

```json
  "scripts": {
    "build:js": "<minify-js-cmd>"
  },
```

`<minify-js-cmd>` ਨੂੰ `minify-js` + ਵਿਕਲਪਿਕ ਮਾਪਦੰਡਾਂ ਨਾਲ ਬਦਲੋ। ਫਿਰ, `npm run build:js` ਕਮਾਂਡ ਨੂੰ ਚਲਾਉਣ ਲਈ ਵਰਤਿਆ ਜਾ ਸਕਦਾ ਹੈ।

#

### ਉਦਾਹਰਨ ਕਮਾਂਡਾਂ

**ਮੌਜੂਦਾ ਡਾਇਰੈਕਟਰੀ** ਵਿੱਚ ਸਾਰੀਆਂ JavaScript ਫ਼ਾਈਲਾਂ ਨੂੰ ਛੋਟਾ ਕਰੋ (`min/` ਵਿੱਚ ਆਉਟਪੁੱਟ):

```
$ minify-js
```

ਇੱਕ **ਖਾਸ ਡਾਇਰੈਕਟਰੀ** ਵਿੱਚ ਸਾਰੀਆਂ JavaScript ਫਾਈਲਾਂ ਨੂੰ ਛੋਟਾ ਕਰੋ (`path/to/your/directory/min/` ਲਈ ਆਉਟਪੁੱਟ):

```
$ minify-js path/to/your/directory
```

ਇੱਕ **ਖਾਸ ਫ਼ਾਈਲ** ਨੂੰ ਛੋਟਾ ਕਰੋ (`path/to/your/min/file.min.js` ਲਈ ਆਉਟਪੁੱਟ):

```
$ minify-js path/to/your/file.js
```

ਦੋਨੋ **ਇਨਪੁਟ ਅਤੇ ਆਉਟਪੁੱਟ** ਡਾਇਰੈਕਟਰੀਆਂ ਨਿਰਧਾਰਤ ਕਰੋ (`output_folder/` ਲਈ ਆਉਟਪੁੱਟ):

```
$ minify-js input_folder output_folder
```

#

### ਕਮਾਂਡ ਲਾਈਨ ਵਿਕਲਪ

```
ਬੁਲੀਅਨ ਵਿਕਲਪ:
 -n, --dry-run                        ਅਸਲ ਵਿੱਚ ਫਾਈਲਾਂ ਨੂੰ ਘੱਟ ਨਾ ਕਰੋ, ਸਿਰਫ਼ ਦਿਖਾਓ ਕਿ ਕੀ ਉਹਨਾਂ 'ਤੇ ਕਾਰਵਾਈ ਕੀਤੀ ਜਾਵੇਗੀ।
 -d, --include-dotfolders             ਫਾਈਲ ਖੋਜ ਵਿੱਚ ਡਾਟਫੋਲਡਰ ਸ਼ਾਮਲ ਕਰੋ।
 -D, --include-dotfiles               ਫਾਈਲ ਖੋਜ ਵਿੱਚ ਡਾਟ ਫਾਈਲਾਂ ਸ਼ਾਮਲ ਕਰੋ।
 -R, --no-recursion                   ਆਵਰਤੀ ਫਾਈਲ ਖੋਜ ਨੂੰ ਅਸਮਰੱਥ ਬਣਾਓ।
 -M, --no-mangle                      ਮੰਗਲ ਨਾਮਾਂ ਨੂੰ ਅਯੋਗ ਕਰੋ।
 -X, --no-filename-change             ਫਾਈਲ ਐਕਸਟੈਂਸ਼ਨ ਨੂੰ .min.js ਵਿੱਚ ਬਦਲਣ ਨੂੰ ਅਸਮਰੱਥ ਕਰੋ।
 -c, --copy                           ਜੇਕਰ ਸਿੰਗਲ ਸੋਰਸ ਫਾਈਲ ਦੀ ਪ੍ਰਕਿਰਿਆ ਕੀਤੀ ਜਾਂਦੀ ਹੈ ਤਾਂ ਫਾਈਲ ਵਿੱਚ ਲਿਖਣ ਦੀ ਬਜਾਏ ਮਿਨੀਫਾਈਡ ਕੋਡ ਨੂੰ ਕਲਿੱਪਬੋਰਡ ਵਿੱਚ ਕਾਪੀ ਕਰੋ।
 -q, --quiet                          ਗਲਤੀਆਂ ਨੂੰ ਛੱਡ ਕੇ ਸਾਰੇ ਲੌਗਿੰਗ ਨੂੰ ਦਬਾਓ।

ਪੈਰਾਮੀਟਰ ਵਿਕਲਪ:
 --ignore-files="file1.js,file2.js"   ਮਾਈਨੀਫਿਕੇਸ਼ਨ ਤੋਂ ਬਾਹਰ ਰੱਖਣ ਲਈ ਫ਼ਾਈਲਾਂ।
 --comment="comment"                  ਸਿਰਲੇਖ ਦੀ ਟਿੱਪਣੀ ਨੂੰ ਛੋਟੇ ਕੋਡ ਵਿੱਚ ਅੱਗੇ ਰੱਖੋ। '\n' ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਲਾਈਨ ਦੁਆਰਾ ਵੱਖ ਕਰੋ।

ਜਾਣਕਾਰੀ ਹੁਕਮ:
 -h, --help                           ਡਿਸਪਲੇ ਮਦਦ ਸਕ੍ਰੀਨ।
 -v, --version                        ਵਰਜਨ ਨੰਬਰ ਦਿਖਾਓ।
```

<br>

<img height=6px width="100%" src="https://media.minify-js.org/images/separators/gradient-aqua.png?8b9ed02">

## 🔌 API ਵਰਤੋਂ

ਤੁਸੀਂ ECMAScript ਮੋਡੀਊਲ ਜਾਂ CommonJS ਮੋਡੀਊਲ ਦੋਵਾਂ ਦੇ ਰੂਪ ਵਿੱਚ, ਇਸਦੇ API ਵਿਧੀਆਂ ਦੀ ਵਰਤੋਂ ਕਰਨ ਲਈ ਆਪਣੀ ਐਪ ਵਿੱਚ **minify.js** ਨੂੰ ਵੀ ਆਯਾਤ ਕਰ ਸਕਦੇ ਹੋ।

#### ESM*:

```js
import minifyJS from '@adamlui/minify.js';
```

#### CJS:

```js
const minifyJS = require('@adamlui/minify.js');
```

###### _*Node.js ਸੰਸਕਰਣ 14 ਜਾਂ ਉੱਚ ਲੋੜੀਂਦਾ_

#

### `minify(input[, options])`

💡 ਸਪਲਾਈ ਕੀਤੇ ਸਟ੍ਰਿੰਗ ਇਨਪੁਟ ਦੇ ਆਧਾਰ 'ਤੇ JavaScript ਕੋਡ ਨੂੰ ਘੱਟ ਕਰਦਾ ਹੈ।

ਜੇਕਰ **ਸਰੋਤ ਕੋਡ** ਪਾਸ ਕੀਤਾ ਜਾਂਦਾ ਹੈ, ਤਾਂ ਇਹ ਸਿੱਧੇ ਤੌਰ 'ਤੇ ਛੋਟਾ ਕੀਤਾ ਜਾਂਦਾ ਹੈ, ਫਿਰ `srcPath` + `code` + `error` ਵਾਲੀ ਵਸਤੂ ਵਾਪਸ ਕੀਤੀ ਜਾਂਦੀ ਹੈ:

```js
const srcCode = 'function add(first, second) { return first + second; }',
      minifyResult = minifyJS.minify(srcCode);

console.log(minifyResult.error); // ਰਨਟਾਈਮ ਗਲਤੀ ਨੂੰ ਆਉਟਪੁੱਟ ਕਰਦਾ ਹੈ, ਜਾਂ ਜੇਕਰ ਕੋਈ ਗਲਤੀ ਨਹੀਂ ਹੈ ਤਾਂ `undefined`
console.log(minifyResult.code);  // ਆਉਟਪੁੱਟ ਮਿਨੀਫਾਈਡ JS: 'function add(n,d){return n+d}'
```

ਜੇਕਰ ਇੱਕ **ਫਾਈਲ ਮਾਰਗ** ਪਾਸ ਕੀਤਾ ਜਾਂਦਾ ਹੈ, ਤਾਂ ਫਾਈਲ ਦਾ ਕੋਡ ਲੋਡ ਕੀਤਾ ਜਾਂਦਾ ਹੈ, ਫਿਰ ਮਿਨਿਫਾਈਡ ਕੀਤਾ ਜਾਂਦਾ ਹੈ, ਉਪਰੋਕਤ ਵਰਗਾ ਇੱਕ ਵਸਤੂ ਵਾਪਸ ਕਰਦਾ ਹੈ।

ਜੇਕਰ ਇੱਕ **ਡਾਇਰੈਕਟਰੀ ਮਾਰਗ** ਪਾਸ ਕੀਤਾ ਜਾਂਦਾ ਹੈ, ਤਾਂ JavaScript ਫ਼ਾਈਲਾਂ ਦੀ ਖੋਜ ਕੀਤੀ ਜਾਂਦੀ ਹੈ (ਪੂਰਵ-ਨਿਰਧਾਰਤ ਤੌਰ 'ਤੇ), ਹਰੇਕ ਦਾ ਕੋਡ ਲੋਡ ਕੀਤਾ ਜਾਂਦਾ ਹੈ ਅਤੇ ਫਿਰ ਛੋਟਾ ਕੀਤਾ ਜਾਂਦਾ ਹੈ, ਫਿਰ `srcPath` + `code` + `error` ਵਾਲੀਆਂ ਵਸਤੂਆਂ ਦੀ ਇੱਕ ਐਰੇ ਵਾਪਸ ਕੀਤੀ ਜਾਂਦੀ ਹੈ:

```js
// ਵਰਕਿੰਗ ਡਾਇਰੈਕਟਰੀ + ਸਾਰੀਆਂ ਨੇਸਟਡ ਡਾਇਰੈਕਟਰੀਆਂ ਵਿੱਚ JS ਫਾਈਲਾਂ ਦੇ ਸਰੋਤ ਮਾਰਗਾਂ ਨੂੰ ਆਉਟਪੁੱਟ ਕਰਦਾ ਹੈ
const minifyResults = minifyJS.minify('.');
minifyResults.forEach(result => console.log(result.srcPath));

// ਦੂਜੀ JS ਫਾਈਲ ਦਾ ਮਿਨਿਫਾਈਡ ਕੋਡ ਆਉਟਪੁੱਟ ਕਰਦਾ ਹੈ, ਜੇਕਰ ਮਿਲਦਾ ਹੈ, ਜਾਂ 'undefined' ਨਹੀਂ ਮਿਲਦਾ ਹੈ
console.log(minifyResults[1].code);
```

ਵਿਕਲਪ ਬੂਲੀਅਨ ਹਨ, ਆਬਜੈਕਟ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ ਵਜੋਂ ਪਾਸ ਕੀਤੇ ਗਏ ਹਨ। ਉਦਾਹਰਣ ਲਈ:

```js
// ਡਾਟਾ ਆਬਜੈਕਟ ਦੀ ਐਰੇ ਵਾਪਸ ਕਰਦਾ ਹੈ ਜਿੱਥੇ `input` ਇੱਕ ਮਾਰਗ ਹੈ ਤਾਂ ਡਾਟਫਾਈਲਾਂ 'ਤੇ ਵੀ ਪ੍ਰਕਿਰਿਆ ਕੀਤੀ ਜਾਂਦੀ ਹੈ
minifyJS.minify(input, { dotFiles: true });
```

ਉਪਲਬਧ ਪੈਰਾਮੀਟਰ (ਅਤੇ ਉਹਨਾਂ ਦੀਆਂ ਡਿਫੌਲਟ ਸੈਟਿੰਗਾਂ) ਹਨ:

ਨਾਮ           | ਟਾਈਪ ਕਰੋ | ਵਰਣਨ                                                                       | ਪੂਰਵ-ਨਿਰਧਾਰਤ ਮੁੱਲ
--------------|----------|----------------------------------------------------------------------------|-----------------
`recursive`   | ਬੁਲੀਅਨ   | ਜੇਕਰ ਡਾਇਰੈਕਟਰੀ ਪਾਥ ਪਾਸ ਹੋ ਗਿਆ ਹੈ ਤਾਂ ਨੇਸਟਡ ਫਾਈਲਾਂ ਲਈ ਵਾਰ-ਵਾਰ ਖੋਜ ਕਰੋ।            | `true`
`verbose`     | ਬੁਲੀਅਨ   | ਕੰਸੋਲ/ਟਰਮੀਨਲ ਵਿੱਚ ਲੌਗਇਨ ਦਿਖਾਓ।                                               | `true`
`dotFolders`  | ਬੁਲੀਅਨ   | ਫਾਈਲ ਖੋਜ ਵਿੱਚ ਡਾਟਫੋਲਡਰ ਸ਼ਾਮਲ ਕਰੋ।                                             | `false`
`dotFiles`    | ਬੁਲੀਅਨ   | ਫਾਈਲ ਖੋਜ ਵਿੱਚ ਡਾਟ ਫਾਈਲਾਂ ਸ਼ਾਮਲ ਕਰੋ।                                            | `false`
`mangle`      | ਬੁਲੀਅਨ   | ਵੇਰੀਏਬਲ ਨਾਮ (ਆਮ ਤੌਰ 'ਤੇ ਇੱਕ ਅੱਖਰ ਤੱਕ) ਨੂੰ ਛੋਟਾ ਕਰੋ।                              | `true`
`ignoreFiles` | ਐਰੇ      | ਮਾਈਨੀਫਿਕੇਸ਼ਨ ਤੋਂ ਬਾਹਰ ਰੱਖਣ ਲਈ ਫਾਈਲਾਂ (ਨਾਮ ਦੁਆਰਾ)।                               | `[]`
`comment`     | ਸਤਰ     | ਮਿੰਨੀਫਾਈਡ ਕੋਡ ਨੂੰ ਅੱਗੇ ਵਧਾਉਣ ਲਈ ਹੈਡਰ ਟਿੱਪਣੀ। '\n' ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਲਾਈਨ ਦੁਆਰਾ ਵੱਖ ਕਰੋ। | `''`

#

### `findJS(searchDir[, options])`

💡 ਪਾਸ ਕੀਤੀ ਗਈ `searchDir` ਸਤਰ ਦੇ ਅੰਦਰ ਸਾਰੀਆਂ ਅਣਮਿੰਨੀਡ JavaScript ਫ਼ਾਈਲਾਂ ਦੀ ਖੋਜ (ਇਹ ਖੋਜਣ ਲਈ ਉਪਯੋਗੀ ਹੈ ਕਿ ਕਿਹੜੀਆਂ ਫ਼ਾਈਲਾਂ [`minify()`](#minifyinput-options) ਪ੍ਰਕਿਰਿਆ ਕਰਨਗੀਆਂ) ਅਤੇ ਉਹਨਾਂ ਦੇ ਫਾਈਲਪਾਥਾਂ ਵਾਲੀ ਇੱਕ ਐਰੇ ਵਾਪਸ ਕਰਦੀ ਹੈ।

ਵਿਕਲਪ ਬੂਲੀਅਨ ਹਨ, ਆਬਜੈਕਟ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ ਵਜੋਂ ਪਾਸ ਕੀਤੇ ਗਏ ਹਨ। ਉਦਾਹਰਣ ਲਈ:

```js
// ਬਿਲਕੁਲ assets/js ਵਿੱਚ ਅਣਮਿੱਥੇ ਜਾਵਾ ਸਕ੍ਰਿਪਟ ਫਾਈਲਾਂ ਦੀ ਖੋਜ ਕਰੋ
const searchResults = minifyJS.findJS('assets/js', { recursive: false });
console.log(searchResults);

/* ਨਮੂਨਾ ਆਉਟਪੁੱਟ:

findJS() » Searching for unminified JS files...
findJS() » Search complete! 2 files found.
findJS() » Check returned array.
[
  'E:\\js\\utils\\minify.js\\assets\\js\\foo.js',
  'E:\\js\\utils\\minify.js\\assets\\js\\bar.js'
]
*/
```

ਉਪਲਬਧ ਪੈਰਾਮੀਟਰ (ਅਤੇ ਉਹਨਾਂ ਦੀਆਂ ਡਿਫੌਲਟ ਸੈਟਿੰਗਾਂ) ਹਨ:

ਨਾਮ           | ਟਾਈਪ ਕਰੋ | ਵਰਣਨ                                                | ਪੂਰਵ-ਨਿਰਧਾਰਤ ਮੁੱਲ
--------------|----------|------------------------------------------------------|-----------------
`recursive`   | ਬੁਲੀਅਨ   | ਪਾਸ ਕੀਤੇ searchDir ਵਿੱਚ ਨੇਸਟਡ ਫਾਈਲਾਂ ਲਈ ਮੁੜ-ਮੁੜ ਖੋਜ ਕਰੋ।  | `true`
`verbose`     | ਬੁਲੀਅਨ   | ਕੰਸੋਲ/ਟਰਮੀਨਲ ਵਿੱਚ ਲੌਗਇਨ ਦਿਖਾਓ।                        | `true`
`dotFolders`  | ਬੁਲੀਅਨ   | ਫਾਈਲ ਖੋਜ ਵਿੱਚ ਡਾਟਫੋਲਡਰ ਸ਼ਾਮਲ ਕਰੋ।                      | `false`
`dotFiles`    | ਬੁਲੀਅਨ   | ਫਾਈਲ ਖੋਜ ਵਿੱਚ ਡਾਟ ਫਾਈਲਾਂ ਸ਼ਾਮਲ ਕਰੋ।                     | `false`
`ignoreFiles` | ਐਰੇ      | ਖੋਜ ਨਤੀਜਿਆਂ ਤੋਂ ਬਾਹਰ ਕੱਢਣ ਲਈ ਫਾਈਲਾਂ (ਨਾਮ ਦੁਆਰਾ)।        | `[]`

<br>

<img height=6px width="100%" src="https://media.minify-js.org/images/separators/gradient-aqua.png?8b9ed02">

## 🏛️ MIT ਲਾਇਸੈਂਸ

**ਕਾਪੀਰਾਈਟ © 2023–2024 [Adam Lui](https://github.com/adamlui) ਅਤੇ ਯੋਗਦਾਨ ਪਾਉਣ ਵਾਲੇ**

ਕਿਸੇ ਵੀ ਵਿਅਕਤੀ ਨੂੰ ਇਸ ਸੌਫਟਵੇਅਰ ਅਤੇ ਸੰਬੰਧਿਤ ਦਸਤਾਵੇਜ਼ ਫਾਈਲਾਂ ("ਸਾਫਟਵੇਅਰ") ਦੀ ਕਾਪੀ ਪ੍ਰਾਪਤ ਕਰਨ ਵਾਲੇ ਕਿਸੇ ਵੀ ਵਿਅਕਤੀ ਨੂੰ ਬਿਨਾਂ ਕਿਸੇ ਪਾਬੰਦੀ ਦੇ ਸੌਫਟਵੇਅਰ ਵਿੱਚ ਡੀਲ ਕਰਨ ਲਈ, ਬਿਨਾਂ ਕਿਸੇ ਸੀਮਾ ਦੇ ਵਰਤਣ, ਕਾਪੀ ਕਰਨ, ਸੰਸ਼ੋਧਿਤ ਕਰਨ, ਅਭੇਦ ਕਰਨ ਦੇ ਅਧਿਕਾਰਾਂ ਸਮੇਤ, ਇਸ ਦੁਆਰਾ ਇਜਾਜ਼ਤ ਦਿੱਤੀ ਜਾਂਦੀ ਹੈ। , ਪ੍ਰਕਾਸ਼ਿਤ ਕਰੋ, ਵੰਡੋ, ਉਪ-ਲਾਇਸੈਂਸ, ਅਤੇ/ਜਾਂ ਸੌਫਟਵੇਅਰ ਦੀਆਂ ਕਾਪੀਆਂ ਵੇਚੋ, ਅਤੇ ਉਹਨਾਂ ਵਿਅਕਤੀਆਂ ਨੂੰ ਇਜਾਜ਼ਤ ਦੇਣ ਲਈ ਜਿਨ੍ਹਾਂ ਨੂੰ ਸਾਫਟਵੇਅਰ ਦਿੱਤਾ ਗਿਆ ਹੈ, ਹੇਠਾਂ ਦਿੱਤੀਆਂ ਸ਼ਰਤਾਂ ਦੇ ਅਧੀਨ:

ਉਪਰੋਕਤ ਕਾਪੀਰਾਈਟ ਨੋਟਿਸ ਅਤੇ ਇਹ ਇਜਾਜ਼ਤ ਨੋਟਿਸ ਸਾਫਟਵੇਅਰ ਦੀਆਂ ਸਾਰੀਆਂ ਕਾਪੀਆਂ ਜਾਂ ਮਹੱਤਵਪੂਰਨ ਹਿੱਸਿਆਂ ਵਿੱਚ ਸ਼ਾਮਲ ਕੀਤਾ ਜਾਵੇਗਾ।

ਸਾਫਟਵੇਅਰ "ਜਿਵੇਂ ਹੈ" ਪ੍ਰਦਾਨ ਕੀਤਾ ਜਾਂਦਾ ਹੈ, ਕਿਸੇ ਵੀ ਕਿਸਮ ਦੀ ਵਾਰੰਟੀ ਦੇ ਬਿਨਾਂ, ਸਪਸ਼ਟ ਜਾਂ ਅਪ੍ਰਤੱਖ, ਜਿਸ ਵਿੱਚ ਵਪਾਰਕਤਾ, ਕਿਸੇ ਖਾਸ ਉਦੇਸ਼ ਲਈ ਫਿਟਨੈਸ ਦੀ ਵਾਰੰਟੀ ਸ਼ਾਮਲ ਹੈ, ਪਰ ਸੀਮਿਤ ਨਹੀਂ ਹੈ। ਕਿਸੇ ਵੀ ਸੂਰਤ ਵਿੱਚ ਲੇਖਕ ਜਾਂ ਕਾਪੀਰਾਈਟ ਧਾਰਕ ਕਿਸੇ ਵੀ ਦਾਅਵੇ, ਨੁਕਸਾਨ ਜਾਂ ਹੋਰ ਜ਼ਿੰਮੇਵਾਰੀ ਲਈ ਜਵਾਬਦੇਹ ਨਹੀਂ ਹੋਣਗੇ, ਭਾਵੇਂ ਇਕਰਾਰਨਾਮੇ ਦੀ ਕਿਸੇ ਕਾਰਵਾਈ ਵਿੱਚ, ਟਾਰਟ ਜਾਂ ਹੋਰ ਕਿਸੇ ਵੀ ਸਥਿਤੀ ਵਿੱਚ, ਸਾਡੇ ਤੋਂ ਬਾਅਦ ਤੋਂ ਬਾਅਦ ਵਿੱਚ, ਵਿੱਚ ਹੋਰ ਸੌਦੇ ਸਾਫਟਵੇਅਰ।

<br>

<img height=6px width="100%" src="https://media.minify-js.org/images/separators/gradient-aqua.png?8b9ed02">

## 🛠️ ਸੰਬੰਧਿਤ ਉਪਯੋਗਤਾਵਾਂ

### [</> minify.js (Gulp)](https://gulp.minify-js.org) &nbsp;<a href="https://github.com/toolleeo/cli-apps#programming"><img height=18 src="https://media.minify-js.org/images/badges/awesome/badge.svg?b78dcd3"></a>

> Gulp ਪਲੱਗ-ਇਨ ਸਾਰੀਆਂ JavaScript ਫਾਈਲਾਂ ਨੂੰ ਮੁੜ ਤੋਂ ਘੱਟ ਕਰਨ ਲਈ।
<br>[ਇੰਸਟਾਲ ਕਰੋ](https://gulp.minify-js.org/#-installation) /
[ਪੜ੍ਹੋ](https://gulp.minify-js.org/#readme) /
[ਚਰਚਾ ਕਰੋ](https://github.minify-js.org/discussions)

### [{ } scss-to-css](https://github.com/adamlui/scss-to-css) &nbsp;<a href="https://github.com/toolleeo/cli-apps#conversion"><img height=18 src="https://media.minify-js.org/images/badges/awesome/badge.svg?b78dcd3"></a>

> ਸਾਰੀਆਂ SCSS ਫਾਈਲਾਂ ਨੂੰ ਬਾਰ ਬਾਰ ਮਿਨੀਫਾਈਡ CSS ਵਿੱਚ ਕੰਪਾਇਲ ਕਰੋ।
<br>[ਇੰਸਟਾਲ ਕਰੋ](https://node.scsstocss.org/#-installation) /
[ਪੜ੍ਹੋ](https://node.scsstocss.org/#readme) /
[CLI ਦੀ ਵਰਤੋਂ](https://node.scsstocss.org/#-cli-usage) /
[API ਦੀ ਵਰਤੋਂ](https://node.scsstocss.org/#-api-usage) /
[ਚਰਚਾ ਕਰੋ](https://github.scsstocss.org/discussions)

<br>

<img height=6px width="100%" src="https://media.minify-js.org/images/separators/gradient-aqua.png?8b9ed02">

<picture><source media="(prefers-color-scheme: dark)" srcset="https://media.minify-js.org/images/icons/home/white/icon32x27.png?d07ee82"><img height=13 src="https://media.minify-js.org/images/icons/home/dark-gray/icon32x27.png?d07ee82"></picture> <a href="https://js-utils.com">**ਹੋਰ JavaScript ਉਪਯੋਗਤਾਵਾਂ**</a> /
<a href="https://github.minify-js.org/discussions">ਚਰਚਾ ਕਰੋ</a> /
<a href="#-minifyjs">ਸਿਖਰ 'ਤੇ ਵਾਪਸ ਜਾਓ ↑</a>
