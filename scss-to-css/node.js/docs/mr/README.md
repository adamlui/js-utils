<div align="center">
    <h6>
        <picture>
            <source type="image/svg+xml" media="(prefers-color-scheme: dark)" srcset="https://assets.scsstocss.org/images/icons/earth/white/icon32.svg?v=7e4a141">
            <img height=14 src="https://assets.scsstocss.org/images/icons/earth/black/icon32.svg?v=7e4a141">
        </picture>
        &nbsp;मराठी |
        <a href="../..#readme">English</a> |
        <a href="../zh-cn#readme">简体中文</a> |
        <a href="../zh-tw#readme">繁體中文</a> |
        <a href="../ja#readme">日本語</a> |
        <a href="../hi#readme">हिंदी</a> |
        <a href="../bn#readme">বাংলা</a> |
        <a href="../pa#readme">ਪੰਜਾਬੀ</a> |
        <a href="../de#readme">Deutsch</a> |
        <a href="../es#readme">Español</a> |
        <a href="../fr#readme">Français</a> |
        <a href="../it#readme">Italiano</a> |
        <a href="../nl#readme">Nederlands</a> |
        <a href="../pt#readme">Português</a>
    </h6>
</div>

# { } scss-to-css

### सर्व SCSS फाईल्स minified CSS मध्ये पुनरावृत्तीने संकलित करा.

<a href="https://www.npmjs.com/package/@adamlui/scss-to-css">
    <img height=31 src="https://img.shields.io/npm/dm/%40adamlui%2Fscss-to-css?logo=npm&color=af68ff&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="#%EF%B8%8F-mit-%E0%A4%AA%E0%A4%B0%E0%A4%B5%E0%A4%BE%E0%A4%A8%E0%A4%BE">
    <img height=31 src="https://img.shields.io/badge/License-MIT-orange.svg?logo=internetarchive&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://github.com/adamlui/js-utils/releases/tag/scss-to-css-1.10.24">
    <img height=31 src="https://img.shields.io/badge/Latest_Build-1.10.24-44cc11.svg?logo=icinga&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://www.npmjs.com/package/@adamlui/scss-to-css?activeTab=code">
    <img height=31 src="https://img.shields.io/npm/unpacked-size/%40adamlui%2Fscss-to-css?style=for-the-badge&logo=ebox&logoColor=white&color=blue&labelColor=464646"></a>
<a href="https://sonarcloud.io/component_measures?metric=new_vulnerabilities&id=adamlui_scss-to-css:node.js/src/scss-to-css.js">
    <img height=31 src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fsonarcloud.io%2Fapi%2Fmeasures%2Fcomponent%3Fcomponent%3Dadamlui_scss-to-css%3Anode.js%2Fsrc%2Fscss-to-css.js%26metricKeys%3Dvulnerabilities&query=%24.component.measures.0.value&style=for-the-badge&logo=sonarcloud&logoColor=white&labelColor=464646&label=Vulnerabilities&color=gold"></a>
<a href="https://github.com/toolleeo/cli-apps#conversion">
    <img height=31 src="https://img.shields.io/badge/Mentioned_in-Awesome-c4a2bd?logo=awesomelists&logoColor=white&labelColor=464646&style=for-the-badge"></a>

<img height=6px width="100%" src="https://assets.scsstocss.org/images/separators/aqua-gradient.png?v=7e4a141">

## ⚡ स्थापना

**जागतिक उपयुक्तता** म्हणून:

```
$ npm install -g @adamlui/scss-to-css
```

**विकासक अवलंबित्व** म्हणून (उदा. बिल्ड स्क्रिप्टसाठी), तुमच्या प्रोजेक्ट रूटवरून:

```
$ npm install -D @adamlui/scss-to-css
```

**रनटाइम अवलंबित्व** म्हणून (उदा. ऑन-द-फ्लाय संकलनासाठी), तुमच्या प्रोजेक्ट रूटवरून:

