<div align="right">
    <h6>
        <picture>
            <source type="image/svg+xml" media="(prefers-color-scheme: dark)" srcset="https://cdn.jsdelivr.net/gh/adamlui/minify.js@ad67551/assets/images/icons/earth/white/icon32.svg">
            <img height=14 src="https://cdn.jsdelivr.net/gh/adamlui/minify.js@ad67551/assets/images/icons/earth/black/icon32.svg">
        </picture>
        &nbsp;हिंदी |
        <a href="../..#readme">English</a> |
        <a href="../zh-cn/#readme">简体中文</a> |
        <a href="../zh-tw/#readme">繁體中文</a> |
        <a href="../bn/#readme">বাংলা</a> |
        <a href="../mr/#readme">मराठी</a> |
        <a href="../pa/#readme">ਪੰਜਾਬੀ</a> |
        <a href="../de/#readme">Deutsch</a> |
        <a href="../es/#readme">Español</a> |
        <a href="../fr/#readme">Français</a>
    </h6>
</div>

<a id="top"></a>

# </> minify.js

### सभी जावास्क्रिप्ट फ़ाइलों को पुनरावर्ती रूप से छोटा करें।

<a href="https://npmstar.com/compare/@adamlui%2Fminify.js">
    <img height=31 src="https://img.shields.io/npm/dm/%40adamlui%2Fminify.js?logo=npm&color=af68ff&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="#%EF%B8%8F-mit-लाइसेंस">
    <img height=31 src="https://img.shields.io/badge/License-MIT-orange.svg?logo=internetarchive&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://github.com/adamlui/minify.js/releases/tag/node.js-v2.5.2">
    <img height=31 src="https://img.shields.io/badge/Latest_Build-2.5.2-44cc11.svg?logo=icinga&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://www.npmjs.com/package/@adamlui/minify.js?activeTab=code">
    <img height=31 src="https://img.shields.io/npm/unpacked-size/%40adamlui%2Fminify.js?style=for-the-badge&logo=ebox&logoColor=white&labelColor=464646&color=blue"></a>
<a href="https://sonarcloud.io/component_measures?metric=vulnerabilities&selected=adamlui_js-utils%3Aminify.js%2Fnode.js&id=adamlui_js-utils">
    <img height=31 src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fsonarcloud.io%2Fapi%2Fmeasures%2Fcomponent%3Fcomponent%3Dadamlui_minify.js%3Anode.js%2Fsrc%2Fminify.js%26metricKeys%3Dvulnerabilities&query=%24.component.measures.0.value&style=for-the-badge&logo=sonar&logoColor=white&labelColor=464646&label=Vulnerabilities&color=gold"></a>
<a href="https://github.com/toolleeo/cli-apps/#programming">
    <img height=31 src="https://img.shields.io/badge/Mentioned_in-Awesome-ff69b4?logo=awesomelists&logoColor=white&labelColor=464646&style=for-the-badge"></a>

<img src="https://cdn.jsdelivr.net/gh/adamlui/minify.js@b8f432a/node.js/assets/images/screenshots/cli/minify-js-docs-cmd-output.png">

<br>

<img height=6px width="100%" src="https://cdn.jsdelivr.net/gh/adamlui/minify.js@ad67551/assets/images/separators/aqua-gradient.png">

## ⚡ इंस्टालेशन

**वैश्विक उपयोगिता** के रूप में:

```
$ npm install -g @adamlui/minify.js
```

**डेवलपर निर्भरता** के रूप में (उदाहरण के लिए बिल्ड स्क्रिप्ट के लिए), आपके प्रोजेक्ट रूट से:

```
$ npm install -D @adamlui/minify.js
```

**रनटाइम निर्भरता** के रूप में (उदाहरण के लिए ऑन-द-फ्लाई मिनिमाइजेशन के लिए), आपके प्रोजेक्ट रूट से:

```
$ npm install @adamlui/minify.js
```

<br>

<a href="https://github.com/sponsors/adamlui"><img src="https://cdn.jsdelivr.net/gh/adamlui/minify.js@63bbeed/assets/images/banners/sponsor/$10/banner1660x260.png"></a>

<img height=6px width="100%" src="https://cdn.jsdelivr.net/gh/adamlui/minify.js@ad67551/assets/images/separators/aqua-gradient.png">

## 💻 कमांड लाइन उपयोग

मूल **वैश्विक कमांड** है:

```
$ minify-js
```

**📝 नोट:** केवल यह देखने के लिए कि कौन सी फ़ाइलें संसाधित की जाएंगी, `-n` या `--dry-run` पास करें।

#

