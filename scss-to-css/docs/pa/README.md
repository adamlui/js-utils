<a id="top"></a>

<div align="center">
    <h6>
        <picture>
            <source type="image/svg+xml" media="(prefers-color-scheme: dark)" srcset="https://assets.scsstocss.org/images/icons/earth/white/icon32.svg?v=7e4a141">
            <img height=14 src="https://assets.scsstocss.org/images/icons/earth/black/icon32.svg?v=7e4a141">
        </picture>
        &nbsp;ਪੰਜਾਬੀ |
        <a href="../..#readme">English</a> |
        <a href="../zh-cn/#readme">简体中文</a> |
        <a href="../zh-tw/#readme">繁體中文</a> |
        <a href="../ja/#readme">日本語</a> |
        <a href="../hi/#readme">हिंदी</a> |
        <a href="../bn/#readme">বাংলা</a> |
        <a href="../mr/#readme">मराठी</a> |
        <a href="../de/#readme">Deutsch</a> |
        <a href="../es/#readme">Español</a> |
        <a href="../fr/#readme">Français</a> |
        <a href="../it/#readme">Italiano</a> |
        <a href="../nl/#readme">Nederlands</a> |
        <a href="../pt/#readme">Português</a>
    </h6>
</div>

# { } scss-to-css

### ਸਾਰੀਆਂ SCSS ਫਾਈਲਾਂ ਨੂੰ ਬਾਰ ਬਾਰ ਮਿਨੀਫਾਈਡ CSS ਵਿੱਚ ਕੰਪਾਇਲ ਕਰੋ।

<a href="https://npmstar.com/compare/@adamlui%2Fscss-to-css">
    <img height=31 src="https://img.shields.io/npm/dm/%40adamlui%2Fscss-to-css?logo=npm&color=af68ff&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="#%EF%B8%8F-mit-%E0%A8%B2%E0%A8%BE%E0%A8%87%E0%A8%B8%E0%A9%88%E0%A8%82%E0%A8%B8">
    <img height=31 src="https://img.shields.io/badge/License-MIT-orange.svg?logo=internetarchive&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://github.com/adamlui/js-utils/releases/tag/scss-to-css-2.4.1">
    <img height=31 src="https://img.shields.io/badge/Latest_Build-2.4.1-44cc11.svg?logo=icinga&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://www.npmjs.com/package/@adamlui/scss-to-css?activeTab=code">
    <img height=31 src="https://img.shields.io/npm/unpacked-size/%40adamlui%2Fscss-to-css?style=for-the-badge&logo=ebox&logoColor=white&color=blue&labelColor=464646"></a>
<a href="https://sonarcloud.io/component_measures?metric=new_vulnerabilities&id=adamlui_scss-to-css:src/scss-to-css.js">
    <img height=31 src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fsonarcloud.io%2Fapi%2Fmeasures%2Fcomponent%3Fcomponent%3Dadamlui_scss-to-css%3Asrc%2Fscss-to-css.js%26metricKeys%3Dvulnerabilities&query=%24.component.measures.0.value&style=for-the-badge&logo=sonarcloud&logoColor=white&labelColor=464646&label=Vulnerabilities&color=gold"></a>
<a href="https://github.com/toolleeo/cli-apps/#conversion">
    <img height=31 src="https://img.shields.io/badge/Mentioned_in-Awesome-ff69b4?logo=awesomelists&logoColor=white&labelColor=464646&style=for-the-badge"></a>

<img height=6px width="100%" src="https://assets.scsstocss.org/images/separators/aqua-gradient.png?v=7e4a141">

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

<a href="https://github.com/sponsors/adamlui"><img src="https://assets.scsstocss.org/images/banners/sponsor/$10/banner1660x260.png?v=f3129dd"></a>

<img height=6px width="100%" src="https://assets.scsstocss.org/images/separators/aqua-gradient.png?v=7e4a141">

## 💻 ਕਮਾਂਡ ਲਾਈਨ ਦੀ ਵਰਤੋਂ

ਮੂਲ **ਗਲੋਬਲ ਕਮਾਂਡ** ਹੈ:

```
$ scss-to-css
```

ਨਮੂਨਾ ਆਉਟਪੁੱਟ:

<img src="https://cdn.jsdelivr.net/gh/adamlui/scss-to-css@fe2867e/assets/images/screenshots/cli/scss-to-css-docs-cmd-output.png">

**📝 ਨੋਟ:** ਸਰੋਤ ਨਕਸ਼ੇ ਵੀ ਮੂਲ ਰੂਪ ਵਿੱਚ ਤਿਆਰ ਕੀਤੇ ਜਾਂਦੇ ਹਨ ਜਦੋਂ ਤੱਕ `-S` ਜਾਂ `--no-source-maps` ਪਾਸ ਨਹੀਂ ਕੀਤੇ ਜਾਂਦੇ ਹਨ।

