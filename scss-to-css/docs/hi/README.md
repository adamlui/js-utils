<a id="top"></a>

<div align="center">
    <h6>
        <picture>
            <source type="image/svg+xml" media="(prefers-color-scheme: dark)" srcset="https://assets.scsstocss.org/images/icons/earth/white/icon32.svg?v=7e4a141">
            <img height=14 src="https://assets.scsstocss.org/images/icons/earth/black/icon32.svg?v=7e4a141">
        </picture>
        &nbsp;हिंदी |
        <a href="../..#readme">English</a> |
        <a href="../zh-cn/#readme">简体中文</a> |
        <a href="../zh-tw/#readme">繁體中文</a> |
        <a href="../ja/#readme">日本語</a> |
        <a href="../bn/#readme">বাংলা</a> |
        <a href="../mr/#readme">मराठी</a> |
        <a href="../pa/#readme">ਪੰਜਾਬੀ</a> |
        <a href="../de/#readme">Deutsch</a> |
        <a href="../es/#readme">Español</a> |
        <a href="../fr/#readme">Français</a> |
        <a href="../it/#readme">Italiano</a> |
        <a href="../nl/#readme">Nederlands</a> |
        <a href="../pt/#readme">Português</a>
    </h6>
</div>

# { } scss-to-css

### सभी SCSS फ़ाइलों को पुनरावर्ती रूप से लघु CSS में संकलित करें।

<a href="https://npmstar.com/compare/@adamlui%2Fscss-to-css">
    <img height=31 src="https://img.shields.io/npm/dm/%40adamlui%2Fscss-to-css?logo=npm&color=af68ff&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="#%EF%B8%8F-mit-%E0%A4%B2%E0%A4%BE%E0%A4%87%E0%A4%B8%E0%A5%87%E0%A4%82%E0%A4%B8">
    <img height=31 src="https://img.shields.io/badge/License-MIT-orange.svg?logo=internetarchive&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://github.com/adamlui/js-utils/releases/tag/scss-to-css-2.4.1">
    <img height=31 src="https://img.shields.io/badge/Latest_Build-2.4.1-44cc11.svg?logo=icinga&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://www.npmjs.com/package/@adamlui/scss-to-css?activeTab=code">
    <img height=31 src="https://img.shields.io/npm/unpacked-size/%40adamlui%2Fscss-to-css?style=for-the-badge&logo=ebox&logoColor=white&color=blue&labelColor=464646"></a>
<a href="https://sonarcloud.io/component_measures?metric=vulnerabilities&selected=adamlui_js-utils%3Ascss-to-css&id=adamlui_js-utils">
    <img height=31 src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fsonarcloud.io%2Fapi%2Fmeasures%2Fcomponent%3Fcomponent%3Dadamlui_scss-to-css%3Asrc%2Fscss-to-css.js%26metricKeys%3Dvulnerabilities&query=%24.component.measures.0.value&style=for-the-badge&logo=sonar&logoColor=white&labelColor=464646&label=Vulnerabilities&color=gold"></a>
<a href="https://github.com/toolleeo/cli-apps/#conversion">
    <img height=31 src="https://img.shields.io/badge/Mentioned_in-Awesome-ff69b4?logo=awesomelists&logoColor=white&labelColor=464646&style=for-the-badge"></a>

<img height=6px width="100%" src="https://assets.scsstocss.org/images/separators/aqua-gradient.png?v=7e4a141">

## ⚡ इंस्टालेशन

**वैश्विक उपयोगिता** के रूप में:

```
$ npm install -g @adamlui/scss-to-css
```

**डेव निर्भरता** के रूप में (उदाहरण के लिए बिल्ड स्क्रिप्ट के लिए), आपके प्रोजेक्ट रूट से:

```
$ npm install -D @adamlui/scss-to-css
```

**रनटाइम निर्भरता** के रूप में (उदाहरण के लिए ऑन-द-फ्लाई संकलन के लिए), आपके प्रोजेक्ट रूट से:

```
$ npm install @adamlui/scss-to-css
```

<br>

<a href="https://github.com/sponsors/adamlui"><img src="https://assets.scsstocss.org/images/banners/sponsor/$10/banner1660x260.png?v=f3129dd"></a>

<img height=6px width="100%" src="https://assets.scsstocss.org/images/separators/aqua-gradient.png?v=7e4a141">

## 💻 कमांड लाइन उपयोग

मूल **वैश्विक कमांड** है:

```
$ scss-to-css
```

नमूना आउटपुट:

<img src="https://cdn.jsdelivr.net/gh/adamlui/scss-to-css@fe2867e/assets/images/screenshots/cli/scss-to-css-docs-cmd-output.png">

**📝 नोट:** स्रोत मानचित्र भी डिफ़ॉल्ट रूप से उत्पन्न होते हैं जब तक कि `-S` या `--no-source-maps` पारित नहीं हो जाता।

#

**इनपुट/आउटपुट** पथ निर्दिष्ट करने के लिए:
   
```
$ scss-to-css [input_path] [output_path]
```

- `[input_path]`: वर्तमान कार्यशील निर्देशिका के सापेक्ष संकलित की जाने वाली एससीएसएस फ़ाइल या एससीएसएस फ़ाइलों वाली निर्देशिका का पथ।
- `[output_path]`: फ़ाइल या डायरेक्टरी का पाथ जहाँ CSS + सोर्स मैप फ़ाइलें स्टोर की जाएंगी, जो इनपुट रूट के हिसाब से होगा (अगर नहीं दिया गया है, तो `css/` इस्तेमाल किया जाएगा)।

**📝 नोट:** यदि फ़ोल्डर्स पास हो गए हैं, तो फ़ाइलों को पुनरावर्ती रूप से संसाधित किया जाएगा जब तक कि `-R` या `-no-recursion` पास न हो जाए।

#

अपने प्रोजेक्ट के `package.json` में **पैकेज स्क्रिप्ट** के रूप में उपयोग करने के लिए:

```json
  "scripts": {
    "build:css": "<scss-to-css-cmd>"
  },
```

`<scss-to-css-cmd>` को `scss-to-css` + वैकल्पिक पैरामीटर से बदलें। फिर, कमांड चलाने के लिए `npm run build:css` का उपयोग किया जा सकता है।

#

### उदाहरण आदेश

**वर्तमान निर्देशिका** में सभी SCSS फ़ाइलें संकलित करें (`css/` पर आउटपुट):

```
$ scss-to-css
```

सभी SCSS फ़ाइलों को एक **विशिष्ट निर्देशिका** में संकलित करें (`css/path/to/your/directory/` पर आउटपुट):

```
$ scss-to-css path/to/your/directory
```

एक **विशिष्ट फ़ाइल** संकलित करें (`css/path/to/your/file.min.css` पर आउटपुट):

```
$ scss-to-css path/to/your/file.scss
```

**इनपुट और आउटपुट** दोनों निर्देशिकाएं निर्दिष्ट करें (आउटपुट `output_folder/` पर):
```
$ scss-to-css input_folder output_folder
```

**📝 नोट:** आउटपुट CSS को तब तक छोटा किया जाता है जब तक `-M` या `--no-minify` पारित नहीं किया जाता है।

#

### कमांड लाइन विकल्प

```
बूलियन विकल्प:
 -n, --dry-run                            वास्तव में फ़ाइल(फ़ाइलों) को संकलित न करें, केवल यह दिखाएँ कि क्या उन्हें संसाधित किया जाएगा।
 -d, --include-dotfolders                 फ़ाइल खोज में डॉटफ़ोल्डर शामिल करें।
 -S, --no-source-maps                     स्रोत मानचित्रों को उत्पन्न होने से रोकें।
 -M, --no-minify                          आउटपुट CSS का लघुकरण अक्षम करें।
 -R, --no-recursion                       पुनरावर्ती फ़ाइल खोज अक्षम करें।
 -r, --relative-output                    इनपुट रूट के बजाय हर सोर्स फ़ाइल के हिसाब से आउटपुट फ़ाइलें।
 -c, --copy                               यदि एकल स्रोत फ़ाइल संसाधित होती है तो फ़ाइल में लिखने के बजाय संकलित CSS को क्लिपबोर्ड पर कॉपी करें।
 -q, --quiet                              त्रुटियों को छोड़कर सभी लॉगिंग को रोकें।

पैरामीटर विकल्प:
 --ignores="dir/,file1.scss,file2.sass"   कंपाइलेशन से बाहर रखे जाने वाली फ़ाइलें/डायरेक्टरी।
 --comment="comment"                      संकलित CSS में हेडर टिप्पणी जोड़ें। '\n' का उपयोग करके लाइन से अलग करें।
 --ui-lang="code"                         UI दिखाने के लिए भाषा का ISO 639-1 कोड।
 --config="path/to/file"                  कस्टम कॉन्फ़िग फ़ाइल लोड करें।

कमांड:
 -i, --init                               कॉन्फ़िग फ़ाइल बनाएं (प्रोजेक्ट रूट में)।
 -h, --help                               सहायता स्क्रीन प्रदर्शित करें।
 -v, --version                            संस्करण संख्या दिखाएँ।
     --stats                              npm स्टैट्स दिखाएँ।
     --debug [targetKey]                  डीबग लॉग दिखाएँ।
```

