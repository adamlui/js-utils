<div align="center">
    <h6>
        <picture>
            <source type="image/svg+xml" media="(prefers-color-scheme: dark)" srcset="https://assets.scsstocss.org/images/icons/earth/white/icon32.svg?v=7e4a141">
            <img height=14 src="https://assets.scsstocss.org/images/icons/earth/black/icon32.svg?v=7e4a141">
        </picture>
        &nbsp;Deutsch |
        <a href="../..#readme">English</a> |
        <a href="../zh-cn#readme">简体中文</a> |
        <a href="../zh-tw#readme">繁體中文</a> |
        <a href="../ja#readme">日本語</a> |
        <a href="../hi#readme">हिंदी</a> |
        <a href="../bn#readme">বাংলা</a> |
        <a href="../mr#readme">मराठी</a> |
        <a href="../pa#readme">ਪੰਜਾਬੀ</a> |
        <a href="../es#readme">Español</a> |
        <a href="../fr#readme">Français</a> |
        <a href="../it#readme">Italiano</a> |
        <a href="../nl#readme">Nederlands</a> |
        <a href="../pt#readme">Português</a>
    </h6>
</div>

# { } scss-to-css

### Kompilieren Sie alle SCSS-Dateien rekursiv in minimiertes CSS.

<a href="https://www.npmjs.com/package/@adamlui/scss-to-css">
    <img height=31 src="https://img.shields.io/npm/dm/%40adamlui%2Fscss-to-css?label=Herunterladungen&logo=npm&color=af68ff&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="#%EF%B8%8F-mit-lizenz">
    <img height=31 src="https://img.shields.io/badge/Lizenz-MIT-fc4f2d.svg?logo=internetarchive&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://github.com/adamlui/js-utils/releases/tag/scss-to-css-1.10.47">
    <img height=31 src="https://img.shields.io/badge/Neueste_Version-1.10.47-44cc11.svg?logo=icinga&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://www.npmjs.com/package/@adamlui/scss-to-css?activeTab=code">
    <img height=31 src="https://img.shields.io/npm/unpacked-size/%40adamlui%2Fscss-to-css?label=Ausgepackte%20Gr%C3%B6%C3%9Fe&style=for-the-badge&logo=ebox&logoColor=white&color=blue&labelColor=464646"></a>
<a href="https://sonarcloud.io/component_measures?metric=new_vulnerabilities&id=adamlui_scss-to-css:node.js/src/scss-to-css.js">
    <img height=31 src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fsonarcloud.io%2Fapi%2Fmeasures%2Fcomponent%3Fcomponent%3Dadamlui_scss-to-css%3Anode.js%2Fsrc%2Fscss-to-css.js%26metricKeys%3Dvulnerabilities&query=%24.component.measures.0.value&style=for-the-badge&logo=sonarcloud&logoColor=white&labelColor=464646&label=Schwachstellen&color=gold"></a>
<a href="https://github.com/toolleeo/cli-apps#conversion">
    <img height=31 src="https://img.shields.io/badge/Erwähnt_in-Awesome-c4a2bd?logo=awesomelists&logoColor=white&labelColor=464646&style=for-the-badge"></a>

<img height=6px width="100%" src="https://assets.scsstocss.org/images/separators/aqua-gradient.png?v=7e4a141">

## ⚡ Installation

Als **globales Dienstprogramm**:

```
$ npm install -g @adamlui/scss-to-css
```

Als **Entwicklerabhängigkeit** (z.B. für Build-Skripte) aus Ihrem Projektstammverzeichnis:

```
$ npm install -D @adamlui/scss-to-css
```

Als **Laufzeitabhängigkeit** (z.B. für die spontane Kompilierung) aus Ihrem Projektstammverzeichnis:

```
$ npm install @adamlui/scss-to-css
```

<br>

<a href="https://github.com/sponsors/adamlui"><img src="https://assets.scsstocss.org/images/banners/sponsor/$10/banner1660x260.png?v=f3129dd"></a>

<img height=6px width="100%" src="https://assets.scsstocss.org/images/separators/aqua-gradient.png?v=7e4a141">

## 💻 Verwendung der Befehlszeile

Der grundlegende **globale Befehl** lautet:

```
$ scss-to-css
```

Beispielausgabe:

<img src="https://cdn.jsdelivr.net/gh/adamlui/scss-to-css@b74edea/node.js/media/images/screenshots/cli/scss-to-css-docs-cmd-output.png">