**इनपुट/आउटपुट** पथ निर्दिष्ट करने के लिए:

```
$ minify-js [input_path] [output_path]
```

- `[input_path]`: वर्तमान कार्यशील निर्देशिका के सापेक्ष जेएस फ़ाइल या जेएस फ़ाइलों वाली निर्देशिका का पथ छोटा किया जाना है।
- `[output_path]`: फ़ाइल या डायरेक्टरी का पाथ जहाँ मिनिफ़ाइड फ़ाइलें स्टोर की जाएंगी, इनपुट रूट के हिसाब से (अगर नहीं दिया गया है, तो `min/` का इस्तेमाल किया जाएगा)।

**📝 नोट:** यदि फ़ोल्डर्स पास हो गए हैं, तो फ़ाइलों को पुनरावर्ती रूप से संसाधित किया जाएगा जब तक कि `-R` या `-no-recursion` पास न हो जाए।

#

अपने प्रोजेक्ट के `package.json` में **पैकेज स्क्रिप्ट** के रूप में उपयोग करने के लिए:

```json
  "scripts": {
    "build:js": "<minify-js-cmd>"
  },
```

`<minify-js-cmd>` को `minify-js` + वैकल्पिक पैरामीटर से बदलें। फिर, कमांड चलाने के लिए `npm run build:js` का उपयोग किया जा सकता है।

#

### उदाहरण आदेश

**वर्तमान निर्देशिका** में सभी जावास्क्रिप्ट फ़ाइलों को छोटा करें (आउटपुट `min/`):

```
$ minify-js
```

**विशिष्ट निर्देशिका** में सभी जावास्क्रिप्ट फ़ाइलों को छोटा करें (`min/path/to/your/directory/` पर आउटपुट):

```
$ minify-js path/to/your/directory
```

एक **विशिष्ट फ़ाइल** को छोटा करें (`min/path/to/your/file.min.js` पर आउटपुट):

```
$ minify-js path/to/your/file.js
```

**इनपुट और आउटपुट** दोनों निर्देशिकाएं निर्दिष्ट करें (आउटपुट `output_folder/` पर):

```
$ minify-js input_folder output_folder
```

#

### कमांड लाइन विकल्प

```
बूलियन विकल्प:
 -n, --dry-run                        वास्तव में फ़ाइल(फ़ाइलों) को छोटा न करें, बस यह दिखाएं कि क्या उन्हें संसाधित किया जाएगा।
 -d, --include-dotfolders             फ़ाइल खोज में डॉटफ़ोल्डर शामिल करें।
 -D, --include-dotfiles               फ़ाइल खोज में डॉटफ़ाइलें शामिल करें।
 -R, --no-recursion                   पुनरावर्ती फ़ाइल खोज अक्षम करें।
 -M, --no-mangle                      नामों में गड़बड़ी अक्षम करें।
 -X, --no-filename-change             फ़ाइल एक्सटेंशन को .min.js में बदलना अक्षम करें।
 -i, --rewrite-imports                इम्पोर्ट पाथ को .js से .min.js में अपडेट करें।
 -c, --copy                           यदि एकल स्रोत फ़ाइल संसाधित होती है तो फ़ाइल में लिखने के बजाय क्लिपबोर्ड पर छोटा कोड कॉपी करें।
 -r, --relative-output                इनपुट रूट के बजाय हर सोर्स फ़ाइल के हिसाब से आउटपुट फ़ाइलें।
 -q, --quiet                          त्रुटियों को छोड़कर सभी लॉगिंग को रोकें।

पैरामीटर विकल्प:
 --ignores="dir/,file1.js,file2.js"   लघुकरण से बाहर की जाने वाली फ़ाइलें।
 --comment="comment"                  लघु कोड में हेडर टिप्पणी जोड़ें। '\n' का उपयोग करके लाइन से अलग करें।
 --ui-lang="code"                     UI दिखाने के लिए भाषा का ISO 639-1 कोड।
 --config="path/to/file"              कस्टम कॉन्फ़िग फ़ाइल लोड करें।

कमांड:
     --init                           कॉन्फ़िग फ़ाइल बनाएं (प्रोजेक्ट रूट में)।
 -h, --help                           सहायता स्क्रीन प्रदर्शित करें।
 -v, --version                        संस्करण संख्या दिखाएँ।
     --stats                          npm स्टैट्स दिखाएँ।
     --debug [targetKey]              डीबग लॉग दिखाएँ।
```

#

### कॉन्फ़िगरेशन फ़ाइल

**minify.js** को आपके प्रोजेक्ट रूट में रखी `minify.config.mjs` या `minify.config.js` का इस्तेमाल करके कस्टमाइज़ किया जा सकता है।

