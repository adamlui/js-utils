<div align="center">
    <h6>
        <picture>
            <source type="image/svg+xml" media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/earth-icon/white/icon32.svg">
            <img height=14 src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/earth-icon/black/icon32.svg">
        </picture>
        &nbsp;Nederlands |
        <a href="../..#readme">English</a> |
        <a href="../zh-cn#readme">简体中文</a> |
        <a href="../zh-tw#readme">繁體中文</a> |
        <a href="../ja#readme">日本語</a> |
        <a href="../hi#readme">हिंदी</a> |
        <a href="../bn#readme">বাংলা</a> |
        <a href="../mr#readme">मराठी</a> |
        <a href="../pa#readme">ਪੰਜਾਬੀ</a> |
        <a href="../de#readme">Deutsch</a> |
        <a href="../es#readme">Español</a> |
        <a href="../fr#readme">Français</a> |
        <a href="../it#readme">Italiano</a> |
        <a href="../pt#readme">Português</a>
    </h6>
</div>

# { } scss-to-css

### Compileer alle SCSS-bestanden recursief in verkleinde CSS.

<a href="https://www.npmjs.com/package/@adamlui/scss-to-css"><img height=31 src="https://img.shields.io/npm/dm/%40adamlui%2Fscss-to-css?logo=npm&color=af68ff&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="#%EF%B8%8F-mit-licentie"><img height=31 src="https://img.shields.io/badge/Licentie-MIT-orange.svg?logo=internetarchive&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://github.com/adamlui/js-utils/releases/tag/scss-to-css-1.7.14"><img height=31 src="https://img.shields.io/badge/Nieuwste_Constructie-1.7.14-44cc11.svg?logo=icinga&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://www.npmjs.com/package/@adamlui/scss-to-css?activeTab=code"><img height=31 src="https://img.shields.io/npm/unpacked-size/%40adamlui%2Fscss-to-css?label=Uitgepakte+Maat&style=for-the-badge&logo=ebox&logoColor=white&color=blue&labelColor=464646"></a>
<a href="https://sonarcloud.io/component_measures?metric=new_vulnerabilities&id=adamlui_js-utils:scss-to-css/src/scss-to-css.js"><img height=31 src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fsonarcloud.io%2Fapi%2Fmeasures%2Fcomponent%3Fcomponent%3Dadamlui_js-utils%3Ascss-to-css%2Fsrc%2Fscss-to-css.js%26metricKeys%3Dvulnerabilities&query=%24.component.measures.0.value&style=for-the-badge&logo=sonarcloud&logoColor=white&labelColor=464646&label=Kwetsbaarheden&color=gold"></a>
<a href="https://github.com/toolleeo/cli-apps#conversion"><img height=31 src="https://img.shields.io/badge/Vermeld_in-Awesome-c4a2bd?logo=awesomelists&logoColor=white&labelColor=464646&style=for-the-badge"></a>

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

## ⚡ Installatie

Als **wereldwijd nutsbedrijf**:

```
$ npm install -g @adamlui/scss-to-css
```

Als **ontwikkelaarsafhankelijkheid** (bijvoorbeeld voor buildscripts), vanuit de hoofdmap van uw project:

```
$ npm install -D @adamlui/scss-to-css
```

Als **runtime-afhankelijkheid** (bijvoorbeeld voor directe compilatie), vanuit de hoofdmap van uw project:

```
$ npm install @adamlui/scss-to-css
```

<br>

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

## 💻 Gebruik van de opdrachtregel

Het basis **algemene commando** is:

```
$ scss-to-css
```

Voorbeelduitvoer:

<img src="https://github.com/adamlui/js-utils/blob/main/scss-to-css/media/images/sample-output.png">

**💡 Opmerking:** Bronkaarten worden ook standaard gegenereerd, tenzij `-S` of `--no-source-maps` wordt doorgegeven.

#

Om **invoer/uitvoer**-paden op te geven:

```
$ scss-to-css [invoer_pad] [uitvoer_pad]
```

- `[invoer_pad]`: Pad naar SCSS-bestand of map met SCSS-bestanden die moeten worden gecompileerd, relatief ten opzichte van de huidige werkmap.
- `[uitvoer_pad]`: Pad naar bestand of map waar CSS + brontoewijzingsbestanden zullen worden opgeslagen, relatief ten opzichte van de oorspronkelijke bestandslocatie (indien niet opgegeven, wordt `css/` gebruikt).

**💡 Opmerking:** Als mappen worden doorgegeven, worden bestanden recursief verwerkt tenzij `-R` of `--no-recursion` wordt doorgegeven.

