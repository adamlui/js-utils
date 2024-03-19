<div align="right">
    <h6>
        <picture>
            <source type="image/svg+xml" media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/earth-icon/white/icon32.svg">
            <img height=14 src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/earth-icon/black/icon32.svg">
        </picture>
        &nbsp;मराठी |
        <a href="../..#readme">English</a> |
        <a href="../zh-cn#readme">简体中文</a> |
        <a href="../zh-tw#readme">繁體中文</a> |
        <a href="../hi#readme">हिंदी</a> |
        <a href="../bn#readme">বাংলা</a> |
        <a href="../pa#readme">ਪੰਜਾਬੀ</a>
    </h6>
</div>

# </> minify.js

### सर्व JavaScript फायली वारंवार कमी करा.

<a href="https://www.npmjs.com/package/@adamlui/minify.js"><img height=31 src="https://img.shields.io/npm/dt/%40adamlui%2Fminify.js?logo=npm&color=af68ff&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="#%EF%B8%8F-mit-%E0%A4%AA%E0%A4%B0%E0%A4%B5%E0%A4%BE%E0%A4%A8%E0%A4%BE"><img height=31 src="https://img.shields.io/badge/License-MIT-orange.svg?logo=internetarchive&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://www.npmjs.com/package/@adamlui/minify.js?activeTab=versions"><img height=31 src="https://img.shields.io/badge/Latest_Build-1.4.3-44cc11.svg?logo=icinga&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://www.npmjs.com/package/@adamlui/minify.js?activeTab=code"><img height=31 src="https://img.shields.io/npm/unpacked-size/%40adamlui%2Fminify.js?style=for-the-badge&logo=ebox&logoColor=white&labelColor=464646&color=blue"></a>
<a href="https://sonarcloud.io/component_measures?metric=new_vulnerabilities&id=adamlui_js-utils:minify.js/minify.js"><img height=31 src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fsonarcloud.io%2Fapi%2Fmeasures%2Fcomponent%3Fcomponent%3Dadamlui_js-utils%3Aminify.js%2Fminify.js%26metricKeys%3Dvulnerabilities&query=%24.component.measures.0.value&style=for-the-badge&logo=sonarcloud&logoColor=white&labelColor=464646&label=Vulnerabilities&color=gold"></a>

<img src="https://github.com/adamlui/js-utils/blob/main/minify.js/media/images/minify.js-docs-demo.png">

<br>

<img height=8px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

## ⚡ स्थापना

**जागतिक उपयुक्तता** म्हणून:

```
$ npm install -g @adamlui/minify.js
```

**विकासक अवलंबित्व** म्हणून (उदा. बिल्ड स्क्रिप्टसाठी), तुमच्या प्रोजेक्ट रूटवरून:

```
$ npm install -D @adamlui/minify.js
```

**रनटाइम अवलंबित्व** म्हणून (उदा. ऑन-द-फ्लाय मिनिफिकेशनसाठी), तुमच्या प्रोजेक्ट रूटवरून:

```
$ npm install @adamlui/minify.js
```

## 💻 कमांड लाइन वापर

मूलभूत **ग्लोबल कमांड** आहे:

```
$ minify-js
```

**💡 टीप:** फक्त कोणत्या फाइल्सवर प्रक्रिया केली जाईल हे पाहण्यासाठी `-n` किंवा `--dry-run` पास करा.

#

**इनपुट/आउटपुट** पथ निर्दिष्ट करण्यासाठी:
   
```
$ minify-js [input_path] [output_path]
```

- `[input_path]`: सध्याच्या कार्यरत निर्देशिकेच्या सापेक्ष JS फाईल किंवा डिरेक्ट्रीचा पाथ ज्यामध्ये JS फाइल्स कमी केल्या जातील.
- `[output_path]`: फाईल किंवा डिरेक्ट्रीचा मार्ग जेथे लहान फाइल्स संग्रहित केल्या जातील, मूळ फाइल स्थानाशी संबंधित (दिले नसल्यास, `min/` वापरले जाते).

**💡 टीप:** फोल्डर पास झाल्यास, `-R` किंवा `--no-recursion` पास केल्याशिवाय फायलींवर पुनरावृत्ती केली जाईल.

#

तुमच्या प्रोजेक्टच्या `package.json` मध्ये **पॅकेज स्क्रिप्ट** म्हणून वापरण्यासाठी:

```json
  "scripts": {
    "build:js": "<minify-js-cmd>"
  },
```