#

### कॉन्फ़िगरेशन फ़ाइल

**scss-to-css** को आपके प्रोजेक्ट रूट में रखी `scss-to-css.config.mjs` या `scss-to-css.config.js` का इस्तेमाल करके कस्टमाइज़ किया जा सकता है।

उदाहरण डिफ़ॉल्ट:

```js
export default {
    dryRun: false,            // फ़ाइल(फ़ाइलों) को असल में छोटा न करें, बस दिखाएँ कि उन्हें प्रोसेस किया जाएगा या नहीं
    includeDotFolders: false, // फ़ाइल सर्च में डॉटफ़ोल्डर शामिल करें
    noSourceMaps: false,      // सोर्स मैप बनने से रोकें
    noMinify: false,          // आउटपुट CSS का मिनिफिकेशन डिसेबल करें
    noRecursion: false,       // रिकर्सिव फ़ाइल सर्चिंग डिसेबल करें
    relativeOutput: false,    // इनपुट रूट के बजाय हर src फ़ाइल के हिसाब से आउटपुट फ़ाइलें बनाएँ
    copy: false,              // अगर एक फ़ाइल प्रोसेस हुई है, तो कंपाइल किए गए CSS को फ़ाइल में लिखने के बजाय क्लिपबोर्ड पर कॉपी करें
    quietMode: false,         // एरर को छोड़कर सभी लॉगिंग को बंद करें
    ignores: '',              // मिनिफिकेशन से बाहर रखने के लिए फ़ाइलें/डायरेक्टरी
    comment: ''               // मिनिफाइड कोड में जोड़ने के लिए हेडर कमेंट
}
```

💡 अपने प्रोजेक्ट रूट में एक टेम्प्लेट `scss-to-css.config.mjs` जेनरेट करने के लिए `scss-to-css init` चलाएँ।

<br>

<img height=6px width="100%" src="https://assets.scsstocss.org/images/separators/aqua-gradient.png?v=7e4a141">

## 🔌 API उपयोग

आप इसके एपीआई तरीकों का उपयोग करने के लिए अपने ऐप में **scss-to-css** भी आयात कर सकते हैं, ECMAScript मॉड्यूल या CommonJS मॉड्यूल दोनों के रूप में।

#### ECMAScript*:

```js
import scssToCSS from '@adamlui/scss-to-css'
```

#### CJS:

```js
const scssToCSS = require('@adamlui/scss-to-css')
```

###### _*Node.js संस्करण 14 या उच्चतर आवश्यक_

#

### `compile(input[, options])`

💡 आपूर्ति किए गए स्ट्रिंग इनपुट के आधार पर एससीएसएस संकलित करता है।

यदि **स्रोत कोड** पारित हो जाता है, तो इसे सीधे संकलित किया जाता है, फिर `srcPath` + `code` + `srcMap` + `error` वाला एक ऑब्जेक्ट वापस कर दिया जाता है:

```js
const srcCode = 'h1 { font-size: 40px ; code { font-face: Roboto Mono }}',
      compileResult = scssToCSS.compile(srcCode)

console.log(compileResult.error) // यदि कोई त्रुटि नहीं है तो रनटाइम त्रुटि, या `undefined` आउटपुट करता है
console.log(compileResult.code)  // आउटपुट छोटा सीएसएस: 'h1{font-size:40px}h1 code{font-face:Roboto Mono}'
```

यदि **फ़ाइल पथ** पारित हो जाता है, तो फ़ाइल का कोड लोड किया जाता है और फिर सीएसएस में संकलित किया जाता है, जो उपरोक्त जैसा एक ऑब्जेक्ट लौटाता है।

यदि एक **निर्देशिका पथ** पारित किया जाता है, तो SCSS फ़ाइलें खोजी जाती हैं (डिफ़ॉल्ट रूप से पुनरावर्ती), प्रत्येक का कोड लोड किया जाता है और फिर संकलित किया जाता है, फिर `srcPath` + `code` + `srcMap` + `error` युक्त ऑब्जेक्ट की एक सरणी वापस की जाती है:

