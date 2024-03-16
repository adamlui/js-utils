<div align="right">
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
        <a href="../mr#readme">मराठी</a>
    </h6>
</div>

# { } scss-to-css

### ਸਾਰੀਆਂ SCSS ਫਾਈਲਾਂ ਨੂੰ ਬਾਰ ਬਾਰ ਮਿਨੀਫਾਈਡ CSS ਵਿੱਚ ਕੰਪਾਇਲ ਕਰੋ।

<a href="https://www.npmjs.com/package/@adamlui/scss-to-css"><img height=31 src="https://img.shields.io/npm/dt/%40adamlui%2Fscss-to-css?logo=npm&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="#%EF%B8%8F-mit-%E0%A8%B2%E0%A8%BE%E0%A8%87%E0%A8%B8%E0%A9%88%E0%A8%82%E0%A8%B8"><img height=31 src="https://img.shields.io/badge/License-MIT-red.svg?logo=internetarchive&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://www.npmjs.com/package/@adamlui/scss-to-css?activeTab=versions"><img height=31 src="https://img.shields.io/badge/Latest_Build-1.6.0-fc7811.svg?logo=icinga&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://www.npmjs.com/package/@adamlui/scss-to-css?activeTab=code"><img height=31 src="https://img.shields.io/npm/unpacked-size/%40adamlui%2Fscss-to-css?style=for-the-badge&logo=ebox&logoColor=white&color=blue&labelColor=464646"></a>
<a href="https://sonarcloud.io/component_measures?metric=new_vulnerabilities&id=adamlui_js-utils:scss-to-css/scss-to-css.js"><img height=31 src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fsonarcloud.io%2Fapi%2Fmeasures%2Fcomponent%3Fcomponent%3Dadamlui_js-utils%3Ascss-to-css%2Fscss-to-css.js%26metricKeys%3Dvulnerabilities&query=%24.component.measures.0.value&style=for-the-badge&logo=sonarcloud&logoColor=white&labelColor=464646&label=Vulnerabilities&color=gold"></a>

<img height=8px width="100%" src="https://github.com/adamlui/js-utils/blob/main/docs/images/aqua-separator.png">

## ⚡ ਇੰਸਟਾਲੇਸ਼ਨ

ਇੱਕ **ਗਲੋਬਲ ਉਪਯੋਗਤਾ** ਦੇ ਰੂਪ ਵਿੱਚ:

```
npm install -g @adamlui/scss-to-css
```

ਤੁਹਾਡੇ ਪ੍ਰੋਜੈਕਟ ਰੂਟ ਤੋਂ **ਵਿਕਾਸਕਾਰ ਨਿਰਭਰਤਾ** (ਜਿਵੇਂ ਕਿ ਬਿਲਡ ਸਕ੍ਰਿਪਟਾਂ ਲਈ) ਵਜੋਂ:

```
npm install -D @adamlui/scss-to-css
```

ਤੁਹਾਡੇ ਪ੍ਰੋਜੈਕਟ ਰੂਟ ਤੋਂ **ਰਨਟਾਈਮ ਨਿਰਭਰਤਾ** ਦੇ ਤੌਰ 'ਤੇ (ਜਿਵੇਂ ਕਿ ਆਨ-ਦ-ਫਲਾਈ ਕੰਪਾਈਲੇਸ਼ਨ ਲਈ),

```
npm install @adamlui/scss-to-css
```

## 💻 ਕਮਾਂਡ ਲਾਈਨ ਦੀ ਵਰਤੋਂ

ਮੂਲ **ਗਲੋਬਲ ਕਮਾਂਡ** ਹੈ:

```
scss-to-css
```

ਨਮੂਨਾ ਆਉਟਪੁੱਟ:

<img src="https://github.com/adamlui/js-utils/blob/main/scss-to-css/media/images/sample-output.png">

