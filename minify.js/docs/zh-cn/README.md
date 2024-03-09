<div align="right">
    <h6>
        <picture>
            <source type="image/svg+xml" media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/earth-icon/white/icon32.svg">
            <img height=14 src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/earth-icon/black/icon32.svg">
        </picture>
        &nbsp;简体中文 |
        <a href="../..#readme">English</a> |
        <a href="../zh-tw#readme">繁體中文</a>
    </h6>
</div>

# </> minify.js 

### 递归地缩小所有 JavaScript 文件。

<a href="https://www.npmjs.com/package/@adamlui/minify.js"><img height=31 src="https://img.shields.io/npm/dt/%40adamlui%2Fminify.js?label=%E4%B8%8B%E8%BD%BD&logo=npm&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="#%EF%B8%8F-mit-%E8%AE%B8%E5%8F%AF%E8%AF%81"><img height=31 src="https://img.shields.io/badge/许可证-MIT-red.svg?logo=internetarchive&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://www.npmjs.com/package/@adamlui/minify.js?activeTab=versions"><img height=31 src="https://img.shields.io/badge/最新版本-1.3.0-fc7811.svg?logo=icinga&logoColor=white&labelColor=464646&style=for-the-badge"></a>
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

## 💻 命令行使用

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

**💡 注意：** 如果传递文件夹，文件将被递归处理。

#

要用作 **包脚本**，请在项目的 `package.json` 中：

```json
  "scripts": {
    "build:js": "<minify-js-cmd>"
  },
```

将 `<minify-js-cmd>` 替换为 `minify-js` + 可选参数。 然后，可以使用 `npm run build:js` 来运行该命令。
<br><br>

### 命令行选项

```
配置选项：
 -n, --dry-run               实际上并不缩小文件，只是显示它们是否会被处理。
 -d, --include-dotfolders    在文件搜索中包括点文件夹。
 -D, --include-dotfiles      在文件搜索中包含点文件。
 -q, --quiet                 禁止除错误之外的所有日志记录。

Info commands:
 -h, --help                  显示帮助屏幕。
 -v, --version               显示版本号。
```

### 命令示例

缩小**当前目录**中的所有 JavaScript 文件（输出到 `min/`）：

```
minify-js
```

缩小**特定目录**中的所有 JavaScript 文件（输出到 `path/to/your/directory/min/`）：

```
minify-js path/to/your/directory
```

缩小**特定文件**（输出到 `path/to/your/min/file.min.js`）：

```
minify-js path/to/your/file.js
```

指定**输入和输出**目录（输出到 `output_folder/`）：

```
minify-js input_folder output_folder
```

## 🔌 API 参考

您可以像这样在应用程序中加载 **minify.js**：

```js
const minifyJS = require('@adamlui/minify.js');
```

有一个高级函数 `minify(input, options)`，它将以适应字符串输入的可配置方式执行所有缩小/递归阶段。

### minify(options)

选项是布尔值（默认设置为 `true`）作为对象属性传递，例如 `minifyJS.minify(input, { option: true })`:

```
 recursive                   如果传递目录路径，则递归搜索嵌套文件。
 verbose                     在控制台/终端中显示日志记录。
```

### minify(input)

输入是表示源代码或路径的字符串。

如果传递**源代码**，则直接缩小，然后返回一个包含 `srcPath` + `code` + `error` 的对象：

```js
const srcCode = 'function add(first, second) { return first + second; }',
      result = minifyJS.minify(srcCode);
console.log(result.error); // 运行时错误，如果没有错误则为 `undefined`
console.log(result.code);  // 缩小输出：function add(n,d){return n+d}
```

如果传递了**文件路径**，则加载文件的代码然后缩小，返回一个像上面一样的对象。

如果传递了 **目录路径**，则会搜索 JavaScript 文件（默认情况下递归），每个文件都会被缩小，然后返回包含 `srcPath` + `code` + `error` 的对象数组：

```js
const recursiveResults = minifyJS.minify('.');
recursiveResults.forEach(result =>
    console.log(result.srcPath) // 所有子目录中的 JavaScript 文件
);

const nonRecursiveResults = minifyJS.minify('.', { recursive: false });
nonRecursiveResults.forEach(result =>
    console.log(result.srcPath) // 仅工作目录中的 JavaScript 文件
);
```

<br>

## 💖 支持

如果这对您有帮助，请考虑[给予 GitHub ⭐](https://github.com/adamlui/js-utils)！
<br><br>

## 🏛️ MIT 许可证

**版权所有 (c) 2023–2024 [刘展鹏 (Adam Lui)](https://github.com/adamlui)**

特此免费向任何获得副本的人授予许可本软件和相关文档文件（『软件』），处理在软件中不受限制，包括但不限于权利使用、复制、修改、合并、发布、分发、再许可和/或出售该软件的副本，并允许该软件是提供这样做，但须满足以下条件：

上述版权声明和本许可声明应包含在所有软件的副本或重要部分。

本软件『按原样』提供，不提供任何形式的明示或保证暗示的，包括但不限于适销性保证，适用于特定目的和非侵权。 在任何情况下都不得作者或版权持有人对任何索赔、损害或其他责任，无论是在合同、侵权或其他方面的行为中，由以下原因引起，出于或与软件或使用或其他交易有关软件。

<br>

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

<a href="https://github.com/adamlui/js-utils">**家**</a> /
<a href="https://github.com/adamlui/js-utils/discussions">讨论</a> /
<a href="#-minifyjs">回到顶部 ↑</a>