#

**ਇਨਪੁਟ/ਆਉਟਪੁੱਟ** ਮਾਰਗ ਨਿਰਧਾਰਤ ਕਰਨ ਲਈ:

```
$ scss-to-css [input_path] [output_path]
```

- `[input_path]`: SCSS ਫਾਈਲ ਜਾਂ ਡਾਇਰੈਕਟਰੀ ਦਾ ਮਾਰਗ ਜਿਸ ਵਿੱਚ SCSS ਫਾਈਲਾਂ ਨੂੰ ਕੰਪਾਇਲ ਕੀਤਾ ਜਾਣਾ ਹੈ, ਮੌਜੂਦਾ ਕਾਰਜਸ਼ੀਲ ਡਾਇਰੈਕਟਰੀ ਦੇ ਅਨੁਸਾਰੀ।
- `[output_path]`: ਫਾਈਲ ਜਾਂ ਡਾਇਰੈਕਟਰੀ ਦਾ ਮਾਰਗ ਜਿੱਥੇ CSS + ਸਰੋਤ ਮੈਪ ਫਾਈਲਾਂ ਸਟੋਰ ਕੀਤੀਆਂ ਜਾਣਗੀਆਂ, ਇਨਪੁਟ ਰੂਟ ਦੇ ਅਨੁਸਾਰ (ਜੇਕਰ ਪ੍ਰਦਾਨ ਨਹੀਂ ਕੀਤਾ ਗਿਆ ਹੈ, ਤਾਂ `css/` ਵਰਤਿਆ ਜਾਂਦਾ ਹੈ)।

**📝 ਨੋਟ:** ਜੇਕਰ ਫੋਲਡਰਾਂ ਨੂੰ ਪਾਸ ਕੀਤਾ ਜਾਂਦਾ ਹੈ, ਤਾਂ ਫਾਈਲਾਂ 'ਤੇ ਮੁੜ-ਵਾਰ ਕਾਰਵਾਈ ਕੀਤੀ ਜਾਵੇਗੀ ਜਦੋਂ ਤੱਕ `-R` ਜਾਂ `--no-recursion` ਪਾਸ ਨਹੀਂ ਕੀਤਾ ਜਾਂਦਾ ਹੈ।

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

ਸਾਰੀਆਂ SCSS ਫਾਈਲਾਂ ਨੂੰ ਇੱਕ **ਖਾਸ ਡਾਇਰੈਕਟਰੀ** ਵਿੱਚ ਕੰਪਾਇਲ ਕਰੋ (`css/path/to/your/directory/` ਲਈ ਆਉਟਪੁੱਟ):

```
$ scss-to-css path/to/your/directory
```

ਇੱਕ **ਵਿਸ਼ੇਸ਼ ਫ਼ਾਈਲ** ਕੰਪਾਇਲ ਕਰੋ (`css/path/to/your/file.min.css` ਲਈ ਆਉਟਪੁੱਟ):

```
$ scss-to-css path/to/your/file.scss
```

ਦੋਨੋ **ਇਨਪੁਟ ਅਤੇ ਆਉਟਪੁੱਟ** ਡਾਇਰੈਕਟਰੀਆਂ ਨਿਰਧਾਰਤ ਕਰੋ (`output_folder/` ਲਈ ਆਉਟਪੁੱਟ):

```
$ scss-to-css input_folder output_folder
```

**📝 ਨੋਟ:** ਆਉਟਪੁੱਟ CSS ਨੂੰ ਘੱਟ ਕੀਤਾ ਜਾਂਦਾ ਹੈ ਜਦੋਂ ਤੱਕ `-M` ਜਾਂ `--no-minify` ਪਾਸ ਨਹੀਂ ਕੀਤਾ ਜਾਂਦਾ।

#

### ਕਮਾਂਡ ਲਾਈਨ ਵਿਕਲਪ