**💡 ਨੋਟ:** ਸਰੋਤ ਨਕਸ਼ੇ ਵੀ ਮੂਲ ਰੂਪ ਵਿੱਚ ਤਿਆਰ ਕੀਤੇ ਜਾਂਦੇ ਹਨ ਜਦੋਂ ਤੱਕ `-S` ਜਾਂ `--no-source-maps` ਪਾਸ ਨਹੀਂ ਕੀਤੇ ਜਾਂਦੇ ਹਨ।

#

**ਇਨਪੁਟ/ਆਉਟਪੁੱਟ** ਮਾਰਗ ਨਿਰਧਾਰਤ ਕਰਨ ਲਈ:

```
scss-to-css [input_path] [output_path]
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
<br><br>

### Example commands

**ਮੌਜੂਦਾ ਡਾਇਰੈਕਟਰੀ** ਵਿੱਚ ਸਾਰੀਆਂ SCSS ਫ਼ਾਈਲਾਂ ਨੂੰ ਕੰਪਾਇਲ ਕਰੋ (`css/` ਵਿੱਚ ਆਉਟਪੁੱਟ):

```
scss-to-css
```

ਸਾਰੀਆਂ SCSS ਫਾਈਲਾਂ ਨੂੰ ਇੱਕ **ਖਾਸ ਡਾਇਰੈਕਟਰੀ** ਵਿੱਚ ਕੰਪਾਇਲ ਕਰੋ (`path/to/your/directory/css/` ਲਈ ਆਉਟਪੁੱਟ):

```
scss-to-css path/to/your/directory
```

ਇੱਕ **ਵਿਸ਼ੇਸ਼ ਫ਼ਾਈਲ** ਕੰਪਾਇਲ ਕਰੋ (`path/to/your/css/file.min.css` ਲਈ ਆਉਟਪੁੱਟ):

```
scss-to-css path/to/your/file.scss
```

ਦੋਨੋ **ਇਨਪੁਟ ਅਤੇ ਆਉਟਪੁੱਟ** ਡਾਇਰੈਕਟਰੀਆਂ ਨਿਰਧਾਰਤ ਕਰੋ (`output_folder/` ਲਈ ਆਉਟਪੁੱਟ):

```
scss-to-css input_folder output_folder
```

**💡 ਨੋਟ:** ਆਉਟਪੁੱਟ CSS ਨੂੰ ਘੱਟ ਕੀਤਾ ਜਾਂਦਾ ਹੈ ਜਦੋਂ ਤੱਕ `-M` ਜਾਂ `--no-minify` ਪਾਸ ਨਹੀਂ ਕੀਤਾ ਜਾਂਦਾ।
<br><br>

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
 -h, --help                  ਇਸ ਮਦਦ ਸਕ੍ਰੀਨ ਨੂੰ ਪ੍ਰਦਰਸ਼ਿਤ ਕਰੋ।
 -v, --version               ਵਰਜਨ ਨੰਬਰ ਦਿਖਾਓ।
```

## 🔌 API ਹਵਾਲਾ

ਤੁਸੀਂ ECMAScript ਮੋਡੀਊਲ ਜਾਂ CommonJS ਮੋਡੀਊਲ ਦੇ ਰੂਪ ਵਿੱਚ, ਇਸਦੇ API ਵਿਧੀਆਂ ਦੀ ਵਰਤੋਂ ਕਰਨ ਲਈ ਆਪਣੀ ਐਪ ਵਿੱਚ **scss-to-css** ਨੂੰ ਵੀ ਆਯਾਤ ਕਰ ਸਕਦੇ ਹੋ।

#### ESM:

```js
import * as scssToCSS from '@adamlui/scss-to-css';
```

#### CJS:

```js
const scssToCSS = require('@adamlui/scss-to-css');
```

### compile(inputPath, options)

ਇਹ ਫੰਕਸ਼ਨ CSS ਡੇਟਾ ਵਿੱਚ ਪ੍ਰਦਾਨ ਕੀਤੇ `ਇਨਪੁਟਪਾਥ` ਵਿੱਚ ਮਿਲੇ SCSS ਨੂੰ ਕੰਪਾਇਲ ਕਰਦਾ ਹੈ।

