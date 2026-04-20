<a id="top"></a>

# 💻 computer-languages

<a href="https://pepy.tech/projects/computer-languages?versions=*">
    <img height=31 src="https://img.shields.io/pepy/dt/computer-languages?logo=weightsandbiases&color=af68ff&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://github.com/adamlui/python-utils/releases/tag/computer-languages-1.0.3">
    <img height=31 src="https://img.shields.io/badge/Latest_Build-1.0.3-32fcee.svg?logo=icinga&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://github.com/adamlui/python-utils/blob/main/computer-languages/docs/LICENSE.md">
    <img height=31 src="https://img.shields.io/badge/License-MIT-f99b27.svg?logo=internetarchive&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://www.codefactor.io/repository/github/adamlui/python-utils">
    <img height=31 src="https://img.shields.io/codefactor/grade/github/adamlui/python-utils?label=Code+Quality&logo=codefactor&logoColor=white&labelColor=464646&color=a0fc55&style=for-the-badge"></a>
<a href="https://sonarcloud.io/component_measures?metric=vulnerabilities&selected=adamlui_python-utils%3Acomputer-languages&id=adamlui_python-utils">
    <img height=31 src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fsonarcloud.io%2Fapi%2Fmeasures%2Fcomponent%3Fcomponent%3Dadamlui_python-utils%3Acomputer-languages%26metricKeys%3Dvulnerabilities&query=%24.component.measures.0.value&style=for-the-badge&logo=sonar&logoColor=white&labelColor=464646&label=Vulnerabilities&color=fafc74"></a>

> ### _File extensions for computer languages._

It's just a [JSON file](https://cdn.jsdelivr.net/gh/adamlui/python-utils@computer-languages-1.0.3/computer-languages/src/computer_languages/computer-languages.json), so you can use it in any environment. Sourced from GitHub's [Linguist](https://github.com/github-linguist/linguist) project (defines all 700+ languages known to GitHub). Data is updated via script and released via new package version.

<a href="#"><img style="height:10px ; width:100%" src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@7da7074/assets/images/separators/aqua-gradient.png"></a>

## Installation

```bash
pip install computer-languages
```

<hr>

## Usage

```py
import computer_languages

py_lang_data = computer_languages['Python']

print(py_lang_data['type']) # => programming
print(py_lang_data['extensions']) # => ['.cgi', '.fcgi', '.gyp', ...]
```

_Note: Most type checkers will falsely warn_ `computer_languages` _is not subscriptable because they are incapable of analyzing runtime behavior (where the module is replaced w/ a dictionary for cleaner, direct access). You can safely suppress such warnings using_ `# type: ignore`.

<hr>

## Examples

List all extensions for a language:

```py
js_exts = computer_languages['JavaScript']['extensions']

print(js_exts) # => ['._js', '.bones', '.cjs', '.es', ...]
```

Get language from an extension:

```py
def get_lang(file_ext):
    for lang, data in computer_languages.items():
        if file_ext in data['extensions']:
            return lang

print(get_lang('.rs')) # => Rust
```

Filter by language type:

```py
markup_langs = [
    lang for lang, data in computer_languages.items()
        if data['type'] == 'markup'
]

print(markup_langs) # => ['Antlers', 'API Blueprint', 'Astro', 'BibTeX', ...]
print(f'{len(markup_langs)} markup languages') # -> 69 markup languages
```

<hr>

## MIT License

Copyright © 2026 [Adam Lui](https://github.com/adamlui)

<hr>

## Related

</> [markup-languages](https://github.com/adamlui/python-utils/tree/main/markup-languages/#readme) - File extensions for markup languages.
<br>## [prose-languages](https://github.com/adamlui/python-utils/tree/main/prose-languages/#readme) - File extensions for prose languages.
<br>{ } [data-languages](https://github.com/adamlui/python-utils/tree/main/data-languages/#readme) - File extensions for data languages.
<br>#! [programming-languages](https://github.com/adamlui/python-utils/tree/main/programming-languages/#readme) - File extensions for programming languages.

<a href="#"><img style="height:10px ; width:100%" src="https://cdn.jsdelivr.net/gh/adamlui/python-utils@b8b2932/assets/images/separators/aqua-gradient.png"></a>

<picture><source media="(prefers-color-scheme: dark)" srcset="https://cdn.jsdelivr.net/gh/adamlui/python-utils@760599e/assets/images/icons/home/white/icon32x27.png"><img height=13 src="https://cdn.jsdelivr.net/gh/adamlui/python-utils@760599e/assets/images/icons/home/dark-gray/icon32x27.png"></picture> <a href=https://github.com/adamlui/python-utils/#readme>**More Python utilities**</a> /
<a href="https://github.com/adamlui/python-utils/discussions">Discuss</a> /
<a href="https://github.com/adamlui/python-utils/issues">Report bug</a> /
<a href="mailto:security@tidelift.com">Report vulnerability</a> /
<a href="#top">Back to top ↑</a>