```js
// कार्यशील निर्देशिका + सभी नेस्टेड निर्देशिकाओं में SCSS फ़ाइलों के लिए आउटपुट पथ
const compileResults = scssToCSS.compile('.')
compileResults.forEach(result => console.log(result.srcPath))

// यदि पाया जाता है तो दूसरी SCSS फ़ाइल से आउटपुट संकलित CSS, या नहीं मिलने पर `undefined`
console.log(compileResults[1].code)
```

विकल्प बूलियन हैं, ऑब्जेक्ट गुणों के रूप में पारित किए गए हैं। उदाहरण के लिए:

```js
// डेटा ऑब्जेक्ट की सरणी लौटाता है जहां `.code` में अनमिनिफाइड CSS होता है
scssToCSS.compile(inputDir, { minify: false })
```

उपलब्ध पैरामीटर (और उनकी डिफ़ॉल्ट सेटिंग्स) हैं:

नाम              | प्रकार  | विवरण                                                                      | डिफ़ॉल्ट मान
-----------------|-------|----------------------------------------------------------------------------|------------
`recursive`      | बूलियन | यदि निर्देशिका पथ पारित हो गया है तो नेस्टेड फ़ाइलों को पुनरावर्ती रूप से खोजें।            | `true`
`verbose`        | बूलियन | कंसोल/टर्मिनल में लॉगिंग दिखाएँ।                                                  | `true`
`dotFolders`     | बूलियन | फ़ाइल खोज में डॉटफ़ोल्डर शामिल करें।                                             | `false`
`minify`         | बूलियन | आउटपुट CSS को छोटा करें।                                                     | `true`
`sourceMaps`     | बूलियन | CSS स्रोत मानचित्र तैयार करें।                                                     | `true`
`relativeOutput` | बूलियन | इनपुट रूट के बजाय हर सोर्स फ़ाइल के हिसाब से आउटपुट फ़ाइलें।                       | `false`
`ignores`        | सरणी  | कंपाइलेशन से बाहर रखे जाने वाली फ़ाइलें/डायरेक्टरी।                                  | `[]`
`comment`        | स्ट्रिंग   | संकलित CSS से जोड़ने के लिए हेडर टिप्पणी। '\n' का उपयोग करके लाइन से अलग करें।     | `''`

#

### `findSCSS(searchDir[, options])`