**📝 Hinweis:** Quellkarten werden ebenfalls standardmäßig generiert, es sei denn, `-S` oder `--no-source-maps` wird übergeben.

#

So geben Sie **Eingabe-/Ausgabepfade** an:

```
$ scss-to-css [eingabepfad] [ausgabepfad]
```

- `[eingabepfad]`: Pfad zur SCSS-Datei oder zum Verzeichnis, das die zu kompilierenden SCSS-Dateien enthält, relativ zum aktuellen Arbeitsverzeichnis.
- `[ausgabepfad]`: Pfad zur Datei oder zum Verzeichnis, in dem CSS- und Quellzuordnungsdateien gespeichert werden, relativ zum ursprünglichen Dateispeicherort (falls nicht angegeben, wird `css/` verwendet).

**📝 Hinweis:** Wenn Ordner übergeben werden, werden Dateien rekursiv verarbeitet, es sei denn, `-R` oder `--no-recursion` wird übergeben.

#

Zur Verwendung als **Paketskript** in der `package.json` Ihres Projekts:

```json
  "scripts": {
    "build:css": "<scss-to-css-cmd>"
  },
```

Ersetzen Sie `<scss-to-css-cmd>` durch `scss-to-css` + optionale Argumente. Anschließend kann `npm run build:css` verwendet werden, um den Befehl auszuführen.

#

### Beispielbefehle

Kompilieren Sie alle SCSS-Dateien im **aktuellen Verzeichnis** (Ausgaben nach `css/`):

```
$ scss-to-css
```

Kompilieren Sie alle SCSS-Dateien in einem **bestimmten Verzeichnis** (Ausgaben in `pfad/zu/ihrem/verzeichnis/css/`):

```
$ scss-to-css pfad/zu/ihrem/verzeichnis
```

Kompilieren Sie eine **spezifische Datei** (Ausgaben in `pfad/zu/ihrem/css/datei.min.css`):

```
$ scss-to-css pfad/zu/ihrem/datei.scss
```

Geben Sie sowohl **Eingabe- als auch Ausgabeverzeichnisse** an (Ausgaben in `ausgabeordner/`):

```
$ scss-to-css eingabeordner ausgabeordner
```

**📝 Hinweis:** Ausgabe-CSS wird minimiert, sofern nicht `-M` oder `--no-minify` übergeben wird.

#

### Befehlszeilenoptionen

```
Boolesche Optionen:
 -n, --dry-run                            Kompilieren Sie die Datei(en) nicht wirklich, sondern zeigen Sie nur an, ob sie verarbeitet werden.
 -d, --include-dotfolders                 Beziehen Sie Punktordner in die Dateisuche ein.
 -S, --no-source-maps                     Verhindern Sie, dass Quellkarten generiert werden.
 -M, --no-minify                          Deaktivieren Sie die Minimierung des Ausgabe-CSS.
 -R, --no-recursion                       Deaktivieren Sie die rekursive Dateisuche.
 -c, --copy                               Kopieren Sie kompiliertes CSS in die Zwischenablage, anstatt in eine Datei zu schreiben, wenn eine einzelne Quelldatei verarbeitet wird.
 -q, --quiet                              Unterdrücken Sie alle Protokolle außer Fehlern.

Parameteroptionen:
 --ignore-files="file1.scss,file2.scss"   Dateien, die von der Kompilierung ausgeschlossen werden sollen.
 --comment="comment"                      Header-Kommentar dem kompilierten CSS voranstellen. Mit '\n' zeilenweise trennen.

Info-Befehle:
 -h, --help                               Hilfebildschirm anzeigen.
 -v, --version                            Versionsnummer anzeigen.
```

<br>

<img height=6px width="100%" src="https://assets.scsstocss.org/images/separators/aqua-gradient.png?v=7e4a141">

## 🔌 API-Nutzung

Sie können auch **scss-to-css** in Ihre App importieren, um deren API-Methoden zu verwenden, sowohl als ECMAScript-Modul als auch als CommonJS-Modul.

#### ECMAScript*:

```js
import scssToCSS from '@adamlui/scss-to-css';
```

#### CJS:

```js
const scssToCSS = require('@adamlui/scss-to-css');
```

###### _*Node.js Version 14 oder höher erforderlich_

#

### `compile(eingang[, optionen])`

💡 Kompiliert SCSS basierend auf der bereitgestellten Zeichenfolgeneingabe.