उदाहरण डिफ़ॉल्ट:

```js
export default {
    dryRun: false,            // फ़ाइल(फ़ाइलों) को असल में मिनिफाई न करें, बस दिखाएं कि उन्हें प्रोसेस किया जाएगा या नहीं
    includeDotFolders: false, // फ़ाइल सर्च में डॉटफ़ोल्डर शामिल करें
    includeDotFiles: false,   // फ़ाइल सर्च में डॉटफ़ाइल शामिल करें
    noRecursion: false,       // रिकर्सिव फ़ाइल सर्चिंग डिसेबल करें
    noMangle: false,          // नामों को मैंगल करना डिसेबल करें
    noFilenameChange: false,  // फ़ाइल एक्सटेंशन को .min.js में बदलना डिसेबल करें
    rewriteImports: false,    // इंपोर्ट पाथ को .js से .min.js में अपडेट करें
    copy: false,              // अगर सिंगल फ़ाइल प्रोसेस की जाती है, तो मिनिफाइड कोड को फ़ाइल में लिखने के बजाय क्लिपबोर्ड पर कॉपी करें
    relativeOutput: false,    // इनपुट रूट के बजाय हर src फ़ाइल के हिसाब से आउटपुट फ़ाइलें
    quietMode: false,         // एरर को छोड़कर सभी लॉगिंग को दबाएं
    ignores: '',              // मिनिफिकेशन से बाहर रखने के लिए फ़ाइलें/डायरेक्टरी
    comment: ''               // मिनिफाइड कोड में जोड़ने के लिए हेडर कमेंट
}
```

💡 अपने प्रोजेक्ट रूट में एक टेम्प्लेट `minify.config.mjs` जेनरेट करने के लिए `minify-js init` चलाएँ।

<br>

<br>

<img height=6px width="100%" src="https://cdn.jsdelivr.net/gh/adamlui/minify.js@ad67551/assets/images/separators/aqua-gradient.png">

## 🔌 API उपयोग

आप API विधियों का उपयोग करने के लिए अपने ऐप में **minify.js** को ECMAScript मॉड्यूल या CommonJS मॉड्यूल दोनों के रूप में आयात कर सकते हैं।

#### ESM*:

```js
import minifyJS from '@adamlui/minify.js'
```

#### CJS:

```js
const minifyJS = require('@adamlui/minify.js')
```

###### _*Node.js संस्करण 14 या उच्चतर आवश्यक_

#

### `minify(input[, options])`

💡 आपूर्ति किए गए स्ट्रिंग इनपुट के आधार पर जावास्क्रिप्ट कोड को छोटा करता है।

यदि **स्रोत कोड** पास हो जाता है, तो इसे सीधे छोटा कर दिया जाता है, फिर `srcPath` + `code` + `error` युक्त एक ऑब्जेक्ट वापस कर दिया जाता है:

```js
const srcCode = 'function add(first, second) { return first + second }',
      minifyResult = minifyJS.minify(srcCode)

console.log(minifyResult.error) // यदि कोई त्रुटि नहीं है तो रनटाइम त्रुटि, या `undefined` आउटपुट करता है
console.log(minifyResult.code)  // आउटपुट छोटा जावास्क्रिप्ट: 'function add(n,d){return n+d}'
```

यदि **फ़ाइल पथ** पास हो जाता है, तो फ़ाइल का कोड लोड किया जाता है और फिर छोटा किया जाता है, जिससे ऊपर जैसा ऑब्जेक्ट वापस आ जाता है।

यदि **निर्देशिका पथ** पारित किया जाता है, तो जावास्क्रिप्ट फ़ाइलों को खोजा जाता है (डिफ़ॉल्ट रूप से पुनरावर्ती रूप से), प्रत्येक का कोड लोड किया जाता है और फिर छोटा किया जाता है, फिर `srcPath` + `code` + `error` युक्त ऑब्जेक्ट की एक सरणी लौटा दी जाती है:

```js
// कार्यशील निर्देशिका + सभी नेस्टेड निर्देशिकाओं में जावास्क्रिप्ट फ़ाइलों के स्रोत पथ को आउटपुट करता है
const minifyResults = minifyJS.minify('.')
minifyResults.forEach(result => console.log(result.srcPath))

// यदि पाया जाता है तो दूसरी जावास्क्रिप्ट फ़ाइल का छोटा कोड आउटपुट करता है, या नहीं मिलने पर `undefined`
console.log(minifyResults[1].code)
```

