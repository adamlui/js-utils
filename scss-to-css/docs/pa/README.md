<div align="center">
    <h6>
        <picture>
            <source type="image/svg+xml" media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/earth-icon/white/icon32.svg">
            <img height=14 src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/earth-icon/black/icon32.svg">
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
        <a href="../fr#readme">Français</a> |
        <a href="../it#readme">Italiano</a> |
        <a href="../nl#readme">Nederlands</a> |
        <a href="../pt#readme">Português</a>
    </h6>
</div>

# { } scss-to-css

### ਸਾਰੀਆਂ SCSS ਫਾਈਲਾਂ ਨੂੰ ਬਾਰ ਬਾਰ ਮਿਨੀਫਾਈਡ CSS ਵਿੱਚ ਕੰਪਾਇਲ ਕਰੋ।

<a href="https://www.npmjs.com/package/@adamlui/scss-to-css"><img height=31 src="https://img.shields.io/npm/dt/%40adamlui%2Fscss-to-css?logo=npm&color=af68ff&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="#%EF%B8%8F-mit-%E0%A8%B2%E0%A8%BE%E0%A8%87%E0%A8%B8%E0%A9%88%E0%A8%82%E0%A8%B8"><img height=31 src="https://img.shields.io/badge/License-MIT-orange.svg?logo=internetarchive&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://github.com/adamlui/js-utils/releases/tag/scss-to-css-1.7.4"><img height=31 src="https://img.shields.io/badge/Latest_Build-1.7.4-44cc11.svg?logo=icinga&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://www.npmjs.com/package/@adamlui/scss-to-css?activeTab=code"><img height=31 src="https://img.shields.io/npm/unpacked-size/%40adamlui%2Fscss-to-css?style=for-the-badge&logo=ebox&logoColor=white&color=blue&labelColor=464646"></a>
<a href="https://sonarcloud.io/component_measures?metric=new_vulnerabilities&id=adamlui_js-utils:scss-to-css/scss-to-css.js"><img height=31 src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fsonarcloud.io%2Fapi%2Fmeasures%2Fcomponent%3Fcomponent%3Dadamlui_js-utils%3Ascss-to-css%2Fscss-to-css.js%26metricKeys%3Dvulnerabilities&query=%24.component.measures.0.value&style=for-the-badge&logo=sonarcloud&logoColor=white&labelColor=464646&label=Vulnerabilities&color=gold"></a>

<img height=6px width="100%" src="https://github.com/adamlui/js-utils/blob/main/docs/images/aqua-separator.png">

## ⚡ ਇੰਸਟਾਲੇਸ਼ਨ

ਇੱਕ **ਗਲੋਬਲ ਉਪਯੋਗਤਾ** ਦੇ ਰੂਪ ਵਿੱਚ:

```
$ npm install -g @adamlui/scss-to-css
```

ਤੁਹਾਡੇ ਪ੍ਰੋਜੈਕਟ ਰੂਟ ਤੋਂ **ਵਿਕਾਸਕਾਰ ਨਿਰਭਰਤਾ** (ਜਿਵੇਂ ਕਿ ਬਿਲਡ ਸਕ੍ਰਿਪਟਾਂ ਲਈ) ਵਜੋਂ:

```
$ npm install -D @adamlui/scss-to-css
```

ਤੁਹਾਡੇ ਪ੍ਰੋਜੈਕਟ ਰੂਟ ਤੋਂ **ਰਨਟਾਈਮ ਨਿਰਭਰਤਾ** ਦੇ ਤੌਰ 'ਤੇ (ਜਿਵੇਂ ਕਿ ਆਨ-ਦ-ਫਲਾਈ ਕੰਪਾਈਲੇਸ਼ਨ ਲਈ),

```
$ npm install @adamlui/scss-to-css
```

<br>

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

## 💻 ਕਮਾਂਡ ਲਾਈਨ ਦੀ ਵਰਤੋਂ

ਮੂਲ **ਗਲੋਬਲ ਕਮਾਂਡ** ਹੈ:

```
$ scss-to-css
```

ਨਮੂਨਾ ਆਉਟਪੁੱਟ:

<img src="https://github.com/adamlui/js-utils/blob/main/scss-to-css/media/images/sample-output.png">

**💡 ਨੋਟ:** ਸਰੋਤ ਨਕਸ਼ੇ ਵੀ ਮੂਲ ਰੂਪ ਵਿੱਚ ਤਿਆਰ ਕੀਤੇ ਜਾਂਦੇ ਹਨ ਜਦੋਂ ਤੱਕ `-S` ਜਾਂ `--no-source-maps` ਪਾਸ ਨਹੀਂ ਕੀਤੇ ਜਾਂਦੇ ਹਨ।

