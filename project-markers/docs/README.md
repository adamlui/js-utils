<a id="top"></a>

# 🏷️ project-markers

<a href="https://github.com/adamlui/js-utils/releases/tag/project-markers-1.1.0">
    <img height=31 src="https://img.shields.io/badge/Latest_Build-1.1.0-32fcee.svg?logo=icinga&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://github.com/adamlui/js-utils/blob/main/project-markers/docs/LICENSE.md">
    <img height=31 src="https://img.shields.io/badge/License-MIT-f99b27.svg?logo=internetarchive&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://www.codefactor.io/repository/github/adamlui/js-utils">
    <img height=31 src="https://img.shields.io/codefactor/grade/github/adamlui/js-utils?label=Code+Quality&logo=codefactor&logoColor=white&labelColor=464646&color=a0fc55&style=for-the-badge"></a>
<a href="https://sonarcloud.io/component_measures?metric=vulnerabilities&selected=adamlui_js-utils%3Aproject-markers&id=adamlui_js-utils">
    <img height=31 src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fsonarcloud.io%2Fapi%2Fmeasures%2Fcomponent%3Fcomponent%3Dadamlui_js-utils%3Aproject-markers%26metricKeys%3Dvulnerabilities&query=%24.component.measures.0.value&style=for-the-badge&logo=sonar&logoColor=white&labelColor=464646&label=Vulnerabilities&color=fafc74"></a>

> ### _Common project root markers._

It's just a [JSON file](https://cdn.jsdelivr.net/npm/project-markers@1.0.0/dist/project-markers.json), so you can use it in any environment.

<img height=175 width="auto" src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@project-markers-1.1.0/project-markers/assets/images/dataset-preview.png">

<a href="#"><img style="height:10px ; width:100%" src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@6b0d399/assets/images/separators/aqua-gradient.png"></a>

## ⚡ Installation

From your project root:

```bash
npm install project-markers
```

<hr>

## 🔌 Usage

#### <a href="#-es-modules-esm"><img height=13 width="auto" src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@dbdea4b/assets/images/icons/module-systems/esm/icon32.png"></a> ES Modules (ESM):

```js
import projectMarkers from 'project-markers'

console.log(projectMarkers)
// => [ '.ansible-lint', '.bazelrc', '.browserslistrc', '.buckconfig', ... ]
```

#### <a href="#-commonjs-cjs"><img height=13 width="auto" src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@dbdea4b/assets/images/icons/module-systems/cjs/icon32.png"></a> CommonJS (CJS):

```js
const projectMarkers = require('project-markers')

console.log(projectMarkers)
// => [ '.ansible-lint', '.bazelrc', '.browserslistrc', '.buckconfig', ... ]
```

The list includes hundreds of markers from many tools and ecosystems, including:

- Version control (.git, .hg, .svn)
- Python (pyproject.toml, setup.py, requirements.txt)
- JavaScript (package.json, yarn.lock, tsconfig.json)
- Docker/K8s (Dockerfile, docker-compose.yml)
- CI/CD (.github, .gitlab-ci.yml, Jenkinsfile)

<hr>

## MIT License

Copyright © 2026 [Adam Lui](https://github.com/adamlui)

<hr>

## 📦 Related

<!-- PROJECT-MARKERS (PYTHON) -->

<details>
    <summary><b>🏷️ project-markers (Python)</b></summary>
    <br>
    <a href="https://github.com/adamlui/python-utils/tree/main/project-markers/#readme">
        <img width="333" height="auto" src="https://cdn.jsdelivr.net/gh/adamlui/python-utils@4229cfe/project-markers/assets/images/dataset-preview.png">
    </a>
</details>

> [<img height=14 width="auto" src="https://cdn.jsdelivr.net/gh/adamlui/python-utils@b110c1e/assets/images/icons/python/icon32.png">][project-markers-py-install]
> [Install][project-markers-py-install] /
> [<picture><source media="(prefers-color-scheme: dark)" srcset="https://cdn.jsdelivr.net/gh/adamlui/userscripts@13443c3/assets/images/icons/paper-sheet/white.svg"><img height="13" src="https://cdn.jsdelivr.net/gh/adamlui/userscripts@13443c3/assets/images/icons/paper-sheet/black.svg"></picture>][project-markers-py-readme]
> [Readme][project-markers-py-readme] /
> 🔌 [API usage][project-markers-py-api-usage] /
> [<picture><source media="(prefers-color-scheme: dark)" srcset="https://cdn.jsdelivr.net/gh/adamlui/userscripts@13443c3/assets/images/icons/speech-bubble-square/white.svg"><img height="12.5" src="https://cdn.jsdelivr.net/gh/adamlui/userscripts@13443c3/assets/images/icons/speech-bubble-square/black.svg"></picture>][project-markers-py-discuss]
> [Discuss][project-markers-py-discuss]

[project-markers-py-install]: https://github.com/adamlui/python-utils/tree/main/project-markers/#installation
[project-markers-py-readme]: https://github.com/adamlui/python-utils/tree/main/project-markers/#readme
[project-markers-py-api-usage]: https://github.com/adamlui/python-utils/tree/main/project-markers/#usage
[project-markers-py-discuss]: https://github.com/adamlui/python-utils/discussions


<!-- FOOTER -->


<a href="#"><img style="height:10px ; width:100%" src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@6b0d399/assets/images/separators/aqua-gradient.png"></a>

[<picture><source media="(prefers-color-scheme: dark)" srcset="https://cdn.jsdelivr.net/gh/adamlui/js-utils@21bf981/assets/images/icons/home/white/icon32x27.png"><img height=13 src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@21bf981/assets/images/icons/home/dark-gray/icon32x27.png"></picture>][js-utils]
[**More JavaScript utilities**][js-utils] /
<a href="https://github.com/adamlui/js-utils/discussions">Discuss</a> /
<a href="https://github.com/adamlui/js-utils/issues">Report bug</a> /
<a href="mailto:security@tidelift.com">Report vulnerability</a> /
<a href="#top">Back to top ↑</a>

[js-utils]: https://github.com/adamlui/js-utils/#readme
