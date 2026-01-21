<a id="top"></a>

<div align="center">
    <h6>
        <picture>
            <source type="image/svg+xml" media="(prefers-color-scheme: dark)" srcset="https://assets.scsstocss.org/images/icons/earth/white/icon32.svg?v=7e4a141">
            <img height=14 src="https://assets.scsstocss.org/images/icons/earth/black/icon32.svg?v=7e4a141">
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

<a href="https://www.npmjs.com/package/@adamlui/scss-to-css">
    <img height=31 src="https://img.shields.io/npm/dm/%40adamlui%2Fscss-to-css?logo=npm&color=af68ff&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="#%EF%B8%8F-mit-licentie">
    <img height=31 src="https://img.shields.io/badge/Licentie-MIT-orange.svg?logo=internetarchive&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://github.com/adamlui/js-utils/releases/tag/scss-to-css-1.12.0">
    <img height=31 src="https://img.shields.io/badge/Nieuwste_Constructie-1.12.0-44cc11.svg?logo=icinga&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://www.npmjs.com/package/@adamlui/scss-to-css?activeTab=code">
    <img height=31 src="https://img.shields.io/npm/unpacked-size/%40adamlui%2Fscss-to-css?label=Uitgepakte+Maat&style=for-the-badge&logo=ebox&logoColor=white&color=blue&labelColor=464646"></a>
<a href="https://sonarcloud.io/component_measures?metric=new_vulnerabilities&id=adamlui_scss-to-css:node.js/src/scss-to-css.js">
    <img height=31 src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fsonarcloud.io%2Fapi%2Fmeasures%2Fcomponent%3Fcomponent%3Dadamlui_scss-to-css%3Anode.js%2Fsrc%2Fscss-to-css.js%26metricKeys%3Dvulnerabilities&query=%24.component.measures.0.value&style=for-the-badge&logo=sonarcloud&logoColor=white&labelColor=464646&label=Kwetsbaarheden&color=gold"></a>
<a href="https://github.com/toolleeo/cli-apps#conversion">
    <img height=31 src="https://img.shields.io/badge/Vermeld_in-Awesome-ff69b4?logo=awesomelists&logoColor=white&labelColor=464646&style=for-the-badge"></a>

<img height=6px width="100%" src="https://assets.scsstocss.org/images/separators/aqua-gradient.png?v=7e4a141">

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

<a href="https://github.com/sponsors/adamlui"><img src="https://assets.scsstocss.org/images/banners/sponsor/$10/banner1660x260.png?v=f3129dd"></a>

<img height=6px width="100%" src="https://assets.scsstocss.org/images/separators/aqua-gradient.png?v=7e4a141">

## 💻 Gebruik van de opdrachtregel

Het basis **algemene commando** is:

```
$ scss-to-css
```

Voorbeelduitvoer:

<img src="https://cdn.jsdelivr.net/gh/adamlui/scss-to-css@b74edea/node.js/media/images/screenshots/cli/scss-to-css-docs-cmd-output.png">

**📝 Opmerking:** Bronkaarten worden ook standaard gegenereerd, tenzij `-S` of `--no-source-maps` wordt doorgegeven.

#

Om **invoer/uitvoer**-paden op te geven:

```
$ scss-to-css [invoer_pad] [uitvoer_pad]
```

- `[invoer_pad]`: Pad naar SCSS-bestand of map met SCSS-bestanden die moeten worden gecompileerd, relatief ten opzichte van de huidige werkmap.
- `[uitvoer_pad]`: Pad naar bestand of map waar CSS + brontoewijzingsbestanden zullen worden opgeslagen, relatief ten opzichte van de oorspronkelijke bestandslocatie (indien niet opgegeven, wordt `css/` gebruikt).

**📝 Opmerking:** Als mappen worden doorgegeven, worden bestanden recursief verwerkt tenzij `-R` of `--no-recursion` wordt doorgegeven.

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

**📝 Opmerking:** Uitvoer-CSS wordt verkleind tenzij `-M` of `--no-minify` wordt doorgegeven.

#

### Commandoregelopties