```
ਬੁਲੀਅਨ ਵਿਕਲਪ:
 -n, --dry-run                            ਅਸਲ ਵਿੱਚ ਫਾਈਲਾਂ ਨੂੰ ਕੰਪਾਇਲ ਨਾ ਕਰੋ, ਸਿਰਫ਼ ਦਿਖਾਓ ਕਿ ਕੀ ਉਹਨਾਂ 'ਤੇ ਕਾਰਵਾਈ ਕੀਤੀ ਜਾਵੇਗੀ।
 -d, --include-dotfolders                 ਫਾਈਲ ਖੋਜ ਵਿੱਚ ਡਾਟਫੋਲਡਰ ਸ਼ਾਮਲ ਕਰੋ।
 -S, --no-source-maps                     ਸਰੋਤ ਨਕਸ਼ੇ ਤਿਆਰ ਹੋਣ ਤੋਂ ਰੋਕੋ।
 -M, --no-minify                          ਆਉਟਪੁੱਟ CSS ਦੀ ਮਿਨੀਫਿਕੇਸ਼ਨ ਨੂੰ ਅਸਮਰੱਥ ਬਣਾਓ।
 -R, --no-recursion                       ਆਵਰਤੀ ਫਾਈਲ ਖੋਜ ਨੂੰ ਅਸਮਰੱਥ ਬਣਾਓ।
 -r, --relative-output                    ਇਨਪੁਟ ਰੂਟ ਦੀ ਬਜਾਏ ਹਰੇਕ ਸਰੋਤ ਫਾਈਲ ਦੇ ਅਨੁਸਾਰ ਆਉਟਪੁੱਟ ਫਾਈਲਾਂ।
 -c, --copy                               ਸੰਕਲਿਤ CSS ਨੂੰ ਕਲਿੱਪਬੋਰਡ ਵਿੱਚ ਕਾਪੀ ਕਰੋ ਜੇਕਰ ਸਿੰਗਲ ਸਰੋਤ ਫਾਈਲ ਦੀ ਪ੍ਰਕਿਰਿਆ ਕੀਤੀ ਜਾਂਦੀ ਹੈ ਤਾਂ ਫਾਈਲ ਵਿੱਚ ਲਿਖਣ ਦੀ ਬਜਾਏ।
 -q, --quiet                              ਗਲਤੀਆਂ ਨੂੰ ਛੱਡ ਕੇ ਸਾਰੇ ਲੌਗਿੰਗ ਨੂੰ ਦਬਾਓ।

ਪੈਰਾਮੀਟਰ ਵਿਕਲਪ:
 --ignores="dir/,file1.scss,file2.sass"   ਸੰਕਲਨ ਤੋਂ ਬਾਹਰ ਰੱਖਣ ਲਈ ਫਾਈਲਾਂ/ਡਾਇਰੈਕਟਰ।
 --comment="comment"                      ਕੰਪਾਇਲ ਕੀਤੇ CSS ਲਈ ਸਿਰਲੇਖ ਟਿੱਪਣੀ ਨੂੰ ਅੱਗੇ ਰੱਖੋ। '\n' ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਲਾਈਨ ਦੁਆਰਾ ਵੱਖ ਕਰੋ।
 --ui-lang="code"                         UI ਪ੍ਰਦਰਸ਼ਿਤ ਕਰਨ ਲਈ ISO 639-1 ਭਾਸ਼ਾ ਕੋਡ।
 --config="path/to/file"                  ਕਸਟਮ ਕੌਂਫਿਗ ਫਾਈਲ ਲੋਡ ਕਰੋ।

ਕਮਾਂਡ:
 -i, --init                               ਕੌਂਫਿਗ ਫਾਈਲ ਬਣਾਓ (ਪ੍ਰੋਜੈਕਟ ਰੂਟ ਵਿੱਚ)।
 -h, --help                               ਡਿਸਪਲੇ ਮਦਦ ਸਕ੍ਰੀਨ।
 -v, --version                            ਵਰਜਨ ਨੰਬਰ ਦਿਖਾਓ।
     --stats                              npm ਅੰਕੜੇ ਦਿਖਾਓ।
     --debug [targetKey]                  ਡੀਬੱਗ ਲੌਗ ਦਿਖਾਓ।
```

#

### ਕੌਂਫਿਗਰੇਸ਼ਨ ਫਾਈਲ

**scss-to-css** ਨੂੰ ਤੁਹਾਡੇ ਪ੍ਰੋਜੈਕਟ ਰੂਟ ਵਿੱਚ ਰੱਖੇ `scss-to-css.config.mjs` ਜਾਂ `scss-to-css.config.js` ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਅਨੁਕੂਲਿਤ ਕੀਤਾ ਜਾ ਸਕਦਾ ਹੈ।

ਉਦਾਹਰਨ ਡਿਫਾਲਟ:

```js
ਨਿਰਯਾਤ ਡਿਫਾਲਟ {
    dryRun: ਗਲਤ, // ਅਸਲ ਵਿੱਚ ਫਾਈਲ(ਆਂ) ਨੂੰ ਮਿਨੀਫਾਈ ਨਾ ਕਰੋ, ਬੱਸ ਦਿਖਾਓ ਕਿ ਕੀ ਉਹਨਾਂ 'ਤੇ ਪ੍ਰਕਿਰਿਆ ਕੀਤੀ ਜਾਵੇਗੀ
    includeDotFolders: ਗਲਤ, // ਫਾਈਲ ਖੋਜ ਵਿੱਚ ਡੌਟਫੋਲਡਰ ਸ਼ਾਮਲ ਕਰੋ
    noSourceMaps: ਗਲਤ, // ਸਰੋਤ ਨਕਸ਼ੇ ਤਿਆਰ ਹੋਣ ਤੋਂ ਰੋਕੋ
    noMinify: ਗਲਤ, // ਆਉਟਪੁੱਟ CSS ਦਾ ਮਿਨੀਫੀਕੇਸ਼ਨ ਅਯੋਗ ਕਰੋ
    noRecursion: ਗਲਤ, // ਰਿਕਰਸਿਵ ਫਾਈਲ ਖੋਜ ਅਯੋਗ ਕਰੋ
    relativeOutput: ਗਲਤ, // ਰੂਟ ਇਨਪੁਟ ਕਰਨ ਦੀ ਬਜਾਏ ਹਰੇਕ src ਫਾਈਲ ਦੇ ਅਨੁਸਾਰੀ ਆਉਟਪੁੱਟ ਫਾਈਲਾਂ
    copy: ਗਲਤ, // ਜੇਕਰ ਸਿੰਗਲ ਫਾਈਲ ਪ੍ਰੋਸੈਸ ਕੀਤੀ ਜਾਂਦੀ ਹੈ ਤਾਂ ਫਾਈਲ ਵਿੱਚ ਲਿਖਣ ਦੀ ਬਜਾਏ ਕਲਿੱਪਬੋਰਡ ਵਿੱਚ ਕੰਪਾਇਲ ਕੀਤੇ CSS ਦੀ ਨਕਲ ਕਰੋ
    quietMode: ਗਲਤ, // ਗਲਤੀਆਂ ਨੂੰ ਛੱਡ ਕੇ ਸਾਰੇ ਲੌਗਿੰਗ ਨੂੰ ਦਬਾਓ
    ਅਣਦੇਖਦਾ ਹੈ: '', // ਫਾਈਲਾਂ/ਡਾਇਰਾਂ ਨੂੰ ਮਿਨੀਫੀਕੇਸ਼ਨ ਤੋਂ ਬਾਹਰ ਕੱਢਣ ਲਈ
    comment: '' // ਹੈਡਰ ਟਿੱਪਣੀ ਮਿਨੀਫਾਈਡ ਕੋਡ ਵਿੱਚ ਪ੍ਰੀਪੈਂਡ ਕਰਨ ਲਈ
}
```

💡 ਆਪਣੇ ਪ੍ਰੋਜੈਕਟ ਰੂਟ ਵਿੱਚ `scss-to-css.config.mjs` ਟੈਂਪਲੇਟ ਬਣਾਉਣ ਲਈ `scss-to-css init` ਚਲਾਓ।

<br>

<img height=6px width="100%" src="https://assets.scsstocss.org/images/separators/aqua-gradient.png?v=7e4a141">

## 🔌 API ਵਰਤੋਂ

ਤੁਸੀਂ ECMAScript ਮੋਡੀਊਲ ਜਾਂ CommonJS ਮੋਡੀਊਲ ਦੇ ਰੂਪ ਵਿੱਚ, ਇਸਦੇ API ਵਿਧੀਆਂ ਦੀ ਵਰਤੋਂ ਕਰਨ ਲਈ ਆਪਣੀ ਐਪ ਵਿੱਚ **scss-to-css** ਨੂੰ ਵੀ ਆਯਾਤ ਕਰ ਸਕਦੇ ਹੋ।

#### ECMAScript*:

```js
import scssToCSS from '@adamlui/scss-to-css'
```

#### CJS:

```js
const scssToCSS = require('@adamlui/scss-to-css')
```

###### _*Node.js ਸੰਸਕਰਣ 14 ਜਾਂ ਉੱਚ ਲੋੜੀਂਦਾ_

#

### `compile(input[, options])`

💡 ਸਪਲਾਈ ਕੀਤੇ ਸਟ੍ਰਿੰਗ ਇਨਪੁਟ ਦੇ ਆਧਾਰ 'ਤੇ SCSS ਨੂੰ ਕੰਪਾਇਲ ਕਰਦਾ ਹੈ।

ਜੇਕਰ **ਸਰੋਤ ਕੋਡ** ਪਾਸ ਕੀਤਾ ਜਾਂਦਾ ਹੈ, ਤਾਂ ਇਹ ਸਿੱਧਾ ਕੰਪਾਇਲ ਕੀਤਾ ਜਾਂਦਾ ਹੈ, ਫਿਰ ਇੱਕ ਵਸਤੂ ਜਿਸ ਵਿੱਚ `srcPath` + `code` + `srcMap` + `error` ਹੁੰਦੀ ਹੈ ਵਾਪਸ ਆ ਜਾਂਦੀ ਹੈ:

```js
const srcCode = 'h1 { font-size: 40px ; code { font-face: Roboto Mono }}',
      compileResult = scssToCSS.compile(srcCode)

console.log(compileResult.error) // ਰਨਟਾਈਮ ਗਲਤੀ ਨੂੰ ਆਉਟਪੁੱਟ ਕਰਦਾ ਹੈ, ਜਾਂ ਜੇਕਰ ਕੋਈ ਗਲਤੀ ਨਹੀਂ ਹੈ ਤਾਂ `undefined`
console.log(compileResult.code)  // ਆਉਟਪੁੱਟ ਘੱਟ CSS: 'h1{font-size:40px}h1 code{font-face:Roboto Mono}'
```

ਜੇਕਰ ਇੱਕ **ਫਾਈਲ ਮਾਰਗ** ਪਾਸ ਕੀਤਾ ਜਾਂਦਾ ਹੈ, ਤਾਂ ਫਾਈਲ ਦਾ ਕੋਡ ਲੋਡ ਕੀਤਾ ਜਾਂਦਾ ਹੈ ਅਤੇ ਫਿਰ CSS ਵਿੱਚ ਕੰਪਾਇਲ ਕੀਤਾ ਜਾਂਦਾ ਹੈ, ਉਪਰੋਕਤ ਵਰਗਾ ਇੱਕ ਵਸਤੂ ਵਾਪਸ ਕਰਦਾ ਹੈ।