विकल्प बूलियन हैं, ऑब्जेक्ट गुणों के रूप में पारित किए गए हैं। उदाहरण के लिए:

```js
// डेटा ऑब्जेक्ट की सरणी लौटाता है जहां `input` एक पथ होने पर डॉटफ़ाइलें भी संसाधित की जाती हैं
minifyJS.minify(input, { dotFiles: true })
```

उपलब्ध पैरामीटर (और उनकी डिफ़ॉल्ट सेटिंग्स) हैं:

नाम              | प्रकार  | विवरण                                                                     | डिफ़ॉल्ट मान
-----------------|-------|---------------------------------------------------------------------------|------------
`recursive`      | बूलियन | यदि डीआईआर पथ पारित हो गया है तो नेस्टेड फ़ाइलों को पुनरावर्ती रूप से खोजें।          | `true`
`verbose`        | बूलियन | कंसोल/टर्मिनल में लॉगिंग दिखाएँ।                                                | `true`
`dotFolders`     | बूलियन | फ़ाइल खोज में डॉटफ़ोल्डर शामिल करें।                                           | `false`
`dotFiles`       | बूलियन | फ़ाइल खोज में डॉटफ़ाइलें शामिल करें।                                            | `false`
`mangle`         | बूलियन | परिवर्तनीय नामों को छोटा करें (आमतौर पर एक वर्ण तक)                            | `true`
`rewriteImports` | बूलियन | इम्पोर्ट पाथ को .js से .min.js में अपडेट करें।                                   | `false`
`relativeOutput` | बूलियन | इनपुट रूट के बजाय हर सोर्स फ़ाइल के हिसाब से आउटपुट फ़ाइलें।                     | `false`
`ignores`        | सरणी  | मिनिफिकेशन से बाहर रखने के लिए फ़ाइलें/डायरेक्टरी।                                | `[]`
`comment`        | डोरी   | लघु कोड से पहले जोड़ने के लिए हेडर टिप्पणी। '\n' का उपयोग करके लाइन से अलग करें। | `''`

#

### `findJS(searchDir[, options])`