```
$ npm install @adamlui/scss-to-css
```

<br>

<a href="https://github.com/sponsors/adamlui"><img src="https://assets.scsstocss.org/images/banners/sponsor/$10/banner1660x260.png?v=2cba0ae"></a>

<img height=6px width="100%" src="https://assets.scsstocss.org/images/separators/aqua-gradient.png?v=7e4a141">

## 💻 कमांड लाइन वापर

मूलभूत **ग्लोबल कमांड** आहे:

```
$ scss-to-css
```

नमुना आउटपुट:

<img src="https://cdn.jsdelivr.net/gh/adamlui/scss-to-css@b74edea/node.js/media/images/screenshots/cli/scss-to-css-docs-cmd-output.png">

**📝 टीप:** जोपर्यंत `-S` किंवा `--no-source-maps` पास होत नाही तोपर्यंत स्त्रोत नकाशे देखील डीफॉल्टनुसार तयार केले जातात.

#

**इनपुट/आउटपुट** पथ निर्दिष्ट करण्यासाठी:

```
$ scss-to-css [input_path] [output_path]
```

- `[input_path]`: सध्याच्या कार्यरत निर्देशिकेच्या सापेक्ष SCSS फाइल किंवा संकलित करायच्या SCSS फाइल्स असलेली निर्देशिका.
- `[output_path]`: फाईल किंवा डिरेक्ट्रीचा मार्ग जिथे CSS + स्त्रोत नकाशा फायली संग्रहित केल्या जातील, मूळ फाइल स्थानाच्या सापेक्ष (दिले नसल्यास, `css/` वापरले जाते).

**📝 टीप:** फोल्डर पास केले असल्यास, `-R` किंवा `--no-recursion` पास केल्याशिवाय फायलींवर आवर्ती पद्धतीने प्रक्रिया केली जाईल.

#

तुमच्या प्रोजेक्टच्या `package.json` मध्ये **पॅकेज स्क्रिप्ट** म्हणून वापरण्यासाठी:

```json
  "scripts": {
    "build:css": "<scss-to-css-cmd>"
  },
```

`<scss-to-css-cmd>` ला `scss-to-css` + पर्यायी पॅरामीटरने बदला. त्यानंतर, कमांड रन करण्यासाठी `npm run build:css` वापरले जाऊ शकते.

#

### उदाहरणे आज्ञा

**वर्तमान निर्देशिकेत** सर्व SCSS फाइल्स संकलित करा (`css/` वर आउटपुट):

```
$ scss-to-css
```

सर्व SCSS फायली एका **विशिष्ट निर्देशिकेत संकलित करा** (`path/to/your/directory/css/` मधील आउटपुट):

```
$ scss-to-css path/to/your/directory
```

**विशिष्ट फाइल** संकलित करा (`path/to/your/css/file.min.css` वर आउटपुट):

```
$ scss-to-css path/to/your/file.scss
```

