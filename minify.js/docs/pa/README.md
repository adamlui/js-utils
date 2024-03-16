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

# </> minify.js

### ਸਾਰੀਆਂ JavaScript ਫਾਈਲਾਂ ਨੂੰ ਆਵਰਤੀ ਤੌਰ 'ਤੇ ਛੋਟਾ ਕਰੋ।

<a href="https://www.npmjs.com/package/@adamlui/minify.js"><img height=31 src="https://img.shields.io/npm/dt/%40adamlui%2Fminify.js?logo=npm&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="#%EF%B8%8F-mit-%E0%A8%B2%E0%A8%BE%E0%A8%87%E0%A8%B8%E0%A9%88%E0%A8%82%E0%A8%B8"><img height=31 src="https://img.shields.io/badge/License-MIT-red.svg?logo=internetarchive&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://www.npmjs.com/package/@adamlui/minify.js?activeTab=versions"><img height=31 src="https://img.shields.io/badge/Latest_Build-1.4.1-fc7811.svg?logo=icinga&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://www.npmjs.com/package/@adamlui/minify.js?activeTab=code"><img height=31 src="https://img.shields.io/npm/unpacked-size/%40adamlui%2Fminify.js?style=for-the-badge&logo=ebox&logoColor=white&labelColor=464646&color=blue"></a>
<a href="https://sonarcloud.io/component_measures?metric=new_vulnerabilities&id=adamlui_js-utils:minify.js/minify.js"><img height=31 src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fsonarcloud.io%2Fapi%2Fmeasures%2Fcomponent%3Fcomponent%3Dadamlui_js-utils%3Aminify.js%2Fminify.js%26metricKeys%3Dvulnerabilities&query=%24.component.measures.0.value&style=for-the-badge&logo=sonarcloud&logoColor=white&labelColor=464646&label=Vulnerabilities&color=gold"></a>

<img src="https://github.com/adamlui/js-utils/blob/main/minify.js/media/images/minify.js-docs-demo.png">

<br>

<img height=8px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

## ⚡ ਇੰਸਟਾਲੇਸ਼ਨ

ਇੱਕ **ਗਲੋਬਲ ਉਪਯੋਗਤਾ** ਦੇ ਰੂਪ ਵਿੱਚ:

```
npm install -g @adamlui/minify.js
```

ਤੁਹਾਡੇ ਪ੍ਰੋਜੈਕਟ ਰੂਟ ਤੋਂ **ਵਿਕਾਸਕਾਰ ਨਿਰਭਰਤਾ** (ਜਿਵੇਂ ਕਿ ਬਿਲਡ ਸਕ੍ਰਿਪਟਾਂ ਲਈ) ਵਜੋਂ:

```
npm install -D @adamlui/minify.js
```

ਤੁਹਾਡੇ ਪ੍ਰੋਜੈਕਟ ਰੂਟ ਤੋਂ **ਰਨਟਾਈਮ ਨਿਰਭਰਤਾ** ਦੇ ਤੌਰ 'ਤੇ (ਉਦਾਹਰਣ ਲਈ, ਆਨ-ਦ-ਫਲਾਈ ਮਿਨੀਫਿਕੇਸ਼ਨ ਲਈ):

```
npm install @adamlui/minify.js
```

## 💻 ਕਮਾਂਡ ਲਾਈਨ ਦੀ ਵਰਤੋਂ

ਮੂਲ **ਗਲੋਬਲ ਕਮਾਂਡ** ਹੈ:

```
minify-js
```

**💡 ਨੋਟ:** ਸਿਰਫ਼ ਇਹ ਦੇਖਣ ਲਈ ਕਿ ਕਿਹੜੀਆਂ ਫ਼ਾਈਲਾਂ 'ਤੇ ਪ੍ਰਕਿਰਿਆ ਕੀਤੀ ਜਾਵੇਗੀ, `-n` ਜਾਂ `--dry-run` ਪਾਸ ਕਰੋ।

#

**ਇਨਪੁਟ/ਆਉਟਪੁੱਟ** ਮਾਰਗ ਨਿਰਧਾਰਤ ਕਰਨ ਲਈ:

```
minify-js [input_path] [output_path]
```

