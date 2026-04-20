<a id="top"></a>

# 💻 computer-languages

<a href="https://github.com/adamlui/js-utils/releases/tag/computer-languages-1.0.0">
    <img height=31 src="https://img.shields.io/badge/Latest_Build-1.0.0-32fcee.svg?logo=icinga&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://github.com/adamlui/js-utils/blob/main/computer-languages/docs/LICENSE.md">
    <img height=31 src="https://img.shields.io/badge/License-MIT-f99b27.svg?logo=internetarchive&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://sonarcloud.io/component_measures?metric=vulnerabilities&selected=adamlui_js-utils%3Acomputer-languages&id=adamlui_js-utils">
    <img height=31 src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fsonarcloud.io%2Fapi%2Fmeasures%2Fcomponent%3Fcomponent%3Dadamlui_js-utils%3Acomputer-languages%26metricKeys%3Dvulnerabilities&query=%24.component.measures.0.value&style=for-the-badge&logo=sonar&logoColor=white&labelColor=464646&label=Vulnerabilities&color=fafc74"></a>

> ### _File extensions for computer languages._

It's just a [JSON file](https://cdn.jsdelivr.net/npm/computer-languages@1/dist/ai-personas.json), so you can use it in any environment. Sourced from GitHub's [Linguist](https://github.com/github-linguist/linguist) project (defines all 700+ languages known to GitHub). Data is updated via script and released via new package version.

<a href="#"><img style="height:10px ; width:100%" src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@6b0d399/assets/images/separators/aqua-gradient.png"></a>

## ⚡ Installation

From your project root:

```bash
npm install computer-languages
```

<hr>

## 🔌 Usage

#### <a href="#-es-modules-esm"><img height=13 width="auto" src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@dbdea4b/assets/images/icons/module-systems/esm/icon32.png"></a> ES Modules (ESM):

```js
import computerLangs from 'computer-languages'

pyLangData = computerLangs.Python

console.log(pyLangData.type) // => programming
console.log(pyLangData.extensions) // => ['.cgi', '.fcgi', '.gyp', ...]
```

#### <a href="#-commonjs-cjs"><img height=13 width="auto" src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@dbdea4b/assets/images/icons/module-systems/cjs/icon32.png"></a> CommonJS (CJS):

```js
const computerLangs = require('computer-languages')

console.log(pyLangData.type) // => programming
console.log(pyLangData.extensions) // => ['.cgi', '.fcgi', '.gyp', ...]
```

<hr>

## 💻 Examples

Get extension(s) for a language:

```js
jsExts = computerLangs.JavaScript.extensions

console.log(jsExts) // => ['._js', '.bones', '.cjs', '.es', ...]
```

Get language(s) from an extension:

```js
function getLang(fileExt) {
    const langMatches = Object.entries(computerLangs)
        .filter(([_, data]) => data.extensions.includes(fileExt))
        .map(([lang]) => lang)
    return langMatches.length == 1 ? langMatches[0] : langMatches
}

console.log(getLang('.rs')) // => [ 'RenderScript', 'Rust', 'XML' ]
```

Filter by language type:

```js
const markupLangs = Object.keys(computerLangs)
    .filter(lang => computerLangs[lang].type == 'markup')

console.log(markupLangs) // => ['Antlers', 'API Blueprint', 'Astro', 'BibTeX', ...]
console.log(`${markupLangs.length} markup languages`) // -> 69 markup languages
```

<hr>

## MIT License

Copyright © 2026 [Adam Lui](https://github.com/adamlui)


<!-- FOOTER -->


<a href="#"><img style="height:10px ; width:100%" src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@6b0d399/assets/images/separators/aqua-gradient.png"></a>

[<picture><source media="(prefers-color-scheme: dark)" srcset="https://cdn.jsdelivr.net/gh/adamlui/js-utils@6b0d399/assets/images/icons/home/white/icon32x27.png"><img height=13 src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@6b0d399/assets/images/icons/home/dark-gray/icon32x27.png"></picture>][js-utils]
[**More JavaScript utilities**][js-utils] /
<a href="https://github.com/adamlui/js-utils/discussions">Discuss</a> /
<a href="https://github.com/adamlui/js-utils/issues">Report bug</a> /
<a href="mailto:security@tidelift.com">Report vulnerability</a> /
<a href="#top">Back to top ↑</a>

[js-utils]: https://github.com/adamlui/js-utils/#readme