#

**ਇਨਪੁਟ/ਆਉਟਪੁੱਟ** ਮਾਰਗ ਨਿਰਧਾਰਤ ਕਰਨ ਲਈ:

```
$ scss-to-css [input_path] [output_path]
```

- `[input_path]`: SCSS ਫਾਈਲ ਜਾਂ ਡਾਇਰੈਕਟਰੀ ਦਾ ਮਾਰਗ ਜਿਸ ਵਿੱਚ SCSS ਫਾਈਲਾਂ ਨੂੰ ਕੰਪਾਇਲ ਕੀਤਾ ਜਾਣਾ ਹੈ, ਮੌਜੂਦਾ ਕਾਰਜਸ਼ੀਲ ਡਾਇਰੈਕਟਰੀ ਦੇ ਅਨੁਸਾਰੀ।
- `[output_path]`: ਫਾਈਲ ਜਾਂ ਡਾਇਰੈਕਟਰੀ ਦਾ ਮਾਰਗ ਜਿੱਥੇ CSS + ਸਰੋਤ ਮੈਪ ਫਾਈਲਾਂ ਨੂੰ ਸਟੋਰ ਕੀਤਾ ਜਾਵੇਗਾ, ਅਸਲ ਫਾਈਲ ਟਿਕਾਣੇ ਦੇ ਅਨੁਸਾਰੀ (ਜੇ ਪ੍ਰਦਾਨ ਨਹੀਂ ਕੀਤਾ ਗਿਆ ਹੈ, `css/` ਵਰਤਿਆ ਜਾਂਦਾ ਹੈ)।

**💡 ਨੋਟ:** ਜੇਕਰ ਫੋਲਡਰਾਂ ਨੂੰ ਪਾਸ ਕੀਤਾ ਜਾਂਦਾ ਹੈ, ਤਾਂ ਫਾਈਲਾਂ 'ਤੇ ਮੁੜ-ਵਾਰ ਕਾਰਵਾਈ ਕੀਤੀ ਜਾਵੇਗੀ ਜਦੋਂ ਤੱਕ `-R` ਜਾਂ `--no-recursion` ਪਾਸ ਨਹੀਂ ਕੀਤਾ ਜਾਂਦਾ ਹੈ।

#

ਤੁਹਾਡੇ ਪ੍ਰੋਜੈਕਟ ਦੇ `package.json` ਵਿੱਚ, ਇੱਕ **ਪੈਕੇਜ ਸਕ੍ਰਿਪਟ** ਵਜੋਂ ਵਰਤਣ ਲਈ:

```json
  "scripts": {
    "build:css": "<scss-to-css-cmd>"
  },
```

`<scss-to-css-cmd>` ਨੂੰ `scss-to-css` + ਵਿਕਲਪਿਕ ਮਾਪਦੰਡਾਂ ਨਾਲ ਬਦਲੋ। ਫਿਰ, `npm run build:css` ਕਮਾਂਡ ਨੂੰ ਚਲਾਉਣ ਲਈ ਵਰਤਿਆ ਜਾ ਸਕਦਾ ਹੈ।

#

### Example commands

**ਮੌਜੂਦਾ ਡਾਇਰੈਕਟਰੀ** ਵਿੱਚ ਸਾਰੀਆਂ SCSS ਫ਼ਾਈਲਾਂ ਨੂੰ ਕੰਪਾਇਲ ਕਰੋ (`css/` ਵਿੱਚ ਆਉਟਪੁੱਟ):

```
$ scss-to-css
```

ਸਾਰੀਆਂ SCSS ਫਾਈਲਾਂ ਨੂੰ ਇੱਕ **ਖਾਸ ਡਾਇਰੈਕਟਰੀ** ਵਿੱਚ ਕੰਪਾਇਲ ਕਰੋ (`path/to/your/directory/css/` ਲਈ ਆਉਟਪੁੱਟ):

```
$ scss-to-css path/to/your/directory
```

ਇੱਕ **ਵਿਸ਼ੇਸ਼ ਫ਼ਾਈਲ** ਕੰਪਾਇਲ ਕਰੋ (`path/to/your/css/file.min.css` ਲਈ ਆਉਟਪੁੱਟ):

```
$ scss-to-css path/to/your/file.scss
```