#

Om te gebruiken als **pakketscript**, in `package.json` van uw project:

```json
  "scripts": {
    "build:css": "<scss-to-css-cmd>"
  },
```

Vervang `<scss-to-css-cmd>` door `scss-to-css` + optionele argumenten. Vervolgens kan `npm run build:css` worden gebruikt om de opdracht uit te voeren.

#

### Voorbeeld commando's

Compileer alle SCSS-bestanden in de **huidige map** (uitvoer naar `css/`):

```
$ scss-to-css
```

Compileer alle SCSS-bestanden in een **specifieke map** (uitvoer naar `pad/naar/uw/map/css/`):

```
$ scss-to-css pad/naar/uw/map
```

Compileer een **specifiek bestand** (uitvoer naar `pad/naar/uw/css/bestand.min.css`):

```
$ scss-to-css pad/naar/uw/bestand.scss
```

Specificeer zowel de mappen **input als uitvoer** (uitvoer naar `uitvoer_map/`):

```
$ scss-to-css invoer_map uitvoer_map
```

**💡 Opmerking:** Uitvoer-CSS wordt verkleind tenzij `-M` of `--no-minify` wordt doorgegeven.

#

### Commandoregelopties

```
Configuratie-opties:
 -n, --dry-run               Compileer de bestanden niet daadwerkelijk, maar laat alleen zien of ze worden verwerkt.
 -d, --include-dotfolders    Puntmappen opnemen in het zoeken naar bestanden.
 -S, --no-source-maps        Voorkom dat bronkaarten worden gegenereerd.
 -M, --no-minify             Schakel verkleining van uitvoer-CSS uit.
 -R, --no-recursion          Schakel recursief zoeken naar bestanden uit.
 -q, --quiet                 Onderdruk alle logboekregistratie, behalve fouten.

Info-opdrachten:
 -h, --help                  Helpscherm weergeven.
 -v, --version               Versienummer weergeven.
```

<br>

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

## 🔌 API-gebruik

U kunt ook **scss-naar-css** in uw app importeren om de API-methoden ervan te gebruiken, zowel als een ECMAScript-module als een CommonJS-module.

#### ECMAScript*:

```js
import * as scssToCSS from '@adamlui/scss-to-css';
```

#### CJS:

```js
const scssToCSS = require('@adamlui/scss-to-css');
```

###### _*Node.js versie 14 of hoger vereist_

#

### `compile(invoerPad[, opties])`

Compileert SCSS gevonden in het `invoerPad` dat is opgegeven in CSS-gegevens.

Als een **bestandspad** wordt doorgegeven, wordt de code van het bestand gecompileerd naar CSS, waarna een object met `srcPath` + `code` + `error` wordt geretourneerd:

```js
const compileResult = scssToCSS.compile('assets/style.scss');

console.log(compileResult.error); // geeft een runtimefout weer, of `undefined` als er geen fout is
console.log(compileResult.code);  // voert gecompileerde CSS uit assets/style.scss uit
```

Als een **mappad** wordt doorgegeven, wordt er naar SCSS-bestanden gezocht (standaard recursief), wordt de code van elk bestand geladen en vervolgens gecompileerd, waarna een array van objecten met `srcPath` + `code` + `error` wordt geretourneerd:

```js
// Voert paden uit naar SCSS-bestanden in de werkmap + alle geneste mappen
const compileResults = scssToCSS.compile('.');
compileResults.forEach(result => console.log(result.srcPath));

// Voert gecompileerde CSS uit het tweede SCSS-bestand uit als dit wordt gevonden, of `undefined` als het niet wordt gevonden
console.log(compileResults[1].code);
```

Opties zijn Booleaans en worden doorgegeven als objecteigenschappen. Bijvoorbeeld:

```js
// Retourneert een reeks gegevensobjecten waarin `.code` niet-verkleinde CSS bevat
scssToCSS.compile(inputDir, { minify: false });
```

Beschikbare parameters (en hun standaardinstellingen) zijn:

Naam         | Beschrijving                                                         | Standaardwaarde
-------------|----------------------------------------------------------------------|-----------------
`recursive`  | Zoek recursief naar geneste bestanden als het mappad is doorgegeven. | `true`
`verbose`    | Toon inloggen op console/terminal.                                   | `true`
`dotFolders` | Puntmappen opnemen in het zoeken naar bestanden.                     | `false`
`minify`     | Verklein de uitvoer-CSS.                                             | `true`
`sourceMaps` | Genereer CSS-bronkaarten.                                            | `true`

#

### `findSCSS(zoekMap[, opties])`

