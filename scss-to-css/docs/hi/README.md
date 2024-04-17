<div align="center">
    <h6>
        <picture>
            <source type="image/svg+xml" media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/earth-icon/white/icon32.svg">
            <img height=14 src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/earth-icon/black/icon32.svg">
        </picture>
        &nbsp;हिंदी |
        <a href="../..#readme">English</a> |
        <a href="../zh-cn#readme">简体中文</a> |
        <a href="../zh-tw#readme">繁體中文</a> |
        <a href="../ja#readme">日本語</a> |
        <a href="../bn#readme">বাংলা</a> |
        <a href="../mr#readme">मराठी</a> |
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

### सभी SCSS फ़ाइलों को पुनरावर्ती रूप से लघु CSS में संकलित करें।

<a href="https://www.npmjs.com/package/@adamlui/scss-to-css"><img height=31 src="https://img.shields.io/npm/dm/%40adamlui%2Fscss-to-css?logo=npm&color=af68ff&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="#%EF%B8%8F-mit-%E0%A4%B2%E0%A4%BE%E0%A4%87%E0%A4%B8%E0%A5%87%E0%A4%82%E0%A4%B8"><img height=31 src="https://img.shields.io/badge/License-MIT-orange.svg?logo=internetarchive&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://github.com/adamlui/js-utils/releases/tag/scss-to-css-1.7.14"><img height=31 src="https://img.shields.io/badge/Latest_Build-1.7.14-44cc11.svg?logo=icinga&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://www.npmjs.com/package/@adamlui/scss-to-css?activeTab=code"><img height=31 src="https://img.shields.io/npm/unpacked-size/%40adamlui%2Fscss-to-css?style=for-the-badge&logo=ebox&logoColor=white&color=blue&labelColor=464646"></a>
<a href="https://sonarcloud.io/component_measures?metric=new_vulnerabilities&id=adamlui_js-utils:scss-to-css/src/scss-to-css.js"><img height=31 src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fsonarcloud.io%2Fapi%2Fmeasures%2Fcomponent%3Fcomponent%3Dadamlui_js-utils%3Ascss-to-css%2Fsrc%2Fscss-to-css.js%26metricKeys%3Dvulnerabilities&query=%24.component.measures.0.value&style=for-the-badge&logo=sonarcloud&logoColor=white&labelColor=464646&label=Vulnerabilities&color=gold"></a>
<a href="https://github.com/toolleeo/cli-apps#conversion"><img height=31 src="https://img.shields.io/badge/Mentioned_in-Awesome-c4a2bd?logo=awesomelists&logoColor=white&labelColor=464646&style=for-the-badge"></a>

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

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

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

## 💻 कमांड लाइन उपयोग

मूल **वैश्विक कमांड** है:

```
$ scss-to-css
```

नमूना आउटपुट:

<img src="https://github.com/adamlui/js-utils/blob/main/scss-to-css/media/images/sample-output.png">

**💡 नोट:** स्रोत मानचित्र भी डिफ़ॉल्ट रूप से उत्पन्न होते हैं जब तक कि `-S` या `--no-source-maps` पारित नहीं हो जाता।

#

**इनपुट/आउटपुट** पथ निर्दिष्ट करने के लिए:
   
```
$ scss-to-css [input_path] [output_path]
```

- `[input_path]`: वर्तमान कार्यशील निर्देशिका के सापेक्ष संकलित की जाने वाली एससीएसएस फ़ाइल या एससीएसएस फ़ाइलों वाली निर्देशिका का पथ।
- `[output_path]`: फ़ाइल या निर्देशिका का पथ जहां CSS + स्रोत मानचित्र फ़ाइलें संग्रहीत की जाएंगी, मूल फ़ाइल स्थान के सापेक्ष (यदि प्रदान नहीं किया गया है, तो `css/` का उपयोग किया जाता है)।

**💡 नोट:** यदि फ़ोल्डर्स पास हो गए हैं, तो फ़ाइलों को पुनरावर्ती रूप से संसाधित किया जाएगा जब तक कि `-R` या `-no-recursion` पास न हो जाए।

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

सभी SCSS फ़ाइलों को एक **विशिष्ट निर्देशिका** में संकलित करें (`path/to/your/directory/css/` पर आउटपुट):

```
$ scss-to-css path/to/your/directory
```

एक **विशिष्ट फ़ाइल** संकलित करें (`path/to/your/css/file.min.css` पर आउटपुट):

```
$ scss-to-css path/to/your/file.scss
```

**इनपुट और आउटपुट** दोनों निर्देशिकाएं निर्दिष्ट करें (आउटपुट `output_folder/` पर):
```
$ scss-to-css input_folder output_folder
```

**💡 नोट:** आउटपुट CSS को तब तक छोटा किया जाता है जब तक `-M` या `--no-minify` पारित नहीं किया जाता है।

#

### कमांड लाइन विकल्प