- `[input_path]`: JS ਫਾਈਲ ਜਾਂ ਡਾਇਰੈਕਟਰੀ ਦਾ ਮਾਰਗ ਜਿਸ ਵਿੱਚ JS ਫਾਈਲਾਂ ਨੂੰ ਮਿਨਿਫਾਇਡ ਕੀਤਾ ਜਾਣਾ ਹੈ, ਮੌਜੂਦਾ ਕਾਰਜਸ਼ੀਲ ਡਾਇਰੈਕਟਰੀ ਦੇ ਅਨੁਸਾਰੀ।
- `[output_path]`: ਫਾਈਲ ਜਾਂ ਡਾਇਰੈਕਟਰੀ ਦਾ ਮਾਰਗ ਜਿੱਥੇ ਮਿੰਨੀਫਾਈਡ ਫਾਈਲਾਂ ਨੂੰ ਸਟੋਰ ਕੀਤਾ ਜਾਵੇਗਾ, ਅਸਲ ਫਾਈਲ ਟਿਕਾਣੇ ਦੇ ਅਨੁਸਾਰੀ (ਜੇ ਪ੍ਰਦਾਨ ਨਹੀਂ ਕੀਤਾ ਗਿਆ ਹੈ, `min/` ਵਰਤਿਆ ਜਾਂਦਾ ਹੈ)।

**💡 ਨੋਟ:** ਜੇਕਰ ਫੋਲਡਰਾਂ ਨੂੰ ਪਾਸ ਕੀਤਾ ਜਾਂਦਾ ਹੈ, ਤਾਂ ਫਾਈਲਾਂ 'ਤੇ ਮੁੜ-ਵਾਰ ਕਾਰਵਾਈ ਕੀਤੀ ਜਾਵੇਗੀ ਜਦੋਂ ਤੱਕ `-R` ਜਾਂ `--no-recursion` ਪਾਸ ਨਹੀਂ ਕੀਤਾ ਜਾਂਦਾ ਹੈ।
#

ਤੁਹਾਡੇ ਪ੍ਰੋਜੈਕਟ ਦੇ `package.json` ਵਿੱਚ, ਇੱਕ **ਪੈਕੇਜ ਸਕ੍ਰਿਪਟ** ਵਜੋਂ ਵਰਤਣ ਲਈ:

```json
  "scripts": {
    "build:js": "<minify-js-cmd>"
  },
```

`<minify-js-cmd>` ਨੂੰ `minify-js` + ਵਿਕਲਪਿਕ ਮਾਪਦੰਡਾਂ ਨਾਲ ਬਦਲੋ। ਫਿਰ, `npm run build:js` ਕਮਾਂਡ ਨੂੰ ਚਲਾਉਣ ਲਈ ਵਰਤਿਆ ਜਾ ਸਕਦਾ ਹੈ।
<br><br>

### ਉਦਾਹਰਨ ਕਮਾਂਡਾਂ

**ਮੌਜੂਦਾ ਡਾਇਰੈਕਟਰੀ** ਵਿੱਚ ਸਾਰੀਆਂ JavaScript ਫ਼ਾਈਲਾਂ ਨੂੰ ਛੋਟਾ ਕਰੋ (`min/` ਵਿੱਚ ਆਉਟਪੁੱਟ):

```
minify-js
```

ਇੱਕ **ਖਾਸ ਡਾਇਰੈਕਟਰੀ** ਵਿੱਚ ਸਾਰੀਆਂ JavaScript ਫਾਈਲਾਂ ਨੂੰ ਛੋਟਾ ਕਰੋ (`path/to/your/directory/min/` ਲਈ ਆਉਟਪੁੱਟ):

```
minify-js path/to/your/directory
```

ਇੱਕ **ਖਾਸ ਫ਼ਾਈਲ** ਨੂੰ ਛੋਟਾ ਕਰੋ (`path/to/your/min/file.min.js` ਲਈ ਆਉਟਪੁੱਟ):

```
minify-js path/to/your/file.js
```

ਦੋਨੋ **ਇਨਪੁਟ ਅਤੇ ਆਉਟਪੁੱਟ** ਡਾਇਰੈਕਟਰੀਆਂ ਨਿਰਧਾਰਤ ਕਰੋ (`output_folder/` ਲਈ ਆਉਟਪੁੱਟ):

```
minify-js input_folder output_folder
```

### ਕਮਾਂਡ ਲਾਈਨ ਵਿਕਲਪ