`<minify-js-cmd>` ला `minify-js` + पर्यायी पॅरामीटरने बदला. त्यानंतर, कमांड रन करण्यासाठी `npm run build:js` वापरता येईल.
<br><br>

### उदाहरणे आज्ञा

**वर्तमान निर्देशिकेत** सर्व JavaScript फायली कमी करा (`min/` वर आउटपुट):

```
$ minify-js
```

सर्व JavaScript फाइल्स एका **विशिष्ट निर्देशिकेत** कमी करा (`path/to/your/directory/min/` वरील आउटपुट):

```
$ minify-js path/to/your/directory
```

**विशिष्ट फाइल** कमी करा (`path/to/your/min/file.min.js` वर आउटपुट):

```
$ minify-js path/to/your/file.js
```

दोन्ही **इनपुट आणि आउटपुट** डिरेक्टरी निर्दिष्ट करा (आउटपुट टू `output_folder/`):

```
$ minify-js input_folder output_folder
```

### कमांड लाइन पर्याय

```
कॉन्फिग पर्याय:
 -n, --dry-run               फाइल(स्) प्रत्यक्षात कमी करू नका, त्यांच्यावर प्रक्रिया केली जाईल का ते दाखवा.
 -d, --include-dotfolders    फाइल शोधात डॉटफोल्डर समाविष्ट करा.
 -D, --include-dotfiles      फाइल शोधात डॉटफाईल्स समाविष्ट करा.
 -R, --no-recursion          आवर्ती फाइल शोध अक्षम करा.
 -M, --no-mangle             मँगलिंग नावे अक्षम करा.
 -q, --quiet                 त्रुटी वगळता सर्व लॉगिंग दाबा.

माहिती आदेश:
 -h, --help                  मदत स्क्रीन प्रदर्शित करा.
 -v, --version               आवृत्ती क्रमांक दर्शवा.
```

## 🔌 API संदर्भ

ECMAScript मॉड्युल किंवा CommonJS मॉड्युल म्हणून तुमच्या API पद्धती वापरण्यासाठी तुम्ही तुमच्या ॲपमध्ये **minify.js** इंपोर्ट करू शकता.

#### ESM:

```js
import * as minifyJS from '@adamlui/minify.js';
```

#### CJS:

```js
const minifyJS = require('@adamlui/minify.js');
```

### `minify(input[, options])`

पुरवलेल्या स्ट्रिंग इनपुटवर आधारित JavaScript कोड कमी करते.

**स्रोत कोड** पास केल्यास, तो थेट लहान केला जातो, त्यानंतर `srcPath` + `code` + `error` असलेली ऑब्जेक्ट परत केली जाते:

```js
const srcCode = 'function add(first, second) { return first + second; }',
      minifyResult = minifyJS.minify(srcCode);

console.log(minifyResult.error); // रनटाइम त्रुटी आउटपुट करते, किंवा त्रुटी नसल्यास `undefined`
console.log(minifyResult.code);  // आउटपुट मिनिफाइड JS: function add(n,d){return n+d}
```

जर **फाइल पथ** पास झाला असेल, तर फाइलचा कोड लोड केला जातो आणि नंतर लहान केला जातो, वरील प्रमाणे ऑब्जेक्ट परत करतो.

**डिरेक्टरी पाथ** पास केल्यास, JavaScript फाइल्स शोधल्या जातात (पुन्हा डिफॉल्टनुसार), प्रत्येकाचा कोड लोड केला जातो आणि नंतर छोटा केला जातो, त्यानंतर `srcPath` + `code` + `error` असलेल्या ऑब्जेक्ट्सचा ॲरे दिला जातो:

```js
// वर्किंग डिरेक्टरी + सर्व नेस्टेड डिरेक्टरीमध्ये JS फाइल्सचे स्त्रोत मार्ग आउटपुट करते
const results = minifyJS.minify('.');
results.forEach(result => console.log(result.srcPath));

// आढळल्यास दुसऱ्या JS फाईलचा मिनिफाइड कोड आउटपुट करतो, किंवा न आढळल्यास `undefined`
console.log(results[1].code);
```

पर्याय बुलियन आहेत, ऑब्जेक्ट गुणधर्म म्हणून पास केले जातात. उदाहरणार्थ:

```js
// डेटा ऑब्जेक्ट परत करतो जिथे डॉटफाईल्सवर देखील प्रक्रिया केली जाते जर `input` एक पथ असेल
minifyJS.minify(input, { dotFiles: true });
```

संभाव्य पॅरामीटर्स (आणि त्यांची डीफॉल्ट सेटिंग्ज) आहेत:

```
 recursive (true)     डिरेक्टरी पथ पास झाल्यास नेस्टेड फाइल्ससाठी वारंवार शोधा.
 verbose (true)       कन्सोल/टर्मिनलमध्ये लॉग इन दाखवा.
 dotFolders (false)   फाइल शोधात डॉटफोल्डर समाविष्ट करा.
 dotFiles (false)     फाइल शोधात डॉटफाईल्स समाविष्ट करा.
 mangle (true)        व्हेरिएबलची नावे (सामान्यत: एका वर्णापर्यंत) लहान करा.
```

### `findJS(searchDir[, options])`

पास केलेल्या `searchDir` स्ट्रिंगमधील सर्व अनमिनिफाईड JavaScript फायली शोधते ([`minify()`](#minifyinput-options) कोणत्या फायलींवर प्रक्रिया करतील हे शोधण्यासाठी उपयुक्त) आणि त्यांचे फाइलपथ असलेले ॲरे परत करते.

पर्याय बुलियन आहेत, ऑब्जेक्ट गुणधर्म म्हणून पास केले जातात. उदाहरणार्थ:

```js
// अचूक `searchDir` मधील अनमिनिफाईड JS फायलींवर फाइलपाथ असलेला ॲरे परत करतो
minifyJS.findJS(searchDir, { recursive: false });
```

संभाव्य पॅरामीटर्स (आणि त्यांची डीफॉल्ट सेटिंग्ज) आहेत:

```
 recursive (true)     डिरेक्टरी पथ पास झाल्यास नेस्टेड फाइल्ससाठी वारंवार शोधा.
 verbose (true)       कन्सोल/टर्मिनलमध्ये लॉग इन दाखवा.
 dotFolders (false)   फाइल शोधात डॉटफोल्डर समाविष्ट करा.
 dotFiles (false)     फाइल शोधात डॉटफाईल्स समाविष्ट करा.
```

<br>

## 💖 सपोर्ट

कृपया [GitHub देणे ⭐](https://github.com/adamlui/js-utils) किंवा [निधी](https://github.com/sponsors/adamlui) या प्रकल्पाने तुम्हाला मदत केली असल्यास विचार करा!
<br><br>

## 🏛️ MIT परवाना

**कॉपीराइट © 2023–2024 [Adam Lui](https://github.com/adamlui) आणि योगदानकर्ते**

या सॉफ्टवेअरची आणि संबंधित दस्तऐवज फाइल्स ("सॉफ्टवेअर") ची प्रत मिळवणाऱ्या कोणत्याही व्यक्तीला, वापर, कॉपी, सुधारणे, विलीन करण्याच्या अधिकारांसह मर्यादेशिवाय सॉफ्टवेअरमध्ये व्यवहार करण्यासाठी, याद्वारे परवानगी देण्यात आली आहे. , सॉफ्टवेअरच्या प्रती प्रकाशित करणे, वितरित करणे, उपपरवाना देणे आणि/किंवा विक्री करणे आणि ज्यांना सॉफ्टवेअर दिलेले आहे अशा व्यक्तींना असे करण्यास परवानगी देणे, खालील अटींच्या अधीन राहून:

उपरोक्त कॉपीराइट सूचना आणि ही परवानगी सूचना सॉफ्टवेअरच्या सर्व प्रती किंवा महत्त्वपूर्ण भागांमध्ये समाविष्ट केली जाईल.

सॉफ्टवेअर "जसे आहे तसे" प्रदान केले जाते, कोणत्याही प्रकारच्या हमीशिवाय, व्यक्त किंवा निहित, ज्यामध्ये व्यापारक्षमता, विशिष्ट हेतूसाठी योग्यतेच्या हमींचा समावेश आहे, परंतु ते मर्यादित नाही. कोणत्याही परिस्थितीत लेखक किंवा कॉपीराइट धारक कोणत्याही दाव्यासाठी, नुकसानीसाठी किंवा इतर उत्तरदायित्वासाठी जबाबदार असणार नाहीत, मग तो कराराच्या कृतीत, छेडछाड किंवा अन्यथा, नंतरपासून, आमच्याकडून उद्भवलेल्या मध्ये इतर व्यवहार सॉफ्टवेअर.

<br>

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

<a href="https://github.com/adamlui/js-utils">**मुख्यपृष्ठ**</a> /
<a href="https://github.com/adamlui/js-utils/discussions">चर्चा करा</a> /
<a href="#-minifyjs">परत वर जा ↑</a>