```
कॉन्फ़िगरेशन विकल्प:
 -n, --dry-run               वास्तव में फ़ाइल(फ़ाइलों) को संकलित न करें, केवल यह दिखाएँ कि क्या उन्हें संसाधित किया जाएगा।
 -d, --include-dotfolders    फ़ाइल खोज में डॉटफ़ोल्डर शामिल करें।
 -S, --no-source-maps        स्रोत मानचित्रों को उत्पन्न होने से रोकें।
 -M, --no-minify             आउटपुट CSS का लघुकरण अक्षम करें।
 -R, --no-recursion          पुनरावर्ती फ़ाइल खोज अक्षम करें।
 -q, --quiet                 त्रुटियों को छोड़कर सभी लॉगिंग को रोकें।

जानकारी आदेश:
 -h, --help                  सहायता स्क्रीन प्रदर्शित करें।
 -v, --version               संस्करण संख्या दिखाएँ।
```

<br>

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

## 🔌 API उपयोग

आप इसके एपीआई तरीकों का उपयोग करने के लिए अपने ऐप में **scss-to-css** भी आयात कर सकते हैं, ECMAScript मॉड्यूल या CommonJS मॉड्यूल दोनों के रूप में।

#### ECMAScript*:

```js
import * as scssToCSS from '@adamlui/scss-to-css';
```

#### CJS:

```js
const scssToCSS = require('@adamlui/scss-to-css');
```

###### _*Node.js संस्करण 14 या उच्चतर आवश्यक_

#

### `compile(inputPath[, options])`

CSS डेटा में प्रदान किए गए `inputPath` में पाए गए SCSS को संकलित करता है।

यदि एक **फ़ाइल पथ** पास हो जाता है, तो फ़ाइल का कोड CSS पर संकलित किया जाता है, फिर `srcPath` + `code` + `error` वाला एक ऑब्जेक्ट लौटाया जाता है:

```js
const compileResult = scssToCSS.compile('assets/style.scss');

console.log(compileResult.error); // यदि कोई त्रुटि नहीं है तो रनटाइम त्रुटि, या `undefined` आउटपुट करता है
console.log(compileResult.code);  // assets/style.css से संकलित CSS को आउटपुट करता है
```

यदि एक **निर्देशिका पथ** पारित किया जाता है, तो SCSS फ़ाइलें खोजी जाती हैं (डिफ़ॉल्ट रूप से पुनरावर्ती), प्रत्येक का कोड लोड किया जाता है और फिर संकलित किया जाता है, फिर `srcPath` + `code` + `error` युक्त ऑब्जेक्ट की एक सरणी वापस की जाती है:

```js
// कार्यशील निर्देशिका + सभी नेस्टेड निर्देशिकाओं में SCSS फ़ाइलों के लिए आउटपुट पथ
const compileResults = scssToCSS.compile('.');
compileResults.forEach(result => console.log(result.srcPath));

// यदि पाया जाता है तो दूसरी SCSS फ़ाइल से आउटपुट संकलित CSS, या नहीं मिलने पर `undefined`
console.log(compileResults[1].code);
```

विकल्प बूलियन हैं, ऑब्जेक्ट गुणों के रूप में पारित किए गए हैं। उदाहरण के लिए:

```js
// डेटा ऑब्जेक्ट की सरणी लौटाता है जहां `.code` में अनमिनिफाइड CSS होता है
scssToCSS.compile(inputDir, { minify: false });
```

उपलब्ध पैरामीटर (और उनकी डिफ़ॉल्ट सेटिंग्स) हैं:

नाम          | विवरण                                                           | डिफ़ॉल्ट मान
-------------|-----------------------------------------------------------------|------------
`recursive`  | यदि निर्देशिका पथ पारित हो गया है तो नेस्टेड फ़ाइलों को पुनरावर्ती रूप से खोजें। | `true`
`verbose`    | कंसोल/टर्मिनल में लॉगिंग दिखाएँ।                                       | `true`
`dotFolders` | फ़ाइल खोज में डॉटफ़ोल्डर शामिल करें।                                  | `false`
`minify`     | आउटपुट CSS को छोटा करें।                                          | `true`
`sourceMaps` | CSS स्रोत मानचित्र तैयार करें।                                          | `true`

#

### `findSCSS(searchDir[, options])`

