<div align="right">
    <h6>
        <picture>
            <source type="image/svg+xml" media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/earth-icon/white/icon32.svg">
            <img height=14 src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/earth-icon/black/icon32.svg">
        </picture>
        &nbsp;简体中文 |
        <a href="../..#readme">English</a>
    </h6>
</div>

# </> minify.js 

### 递归地缩小所有 JavaScript 文件。

<a href="https://www.npmjs.com/package/@adamlui/minify.js"><img height=31 src="https://img.shields.io/npm/dt/%40adamlui%2Fminify.js?label=%E4%B8%8B%E8%BD%BD&logo=npm&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="#%EF%B8%8F-mit-%E8%AE%B8%E5%8F%AF%E8%AF%81"><img height=31 src="https://img.shields.io/badge/许可证-MIT-red.svg?logo=internetarchive&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://www.npmjs.com/package/@adamlui/minify.js?activeTab=versions"><img height=31 src="https://img.shields.io/badge/最新版本-1.2.3-fc7811.svg?logo=icinga&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://www.npmjs.com/package/@adamlui/minify.js?activeTab=code"><img height=31 src="https://img.shields.io/npm/unpacked-size/%40adamlui%2Fminify.js?label=%E6%8B%86%E5%B0%81%E5%B0%BA%E5%AF%B8&style=for-the-badge&logo=ebox&logoColor=white&labelColor=464646&color=blue"></a>
<a href="https://sonarcloud.io/component_measures?metric=new_vulnerabilities&id=adamlui_js-utils:minify.js/minify.js"><img height=31 src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fsonarcloud.io%2Fapi%2Fmeasures%2Fcomponent%3Fcomponent%3Dadamlui_js-utils%3Aminify.js%2Fminify.js%26metricKeys%3Dvulnerabilities&query=%24.component.measures.0.value&style=for-the-badge&logo=sonarcloud&logoColor=white&labelColor=464646&label=%E6%BC%8F%E6%B4%9E&color=gold"></a>

<img src="https://github.com/adamlui/js-utils/blob/main/minify.js/media/images/minify.js-docs-demo.png">

<br>

<img height=8px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

## ⚡ 如何安装

作为**全局实用程序**：

```
npm install -g @adamlui/minify.js
```

作为**开发依赖**，从项目根目录：

```
npm install -D @adamlui/minify.js
```

## 💻 用法

基本的**全局命令**是：

```
minify-js
```

**💡 注意：** 通过 `-n` 或 `--dry-run` 来仅查看将处理哪些文件。

#

指定**输入/输出**路径：
   
```
minify-js [input_path] [output_path]
```

- `[input_path]`: 相对于当前工作目录的 JS 文件或包含要缩小的 JS 文件的目录的路径。
- `[output_path]`: 将存储缩小文件的文件或目录的路径，相对于原始文件位置（如果未提供，则使用 `min/`）。

**💡 注意：** 如果传递文件夹，文件将被递归处理。 要包含点文件夹，请传递 `-d` 或 `--include-dotfolders`。 要包含点文件，请传递 `-D` 或 `--include-dotfiles`。

#

要用作 **包脚本**，请在项目的 `package.json` 中：

```json
  "scripts": {
    "build:js": "<minify-js-cmd>"
  },
```

将 `<minify-js-cmd>` 替换为 `minify-js` + 可选参数。 然后，可以使用 `npm run build:js` 来运行该命令。
<br><br>

## 📃 命令示例：

- 缩小**当前目录**中的所有 JavaScript 文件（输出到 `min/`）：

   ```
   minify-js
   ```

- 缩小**特定目录**中的所有 JavaScript 文件（输出到 `path/to/your/directory/min/`）：

   ```
   minify-js path/to/your/directory
   ```

- 缩小**特定文件**（输出到 `path/to/your/min/file.min.js`）：

   ```
   minify-js path/to/your/file.js
   ```

- 指定**输入和输出**目录（输出到 `output_folder/`）：

   ```
   minify-js input_folder output_folder
   ```

## 💖 支持

如果这对您有帮助，请考虑[给予 GitHub ⭐](https://github.com/adamlui/js-utils)！
<br><br>

## 🏛️ MIT 许可证

**版权所有 (c) 2023–2024 [刘展鹏 (Adam Lui)](https://github.com/adamlui)**

特此免费向任何获得副本的人授予许可
本软件和相关文档文件（“软件”），处理
在软件中不受限制，包括但不限于权利
使用、复制、修改、合并、发布、分发、再许可和/或出售
该软件的副本，并允许该软件是
提供这样做，但须满足以下条件：

上述版权声明和本许可声明应包含在所有
软件的副本或重要部分。

本软件“按原样”提供，不提供任何形式的明示或保证
暗示的，包括但不限于适销性保证，
适用于特定目的和非侵权。 在任何情况下都不得
作者或版权持有人对任何索赔、损害或其他
责任，无论是在合同、侵权或其他方面的行为中，由以下原因引起，
出于或与软件或使用或其他交易有关
软件。

<br>

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

<a href="https://github.com/adamlui/js-utils">**家**</a> /
<a href="https://github.com/adamlui/js-utils/discussions">讨论</a> /
<a href="#-minifyjs">回到顶部 ↑</a>
