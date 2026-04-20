<a id="top"></a>

# 💻 programming-languages

<a href="https://github.com/adamlui/js-utils/releases/tag/programming-languages-1.0.0">
    <img height=31 src="https://img.shields.io/badge/Latest_Build-1.0.0-32fcee.svg?logo=icinga&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://github.com/adamlui/js-utils/blob/main/programming-languages/docs/LICENSE.md">
    <img height=31 src="https://img.shields.io/badge/License-MIT-f99b27.svg?logo=internetarchive&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://www.codefactor.io/repository/github/adamlui/js-utils">
    <img height=31 src="https://img.shields.io/codefactor/grade/github/adamlui/js-utils?label=Code+Quality&logo=codefactor&logoColor=white&labelColor=464646&color=a0fc55&style=for-the-badge"></a>
<a href="https://sonarcloud.io/component_measures?metric=vulnerabilities&selected=adamlui_js-utils%3Aprogramming-languages&id=adamlui_js-utils">
    <img height=31 src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fsonarcloud.io%2Fapi%2Fmeasures%2Fcomponent%3Fcomponent%3Dadamlui_js-utils%3Aprogramming-languages%26metricKeys%3Dvulnerabilities&query=%24.component.measures.0.value&style=for-the-badge&logo=sonar&logoColor=white&labelColor=464646&label=Vulnerabilities&color=fafc74"></a>

> ### _File extensions for programming languages._