Wenn **Quellcode** übergeben wird, wird dieser direkt kompiliert, dann wird ein Objekt zurückgegeben, das `srcPath` + `code` + `srcMap` + `error` enthält:

```js
const quellcode = 'h1 { font-size: 40px ; code { font-face: Roboto Mono }}',
      kompEbnis = scssToCSS.compile(quellcode);

console.log(kompEbnis.error); // gibt einen Laufzeitfehler oder `undefined` aus, wenn kein Fehler vorliegt
console.log(kompEbnis.code);  // gibt minimiertes CSS aus: 'h1{font-size:40px}h1 code{font-face:Roboto Mono}'
```

Wenn ein **Dateipfad** übergeben wird, wird der Code der Datei geladen und dann in CSS kompiliert, wodurch ein Objekt wie oben zurückgegeben wird.

Wenn ein **Verzeichnispfad** übergeben wird, wird nach SCSS-Dateien gesucht (standardmäßig rekursiv), der Code jeder Datei wird geladen und dann kompiliert, dann wird ein Array von Objekten zurückgegeben, die `srcPath` + `code` + `srcMap` + `error` enthalten:

```js
// Gibt Pfade zu SCSS-Dateien im Arbeitsverzeichnis + allen verschachtelten Verzeichnissen aus
const kompEbnisse = scssToCSS.compile('.');
kompEbnisse.forEach(ergebnis => console.log(ergebnis.srcPath));

// Gibt kompiliertes CSS aus der zweiten SCSS-Datei aus, wenn es gefunden wird, oder `undefined`, wenn es nicht gefunden wird
console.log(kompEbnisse[1].code);
```

Optionen sind boolesche Werte und werden als Objekteigenschaften übergeben. Zum Beispiel:

```js
// Gibt ein Array von Datenobjekten zurück, wobei `.code` nicht minimiertes CSS enthält
scssToCSS.compile(eingangVer, { minify: false });
```

Verfügbare Parameter (und ihre Standardeinstellungen) sind:

Name          | Typ             | Beschreibung                                                                                 | Standardwert
--------------|-----------------|----------------------------------------------------------------------------------------------|--------------
`recursive`   | Boolescher Wert | Rekursive Suche nach verschachtelten Dateien, wenn der Verzeichnispfad übergeben wird.       | `true`
`verbose`     | Boolescher Wert | Anmeldung in Konsole/Terminal anzeigen.                                                      | `true`
`dotFolders`  | Boolescher Wert | Beziehen Sie Punktordner in die Dateisuche ein.                                              | `false`
`minify`      | Boolescher Wert | Ausgabe-CSS minimieren.                                                                      | `true`
`sourceMaps`  | Boolescher Wert | Generieren Sie CSS-Quellkarten.                                                              | `true`
`ignoreFiles` | Array           | Dateien (nach Namen), die von der Kompilierung ausgeschlossen werden sollen.                 | `[]`
`comment`     | Zeichenfolge    | Header-Kommentar, der dem kompilierten CSS vorangestellt wird. Mit '\n' zeilenweise trennen. | `''`

#

### `findSCSS(suchverzeichnis[, optionen])`