ਦੋਨੋ **ਇਨਪੁਟ ਅਤੇ ਆਉਟਪੁੱਟ** ਡਾਇਰੈਕਟਰੀਆਂ ਨਿਰਧਾਰਤ ਕਰੋ (`output_folder/` ਲਈ ਆਉਟਪੁੱਟ):

```
$ scss-to-css input_folder output_folder
```

**💡 ਨੋਟ:** ਆਉਟਪੁੱਟ CSS ਨੂੰ ਘੱਟ ਕੀਤਾ ਜਾਂਦਾ ਹੈ ਜਦੋਂ ਤੱਕ `-M` ਜਾਂ `--no-minify` ਪਾਸ ਨਹੀਂ ਕੀਤਾ ਜਾਂਦਾ।

#

### ਕਮਾਂਡ ਲਾਈਨ ਵਿਕਲਪ

```
ਸੰਰਚਨਾ ਵਿਕਲਪ:
 -n, --dry-run               ਅਸਲ ਵਿੱਚ ਫਾਈਲਾਂ ਨੂੰ ਕੰਪਾਇਲ ਨਾ ਕਰੋ, ਸਿਰਫ਼ ਦਿਖਾਓ ਕਿ ਕੀ ਉਹਨਾਂ 'ਤੇ ਕਾਰਵਾਈ ਕੀਤੀ ਜਾਵੇਗੀ।
 -d, --include-dotfolders    ਫਾਈਲ ਖੋਜ ਵਿੱਚ ਡਾਟਫੋਲਡਰ ਸ਼ਾਮਲ ਕਰੋ।
 -S, --no-source-maps        ਸਰੋਤ ਨਕਸ਼ੇ ਤਿਆਰ ਹੋਣ ਤੋਂ ਰੋਕੋ।
 -M, --no-minify             ਆਉਟਪੁੱਟ CSS ਦੀ ਮਿਨੀਫਿਕੇਸ਼ਨ ਨੂੰ ਅਸਮਰੱਥ ਬਣਾਓ।
 -R, --no-recursion          ਆਵਰਤੀ ਫਾਈਲ ਖੋਜ ਨੂੰ ਅਸਮਰੱਥ ਬਣਾਓ।
 -q, --quiet                 ਗਲਤੀਆਂ ਨੂੰ ਛੱਡ ਕੇ ਸਾਰੇ ਲੌਗਿੰਗ ਨੂੰ ਦਬਾਓ।

ਜਾਣਕਾਰੀ ਹੁਕਮ:
 -h, --help                  ਡਿਸਪਲੇ ਮਦਦ ਸਕ੍ਰੀਨ।
 -v, --version               ਵਰਜਨ ਨੰਬਰ ਦਿਖਾਓ।
```

<br>

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

## 🔌 API ਵਰਤੋਂ

ਤੁਸੀਂ ECMAScript ਮੋਡੀਊਲ ਜਾਂ CommonJS ਮੋਡੀਊਲ ਦੇ ਰੂਪ ਵਿੱਚ, ਇਸਦੇ API ਵਿਧੀਆਂ ਦੀ ਵਰਤੋਂ ਕਰਨ ਲਈ ਆਪਣੀ ਐਪ ਵਿੱਚ **scss-to-css** ਨੂੰ ਵੀ ਆਯਾਤ ਕਰ ਸਕਦੇ ਹੋ।

#### ESM:

```js
import * as scssToCSS from '@adamlui/scss-to-css';
```

#### CJS:

```js
const scssToCSS = require('@adamlui/scss-to-css');
```

#

### `compile(inputPath[, options])`

CSS ਡੇਟਾ ਵਿੱਚ ਪ੍ਰਦਾਨ ਕੀਤੇ ਗਏ `inputPath` ਵਿੱਚ ਮਿਲੇ SCSS ਨੂੰ ਕੰਪਾਇਲ ਕਰਦਾ ਹੈ।

ਜੇਕਰ ਇੱਕ **ਫਾਈਲ ਮਾਰਗ** ਪਾਸ ਕੀਤਾ ਜਾਂਦਾ ਹੈ, ਤਾਂ ਫ਼ਾਈਲ ਦਾ ਕੋਡ CSS ਵਿੱਚ ਕੰਪਾਇਲ ਕੀਤਾ ਜਾਂਦਾ ਹੈ, ਫਿਰ `srcPath` + `code` + `error` ਵਾਲੀ ਵਸਤੂ ਵਾਪਸ ਕੀਤੀ ਜਾਂਦੀ ਹੈ:

```js
const compileResult = scssToCSS.compile('assets/style.scss');

console.log(compileResult.error); // ਰਨਟਾਈਮ ਗਲਤੀ ਨੂੰ ਆਉਟਪੁੱਟ ਕਰਦਾ ਹੈ, ਜਾਂ ਜੇਕਰ ਕੋਈ ਗਲਤੀ ਨਹੀਂ ਹੈ ਤਾਂ `undefined`
console.log(compileResult.code);  // assets/style.css ਤੋਂ CSS ਕੰਪਾਇਲ ਕੀਤੇ ਆਉਟਪੁੱਟ
```

ਜੇਕਰ ਇੱਕ **ਡਾਇਰੈਕਟਰੀ ਮਾਰਗ** ਪਾਸ ਕੀਤਾ ਜਾਂਦਾ ਹੈ, ਤਾਂ SCSS ਫਾਈਲਾਂ ਦੀ ਖੋਜ ਕੀਤੀ ਜਾਂਦੀ ਹੈ (ਪੂਰਵ-ਨਿਰਧਾਰਤ ਤੌਰ 'ਤੇ), ਹਰੇਕ ਦਾ ਕੋਡ ਲੋਡ ਕੀਤਾ ਜਾਂਦਾ ਹੈ ਅਤੇ ਫਿਰ ਕੰਪਾਇਲ ਕੀਤਾ ਜਾਂਦਾ ਹੈ, ਫਿਰ `srcPath` + `code` + `error` ਵਾਲੀਆਂ ਵਸਤੂਆਂ ਦੀ ਇੱਕ ਐਰੇ ਵਾਪਸ ਕੀਤੀ ਜਾਂਦੀ ਹੈ:

```js
// ਵਰਕਿੰਗ ਡਾਇਰੈਕਟਰੀ + ਸਾਰੀਆਂ ਨੇਸਟਡ ਡਾਇਰੈਕਟਰੀਆਂ ਵਿੱਚ SCSS ਫਾਈਲਾਂ ਦੇ ਮਾਰਗਾਂ ਨੂੰ ਆਉਟਪੁੱਟ ਕਰਦਾ ਹੈ
const compileResults = scssToCSS.compile('.');
compileResults.forEach(result => console.log(result.srcPath));

// ਜੇਕਰ ਲੱਭੀ ਤਾਂ ਦੂਜੀ SCSS ਫਾਈਲ ਤੋਂ CSS ਕੰਪਾਇਲ ਕੀਤੀ ਆਉਟਪੁੱਟ, ਜਾਂ `undefined` ਜੇ ਨਹੀਂ ਮਿਲੀ ਤਾਂ
console.log(compileResults[1].code);
```

ਵਿਕਲਪ ਬੂਲੀਅਨ ਹਨ, ਆਬਜੈਕਟ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ ਵਜੋਂ ਪਾਸ ਕੀਤੇ ਗਏ ਹਨ। ਉਦਾਹਰਣ ਲਈ:

```js
// ਡਾਟਾ ਵਸਤੂਆਂ ਦੀ ਐਰੇ ਵਾਪਸ ਕਰਦਾ ਹੈ ਜਿੱਥੇ `.code` ਵਿੱਚ ਅਣਮਿੱਥੇ CSS ਸ਼ਾਮਲ ਹੁੰਦਾ ਹੈ
scssToCSS.compile(inputDir, { minify: false });
```

ਉਪਲਬਧ ਪੈਰਾਮੀਟਰ (ਅਤੇ ਉਹਨਾਂ ਦੀਆਂ ਡਿਫੌਲਟ ਸੈਟਿੰਗਾਂ) ਹਨ:

ਨਾਮ          | ਵਰਣਨ                                                           | ਪੂਰਵ-ਨਿਰਧਾਰਤ ਮੁੱਲ
-------------|-----------------------------------------------------------------|-----------------
`recursive`  | ਜੇਕਰ ਡਾਇਰੈਕਟਰੀ ਪਾਥ ਪਾਸ ਹੋ ਗਿਆ ਹੈ ਤਾਂ ਨੇਸਟਡ ਫਾਈਲਾਂ ਲਈ ਵਾਰ-ਵਾਰ ਖੋਜ ਕਰੋ। | `true`
`verbose`    | ਕੰਸੋਲ/ਟਰਮੀਨਲ ਵਿੱਚ ਲੌਗਇਨ ਦਿਖਾਓ।                                    | `true`
`dotFolders` | ਫਾਈਲ ਖੋਜ ਵਿੱਚ ਡਾਟਫੋਲਡਰ ਸ਼ਾਮਲ ਕਰੋ।                                  | `false`
`minify`     | ਆਉਟਪੁੱਟ CSS ਨੂੰ ਘੱਟ ਕਰੋ।                                           | `true`
`sourceMaps` | CSS ਸਰੋਤ ਨਕਸ਼ੇ ਤਿਆਰ ਕਰੋ।                                          | `true`

#

### `findSCSS(searchDir[, options])`

ਪਾਸ ਕੀਤੀ `searchDir` ਸਟ੍ਰਿੰਗ ਦੇ ਅੰਦਰ ਸਾਰੀਆਂ SCSS ਫਾਈਲਾਂ ਦੀ ਖੋਜ (ਇਹ ਖੋਜਣ ਲਈ ਉਪਯੋਗੀ ਹੈ ਕਿ ਕਿਹੜੀਆਂ ਫਾਈਲਾਂ [`compile()`](#compileinputpath-options) ਪ੍ਰਕਿਰਿਆ ਕਰਨਗੀਆਂ) ਅਤੇ ਉਹਨਾਂ ਦੇ ਫਾਈਲਪਾਥਾਂ ਵਾਲੀ ਇੱਕ ਐਰੇ ਵਾਪਸ ਕਰਦੀ ਹੈ।

ਵਿਕਲਪ ਬੂਲੀਅਨ ਹਨ, ਆਬਜੈਕਟ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ ਵਜੋਂ ਪਾਸ ਕੀਤੇ ਗਏ ਹਨ। ਉਦਾਹਰਣ ਲਈ:

```js
// SCSS ਫਾਈਲਾਂ ਲਈ ਬਿਲਕੁਲ assets/scss ਵਿੱਚ ਖੋਜ ਕਰੋ:
const searchResults = scssToCSS.findSCSS('assets/scss', { recursive: false });
console.log(searchResults);

/* ਨਮੂਨਾ ਆਉਟਪੁੱਟ:

findSCSS() » Searching for SCSS files...
findSCSS() » Search complete! 2 files found.
findSCSS() » Check returned array.
[
  'E:\\js\\utils\\scss-to-css\assets\\scss\\foo.scss',
  'E:\\js\\utils\\scss-to-css\assets\\scss\\bar.scss'
]
*/
```

ਉਪਲਬਧ ਪੈਰਾਮੀਟਰ (ਅਤੇ ਉਹਨਾਂ ਦੀਆਂ ਡਿਫੌਲਟ ਸੈਟਿੰਗਾਂ) ਹਨ:

ਨਾਮ          | ਵਰਣਨ                                               | ਪੂਰਵ-ਨਿਰਧਾਰਤ ਮੁੱਲ
-------------|-----------------------------------------------------|-----------------
`recursive`  | ਪਾਸ ਕੀਤੇ searchDir ਵਿੱਚ ਨੇਸਟਡ ਫਾਈਲਾਂ ਲਈ ਮੁੜ-ਮੁੜ ਖੋਜ ਕਰੋ। | `true`
`verbose`    | ਕੰਸੋਲ/ਟਰਮੀਨਲ ਵਿੱਚ ਲੌਗਇਨ ਦਿਖਾਓ।                       | `true`
`dotFolders` | ਫਾਈਲ ਖੋਜ ਵਿੱਚ ਡਾਟਫੋਲਡਰ ਸ਼ਾਮਲ ਕਰੋ।                      | `false`

<br>

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

## 🏛️ MIT ਲਾਇਸੈਂਸ

**ਕਾਪੀਰਾਈਟ © 2024 [Adam Lui](https://github.com/adamlui) ਅਤੇ ਯੋਗਦਾਨ ਪਾਉਣ ਵਾਲੇ**

ਕਿਸੇ ਵੀ ਵਿਅਕਤੀ ਨੂੰ ਇਸ ਸੌਫਟਵੇਅਰ ਅਤੇ ਸੰਬੰਧਿਤ ਦਸਤਾਵੇਜ਼ ਫਾਈਲਾਂ ("ਸਾਫਟਵੇਅਰ") ਦੀ ਕਾਪੀ ਪ੍ਰਾਪਤ ਕਰਨ ਵਾਲੇ ਕਿਸੇ ਵੀ ਵਿਅਕਤੀ ਨੂੰ ਬਿਨਾਂ ਕਿਸੇ ਪਾਬੰਦੀ ਦੇ ਸੌਫਟਵੇਅਰ ਵਿੱਚ ਡੀਲ ਕਰਨ ਲਈ, ਬਿਨਾਂ ਕਿਸੇ ਸੀਮਾ ਦੇ ਵਰਤਣ, ਕਾਪੀ ਕਰਨ, ਸੰਸ਼ੋਧਿਤ ਕਰਨ, ਅਭੇਦ ਕਰਨ ਦੇ ਅਧਿਕਾਰਾਂ ਸਮੇਤ, ਇਸ ਦੁਆਰਾ ਇਜਾਜ਼ਤ ਦਿੱਤੀ ਜਾਂਦੀ ਹੈ। , ਪ੍ਰਕਾਸ਼ਿਤ ਕਰੋ, ਵੰਡੋ, ਉਪ-ਲਾਇਸੈਂਸ, ਅਤੇ/ਜਾਂ ਸੌਫਟਵੇਅਰ ਦੀਆਂ ਕਾਪੀਆਂ ਵੇਚੋ, ਅਤੇ ਉਹਨਾਂ ਵਿਅਕਤੀਆਂ ਨੂੰ ਇਜਾਜ਼ਤ ਦੇਣ ਲਈ ਜਿਨ੍ਹਾਂ ਨੂੰ ਸਾਫਟਵੇਅਰ ਦਿੱਤਾ ਗਿਆ ਹੈ, ਹੇਠਾਂ ਦਿੱਤੀਆਂ ਸ਼ਰਤਾਂ ਦੇ ਅਧੀਨ:

ਉਪਰੋਕਤ ਕਾਪੀਰਾਈਟ ਨੋਟਿਸ ਅਤੇ ਇਹ ਇਜਾਜ਼ਤ ਨੋਟਿਸ ਸਾਫਟਵੇਅਰ ਦੀਆਂ ਸਾਰੀਆਂ ਕਾਪੀਆਂ ਜਾਂ ਮਹੱਤਵਪੂਰਨ ਹਿੱਸਿਆਂ ਵਿੱਚ ਸ਼ਾਮਲ ਕੀਤਾ ਜਾਵੇਗਾ।

ਸਾਫਟਵੇਅਰ "ਜਿਵੇਂ ਹੈ" ਪ੍ਰਦਾਨ ਕੀਤਾ ਜਾਂਦਾ ਹੈ, ਕਿਸੇ ਵੀ ਕਿਸਮ ਦੀ ਵਾਰੰਟੀ ਦੇ ਬਿਨਾਂ, ਸਪਸ਼ਟ ਜਾਂ ਅਪ੍ਰਤੱਖ, ਜਿਸ ਵਿੱਚ ਵਪਾਰਕਤਾ, ਕਿਸੇ ਖਾਸ ਉਦੇਸ਼ ਲਈ ਫਿਟਨੈਸ ਦੀ ਵਾਰੰਟੀ ਸ਼ਾਮਲ ਹੈ, ਪਰ ਸੀਮਿਤ ਨਹੀਂ ਹੈ। ਕਿਸੇ ਵੀ ਸੂਰਤ ਵਿੱਚ ਲੇਖਕ ਜਾਂ ਕਾਪੀਰਾਈਟ ਧਾਰਕ ਕਿਸੇ ਵੀ ਦਾਅਵੇ, ਨੁਕਸਾਨ ਜਾਂ ਹੋਰ ਜ਼ਿੰਮੇਵਾਰੀ ਲਈ ਜਵਾਬਦੇਹ ਨਹੀਂ ਹੋਣਗੇ, ਭਾਵੇਂ ਇਕਰਾਰਨਾਮੇ ਦੀ ਕਿਸੇ ਕਾਰਵਾਈ ਵਿੱਚ, ਟਾਰਟ ਜਾਂ ਹੋਰ ਕਿਸੇ ਵੀ ਸਥਿਤੀ ਵਿੱਚ, ਸਾਡੇ ਤੋਂ ਬਾਅਦ ਤੋਂ ਬਾਅਦ ਵਿੱਚ, ਵਿੱਚ ਹੋਰ ਸੌਦੇ ਸਾਫਟਵੇਅਰ।

<br>

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

<a href="https://github.com/adamlui/js-utils">**ਘਰ**</a> /
<a href="https://github.com/adamlui/js-utils/discussions">ਚਰਚਾ ਕਰੋ</a> /
<a href="#--scss-to-css">ਸਿਖਰ 'ਤੇ ਵਾਪਸ ਜਾਓ ↑</a>