It's just a [JSON file](https://cdn.jsdelivr.net/npm/@adamlui/programming-languages@1.0.0/dist/programming-languages.json), so you can use it in any environment. Sourced from GitHub's [Linguist](https://github.com/github-linguist/linguist) project (defines all 700+ languages known to GitHub). Data is updated via script and released via new package version.

<a href="#"><img style="height:10px ; width:100%" src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@6b0d399/assets/images/separators/aqua-gradient.png"></a>

## ⚡ Installation

From your project root:

```bash
npm install @adamlui/programming-languages
```

<hr>

## 🔌 Usage

#### <a href="#-es-modules-esm"><img height=13 width="auto" src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@dbdea4b/assets/images/icons/module-systems/esm/icon32.png"></a> ES Modules (ESM):

```js
import programmingLangs from '@adamlui/programming-languages'

pyLangData = programmingLangs.Python

console.log(pyLangData.extensions) // => [ '.cgi', '.fcgi', '.gyp', ... ]
```

#### <a href="#-commonjs-cjs"><img height=13 width="auto" src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@dbdea4b/assets/images/icons/module-systems/cjs/icon32.png"></a> CommonJS (CJS):

```js
const programmingLangs = require('@adamlui/programming-languages')

pyLangData = programmingLangs.Python

console.log(pyLangData.extensions) // => [ '.cgi', '.fcgi', '.gyp', ... ]
```

<hr>

## 💻 Examples

Get language(s) from an extension:

```js
function getLang(fileExt) {
    const langMatches = Object.entries(programmingLangs)
        .filter(([_, data]) => data.extensions.includes(fileExt))
        .map(([lang]) => lang)
    return langMatches.length == 1 ? langMatches[0] : langMatches
}

console.log(getLang('.al')) // => [ 'AL', 'Perl' ]
```

Get language(s) from a file path:

```js
function getLangFromPath(filepath) {
    const fileExt = filepath.slice(filepath.lastIndexOf('.'))
    const langMatches = Object.entries(programmingLangs)
        .filter(([_, data]) => data.extensions.includes(fileExt))
        .map(([lang]) => lang)
    return langMatches.length == 1 ? langMatches[0] : langMatches
}

console.log(getLangFromPath('main.rs')) // => [ 'RenderScript', 'Rust' ]
console.log(getLangFromPath('script.kt'))  // => Kotlin
console.log(getLangFromPath('data.avsc'))  // => [] (use data-languages pkg)
```

<hr>

## MIT License

Copyright © 2026 [Adam Lui](https://github.com/adamlui)

<hr>

## 📜 Related

<!-- DATA-LANGUAGES -->

<details>
    <summary><b>🧾 data-languages</b></summary>
    <br>
    <a href="https://github.com/adamlui/js-utils/tree/main/data-languages/#readme">
        <img width="555" height="auto" src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@latest/data-languages/assets/images/dataset-preview.png">
    </a>
</details>

> [<img height=14 width="auto" src="https://cdn.jsdelivr.net/gh//adamlui/js-utils@dbdea4b/assets/images/icons/runtimes/node.js/icon25x28.png">][data-langs-install]
> [Install][data-langs-install] /
> [<picture><source media="(prefers-color-scheme: dark)" srcset="https://cdn.jsdelivr.net/gh/adamlui/userscripts@13443c3/assets/images/icons/paper-sheet/white.svg"><img height="13" src="https://cdn.jsdelivr.net/gh/adamlui/userscripts@13443c3/assets/images/icons/paper-sheet/black.svg"></picture>][data-langs-readme]
> [Readme][data-langs-readme] /
> 🔌 [API usage][data-langs-api-usage] /
> [<picture><source media="(prefers-color-scheme: dark)" srcset="https://cdn.jsdelivr.net/gh/adamlui/userscripts@13443c3/assets/images/icons/speech-bubble-square/white.svg"><img height="12.5" src="https://cdn.jsdelivr.net/gh/adamlui/userscripts@13443c3/assets/images/icons/speech-bubble-square/black.svg"></picture>][data-langs-discuss]
> [Discuss][data-langs-discuss]

[data-langs-install]: https://github.com/adamlui/js-utils/tree/main/data-languages/#-installation
[data-langs-readme]: https://github.com/adamlui/js-utils/tree/main/data-languages/#readme
[data-langs-api-usage]: https://github.com/adamlui/js-utils/tree/main/data-languages/#-usage
[data-langs-discuss]: https://github.com/adamlui/js-utils/discussions

<!-- programming-languages (PYTHON) -->

<details>
    <summary><b>💻 programming-languages (Python)</b></summary>
    <br>
    <a href="https://github.com/adamlui/python-utils/tree/main/programming-languages/#readme">
        <img width="555" height="auto" src="https://cdn.jsdelivr.net/gh/adamlui/python-utils@4229cfe/programming-languages/assets/images/dataset-preview.png">
    </a>
</details>

> [<img height=14 width="auto" src="https://cdn.jsdelivr.net/gh/adamlui/python-utils@b110c1e/assets/images/icons/python/icon32.png">][progrmaming-langs-py-install]
> [Install][progrmaming-langs-py-install] /
> [<picture><source media="(prefers-color-scheme: dark)" srcset="https://cdn.jsdelivr.net/gh/adamlui/userscripts@13443c3/assets/images/icons/paper-sheet/white.svg"><img height="13" src="https://cdn.jsdelivr.net/gh/adamlui/userscripts@13443c3/assets/images/icons/paper-sheet/black.svg"></picture>][progrmaming-langs-py-readme]
> [Readme][progrmaming-langs-py-readme] /
> 🔌 [API usage][progrmaming-langs-py-api-usage] /
> [<picture><source media="(prefers-color-scheme: dark)" srcset="https://cdn.jsdelivr.net/gh/adamlui/userscripts@13443c3/assets/images/icons/speech-bubble-square/white.svg"><img height="12.5" src="https://cdn.jsdelivr.net/gh/adamlui/userscripts@13443c3/assets/images/icons/speech-bubble-square/black.svg"></picture>][progrmaming-langs-py-discuss]
> [Discuss][progrmaming-langs-py-discuss]

[progrmaming-langs-py-install]: https://github.com/adamlui/python-utils/tree/main/programming-languages/#installation
[progrmaming-langs-py-readme]: https://github.com/adamlui/python-utils/tree/main/programming-languages/#readme
[progrmaming-langs-py-api-usage]: https://github.com/adamlui/python-utils/tree/main/programming-languages/#usage
[progrmaming-langs-py-discuss]: https://github.com/adamlui/python-utils/discussions


<!-- FOOTER -->


<a href="#"><img style="height:10px ; width:100%" src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@6b0d399/assets/images/separators/aqua-gradient.png"></a>

[<picture><source media="(prefers-color-scheme: dark)" srcset="https://cdn.jsdelivr.net/gh/adamlui/js-utils@21bf981/assets/images/icons/home/white/icon32x27.png"><img height=13 src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@21bf981/assets/images/icons/home/dark-gray/icon32x27.png"></picture>][js-utils]
[**More JavaScript utilities**][js-utils] /
<a href="https://github.com/adamlui/js-utils/discussions">Discuss</a> /
<a href="https://github.com/adamlui/js-utils/issues">Report bug</a> /
<a href="mailto:security@tidelift.com">Report vulnerability</a> /
<a href="#top">Back to top ↑</a>

[js-utils]: https://github.com/adamlui/js-utils/#readme