दोन्ही **इनपुट आणि आउटपुट** डिरेक्टरी निर्दिष्ट करा (आउटपुट टू output_folder/`):

```
$ scss-to-css input_folder output_folder
```

**📝 टीप:** `-M` किंवा `--no-minify` पास केल्याशिवाय आउटपुट CSS कमी केले जाते.

#

### कमांड लाइन पर्याय

```
बुलियन पर्याय:
 -n, --dry-run                            फाइल(स्) प्रत्यक्षात कमी करू नका, त्यांच्यावर प्रक्रिया केली जाईल का ते दाखवा.
 -d, --include-dotfolders                 फाइल शोधात डॉटफोल्डर समाविष्ट करा.
 -S, --no-source-maps                     स्रोत नकाशे तयार होण्यापासून प्रतिबंधित करा.
 -M, --no-minify                          आउटपुट CSS चे मिनिफिकेशन अक्षम करा.
 -R, --no-recursion                       आवर्ती फाइल शोध अक्षम करा.
 -c, --copy                               एकल स्रोत फाइलवर प्रक्रिया केली असल्यास फाइलवर लिहिण्याऐवजी संकलित CSS क्लिपबोर्डवर कॉपी करा.
 -q, --quiet                              त्रुटी वगळता सर्व लॉगिंग दाबा.

पॅरामीटर पर्याय:
 --ignore-files="file1.scss,file2.scss"   संकलनातून वगळण्यासाठी फायली.
 --comment="comment"                      संकलित CSS वर शीर्षलेख टिप्पणी प्रीपेंड करा. '\n' वापरून ओळीनुसार विभक्त करा.

माहिती आदेश:
 -h, --help                               मदत स्क्रीन प्रदर्शित करा.
 -v, --version                            आवृत्ती क्रमांक दर्शवा.
```

<br>

<img height=6px width="100%" src="https://assets.scsstocss.org/images/separators/aqua-gradient.png?v=7e4a141">

## 🔌 API वापर

तुम्ही ECMAScript मॉड्यूल किंवा CommonJS मॉड्यूल या दोन्हीप्रमाणे, API पद्धती वापरण्यासाठी तुमच्या ॲपमध्ये **scss-to-css** देखील इंपोर्ट करू शकता.

#### ECMAScript*:

```js
import scssToCSS from '@adamlui/scss-to-css';
```

#### CJS:

```js
const scssToCSS = require('@adamlui/scss-to-css');
```

###### _*Node.js आवृत्ती 14 किंवा उच्च आवश्यक_

#

### `compile(input[, options])`

💡 पुरवलेल्या स्ट्रिंग इनपुटवर आधारित SCSS संकलित करते.

**स्रोत कोड** पास केल्यास, तो थेट संकलित केला जातो, त्यानंतर `srcPath` + `code` + `srcMap` + `error` असलेली एखादी वस्तू परत केली जाते:

```js
const srcCode = 'h1 { font-size: 40px ; code { font-face: Roboto Mono }}',
      compileResult = scssToCSS.compile(srcCode);

console.log(compileResult.error); // रनटाइम त्रुटी आउटपुट करते, किंवा त्रुटी नसल्यास `undefined`
console.log(compileResult.code);  // आउटपुट minified CSS: 'h1{font-size:40px}h1 code{font-face:Roboto Mono}'
```

जर **फाइल पथ** पास झाला असेल, तर फाइलचा कोड लोड केला जातो आणि नंतर CSS वर संकलित केला जातो, वरीलप्रमाणे ऑब्जेक्ट परत करतो.

**डिरेक्टरी पाथ** पास केल्यास, SCSS फायली शोधल्या जातात (पुन्हा डीफॉल्टनुसार), प्रत्येकाचा कोड लोड केला जातो आणि संकलित केला जातो, त्यानंतर `srcPath` + `code` + `srcMap` + `error` समाविष्ट असलेल्या ऑब्जेक्ट्सचा ॲरे दिला जातो:

```js
// वर्किंग डिरेक्टरी + सर्व नेस्टेड डिरेक्टरीमध्ये SCSS फाइल्सचे मार्ग आउटपुट करते
const compileResults = scssToCSS.compile('.');
compileResults.forEach(result => console.log(result.srcPath));

// आढळल्यास दुसऱ्या SCSS फाईलमधून CSS संकलित केलेले आउटपुट, किंवा न आढळल्यास `undefined`
console.log(compileResults[1].code);
```

पर्याय बुलियन आहेत, ऑब्जेक्ट गुणधर्म म्हणून पास केले जातात. उदाहरणार्थ:

```js
// डेटा ऑब्जेक्ट्सचा ॲरे देते जेथे `.code` मध्ये अनमिनिफाइड CSS आहे
scssToCSS.compile(inputDir, { minify: false });
```

उपलब्ध पॅरामीटर्स (आणि त्यांची डीफॉल्ट सेटिंग्ज) आहेत:

नाव           | प्रकार  | वर्णन                                                                     | डीफॉल्ट मूल्य
--------------|-------|-------------------------------------------------------------------------|------------
`recursive`   | बुलियन | डिरेक्टरी मार्ग पास झाल्यास नेस्टेड फाइल्ससाठी वारंवार शोधा.                         | `true`
`verbose`     | बुलियन | कन्सोल/टर्मिनलमध्ये लॉग इन दाखवा.                                            | `true`
`dotFolders`  | बुलियन | फाइल शोधात डॉटफोल्डर समाविष्ट करा.                                          | `false`
`minify`      | बुलियन | आउटपुट CSS कमी करा.                                                     | `true`
`sourceMaps`  | बुलियन | CSS स्त्रोत नकाशे व्युत्पन्न करा.                                                 | `true`
`ignoreFiles` | रचना  | फाइल्स (नावानुसार) संकलनातून वगळण्यासाठी.                                     | `[]`
`comment`     | स्ट्रिंग  | संकलित CSS वर प्रीपेंड करण्यासाठी शीर्षलेख टिप्पणी. '\n' वापरून ओळीनुसार विभक्त करा. | `''`

#

### `findSCSS(searchDir[, options])`

💡 पास केलेल्या `searchDir` स्ट्रिंगमधील सर्व SCSS फायली शोधते (कोणत्या फायली [`compile()`](#compileinput-options) प्रक्रिया करतील हे शोधण्यासाठी उपयुक्त) आणि त्यांचे फाइलपाथ असलेले ॲरे परत करते.

पर्याय बुलियन आहेत, ऑब्जेक्ट गुणधर्म म्हणून पास केले जातात. उदाहरणार्थ:

```js
// SCSS फाईल्स नक्की assets/scss मध्ये शोधा
const searchResults = scssToCSS.findSCSS('assets/scss', { recursive: false });
console.log(searchResults);

/* नमुना आउटपुट:

findSCSS() » Searching for SCSS files...
findSCSS() » Search complete! 2 files found.
findSCSS() » Check returned array.
[
  'E:\\js\\utils\\scss-to-css\assets\\scss\\foo.scss',
  'E:\\js\\utils\\scss-to-css\assets\\scss\\bar.scss'
]
*/
```

उपलब्ध पॅरामीटर्स (आणि त्यांची डीफॉल्ट सेटिंग्ज) आहेत:

नाव           | प्रकार  | वर्णन                                           | डीफॉल्ट मूल्य
--------------|-------|-----------------------------------------------|------------
`recursive`   | बुलियन | searchDir पास केलेल्या नेस्टेड फाइल्ससाठी वारंवार शोधा. | `true`
`verbose`     | बुलियन | कन्सोल/टर्मिनलमध्ये लॉग इन दाखवा.                  | `true`
`dotFolders`  | बुलियन | फाइल शोधात डॉटफोल्डर समाविष्ट करा.                | `false`
`ignoreFiles` | रचना  | शोध परिणामांमधून वगळण्यासाठी फाइल्स (नावानुसार).     | `[]`

<br>

<img height=6px width="100%" src="https://assets.scsstocss.org/images/separators/aqua-gradient.png?v=7e4a141">

## 🏛️ MIT परवाना

**कॉपीराइट © 2024 [Adam Lui](https://github.com/adamlui) आणि योगदानकर्ते**

या सॉफ्टवेअरची आणि संबंधित दस्तऐवज फाइल्स ("सॉफ्टवेअर") ची प्रत मिळवणाऱ्या कोणत्याही व्यक्तीला, वापर, कॉपी, सुधारणे, विलीन करण्याच्या अधिकारांसह मर्यादेशिवाय सॉफ्टवेअरमध्ये व्यवहार करण्यासाठी, याद्वारे परवानगी देण्यात आली आहे. , सॉफ्टवेअरच्या प्रती प्रकाशित करणे, वितरित करणे, उपपरवाना देणे आणि/किंवा विक्री करणे आणि ज्यांना सॉफ्टवेअर दिलेले आहे अशा व्यक्तींना असे करण्यास परवानगी देणे, खालील अटींच्या अधीन राहून:

उपरोक्त कॉपीराइट सूचना आणि ही परवानगी सूचना सॉफ्टवेअरच्या सर्व प्रती किंवा महत्त्वपूर्ण भागांमध्ये समाविष्ट केली जाईल.

सॉफ्टवेअर "जसे आहे तसे" प्रदान केले जाते, कोणत्याही प्रकारच्या हमीशिवाय, व्यक्त किंवा निहित, ज्यामध्ये व्यापारक्षमता, विशिष्ट हेतूसाठी योग्यतेच्या हमींचा समावेश आहे, परंतु ते मर्यादित नाही. कोणत्याही परिस्थितीत लेखक किंवा कॉपीराइट धारक कोणत्याही दाव्यासाठी, नुकसानीसाठी किंवा इतर उत्तरदायित्वासाठी जबाबदार असणार नाहीत, मग तो कराराच्या कृतीत, छेडछाड किंवा अन्यथा, नंतरपासून, आमच्याकडून उद्भवलेल्या मध्ये इतर व्यवहार सॉफ्टवेअर.

<br>

<img height=6px width="100%" src="https://assets.scsstocss.org/images/separators/aqua-gradient.png?v=7e4a141">

## 🛠️ संबंधित उपयुक्तता

### [🖼️ img-to-webp](https://imgtowebp.org)

> सर्व प्रतिमा WEBP वर वारंवार संकुचित करा.
<br>[डाउनलोड करा](https://cdn.jsdelivr.net/gh/adamlui/js-utils/img-to-webp/img-to-webp.js) /
[चर्चा करा](https://github.js-utils.org/discussions)

### [</> minify.js](https://minify-js.org) &nbsp;<a href="https://github.com/toolleeo/cli-apps#programming"><img height=18 src="https://assets.scsstocss.org/images/badges/awesome/badge.svg?v=7e4a141"></a>

> सर्व JavaScript फायली आवर्तीपणे लहान करा.
<br>[स्थापित करा](https://minify-js.org/docs/mr#-%E0%A4%B8%E0%A5%8D%E0%A4%A5%E0%A4%BE%E0%A4%AA%E0%A4%A8%E0%A4%BE) /
[मला वाचा](https://minify-js.org/docs/mr#readme) /
[CLI वापर](https://minify-js.org/docs/mr#-%E0%A4%95%E0%A4%AE%E0%A4%BE%E0%A4%82%E0%A4%A1-%E0%A4%B2%E0%A4%BE%E0%A4%87%E0%A4%A8-%E0%A4%B5%E0%A4%BE%E0%A4%AA%E0%A4%B0) /
[API वापर](https://minify-js.org/docs/mr#-api-%E0%A4%B5%E0%A4%BE%E0%A4%AA%E0%A4%B0) /
[चर्चा करा](https://github.js-utils.org/discussions)

<br>

<img height=6px width="100%" src="https://assets.scsstocss.org/images/separators/aqua-gradient.png?v=7e4a141">

<picture><source media="(prefers-color-scheme: dark)" srcset="https://assets.scsstocss.org/images/icons/home/white/icon32x27.png?v=7e4a141"><img height=13 src="https://assets.scsstocss.org/images/icons/home/dark-gray/icon32x27.png?v=7e4a141"></picture> <a href="https://js-utils.org">**अधिक JavaScript उपयुक्तता**</a> /
<a href="https://github.scsstocss.org/discussions">चर्चा करा</a> /
<a href="#--scss-to-css">परत वर जा ↑</a>