```
ਸੰਰਚਨਾ ਵਿਕਲਪ:
 -n, --dry-run               ਅਸਲ ਵਿੱਚ ਫਾਈਲਾਂ ਨੂੰ ਘੱਟ ਨਾ ਕਰੋ, ਸਿਰਫ਼ ਦਿਖਾਓ ਕਿ ਕੀ ਉਹਨਾਂ 'ਤੇ ਕਾਰਵਾਈ ਕੀਤੀ ਜਾਵੇਗੀ।
 -d, --include-dotfolders    ਫਾਈਲ ਖੋਜ ਵਿੱਚ ਡਾਟਫੋਲਡਰ ਸ਼ਾਮਲ ਕਰੋ।
 -D, --include-dotfiles      ਫਾਈਲ ਖੋਜ ਵਿੱਚ ਡਾਟ ਫਾਈਲਾਂ ਸ਼ਾਮਲ ਕਰੋ।
 -R, --no-recursion          ਆਵਰਤੀ ਫਾਈਲ ਖੋਜ ਨੂੰ ਅਸਮਰੱਥ ਬਣਾਓ।
 -M, --no-mangle             ਮੰਗਲ ਨਾਮਾਂ ਨੂੰ ਅਯੋਗ ਕਰੋ।
 -q, --quiet                 ਗਲਤੀਆਂ ਨੂੰ ਛੱਡ ਕੇ ਸਾਰੇ ਲੌਗਿੰਗ ਨੂੰ ਦਬਾਓ।

ਜਾਣਕਾਰੀ ਹੁਕਮ:
 -h, --help                  ਡਿਸਪਲੇ ਮਦਦ ਸਕ੍ਰੀਨ।
 -v, --version               ਵਰਜਨ ਨੰਬਰ ਦਿਖਾਓ।
```

## 🔌 API ਹਵਾਲਾ

ਤੁਸੀਂ ECMAScript ਮੋਡੀਊਲ ਜਾਂ CommonJS ਮੋਡੀਊਲ ਦੋਵਾਂ ਦੇ ਰੂਪ ਵਿੱਚ, ਇਸਦੇ API ਵਿਧੀਆਂ ਦੀ ਵਰਤੋਂ ਕਰਨ ਲਈ ਆਪਣੀ ਐਪ ਵਿੱਚ **minify.js** ਨੂੰ ਵੀ ਆਯਾਤ ਕਰ ਸਕਦੇ ਹੋ।

#### ESM:

```js
import * as minifyJS from '@adamlui/minify.js';
```

#### CJS:

```js
const minifyJS = require('@adamlui/minify.js');
```

### minify(input, options)

ਇਹ ਫੰਕਸ਼ਨ ਸਪਲਾਈ ਕੀਤੇ ਗਏ ਸਟ੍ਰਿੰਗ ਇਨਪੁਟ ਦੇ ਆਧਾਰ 'ਤੇ JavaScript ਕੋਡ ਨੂੰ ਛੋਟਾ ਕਰਦਾ ਹੈ।

ਜੇਕਰ **ਸਰੋਤ ਕੋਡ** ਪਾਸ ਕੀਤਾ ਜਾਂਦਾ ਹੈ, ਤਾਂ ਇਹ ਸਿੱਧੇ ਤੌਰ 'ਤੇ ਛੋਟਾ ਕੀਤਾ ਜਾਂਦਾ ਹੈ, ਫਿਰ `srcPath` + `code` + `error` ਵਾਲੀ ਵਸਤੂ ਵਾਪਸ ਕੀਤੀ ਜਾਂਦੀ ਹੈ:

```js
const srcCode = 'function add(first, second) { return first + second; }',
      minifyResult = minifyJS.minify(srcCode);
console.log(minifyResult.error); // ਰਨਟਾਈਮ ਗਲਤੀ, ਜਾਂ ਜੇਕਰ ਕੋਈ ਗਲਤੀ ਨਹੀਂ ਹੈ ਤਾਂ `undefined`
console.log(minifyResult.code);  // ਘਟੀਆ ਆਉਟਪੁੱਟ: function add(n,d){return n+d}
```

ਜੇਕਰ ਇੱਕ **ਫਾਈਲ ਮਾਰਗ** ਪਾਸ ਕੀਤਾ ਜਾਂਦਾ ਹੈ, ਤਾਂ ਫਾਈਲ ਦਾ ਕੋਡ ਲੋਡ ਕੀਤਾ ਜਾਂਦਾ ਹੈ, ਫਿਰ ਮਿਨਿਫਾਈਡ ਕੀਤਾ ਜਾਂਦਾ ਹੈ, ਉਪਰੋਕਤ ਵਰਗਾ ਇੱਕ ਵਸਤੂ ਵਾਪਸ ਕਰਦਾ ਹੈ।