💡 पास की गई `searchDir` स्ट्रिंग के भीतर सभी अनमिनिफाइड JavaScript फ़ाइलों की खोज करता है (यह पता लगाने के लिए उपयोगी है कि कौन सी फ़ाइलें [`minify()`](#minifyinput-options) प्रोसेस होंगी) और उनके फ़ाइलपथ वाली एक सरणी लौटाता है।

विकल्प बूलियन हैं, ऑब्जेक्ट गुणों के रूप में पारित किए गए हैं। उदाहरण के लिए:

```js
// बिल्कुल assets/js में असंबद्ध जावास्क्रिप्ट फ़ाइलों की खोज करें
const searchResults = minifyJS.findJS('assets/js', { recursive: false })
console.log(searchResults)

/* नमूना आउटपुट:

findJS() » Searching for unminified JS files...
findJS() » Search complete! 2 files found.
findJS() » Check returned array.
[
  'E:\\js\\utils\\minify.js\\assets\\js\\foo.js',
  'E:\\js\\utils\\minify.js\\assets\\js\\bar.js'
]
*/
```

उपलब्ध पैरामीटर (और उनकी डिफ़ॉल्ट सेटिंग्स) हैं:

नाम           | प्रकार  | विवरण                                        | डिफ़ॉल्ट मान
--------------|-------|----------------------------------------------|------------
`recursive`   | बूलियन | searchDir में नेस्टेड फ़ाइलों को पुनरावर्ती रूप से खोजें। | `true`
`verbose`     | बूलियन | कंसोल/टर्मिनल में लॉगिंग दिखाएँ।                    | `true`
`dotFolders`  | बूलियन | फ़ाइल खोज में डॉटफ़ोल्डर शामिल करें।               | `false`
`dotFiles`    | बूलियन | फ़ाइल खोज में डॉटफ़ाइलें शामिल करें।                | `false`
`ignores`     | सरणी  | मिनिफिकेशन से बाहर रखने के लिए फ़ाइलें/डायरेक्टरी।    | `[]`

<br>

<img height=6px width="100%" src="https://cdn.jsdelivr.net/gh/adamlui/minify.js@ad67551/assets/images/separators/aqua-gradient.png">

## 🏛️ MIT लाइसेंस

**कॉपीराइट © 2023–2026 [एडम लुई (Adam Lui)](https://github.com/adamlui) और योगदानकर्ता**

इसके द्वारा प्रति प्राप्त करने वाले किसी भी व्यक्ति को अनुमति निःशुल्क प्रदान की जाती है इस सॉफ़्टवेयर और संबंधित दस्तावेज़ फ़ाइलों ("सॉफ़्टवेयर") से निपटने के लिए सॉफ़्टवेयर में बिना किसी प्रतिबंध के, जिसमें बिना किसी सीमा के अधिकार शामिल हैं उपयोग करना, प्रतिलिपि बनाना, संशोधित करना, विलय करना, प्रकाशित करना, वितरित करना, उपलाइसेंस देना और/या बेचना सॉफ़्टवेयर की प्रतियां, और उन व्यक्तियों को अनुमति देना जिनके पास सॉफ़्टवेयर है निम्नलिखित शर्तों के अधीन, ऐसा करने के लिए सुसज्जित:

उपरोक्त कॉपीराइट नोटिस और यह अनुमति नोटिस सभी में शामिल होंगे सॉफ़्टवेयर की प्रतियां या पर्याप्त भाग।

सॉफ़्टवेयर "जैसा है" प्रदान किया जाता है, बिना किसी प्रकार की, स्पष्ट या वारंटी के। निहित, व्यापारिकता की वारंटी सहित, लेकिन इन्हीं तक सीमित नहीं, किसी विशेष उद्देश्य के लिए उपयुक्तता और उल्लंघन न होना। किसी भी स्थिति में ऐसा नहीं होगा लेखक या कॉपीराइट धारक किसी भी दावे, क्षति या अन्य के लिए उत्तरदायी होंगे दायित्व, चाहे किसी अनुबंध, अपकृत्य या किसी अन्य प्रकार से उत्पन्न हो, सॉफ़्टवेयर से बाहर या उसके संबंध में या उपयोग या अन्य लेनदेन में सॉफ़्टवेयर।

<br>

<img height=6px width="100%" src="https://cdn.jsdelivr.net/gh/adamlui/minify.js@ad67551/assets/images/separators/aqua-gradient.png">

## 🛠️ संबंधित उपयोगिताएँ

### [</> minify.js (Gulp)](https://github.com/adamlui/minify.js/tree/main/gulp/) &nbsp;<a href="https://github.com/toolleeo/cli-apps/#programming"><img height=18 src="https://cdn.jsdelivr.net/gh/adamlui/minify.js@63bbeed/assets/images/badges/awesome/badge.svg"></a>

> सभी जावास्क्रिप्ट फ़ाइलों को पुनरावर्ती रूप से छोटा करने के लिए Gulp प्लग-इन।
<br>[स्थापित करना](https://github.com/adamlui/minify.js/tree/main/gulp/#-installation) /
[रीडमी](https://github.com/adamlui/minify.js/tree/main/gulp/#readme) /
[चर्चा करना](https://github.com/adamlui/minify.js/discussions)

### [{ } scss-to-css](https://github.com/adamlui/scss-to-css/#readme) &nbsp;<a href="https://github.com/toolleeo/cli-apps/#conversion"><img height=18 src="https://cdn.jsdelivr.net/gh/adamlui/minify.js@63bbeed/assets/images/badges/awesome/badge.svg"></a>

> सभी SCSS फ़ाइलों को पुनरावर्ती रूप से लघु CSS में संकलित करें।
<br>[स्थापित करना](https://github.com/adamlui/scss-to-css/#-installation) /
[रीडमी](https://github.com/adamlui/scss-to-css/#readme) /
[सीएलआई उपयोग](https://github.com/adamlui/scss-to-css/#-command-line-usage) /
[एपीआई उपयोग](https://github.com/adamlui/scss-to-css/#-api-usage) /
[चर्चा करना](https://github.com/adamlui/scss-to-css/discussions)

<br>

<img height=6px width="100%" src="https://cdn.jsdelivr.net/gh/adamlui/minify.js@ad67551/assets/images/separators/aqua-gradient.png">

<picture><source media="(prefers-color-scheme: dark)" srcset="https://cdn.jsdelivr.net/gh/adamlui/minify.js@ad67551/assets/images/icons/home/white/icon32x27.png"><img height=13 src="https://cdn.jsdelivr.net/gh/adamlui/minify.js@ad67551/assets/images/icons/home/dark-gray/icon32x27.png"></picture> <a href="https://github.com/adamlui/js-utils/#readme">**अधिक जावास्क्रिप्ट उपयोगिताएँ**</a> /
<a href="https://github.com/adamlui/minify.js/discussions">चर्चा करना</a> /
<a href="https://github.com/adamlui/minify.js/issues">बग की रिपोर्ट करें</a> /
<a href="mailto:security@tidelift.com">कमजोरी की रिपोर्ट करें</a> /
<a href="#top">वापस शीर्ष पर ↑</a>