💡 Sucht nach allen SCSS-Dateien innerhalb der übergebenen Zeichenfolge `suchverzeichnis` (nützlich, um herauszufinden, welche Dateien [`compile()`](#compileeingang-optionen) verarbeiten wird) und gibt ein Array mit ihren Dateipfaden zurück.

Optionen sind boolesche Werte und werden als Objekteigenschaften übergeben. Zum Beispiel:

```js
// Suche nach SCSS-Dateien genau in assets/scss
const suchergEbnisse = scssToCSS.findSCSS('assets/scss', { recursive: false });
console.log(suchergEbnisse);

/* beispielausgabe:

findSCSS() » Searching for SCSS files...
findSCSS() » Search complete! 2 files found.
findSCSS() » Check returned array.
[
  'E:\\js\\utils\\scss-to-css\assets\\scss\\foo.scss',
  'E:\\js\\utils\\scss-to-css\assets\\scss\\bar.scss'
]
*/
```

Verfügbare Parameter (und ihre Standardeinstellungen) sind:

Name          | Typ             | Beschreibung                                                                    | Standardwert
--------------|-----------------|---------------------------------------------------------------------------------|--------------
`recursive`   | Boolescher Wert | Rekursive Suche nach verschachtelten Dateien im übergebenen suchverzeichnis.    | `true`
`verbose`     | Boolescher Wert | Anmeldung in Konsole/Terminal anzeigen.                                         | `true`
`dotFolders`  | Boolescher Wert | Beziehen Sie Punktordner in die Dateisuche ein.                                 | `false`
`ignoreFiles` | Array           | Dateien (nach Namen), die aus den Suchergebnissen ausgeschlossen werden sollen. | `[]`

<br>

<img height=6px width="100%" src="https://assets.scsstocss.org/images/separators/aqua-gradient.png?v=7e4a141">

## 🏛️ MIT-Lizenz

**Urheberrechte © 2024 [Adam Lui](https://github.com/adamlui) und Mitwirkende**

Hiermit wird jeder Person, die eine Kopie dieser Software und der zugehörigen Dokumentationsdateien (die „Software“) erhält, kostenlos die Erlaubnis erteilt, mit der Software ohne Einschränkung zu handeln, einschließlich und ohne Einschränkung der Rechte zur Nutzung, zum Kopieren, Ändern und Zusammenführen , Kopien der Software zu veröffentlichen, zu verteilen, unterzulizenzieren und/oder zu verkaufen und Personen, denen die Software zur Verfügung gestellt wird, dies zu gestatten, vorbehaltlich der folgenden Bedingungen:

Der obige Urheberrechtshinweis und dieser Genehmigungshinweis müssen in allen Kopien oder wesentlichen Teilen der Software enthalten sein.

DIE SOFTWARE WIRD „WIE BESEHEN“ ZUR VERFÜGUNG GESTELLT, OHNE JEGLICHE AUSDRÜCKLICHE ODER STILLSCHWEIGENDE GEWÄHRLEISTUNG, EINSCHLIESSLICH, ABER NICHT BESCHRÄNKT AUF DIE GEWÄHRLEISTUNG DER MARKTGÄNGIGKEIT, EIGNUNG FÜR EINEN BESTIMMTEN ZWECK UND NICHTVERLETZUNG. IN KEINEM FALL SIND DIE AUTOREN ODER URHEBERRECHTSINHABER HAFTBAR FÜR JEGLICHE ANSPRÜCHE, SCHÄDEN ODER ANDERE HAFTUNG, WEDER AUS EINER VERTRAGLICHEN HANDLUNG, AUS HANDLUNG ODER ANDERWEITIG, DIE SICH AUS, AUS ODER IN ZUSAMMENHANG MIT DER SOFTWARE ODER DER NUTZUNG ODER ANDEREN HANDELN IN DER SOFTWARE ERGEBEN SOFTWARE.

<br>

<img height=6px width="100%" src="https://assets.scsstocss.org/images/separators/aqua-gradient.png?v=7e4a141">

## 🛠️ Verwandte Dienstprogramme

### [🖼️ img-to-webp](https://github.com/adamlui/js-utils/tree/main/img-to-webp)

> Komprimieren Sie alle Bilder rekursiv zu WEBPs.
<br>[Herunterladen](https://cdn.jsdelivr.net/gh/adamlui/js-utils/img-to-webp/img-to-webp.js) /
[Diskutieren](https://github.com/adamlui/js-utils/discussions)

### [</> minify.js](https://minify-js.org) &nbsp;<a href="https://github.com/toolleeo/cli-apps#programming"><img height=18 src="https://assets.scsstocss.org/images/badges/awesome/badge.svg?v=7e4a141"></a>

> Alle JavaScript-Dateien rekursiv verkleinern.
<br>[Installieren](https://minify-js.org/docs/de#-installation) /
[CLI-Nutzung](https://minify-js.org/docs/de#-verwendung-der-befehlszeile) /
[API-Nutzung](https://minify-js.org/docs/de#-api-nutzung) /
[Liesmich](https://minify-js.org/docs/de#readme) /
[Diskutieren](https://github.com/adamlui/minify.js/discussions)

<br>

<img height=6px width="100%" src="https://assets.scsstocss.org/images/separators/aqua-gradient.png?v=7e4a141">

<picture><source media="(prefers-color-scheme: dark)" srcset="https://assets.scsstocss.org/images/icons/home/white/icon32x27.png?v=7e4a141"><img height=13 src="https://assets.scsstocss.org/images/icons/home/dark-gray/icon32x27.png?v=7e4a141"></picture> <a href="https://js-utils.org">**Weitere JavaScript-Dienstprogramme**</a> /
<a href="https://github.com/adamlui/scss-to-css/discussions">Diskutieren</a> /
<a href="#--scss-to-css">Zurück nach oben ↑</a>