Zoekt naar alle SCSS-bestanden binnen de doorgegeven tekenreeks `zoekMap` (handig om te ontdekken welke bestanden [`compile()`](#compileinvoerpad-opties) zal verwerken) en retourneert een array met hun bestandspaden.

Opties zijn Booleaans en worden doorgegeven als objecteigenschappen. Bijvoorbeeld:

```js
// Zoek naar SCSS-bestanden in precies assets/scss:
const searchResults = scssToCSS.findSCSS('assets/scss', { recursive: false });
console.log(searchResults);

/* voorbeelduitvoer:

findSCSS() » Searching for SCSS files...
findSCSS() » Search complete! 2 files found.
findSCSS() » Check returned array.
[
  'E:\\js\\utils\\scss-to-css\assets\\scss\\foo.scss',
  'E:\\js\\utils\\scss-to-css\assets\\scss\\bar.scss'
]
*/
```

Beschikbare parameters (en hun standaardinstellingen) zijn:

Naam         | Beschrijving                                                    | Standaardwaarde
-------------|-----------------------------------------------------------------|-----------------
`recursive`  | Recursief zoeken naar geneste bestanden in zoekMap is geslaagd. | `true`
`verbose`    | Toon inloggen op console/terminal.                              | `true`
`dotFolders` | Puntmappen opnemen in het zoeken naar bestanden.                | `false`

<br>

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

## 🏛️ MIT-licentie

**Auteursrecht © 2024 [Adam Lui](https://github.com/adamlui) en bijdragers**

Hierbij wordt gratis toestemming verleend aan elke persoon die een kopie van deze software en bijbehorende documentatiebestanden (de "Software") verkrijgt, om zonder beperking in de Software te handelen, inclusief maar niet beperkt tot de rechten om te gebruiken, kopiëren, wijzigen, samenvoegen publiceren, distribueren, in sublicentie geven en/of kopieën van de Software verkopen, en personen aan wie de Software wordt geleverd toestemming geven om dit te doen, met inachtneming van de volgende voorwaarden:

De bovenstaande copyrightkennisgeving en deze toestemmingsverklaring zullen worden opgenomen in alle kopieën of substantiële delen van de Software.

DE SOFTWARE WORDT GELEVERD "AS IS", ZONDER ENIGE GARANTIE, EXPLICIET OF IMPLICIET, INCLUSIEF MAAR NIET BEPERKT TOT DE GARANTIES VAN VERKOOPBAARHEID, GESCHIKTHEID VOOR EEN BEPAALD DOEL EN NIET-INBREUK. IN GEEN GEVAL ZULLEN DE AUTEURS OF AUTEURSRECHTHOUDERS AANSPRAKELIJK ZIJN VOOR ENIGE CLAIM, SCHADE OF ANDERE AANSPRAKELIJKHEID, HETZIJ IN EEN CONTRACT-, ONRECHTMATIGE DAAD OF ANDERSZINS, VOORTVLOEIEND UIT, UIT OF IN VERBAND MET DE SOFTWARE OF HET GEBRUIK OF ANDERE HANDELINGEN IN DE SOFTWARE.

<br>

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

## 🛠️ Gerelateerde hulpprogramma's

### [🖼️ img-to-webp](https://github.com/adamlui/js-utils/tree/main/img-to-webp)

> Comprimeer alle afbeeldingen recursief naar WEBP's.
<br>[Downloaden](https://raw.githubusercontent.com/adamlui/js-utils/main/img-to-webp/img-to-webp.js) /
[Bespreken](https://github.js-utils.com/discussions)

### [</> minify.js](https://minify-js.org) <a href="https://github.com/toolleeo/cli-apps#programming"><img height=18 src="https://awesome.re/mentioned-badge.svg"></a>

> Verklein alle JavaScript-bestanden recursief.
<br>[Installeren](https://node.minify-js.org/#-installation) /
[Leesmij](https://node.minify-js.org/#readme) /
[CLI-gebruik](https://node.minify-js.org/#-command-line-usage) /
[API-gebruik](https://node.minify-js.org/#-api-usage) /
[Bespreken](https://github.js-utils.com/discussions)

<br>

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

<picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/adamlui/js-utils/main/media/images/icons/home/white/icon32x27.png"><img height=13 src="https://raw.githubusercontent.com/adamlui/js-utils/main/media/images/icons/home/dark-gray/icon32x27.png"></picture> <a href="https://js-utils.com">**Meer JavaScript-hulpprogramma's**</a> /
<a href="https://github.js-utils.com/discussions">Bespreken</a> /
<a href="#--scss-to-css">Terug naar boven ↑</a>