पारित `searchDir` स्ट्रिंग के भीतर सभी SCSS फ़ाइलों की खोज करता है (यह पता लगाने के लिए उपयोगी है कि कौन सी फ़ाइलें [`compile()`](#compileinputpath-options) संसाधित होंगी) और उनके फ़ाइलपथ वाली एक सरणी लौटाता है।

विकल्प बूलियन हैं, ऑब्जेक्ट गुणों के रूप में पारित किए गए हैं। उदाहरण के लिए:

```js
// SCSS फ़ाइलों को बिल्कुल assets/scss में खोजें:
const searchResults = scssToCSS.findSCSS('assets/scss', { recursive: false });
console.log(searchResults);

/* नमूना आउटपुट:

findSCSS() » Searching for SCSS files...
findSCSS() » Search complete! 2 files found.
findSCSS() » Check returned array.
[
  'E:\\js\\utils\\scss-to-css\assets\\scss\\foo.scss',
  'E:\\js\\utils\\scss-to-css\assets\\scss\\bar.scss'
]
*/
```

उपलब्ध पैरामीटर (और उनकी डिफ़ॉल्ट सेटिंग्स) हैं:

नाम          | विवरण                                        | डिफ़ॉल्ट मान
-------------|----------------------------------------------|------------
`recursive`  | searchDir में नेस्टेड फ़ाइलों को पुनरावर्ती रूप से खोजें। | `true`
`verbose`    | कंसोल/टर्मिनल में लॉगिंग दिखाएँ।                    | `true`
`dotFolders` | फ़ाइल खोज में डॉटफ़ोल्डर शामिल करें।               | `false`

<br>

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

## 🏛️ MIT लाइसेंस

**कॉपीराइट © 2024 [एडम लुई (Adam Lui)](https://github.com/adamlui) और योगदानकर्ता**

इसके द्वारा प्रति प्राप्त करने वाले किसी भी व्यक्ति को अनुमति निःशुल्क प्रदान की जाती है इस सॉफ़्टवेयर और संबंधित दस्तावेज़ फ़ाइलों ("सॉफ़्टवेयर") से निपटने के लिए सॉफ़्टवेयर में बिना किसी प्रतिबंध के, जिसमें बिना किसी सीमा के अधिकार शामिल हैं उपयोग करना, प्रतिलिपि बनाना, संशोधित करना, विलय करना, प्रकाशित करना, वितरित करना, उपलाइसेंस देना और/या बेचना सॉफ़्टवेयर की प्रतियां, और उन व्यक्तियों को अनुमति देना जिनके पास सॉफ़्टवेयर है निम्नलिखित शर्तों के अधीन, ऐसा करने के लिए सुसज्जित:

उपरोक्त कॉपीराइट नोटिस और यह अनुमति नोटिस सभी में शामिल होंगे सॉफ़्टवेयर की प्रतियां या पर्याप्त भाग।

सॉफ़्टवेयर "जैसा है" प्रदान किया जाता है, बिना किसी प्रकार की, स्पष्ट या वारंटी के। निहित, व्यापारिकता की वारंटी सहित, लेकिन इन्हीं तक सीमित नहीं, किसी विशेष उद्देश्य के लिए उपयुक्तता और उल्लंघन न होना। किसी भी स्थिति में ऐसा नहीं होगा लेखक या कॉपीराइट धारक किसी भी दावे, क्षति या अन्य के लिए उत्तरदायी होंगे दायित्व, चाहे किसी अनुबंध, अपकृत्य या किसी अन्य प्रकार से उत्पन्न हो, सॉफ़्टवेयर से बाहर या उसके संबंध में या उपयोग या अन्य लेनदेन में सॉफ़्टवेयर।

<br>

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

## 🛠️ संबंधित उपयोगिताएँ

### [🖼️ img-to-webp](https://github.com/adamlui/js-utils/tree/main/img-to-webp)

> सभी छवियों को WEBPs पर पुनरावर्ती रूप से संपीड़ित करें।
<br>[डाउनलोड करना](https://raw.githubusercontent.com/adamlui/js-utils/main/img-to-webp/img-to-webp.js) /
[चर्चा करना](https://github.js-utils.com/discussions)

### [</> minify.js](https://minify-js.org) <a href="https://github.com/toolleeo/cli-apps#programming"><img height=18 src="https://awesome.re/mentioned-badge.svg"></a>

> सभी जावास्क्रिप्ट फ़ाइलों को पुनरावर्ती रूप से छोटा करें।
<br>[स्थापित करना](http://minify-js.org/docs/hi#-%E0%A4%87%E0%A4%82%E0%A4%B8%E0%A5%8D%E0%A4%9F%E0%A4%BE%E0%A4%B2%E0%A5%87%E0%A4%B6%E0%A4%A8) /
[रीडमी](http://minify-js.org/docs/hi#readme) /
[सीएलआई उपयोग](http://minify-js.org/docs/hi#-%E0%A4%95%E0%A4%AE%E0%A4%BE%E0%A4%82%E0%A4%A1-%E0%A4%B2%E0%A4%BE%E0%A4%87%E0%A4%A8-%E0%A4%89%E0%A4%AA%E0%A4%AF%E0%A5%8B%E0%A4%97) /
[एपीआई उपयोग](http://minify-js.org/docs/hi#-api-%E0%A4%89%E0%A4%AA%E0%A4%AF%E0%A5%8B%E0%A4%97) /
[चर्चा करना](https://github.js-utils.com/discussions)

<br>

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

<picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/adamlui/js-utils/main/media/images/icons/home/white/icon32x27.png"><img height=13 src="https://raw.githubusercontent.com/adamlui/js-utils/main/media/images/icons/home/dark-gray/icon32x27.png"></picture> <a href="https://js-utils.com">**अधिक जावास्क्रिप्ट उपयोगिताएँ**</a> /
<a href="https://github.js-utils.com/discussions">चर्चा करना</a> /
<a href="#--scss-to-css">वापस शीर्ष पर ↑</a>