```
Booleaanse opties:
 -n, --dry-run                            Compileer de bestanden niet daadwerkelijk, maar laat alleen zien of ze worden verwerkt.
 -d, --include-dotfolders                 Puntmappen opnemen in het zoeken naar bestanden.
 -S, --no-source-maps                     Voorkom dat bronkaarten worden gegenereerd.
 -M, --no-minify                          Schakel verkleining van uitvoer-CSS uit.
 -R, --no-recursion                       Schakel recursief zoeken naar bestanden uit.
 -C, --clone-folders                      Behoud de mapstructuur in de uitvoermap.
 -c, --copy                               Kopieer gecompileerde CSS naar het klembord in plaats van naar een bestand te schrijven als er één bronbestand wordt verwerkt.
 -q, --quiet                              Onderdruk alle logboekregistratie, behalve fouten.

Parameteropties:
 --ignores="dir/,file1.scss,file2.scss"   Bestanden/mappen die moeten worden uitgesloten van de compilatie.
 --comment="comment"                      Voeg headercommentaar toe aan gecompileerde CSS. Scheid per regel met '\n'.

Info-opdrachten:
 -h, --help                               Helpscherm weergeven.
 -v, --version                            Versienummer weergeven.
```

<br>

<img height=6px width="100%" src="https://assets.scsstocss.org/images/separators/aqua-gradient.png?v=7e4a141">

## 🔌 API-gebruik

U kunt ook **scss-naar-css** in uw app importeren om de API-methoden ervan te gebruiken, zowel als een ECMAScript-module als een CommonJS-module.

#### ECMAScript*:

```js
import scssToCSS from '@adamlui/scss-to-css';
```

#### CJS:

```js
const scssToCSS = require('@adamlui/scss-to-css')
```

###### _*Node.js versie 14 of hoger vereist_

#

### `compile(invoer[, opties])`

💡 Compileert SCSS op basis van de opgegeven stringinvoer.

Als **broncode** wordt doorgegeven, wordt deze direct gecompileerd, waarna een object met `srcPath` + `code` + `srcMap` + `error` wordt geretourneerd:

```js
const broncode = 'h1 { font-size: 40px ; code { font-face: Roboto Mono }}',
      resultaatCompileren = scssToCSS.compile(broncode)

console.log(resultaatCompileren.error) // geeft een runtimefout weer, of `undefined` als er geen fout is
console.log(resultaatCompileren.code)  // voert verkleinde CSS uit: 'h1{font-size:40px}h1 code{font-face:Roboto Mono}'
```

Als een **bestandspad** wordt doorgegeven, wordt de code van het bestand geladen en vervolgens gecompileerd naar CSS, waarbij een object zoals hierboven wordt geretourneerd.

Als een **mappad** wordt doorgegeven, wordt er naar SCSS-bestanden gezocht (standaard recursief), wordt de code van elk bestand geladen en vervolgens gecompileerd, waarna een array van objecten met `srcPath` + `code` + `srcMap` + `error` wordt geretourneerd:

```js
// Voert paden uit naar SCSS-bestanden in de werkmap + alle geneste mappen
const resultatenCompileren = scssToCSS.compile('.')
resultatenCompileren.forEach(resultaat => console.log(resultaat.srcPath))

// Voert gecompileerde CSS uit het tweede SCSS-bestand uit als dit wordt gevonden, of `undefined` als het niet wordt gevonden
console.log(resultatenCompileren[1].code)
```

Opties zijn Booleaans en worden doorgegeven als objecteigenschappen. Bijvoorbeeld:

```js
// Retourneert een reeks gegevensobjecten waarin `.code` niet-verkleinde CSS bevat
scssToCSS.compile(invoermap, { minify: false })
```

Beschikbare parameters (en hun standaardinstellingen) zijn:

Naam           | Type       | Beschrijving                                                                                 | Standaardwaarde
---------------|------------|----------------------------------------------------------------------------------------------|-----------------
`recursive`    | Booleaans  | Zoek recursief naar geneste bestanden als het mappad is doorgegeven.                         | `true`
`verbose`      | Booleaans  | Toon inloggen op console/terminal.                                                           | `true`
`dotFolders`   | Booleaans  | Puntmappen opnemen in het zoeken naar bestanden.                                             | `false`
`minify`       | Booleaans  | Verklein de uitvoer-CSS.                                                                     | `true`
`sourceMaps`   | Booleaans  | Genereer CSS-bronkaarten.                                                                    | `true`
`cloneFolders` | Booleaans  | Behoud de mapstructuur in de uitvoermap.                                                     | `false`
`ignores`      | Array      | Bestanden/mappen die moeten worden uitgesloten van de compilatie.                            | `[]`
`comment`      | Tekenreeks | Kopopmerking die vóór de gecompileerde CSS moet worden geplaatst. Scheid per regel met '\n'. | `''`

#

### `findSCSS(zoekMap[, opties])`