ਜੇਕਰ ਇੱਕ **ਡਾਇਰੈਕਟਰੀ ਮਾਰਗ** ਪਾਸ ਕੀਤਾ ਜਾਂਦਾ ਹੈ, ਤਾਂ SCSS ਫਾਈਲਾਂ ਦੀ ਖੋਜ ਕੀਤੀ ਜਾਂਦੀ ਹੈ (ਪੂਰਵ-ਨਿਰਧਾਰਤ ਤੌਰ 'ਤੇ), ਹਰੇਕ ਦਾ ਕੋਡ ਲੋਡ ਕੀਤਾ ਜਾਂਦਾ ਹੈ ਅਤੇ ਫਿਰ ਕੰਪਾਇਲ ਕੀਤਾ ਜਾਂਦਾ ਹੈ, ਫਿਰ `srcPath` + `code` + `srcMap` + `error` ਵਾਲੀਆਂ ਵਸਤੂਆਂ ਦੀ ਇੱਕ ਐਰੇ ਵਾਪਸ ਕੀਤੀ ਜਾਂਦੀ ਹੈ:

```js
// ਵਰਕਿੰਗ ਡਾਇਰੈਕਟਰੀ + ਸਾਰੀਆਂ ਨੇਸਟਡ ਡਾਇਰੈਕਟਰੀਆਂ ਵਿੱਚ SCSS ਫਾਈਲਾਂ ਦੇ ਮਾਰਗਾਂ ਨੂੰ ਆਉਟਪੁੱਟ ਕਰਦਾ ਹੈ
const compileResults = scssToCSS.compile('.')
compileResults.forEach(result => console.log(result.srcPath))

// ਜੇਕਰ ਲੱਭੀ ਤਾਂ ਦੂਜੀ SCSS ਫਾਈਲ ਤੋਂ CSS ਕੰਪਾਇਲ ਕੀਤੀ ਆਉਟਪੁੱਟ, ਜਾਂ `undefined` ਜੇ ਨਹੀਂ ਮਿਲੀ ਤਾਂ
console.log(compileResults[1].code)
```

ਵਿਕਲਪ ਬੂਲੀਅਨ ਹਨ, ਆਬਜੈਕਟ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ ਵਜੋਂ ਪਾਸ ਕੀਤੇ ਗਏ ਹਨ। ਉਦਾਹਰਣ ਲਈ:

```js
// ਡਾਟਾ ਵਸਤੂਆਂ ਦੀ ਐਰੇ ਵਾਪਸ ਕਰਦਾ ਹੈ ਜਿੱਥੇ `.code` ਵਿੱਚ ਅਣਮਿੱਥੇ CSS ਸ਼ਾਮਲ ਹੁੰਦਾ ਹੈ
scssToCSS.compile(inputDir, { minify: false })
```

ਉਪਲਬਧ ਪੈਰਾਮੀਟਰ (ਅਤੇ ਉਹਨਾਂ ਦੀਆਂ ਡਿਫੌਲਟ ਸੈਟਿੰਗਾਂ) ਹਨ:

ਨਾਮ              | ਟਾਈਪ ਕਰੋ | ਵਰਣਨ                                                                        | ਪੂਰਵ-ਨਿਰਧਾਰਤ ਮੁੱਲ
-----------------|----------|------------------------------------------------------------------------------|-----------------
`recursive`      | ਬੁਲੀਅਨ   | ਜੇਕਰ ਡਾਇਰੈਕਟਰੀ ਪਾਥ ਪਾਸ ਹੋ ਗਿਆ ਹੈ ਤਾਂ ਨੇਸਟਡ ਫਾਈਲਾਂ ਲਈ ਵਾਰ-ਵਾਰ ਖੋਜ ਕਰੋ।              | `true`
`verbose`        | ਬੁਲੀਅਨ   | ਕੰਸੋਲ/ਟਰਮੀਨਲ ਵਿੱਚ ਲੌਗਇਨ ਦਿਖਾਓ।                                                 | `true`
`dotFolders`     | ਬੁਲੀਅਨ   | ਫਾਈਲ ਖੋਜ ਵਿੱਚ ਡਾਟਫੋਲਡਰ ਸ਼ਾਮਲ ਕਰੋ।                                               | `false`
`minify`         | ਬੁਲੀਅਨ   | ਆਉਟਪੁੱਟ CSS ਨੂੰ ਘੱਟ ਕਰੋ।                                                        | `true`
`sourceMaps`     | ਬੁਲੀਅਨ   | CSS ਸਰੋਤ ਨਕਸ਼ੇ ਤਿਆਰ ਕਰੋ।                                                       | `true`
`relativeOutput` | ਬੁਲੀਅਨ   | ਇਨਪੁਟ ਰੂਟ ਦੀ ਬਜਾਏ ਹਰੇਕ ਸਰੋਤ ਫਾਈਲ ਦੇ ਅਨੁਸਾਰ ਆਉਟਪੁੱਟ ਫਾਈਲਾਂ।                       | `false`
`ignores`        | ਐਰੇ      | ਸੰਕਲਨ ਤੋਂ ਬਾਹਰ ਰੱਖਣ ਲਈ ਫਾਈਲਾਂ/ਡਾਇਰੈਕਟਰ।                                         | `[]`
`comment`        | ਸਤਰ     | ਕੰਪਾਇਲ ਕੀਤੇ CSS 'ਤੇ ਪ੍ਰੈਪੇਂਡ ਕਰਨ ਲਈ ਹੈਡਰ ਟਿੱਪਣੀ। '\n' ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਲਾਈਨ ਦੁਆਰਾ ਵੱਖ ਕਰੋ। | `''`

#

### `findSCSS(searchDir[, options])`

💡 ਪਾਸ ਕੀਤੀ `searchDir` ਸਟ੍ਰਿੰਗ ਦੇ ਅੰਦਰ ਸਾਰੀਆਂ SCSS ਫਾਈਲਾਂ ਦੀ ਖੋਜ (ਇਹ ਖੋਜਣ ਲਈ ਉਪਯੋਗੀ ਹੈ ਕਿ ਕਿਹੜੀਆਂ ਫਾਈਲਾਂ [`compile()`](#compileinput-options) ਪ੍ਰਕਿਰਿਆ ਕਰਨਗੀਆਂ) ਅਤੇ ਉਹਨਾਂ ਦੇ ਫਾਈਲਪਾਥਾਂ ਵਾਲੀ ਇੱਕ ਐਰੇ ਵਾਪਸ ਕਰਦੀ ਹੈ।

ਵਿਕਲਪ ਬੂਲੀਅਨ ਹਨ, ਆਬਜੈਕਟ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ ਵਜੋਂ ਪਾਸ ਕੀਤੇ ਗਏ ਹਨ। ਉਦਾਹਰਣ ਲਈ:

```js
// SCSS ਫਾਈਲਾਂ ਲਈ ਬਿਲਕੁਲ assets/scss ਵਿੱਚ ਖੋਜ ਕਰੋ
const searchResults = scssToCSS.findSCSS('assets/scss', { recursive: false })
console.log(searchResults)

/* ਨਮੂਨਾ ਆਉਟਪੁੱਟ:

findSCSS() » Searching for SCSS files...
findSCSS() » Search complete! 2 files found.
findSCSS() » Check returned array.
[
  'E:\\js\\utils\\scss-to-css\assets\\scss\\foo.scss',
  'E:\\js\\utils\\scss-to-css\assets\\scss\\bar.sass'
]
*/
```

ਉਪਲਬਧ ਪੈਰਾਮੀਟਰ (ਅਤੇ ਉਹਨਾਂ ਦੀਆਂ ਡਿਫੌਲਟ ਸੈਟਿੰਗਾਂ) ਹਨ:

ਨਾਮ           | ਟਾਈਪ ਕਰੋ | ਵਰਣਨ                                               | ਪੂਰਵ-ਨਿਰਧਾਰਤ ਮੁੱਲ
--------------|----------|-----------------------------------------------------|-----------------
`recursive`   | ਬੁਲੀਅਨ   | ਪਾਸ ਕੀਤੇ searchDir ਵਿੱਚ ਨੇਸਟਡ ਫਾਈਲਾਂ ਲਈ ਮੁੜ-ਮੁੜ ਖੋਜ ਕਰੋ। | `true`
`verbose`     | ਬੁਲੀਅਨ   | ਕੰਸੋਲ/ਟਰਮੀਨਲ ਵਿੱਚ ਲੌਗਇਨ ਦਿਖਾਓ।                        | `true`
`dotFolders`  | ਬੁਲੀਅਨ   | ਫਾਈਲ ਖੋਜ ਵਿੱਚ ਡਾਟਫੋਲਡਰ ਸ਼ਾਮਲ ਕਰੋ।                      | `false`
`ignores`     | ਐਰੇ      | ਖੋਜ ਨਤੀਜਿਆਂ ਤੋਂ ਬਾਹਰ ਰੱਖਣ ਲਈ ਫਾਈਲਾਂ/ਡਾਇਰੈਕਟਰ।           | `[]`

<br>

<img height=6px width="100%" src="https://assets.scsstocss.org/images/separators/aqua-gradient.png?v=7e4a141">

## 🏛️ MIT ਲਾਇਸੈਂਸ

**ਕਾਪੀਰਾਈਟ © 2024 [Adam Lui](https://github.com/adamlui) ਅਤੇ ਯੋਗਦਾਨ ਪਾਉਣ ਵਾਲੇ**

ਕਿਸੇ ਵੀ ਵਿਅਕਤੀ ਨੂੰ ਇਸ ਸੌਫਟਵੇਅਰ ਅਤੇ ਸੰਬੰਧਿਤ ਦਸਤਾਵੇਜ਼ ਫਾਈਲਾਂ ("ਸਾਫਟਵੇਅਰ") ਦੀ ਕਾਪੀ ਪ੍ਰਾਪਤ ਕਰਨ ਵਾਲੇ ਕਿਸੇ ਵੀ ਵਿਅਕਤੀ ਨੂੰ ਬਿਨਾਂ ਕਿਸੇ ਪਾਬੰਦੀ ਦੇ ਸੌਫਟਵੇਅਰ ਵਿੱਚ ਡੀਲ ਕਰਨ ਲਈ, ਬਿਨਾਂ ਕਿਸੇ ਸੀਮਾ ਦੇ ਵਰਤਣ, ਕਾਪੀ ਕਰਨ, ਸੰਸ਼ੋਧਿਤ ਕਰਨ, ਅਭੇਦ ਕਰਨ ਦੇ ਅਧਿਕਾਰਾਂ ਸਮੇਤ, ਇਸ ਦੁਆਰਾ ਇਜਾਜ਼ਤ ਦਿੱਤੀ ਜਾਂਦੀ ਹੈ। , ਪ੍ਰਕਾਸ਼ਿਤ ਕਰੋ, ਵੰਡੋ, ਉਪ-ਲਾਇਸੈਂਸ, ਅਤੇ/ਜਾਂ ਸੌਫਟਵੇਅਰ ਦੀਆਂ ਕਾਪੀਆਂ ਵੇਚੋ, ਅਤੇ ਉਹਨਾਂ ਵਿਅਕਤੀਆਂ ਨੂੰ ਇਜਾਜ਼ਤ ਦੇਣ ਲਈ ਜਿਨ੍ਹਾਂ ਨੂੰ ਸਾਫਟਵੇਅਰ ਦਿੱਤਾ ਗਿਆ ਹੈ, ਹੇਠਾਂ ਦਿੱਤੀਆਂ ਸ਼ਰਤਾਂ ਦੇ ਅਧੀਨ:

ਉਪਰੋਕਤ ਕਾਪੀਰਾਈਟ ਨੋਟਿਸ ਅਤੇ ਇਹ ਇਜਾਜ਼ਤ ਨੋਟਿਸ ਸਾਫਟਵੇਅਰ ਦੀਆਂ ਸਾਰੀਆਂ ਕਾਪੀਆਂ ਜਾਂ ਮਹੱਤਵਪੂਰਨ ਹਿੱਸਿਆਂ ਵਿੱਚ ਸ਼ਾਮਲ ਕੀਤਾ ਜਾਵੇਗਾ।

ਸਾਫਟਵੇਅਰ "ਜਿਵੇਂ ਹੈ" ਪ੍ਰਦਾਨ ਕੀਤਾ ਜਾਂਦਾ ਹੈ, ਕਿਸੇ ਵੀ ਕਿਸਮ ਦੀ ਵਾਰੰਟੀ ਦੇ ਬਿਨਾਂ, ਸਪਸ਼ਟ ਜਾਂ ਅਪ੍ਰਤੱਖ, ਜਿਸ ਵਿੱਚ ਵਪਾਰਕਤਾ, ਕਿਸੇ ਖਾਸ ਉਦੇਸ਼ ਲਈ ਫਿਟਨੈਸ ਦੀ ਵਾਰੰਟੀ ਸ਼ਾਮਲ ਹੈ, ਪਰ ਸੀਮਿਤ ਨਹੀਂ ਹੈ। ਕਿਸੇ ਵੀ ਸੂਰਤ ਵਿੱਚ ਲੇਖਕ ਜਾਂ ਕਾਪੀਰਾਈਟ ਧਾਰਕ ਕਿਸੇ ਵੀ ਦਾਅਵੇ, ਨੁਕਸਾਨ ਜਾਂ ਹੋਰ ਜ਼ਿੰਮੇਵਾਰੀ ਲਈ ਜਵਾਬਦੇਹ ਨਹੀਂ ਹੋਣਗੇ, ਭਾਵੇਂ ਇਕਰਾਰਨਾਮੇ ਦੀ ਕਿਸੇ ਕਾਰਵਾਈ ਵਿੱਚ, ਟਾਰਟ ਜਾਂ ਹੋਰ ਕਿਸੇ ਵੀ ਸਥਿਤੀ ਵਿੱਚ, ਸਾਡੇ ਤੋਂ ਬਾਅਦ ਤੋਂ ਬਾਅਦ ਵਿੱਚ, ਵਿੱਚ ਹੋਰ ਸੌਦੇ ਸਾਫਟਵੇਅਰ।

<br>

<img height=6px width="100%" src="https://assets.scsstocss.org/images/separators/aqua-gradient.png?v=7e4a141">

## 🛠️ ਸੰਬੰਧਿਤ ਉਪਯੋਗਤਾਵਾਂ

### [</> minify.js](https://minify-js.org) &nbsp;<a href="https://github.com/toolleeo/cli-apps/#programming"><img height=18 src="https://assets.scsstocss.org/images/badges/awesome/badge.svg?v=7e4a141"></a>

> ਸਾਰੀਆਂ JavaScript ਫਾਈਲਾਂ ਨੂੰ ਆਵਰਤੀ ਤੌਰ 'ਤੇ ਛੋਟਾ ਕਰੋ।
<br>[ਇੰਸਟਾਲ ਕਰੋ](https://minify-js.org/docs/pa#-%E0%A8%87%E0%A9%B0%E0%A8%B8%E0%A8%9F%E0%A8%BE%E0%A8%B2%E0%A9%87%E0%A8%B8%E0%A8%BC%E0%A8%A8) /
[ਪੜ੍ਹੋ](https://minify-js.org/docs/pa/#readme) /
[CLI ਦੀ ਵਰਤੋਂ](https://minify-js.org/docs/pa#-%E0%A8%95%E0%A8%AE%E0%A8%BE%E0%A8%82%E0%A8%A1-%E0%A8%B2%E0%A8%BE%E0%A8%88%E0%A8%A8-%E0%A8%A6%E0%A9%80-%E0%A8%B5%E0%A8%B0%E0%A8%A4%E0%A9%8B%E0%A8%82) /
[API ਵਰਤੋਂ](https://minify-js.org/docs/pa#-api-%E0%A8%B5%E0%A8%B0%E0%A8%A4%E0%A9%8B%E0%A8%82) /
[ਚਰਚਾ ਕਰੋ](https://github.com/adamlui/minify.js/discussions)

<br>

<img height=6px width="100%" src="https://assets.scsstocss.org/images/separators/aqua-gradient.png?v=7e4a141">

<picture><source media="(prefers-color-scheme: dark)" srcset="https://assets.scsstocss.org/images/icons/home/white/icon32x27.png?v=7e4a141"><img height=13 src="https://assets.scsstocss.org/images/icons/home/dark-gray/icon32x27.png?v=7e4a141"></picture> <a href="https://github.com/adamlui/js-utils/#readme">**ਹੋਰ JavaScript ਉਪਯੋਗਤਾਵਾਂ**</a> /
<a href="https://github.com/adamlui/scss-to-css/discussions">ਚਰਚਾ ਕਰੋ</a> /
<a href="#top">ਸਿਖਰ 'ਤੇ ਵਾਪਸ ਜਾਓ ↑</a>