💡 पारित `searchDir` स्ट्रिंग के भीतर सभी SCSS फ़ाइलों की खोज करता है (यह पता लगाने के लिए उपयोगी है कि कौन सी फ़ाइलें [`compile()`](#compileinput-options) संसाधित होंगी) और उनके फ़ाइलपथ वाली एक सरणी लौटाता है।

विकल्प बूलियन हैं, ऑब्जेक्ट गुणों के रूप में पारित किए गए हैं। उदाहरण के लिए:

```js
// SCSS फ़ाइलों को बिल्कुल assets/scss में खोजें
const searchResults = scssToCSS.findSCSS('assets/scss', { recursive: false })
console.log(searchResults)

/* नमूना आउटपुट:

findSCSS() » Searching for SCSS files...
findSCSS() » Search complete! 2 files found.
findSCSS() » Check returned array.
[
  'E:\\js\\utils\\scss-to-css\assets\\scss\\foo.scss',
  'E:\\js\\utils\\scss-to-css\assets\\scss\\bar.sass'
]
*/
```

उपलब्ध पैरामीटर (और उनकी डिफ़ॉल्ट सेटिंग्स) हैं:

नाम           | प्रकार  | विवरण                                        | डिफ़ॉल्ट मान
--------------|-------|----------------------------------------------|------------
`recursive`   | बूलियन | searchDir में नेस्टेड फ़ाइलों को पुनरावर्ती रूप से खोजें। | `true`
`verbose`     | बूलियन | कंसोल/टर्मिनल में लॉगिंग दिखाएँ।                    | `true`
`dotFolders`  | बूलियन | फ़ाइल खोज में डॉटफ़ोल्डर शामिल करें।               | `false`
`ignores`     | सरणी  | सर्च रिज़ल्ट से बाहर रखे जाने वाली फ़ाइलें/डायरेक्टरी।    | `[]`

<br>

<img height=6px width="100%" src="https://assets.scsstocss.org/images/separators/aqua-gradient.png?v=7e4a141">

## 🏛️ MIT लाइसेंस

**कॉपीराइट © 2024 [एडम लुई (Adam Lui)](https://github.com/adamlui) और योगदानकर्ता**

इसके द्वारा प्रति प्राप्त करने वाले किसी भी व्यक्ति को अनुमति निःशुल्क प्रदान की जाती है इस सॉफ़्टवेयर और संबंधित दस्तावेज़ फ़ाइलों ("सॉफ़्टवेयर") से निपटने के लिए सॉफ़्टवेयर में बिना किसी प्रतिबंध के, जिसमें बिना किसी सीमा के अधिकार शामिल हैं उपयोग करना, प्रतिलिपि बनाना, संशोधित करना, विलय करना, प्रकाशित करना, वितरित करना, उपलाइसेंस देना और/या बेचना सॉफ़्टवेयर की प्रतियां, और उन व्यक्तियों को अनुमति देना जिनके पास सॉफ़्टवेयर है निम्नलिखित शर्तों के अधीन, ऐसा करने के लिए सुसज्जित:

उपरोक्त कॉपीराइट नोटिस और यह अनुमति नोटिस सभी में शामिल होंगे सॉफ़्टवेयर की प्रतियां या पर्याप्त भाग।

सॉफ़्टवेयर "जैसा है" प्रदान किया जाता है, बिना किसी प्रकार की, स्पष्ट या वारंटी के। निहित, व्यापारिकता की वारंटी सहित, लेकिन इन्हीं तक सीमित नहीं, किसी विशेष उद्देश्य के लिए उपयुक्तता और उल्लंघन न होना। किसी भी स्थिति में ऐसा नहीं होगा लेखक या कॉपीराइट धारक किसी भी दावे, क्षति या अन्य के लिए उत्तरदायी होंगे दायित्व, चाहे किसी अनुबंध, अपकृत्य या किसी अन्य प्रकार से उत्पन्न हो, सॉफ़्टवेयर से बाहर या उसके संबंध में या उपयोग या अन्य लेनदेन में सॉफ़्टवेयर।

<br>

<img height=6px width="100%" src="https://assets.scsstocss.org/images/separators/aqua-gradient.png?v=7e4a141">

## 🛠️ संबंधित उपयोगिताएँ

### [</> minify.js](https://minify-js.org) &nbsp;<a href="https://github.com/toolleeo/cli-apps/#programming"><img height=18 src="https://assets.scsstocss.org/images/badges/awesome/badge.svg?v=7e4a141"></a>

> सभी जावास्क्रिप्ट फ़ाइलों को पुनरावर्ती रूप से छोटा करें।
<br>[स्थापित करना](https://minify-js.org/docs/hi#-%E0%A4%87%E0%A4%82%E0%A4%B8%E0%A5%8D%E0%A4%9F%E0%A4%BE%E0%A4%B2%E0%A5%87%E0%A4%B6%E0%A4%A8) /
[रीडमी](https://minify-js.org/docs/hi/#readme) /
[सीएलआई उपयोग](https://minify-js.org/docs/hi#-%E0%A4%95%E0%A4%AE%E0%A4%BE%E0%A4%82%E0%A4%A1-%E0%A4%B2%E0%A4%BE%E0%A4%87%E0%A4%A8-%E0%A4%89%E0%A4%AA%E0%A4%AF%E0%A5%8B%E0%A4%97) /
[एपीआई उपयोग](https://minify-js.org/docs/hi#-api-%E0%A4%89%E0%A4%AA%E0%A4%AF%E0%A5%8B%E0%A4%97) /
[चर्चा करना](https://github.com/adamlui/minify.js/discussions)

<br>

<img height=6px width="100%" src="https://assets.scsstocss.org/images/separators/aqua-gradient.png?v=7e4a141">

<picture><source media="(prefers-color-scheme: dark)" srcset="https://assets.scsstocss.org/images/icons/home/white/icon32x27.png?v=7e4a141"><img height=13 src="https://assets.scsstocss.org/images/icons/home/dark-gray/icon32x27.png?v=7e4a141"></picture> <a href="https://github.com/adamlui/js-utils/#readme">**अधिक जावास्क्रिप्ट उपयोगिताएँ**</a> /
<a href="https://github.com/adamlui/scss-to-css/discussions">चर्चा करना</a> /
<a href="#top">वापस शीर्ष पर ↑</a>