💡 Zoekt naar alle SCSS-bestanden binnen de doorgegeven tekenreeks `zoekMap` (handig om te ontdekken welke bestanden [`compile()`](#compileinvoer-opties) zal verwerken) en retourneert een array met hun bestandspaden.

Opties zijn Booleaans en worden doorgegeven als objecteigenschappen. Bijvoorbeeld:

```js
// Zoek naar SCSS-bestanden in precies assets/scss
const searchResults = scssToCSS.findSCSS('assets/scss', { recursive: false })
console.log(searchResults)

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

Naam          | Type      | Beschrijving                                                          | Standaardwaarde
--------------|-----------|-----------------------------------------------------------------------|-----------------
`recursive`   | Booleaans | Recursief zoeken naar geneste bestanden in zoekMap is geslaagd.       | `true`
`verbose`     | Booleaans | Toon inloggen op console/terminal.                                    | `true`
`dotFolders`  | Booleaans | Puntmappen opnemen in het zoeken naar bestanden.                      | `false`
`ignores`     | Array     | Bestanden/mappen die moeten worden uitgesloten van de zoekresultaten. | `[]`

<br>

<img height=6px width="100%" src="https://assets.scsstocss.org/images/separators/aqua-gradient.png?v=7e4a141">

## 🏛️ MIT-licentie

**Auteursrecht © 2024 [Adam Lui](https://github.com/adamlui) en bijdragers**

Hierbij wordt gratis toestemming verleend aan elke persoon die een kopie van deze software en bijbehorende documentatiebestanden (de "Software") verkrijgt, om zonder beperking in de Software te handelen, inclusief maar niet beperkt tot de rechten om te gebruiken, kopiëren, wijzigen, samenvoegen publiceren, distribueren, in sublicentie geven en/of kopieën van de Software verkopen, en personen aan wie de Software wordt geleverd toestemming geven om dit te doen, met inachtneming van de volgende voorwaarden:

De bovenstaande copyrightkennisgeving en deze toestemmingsverklaring zullen worden opgenomen in alle kopieën of substantiële delen van de Software.

DE SOFTWARE WORDT GELEVERD "AS IS", ZONDER ENIGE GARANTIE, EXPLICIET OF IMPLICIET, INCLUSIEF MAAR NIET BEPERKT TOT DE GARANTIES VAN VERKOOPBAARHEID, GESCHIKTHEID VOOR EEN BEPAALD DOEL EN NIET-INBREUK. IN GEEN GEVAL ZULLEN DE AUTEURS OF AUTEURSRECHTHOUDERS AANSPRAKELIJK ZIJN VOOR ENIGE CLAIM, SCHADE OF ANDERE AANSPRAKELIJKHEID, HETZIJ IN EEN CONTRACT-, ONRECHTMATIGE DAAD OF ANDERSZINS, VOORTVLOEIEND UIT, UIT OF IN VERBAND MET DE SOFTWARE OF HET GEBRUIK OF ANDERE HANDELINGEN IN DE SOFTWARE.

<br>

<img height=6px width="100%" src="https://assets.scsstocss.org/images/separators/aqua-gradient.png?v=7e4a141">

## 🛠️ Gerelateerde hulpprogramma's

### [</> minify.js](https://minify-js.org) &nbsp;<a href="https://github.com/toolleeo/cli-apps#programming"><img height=18 src="https://assets.scsstocss.org/images/badges/awesome/badge.svg?v=7e4a141"></a>

> Verklein alle JavaScript-bestanden recursief.
<br>[Installeren](https://node.minify-js.org/#-installation) /
[Leesmij](https://node.minify-js.org/#readme) /
[CLI-gebruik](https://node.minify-js.org/#-command-line-usage) /
[API-gebruik](https://node.minify-js.org/#-api-usage) /
[Bespreken](https://github.com/adamlui/minify.js/discussions)

<br>

<img height=6px width="100%" src="https://assets.scsstocss.org/images/separators/aqua-gradient.png?v=7e4a141">

<picture><source media="(prefers-color-scheme: dark)" srcset="https://assets.scsstocss.org/images/icons/home/white/icon32x27.png?v=7e4a141"><img height=13 src="https://assets.scsstocss.org/images/icons/home/dark-gray/icon32x27.png?v=7e4a141"></picture> <a href="https://js-utils.org">**Meer JavaScript-hulpprogramma's**</a> /
<a href="https://github.com/adamlui/scss-to-css/discussions">Bespreken</a> /
<a href="#top">Terug naar boven ↑</a>