ਜੇਕਰ ਇੱਕ **ਫਾਈਲ ਮਾਰਗ** ਪਾਸ ਕੀਤਾ ਜਾਂਦਾ ਹੈ, ਤਾਂ ਫ਼ਾਈਲ ਦਾ ਕੋਡ CSS ਵਿੱਚ ਕੰਪਾਇਲ ਕੀਤਾ ਜਾਂਦਾ ਹੈ, ਫਿਰ `srcPath` + `code` + `error` ਵਾਲੀ ਵਸਤੂ ਵਾਪਸ ਕੀਤੀ ਜਾਂਦੀ ਹੈ:

```js
const compileResult = scssToCSS.compile('assets/style.scss');
console.log(compileResult.error); // ਰਨਟਾਈਮ ਗਲਤੀ, ਜਾਂ ਜੇਕਰ ਕੋਈ ਗਲਤੀ ਨਹੀਂ ਹੈ ਤਾਂ `undefined`
console.log(compileResult.code);  // assets/style.scss ਦਾ ਸੰਕਲਿਤ CSS ਆਉਟਪੁੱਟ
```

ਜੇਕਰ ਇੱਕ **ਡਾਇਰੈਕਟਰੀ ਮਾਰਗ** ਪਾਸ ਕੀਤਾ ਜਾਂਦਾ ਹੈ, ਤਾਂ SCSS ਫਾਈਲਾਂ ਦੀ ਖੋਜ ਕੀਤੀ ਜਾਂਦੀ ਹੈ (ਪੂਰਵ-ਨਿਰਧਾਰਤ ਤੌਰ 'ਤੇ), ਹਰੇਕ ਦਾ ਕੋਡ ਲੋਡ ਕੀਤਾ ਜਾਂਦਾ ਹੈ ਅਤੇ ਫਿਰ ਕੰਪਾਇਲ ਕੀਤਾ ਜਾਂਦਾ ਹੈ, ਫਿਰ `srcPath` + `code` + `error` ਵਾਲੀਆਂ ਵਸਤੂਆਂ ਦੀ ਇੱਕ ਐਰੇ ਵਾਪਸ ਕੀਤੀ ਜਾਂਦੀ ਹੈ:

```js
const results = scssToCSS.compile('.');
results.forEach(result =>
    console.log(result.srcPath)); // ਵਰਕਿੰਗ ਡਾਇਰੈਕਟਰੀ + ਸਾਰੀਆਂ ਨੇਸਟਡ ਡਾਇਰੈਕਟਰੀਆਂ ਵਿੱਚ SCSS ਫਾਈਲਾਂ ਲਈ ਮਾਰਗ
console.log(results[1].code);     // ਦੂਜੀ SCSS ਫਾਈਲ ਦਾ ਕੰਪਾਇਲ ਕੀਤਾ CSS ਆਉਟਪੁੱਟ ਜੇਕਰ ਮਿਲਿਆ, ਜਾਂ `undefined` ਜੇ ਨਹੀਂ ਮਿਲਿਆ
```

ਵਿਕਲਪ ਬੂਲੀਅਨ ਹਨ, ਆਬਜੈਕਟ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ ਵਜੋਂ ਪਾਸ ਕੀਤੇ ਗਏ ਹਨ। ਉਦਾਹਰਣ ਲਈ:

```js
scssToCSS.compile(inputDir, { minify: false });
// ਡਾਟਾ ਵਸਤੂਆਂ ਨੂੰ ਵਾਪਸ ਕਰਦਾ ਹੈ ਜਿੱਥੇ `.code` ਵਿੱਚ ਅਣਮਿੱਥੇ CSS ਸ਼ਾਮਲ ਹੁੰਦਾ ਹੈ
```

ਸੰਭਵ ਪੈਰਾਮੀਟਰ (ਅਤੇ ਉਹਨਾਂ ਦੀਆਂ ਡਿਫੌਲਟ ਸੈਟਿੰਗਾਂ) ਹਨ:

```
 recursive (true)     ਜੇਕਰ ਡਾਇਰੈਕਟਰੀ ਪਾਥ ਪਾਸ ਹੋ ਗਿਆ ਹੈ ਤਾਂ ਨੇਸਟਡ ਫਾਈਲਾਂ ਲਈ ਵਾਰ-ਵਾਰ ਖੋਜ ਕਰੋ।
 verbose (true)       ਕੰਸੋਲ/ਟਰਮੀਨਲ ਵਿੱਚ ਲੌਗਇਨ ਦਿਖਾਓ।
 dotFolders (false)   ਫਾਈਲ ਖੋਜ ਵਿੱਚ ਡਾਟਫੋਲਡਰ ਸ਼ਾਮਲ ਕਰੋ।
 minify (true)        ਆਉਟਪੁੱਟ CSS ਨੂੰ ਘੱਟ ਕਰੋ।
 sourceMaps (true)    CSS ਸਰੋਤ ਨਕਸ਼ੇ ਤਿਆਰ ਕਰੋ।
```

### findSCSS(searchDir, options)

ਇਹ ਫੰਕਸ਼ਨ ਪਾਸ ਕੀਤੀ `searchDir` ਸਤਰ ਦੇ ਅੰਦਰ ਸਾਰੀਆਂ SCSS ਫਾਈਲਾਂ ਦੀ ਖੋਜ ਕਰਦਾ ਹੈ (ਇਹ ਖੋਜਣ ਲਈ ਉਪਯੋਗੀ ਹੈ ਕਿ ਕਿਹੜੀਆਂ ਫਾਈਲਾਂ [`compile()`](#compileinputpath-options) ਪ੍ਰਕਿਰਿਆ ਕਰਨਗੀਆਂ) ਅਤੇ ਉਹਨਾਂ ਦੇ ਫਾਈਲਪਾਥਾਂ ਵਾਲੀ ਇੱਕ ਐਰੇ ਵਾਪਸ ਕਰਦਾ ਹੈ।

ਵਿਕਲਪ ਬੂਲੀਅਨ ਹਨ, ਆਬਜੈਕਟ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ ਵਜੋਂ ਪਾਸ ਕੀਤੇ ਗਏ ਹਨ। ਉਦਾਹਰਣ ਲਈ:

```js
scssToCSS.findSCSS(searchDir, { recursive: false });
// ਅਸਲ `searchDir` ਵਿੱਚ SCSS ਫਾਈਲਾਂ ਲਈ ਫਾਈਲਪਾਥਾਂ ਵਾਲੀ ਐਰੇ ਵਾਪਸ ਕਰਦਾ ਹੈ
```

ਸੰਭਵ ਪੈਰਾਮੀਟਰ (ਅਤੇ ਉਹਨਾਂ ਦੀਆਂ ਡਿਫੌਲਟ ਸੈਟਿੰਗਾਂ) ਹਨ:

```
 recursive (true)     ਜੇਕਰ ਡਾਇਰੈਕਟਰੀ ਪਾਥ ਪਾਸ ਹੋ ਗਿਆ ਹੈ ਤਾਂ ਨੇਸਟਡ ਫਾਈਲਾਂ ਲਈ ਵਾਰ-ਵਾਰ ਖੋਜ ਕਰੋ।
 verbose (false)      ਕੰਸੋਲ/ਟਰਮੀਨਲ ਵਿੱਚ ਲੌਗਇਨ ਦਿਖਾਓ।
 dotFolders (false)   ਫਾਈਲ ਖੋਜ ਵਿੱਚ ਡਾਟਫੋਲਡਰ ਸ਼ਾਮਲ ਕਰੋ।
```

<br>

## 💖 ਸਪੋਰਟ

ਕਿਰਪਾ ਕਰਕੇ [ਇੱਕ GitHub ਦੇਣ ⭐](https://github.com/adamlui/js-utils) ਤੇ ਵਿਚਾਰ ਕਰੋ ਜੇਕਰ ਇਹ ਤੁਹਾਡੀ ਮਦਦ ਕਰਦਾ ਹੈ!
<br><br>

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