ਜੇਕਰ ਇੱਕ **ਡਾਇਰੈਕਟਰੀ ਮਾਰਗ** ਪਾਸ ਕੀਤਾ ਜਾਂਦਾ ਹੈ, ਤਾਂ JavaScript ਫ਼ਾਈਲਾਂ ਦੀ ਖੋਜ ਕੀਤੀ ਜਾਂਦੀ ਹੈ (ਪੂਰਵ-ਨਿਰਧਾਰਤ ਤੌਰ 'ਤੇ), ਹਰੇਕ ਦਾ ਕੋਡ ਲੋਡ ਕੀਤਾ ਜਾਂਦਾ ਹੈ ਅਤੇ ਫਿਰ ਛੋਟਾ ਕੀਤਾ ਜਾਂਦਾ ਹੈ, ਫਿਰ `srcPath` + `code` + `error` ਵਾਲੀਆਂ ਵਸਤੂਆਂ ਦੀ ਇੱਕ ਐਰੇ ਵਾਪਸ ਕੀਤੀ ਜਾਂਦੀ ਹੈ:

```js
const results = minifyJS.minify('.');
results.forEach(result =>
    console.log(result.srcPath)); // ਵਰਕਿੰਗ ਡਾਇਰੈਕਟਰੀ + ਸਾਰੀਆਂ ਨੇਸਟਡ ਡਾਇਰੈਕਟਰੀਆਂ ਵਿੱਚ JS ਫਾਈਲਾਂ ਦੇ ਮਾਰਗ
console.log(results[1].code);     // ਦੂਜੀ JS ਫਾਈਲ ਦਾ ਮਿਨੀਫਾਈਡ ਕੋਡ ਜੇਕਰ ਮਿਲਦਾ ਹੈ, ਜਾਂ `undefined` ਨਹੀਂ ਮਿਲਦਾ ਹੈ
```

ਵਿਕਲਪ ਬੂਲੀਅਨ ਹਨ, ਆਬਜੈਕਟ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ ਵਜੋਂ ਪਾਸ ਕੀਤੇ ਗਏ ਹਨ। ਉਦਾਹਰਣ ਲਈ:

```js
minifyJS.minify(input, { dotFiles: true });
// ਡਾਟਾ ਆਬਜੈਕਟ ਵਾਪਸ ਕਰਦਾ ਹੈ ਜਿੱਥੇ ਡਾਟਫਾਈਲਾਂ 'ਤੇ ਵੀ ਪ੍ਰਕਿਰਿਆ ਕੀਤੀ ਜਾਂਦੀ ਹੈ ਜੇਕਰ `input` ਇੱਕ ਮਾਰਗ ਹੈ
```

ਸੰਭਵ ਪੈਰਾਮੀਟਰ (ਅਤੇ ਉਹਨਾਂ ਦੀਆਂ ਡਿਫੌਲਟ ਸੈਟਿੰਗਾਂ) ਹਨ:

```
 recursive (true)     ਜੇਕਰ ਡਾਇਰੈਕਟਰੀ ਪਾਥ ਪਾਸ ਹੋ ਗਿਆ ਹੈ ਤਾਂ ਨੇਸਟਡ ਫਾਈਲਾਂ ਲਈ ਵਾਰ-ਵਾਰ ਖੋਜ ਕਰੋ।
 verbose (true)       ਕੰਸੋਲ/ਟਰਮੀਨਲ ਵਿੱਚ ਲੌਗਇਨ ਦਿਖਾਓ।
 dotFolders (false)   ਫਾਈਲ ਖੋਜ ਵਿੱਚ ਡਾਟਫੋਲਡਰ ਸ਼ਾਮਲ ਕਰੋ।
 dotFiles (false)     ਫਾਈਲ ਖੋਜ ਵਿੱਚ ਡਾਟ ਫਾਈਲਾਂ ਸ਼ਾਮਲ ਕਰੋ।
 mangle (true)        ਵੇਰੀਏਬਲ ਨਾਮ (ਆਮ ਤੌਰ 'ਤੇ ਇੱਕ ਅੱਖਰ ਤੱਕ) ਨੂੰ ਛੋਟਾ ਕਰੋ।
```

### findJS(searchDir, options)

ਇਹ ਫੰਕਸ਼ਨ ਪਾਸ ਕੀਤੀ ਗਈ `searchDir` ਸਤਰ ਦੇ ਅੰਦਰ ਸਾਰੀਆਂ ਅਣਮਿੰਨੀਫਾਈਡ JavaScript ਫਾਈਲਾਂ ਦੀ ਖੋਜ ਕਰਦਾ ਹੈ (ਇਹ ਖੋਜਣ ਲਈ ਉਪਯੋਗੀ ਹੈ ਕਿ ਕਿਹੜੀਆਂ ਫਾਈਲਾਂ [`minify()`](#minifyinput-options) ਪ੍ਰਕਿਰਿਆ ਕਰਨਗੀਆਂ) ਅਤੇ ਉਹਨਾਂ ਦੇ ਫਾਈਲਪਾਥਾਂ ਵਾਲੀ ਇੱਕ ਐਰੇ ਵਾਪਸ ਕਰਦਾ ਹੈ।

ਵਿਕਲਪ ਬੂਲੀਅਨ ਹਨ, ਆਬਜੈਕਟ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ ਵਜੋਂ ਪਾਸ ਕੀਤੇ ਗਏ ਹਨ। ਉਦਾਹਰਣ ਲਈ:

```js
minifyJS.findJS(searchDir, { recursive: false });
// ਅਸਲ ਵਿੱਚ `searchDir` ਵਿੱਚ ਅਣਮਿੰਨੀਆਂ JS ਫਾਈਲਾਂ ਲਈ ਫਾਈਲਪਾਥਾਂ ਵਾਲੀ ਐਰੇ ਵਾਪਸ ਕਰਦਾ ਹੈ
```

ਸੰਭਵ ਪੈਰਾਮੀਟਰ (ਅਤੇ ਉਹਨਾਂ ਦੀਆਂ ਡਿਫੌਲਟ ਸੈਟਿੰਗਾਂ) ਹਨ:

```
 recursive (true)     ਜੇਕਰ ਡਾਇਰੈਕਟਰੀ ਪਾਥ ਪਾਸ ਹੋ ਗਿਆ ਹੈ ਤਾਂ ਨੇਸਟਡ ਫਾਈਲਾਂ ਲਈ ਵਾਰ-ਵਾਰ ਖੋਜ ਕਰੋ।
 verbose (false)      ਕੰਸੋਲ/ਟਰਮੀਨਲ ਵਿੱਚ ਲੌਗਇਨ ਦਿਖਾਓ।
 dotFolders (false)   ਫਾਈਲ ਖੋਜ ਵਿੱਚ ਡਾਟਫੋਲਡਰ ਸ਼ਾਮਲ ਕਰੋ।
 dotFiles (false)     ਫਾਈਲ ਖੋਜ ਵਿੱਚ ਡਾਟ ਫਾਈਲਾਂ ਸ਼ਾਮਲ ਕਰੋ।
```

<br>

## 💖 ਸਪੋਰਟ

ਕਿਰਪਾ ਕਰਕੇ [ਇੱਕ GitHub ਦੇਣ ⭐](https://github.com/adamlui/js-utils) ਤੇ ਵਿਚਾਰ ਕਰੋ ਜੇਕਰ ਇਹ ਤੁਹਾਡੀ ਮਦਦ ਕਰਦਾ ਹੈ!
<br><br>

## 🏛️ MIT ਲਾਇਸੈਂਸ

**ਕਾਪੀਰਾਈਟ © 2023–2024 [Adam Lui](https://github.com/adamlui) ਅਤੇ ਯੋਗਦਾਨ ਪਾਉਣ ਵਾਲੇ**

ਕਿਸੇ ਵੀ ਵਿਅਕਤੀ ਨੂੰ ਇਸ ਸੌਫਟਵੇਅਰ ਅਤੇ ਸੰਬੰਧਿਤ ਦਸਤਾਵੇਜ਼ ਫਾਈਲਾਂ ("ਸਾਫਟਵੇਅਰ") ਦੀ ਕਾਪੀ ਪ੍ਰਾਪਤ ਕਰਨ ਵਾਲੇ ਕਿਸੇ ਵੀ ਵਿਅਕਤੀ ਨੂੰ ਬਿਨਾਂ ਕਿਸੇ ਪਾਬੰਦੀ ਦੇ ਸੌਫਟਵੇਅਰ ਵਿੱਚ ਡੀਲ ਕਰਨ ਲਈ, ਬਿਨਾਂ ਕਿਸੇ ਸੀਮਾ ਦੇ ਵਰਤਣ, ਕਾਪੀ ਕਰਨ, ਸੰਸ਼ੋਧਿਤ ਕਰਨ, ਅਭੇਦ ਕਰਨ ਦੇ ਅਧਿਕਾਰਾਂ ਸਮੇਤ, ਇਸ ਦੁਆਰਾ ਇਜਾਜ਼ਤ ਦਿੱਤੀ ਜਾਂਦੀ ਹੈ। , ਪ੍ਰਕਾਸ਼ਿਤ ਕਰੋ, ਵੰਡੋ, ਉਪ-ਲਾਇਸੈਂਸ, ਅਤੇ/ਜਾਂ ਸੌਫਟਵੇਅਰ ਦੀਆਂ ਕਾਪੀਆਂ ਵੇਚੋ, ਅਤੇ ਉਹਨਾਂ ਵਿਅਕਤੀਆਂ ਨੂੰ ਇਜਾਜ਼ਤ ਦੇਣ ਲਈ ਜਿਨ੍ਹਾਂ ਨੂੰ ਸਾਫਟਵੇਅਰ ਦਿੱਤਾ ਗਿਆ ਹੈ, ਹੇਠਾਂ ਦਿੱਤੀਆਂ ਸ਼ਰਤਾਂ ਦੇ ਅਧੀਨ:

ਉਪਰੋਕਤ ਕਾਪੀਰਾਈਟ ਨੋਟਿਸ ਅਤੇ ਇਹ ਇਜਾਜ਼ਤ ਨੋਟਿਸ ਸਾਫਟਵੇਅਰ ਦੀਆਂ ਸਾਰੀਆਂ ਕਾਪੀਆਂ ਜਾਂ ਮਹੱਤਵਪੂਰਨ ਹਿੱਸਿਆਂ ਵਿੱਚ ਸ਼ਾਮਲ ਕੀਤਾ ਜਾਵੇਗਾ।

ਸਾਫਟਵੇਅਰ "ਜਿਵੇਂ ਹੈ" ਪ੍ਰਦਾਨ ਕੀਤਾ ਜਾਂਦਾ ਹੈ, ਕਿਸੇ ਵੀ ਕਿਸਮ ਦੀ ਵਾਰੰਟੀ ਦੇ ਬਿਨਾਂ, ਸਪਸ਼ਟ ਜਾਂ ਅਪ੍ਰਤੱਖ, ਜਿਸ ਵਿੱਚ ਵਪਾਰਕਤਾ, ਕਿਸੇ ਖਾਸ ਉਦੇਸ਼ ਲਈ ਫਿਟਨੈਸ ਦੀ ਵਾਰੰਟੀ ਸ਼ਾਮਲ ਹੈ, ਪਰ ਸੀਮਿਤ ਨਹੀਂ ਹੈ। ਕਿਸੇ ਵੀ ਸੂਰਤ ਵਿੱਚ ਲੇਖਕ ਜਾਂ ਕਾਪੀਰਾਈਟ ਧਾਰਕ ਕਿਸੇ ਵੀ ਦਾਅਵੇ, ਨੁਕਸਾਨ ਜਾਂ ਹੋਰ ਜ਼ਿੰਮੇਵਾਰੀ ਲਈ ਜਵਾਬਦੇਹ ਨਹੀਂ ਹੋਣਗੇ, ਭਾਵੇਂ ਇਕਰਾਰਨਾਮੇ ਦੀ ਕਿਸੇ ਕਾਰਵਾਈ ਵਿੱਚ, ਟਾਰਟ ਜਾਂ ਹੋਰ ਕਿਸੇ ਵੀ ਸਥਿਤੀ ਵਿੱਚ, ਸਾਡੇ ਤੋਂ ਬਾਅਦ ਤੋਂ ਬਾਅਦ ਵਿੱਚ, ਵਿੱਚ ਹੋਰ ਸੌਦੇ ਸਾਫਟਵੇਅਰ।

<br>

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

<a href="https://github.com/adamlui/js-utils">**ਘਰ**</a> /
<a href="https://github.com/adamlui/js-utils/discussions">ਚਰਚਾ ਕਰੋ</a> /
<a href="#-minifyjs">ਸਿਖਰ 'ਤੇ ਵਾਪਸ ਜਾਓ ↑</a>