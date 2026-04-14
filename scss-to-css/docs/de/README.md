<a id="top"></a>

<div align="center">
    <h6>
        <picture>
            <source type="image/svg+xml" media="(prefers-color-scheme: dark)" srcset="https://cdn.jsdelivr.net/gh/adamlui/scss-to-css@7e4a141/assets/images/icons/earth/white/icon32.svg">
            <img height=14 src="https://cdn.jsdelivr.net/gh/adamlui/scss-to-css@7e4a141/assets/images/icons/earth/black/icon32.svg">
        </picture>
        &nbsp;Deutsch |
        <a href="../..#readme">English</a> |
        <a href="../zh-cn/#readme">简体中文</a> |
        <a href="../zh-tw/#readme">繁體中文</a> |
        <a href="../ja/#readme">日本語</a> |
        <a href="../hi/#readme">हिंदी</a> |
        <a href="../bn/#readme">বাংলা</a> |
        <a href="../mr/#readme">मराठी</a> |
        <a href="../pa/#readme">ਪੰਜਾਬੀ</a> |
        <a href="../es/#readme">Español</a> |
        <a href="../fr/#readme">Français</a> |
        <a href="../it/#readme">Italiano</a> |
        <a href="../nl/#readme">Nederlands</a> |
        <a href="../pt/#readme">Português</a>
    </h6>
</div>

# { } scss-to-css

### Kompilieren Sie alle SCSS-Dateien rekursiv in minimiertes CSS.

<a href="https://npm-compare.com/@adamlui/scss-to-css/#timeRange=ALL">
    <img height=31 src="https://img.shields.io/npm/dm/%40adamlui%2Fscss-to-css?label=Herunterladungen&logo=npm&color=af68ff&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://github.com/adamlui/js-utils/releases/tag/scss-to-css-2.4.4">
    <img height=31 src="https://img.shields.io/badge/Neueste_Version-2.4.4-44cc11.svg?logo=icinga&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="#%EF%B8%8F-mit-lizenz">
    <img height=31 src="https://img.shields.io/badge/Lizenz-MIT-orange.svg?logo=internetarchive&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://www.npmjs.com/package/@adamlui/scss-to-css?activeTab=code">
    <img height=31 src="https://img.shields.io/npm/unpacked-size/%40adamlui%2Fscss-to-css?label=Ausgepackte%20Gr%C3%B6%C3%9Fe&style=for-the-badge&logo=ebox&logoColor=white&color=blue&labelColor=464646"></a>
<a href="https://sonarcloud.io/component_measures?metric=vulnerabilities&selected=adamlui_js-utils%3Ascss-to-css&id=adamlui_js-utils">
    <img height=31 src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fsonarcloud.io%2Fapi%2Fmeasures%2Fcomponent%3Fcomponent%3Dadamlui_scss-to-css%3Asrc%2Fscss-to-css.js%26metricKeys%3Dvulnerabilities&query=%24.component.measures.0.value&style=for-the-badge&logo=sonar&logoColor=white&labelColor=464646&label=Schwachstellen&color=gold"></a>
<a href="https://github.com/toolleeo/cli-apps/#conversion">
    <img height=31 src="https://img.shields.io/badge/Erwähnt_in-Awesome-ff69b4?logo=awesomelists&logoColor=white&labelColor=464646&style=for-the-badge"></a>

<img height=6px width="100%" src="https://cdn.jsdelivr.net/gh/adamlui/scss-to-css@7e4a141/assets/images/separators/aqua-gradient.png">

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

<a href="https://github.com/sponsors/adamlui"><img src="https://cdn.jsdelivr.net/gh/adamlui/scss-to-css@f3129dd/assets/images/banners/sponsor/$10/banner1660x260.png"></a>

<img height=6px width="100%" src="https://cdn.jsdelivr.net/gh/adamlui/scss-to-css@7e4a141/assets/images/separators/aqua-gradient.png">

## 💻 Verwendung der Befehlszeile

Der grundlegende **globale Befehl** lautet:

```
$ scss-to-css
```

Beispielausgabe:

<img src="https://cdn.jsdelivr.net/gh/adamlui/scss-to-css@fe2867e/assets/images/screenshots/cli/scss-to-css-docs-cmd-output.png">

**📝 Hinweis:** Quellkarten werden ebenfalls standardmäßig generiert, es sei denn, `-S` oder `--no-source-maps` wird übergeben.

#

So geben Sie **Eingabe-/Ausgabepfade** an:

```
$ scss-to-css [eingabepfad] [ausgabepfad]
```

- `[eingabepfad]`: Pfad zur SCSS-Datei oder zum Verzeichnis, das die zu kompilierenden SCSS-Dateien enthält, relativ zum aktuellen Arbeitsverzeichnis.
- `[ausgabepfad]`: Pfad zur Datei oder zum Verzeichnis, in dem die CSS- und Source-Map-Dateien gespeichert werden (relativ zum Eingabeverzeichnis). Falls nicht angegeben, wird `css/` verwendet.

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

Kompilieren Sie alle SCSS-Dateien in einem **bestimmten Verzeichnis** (Ausgaben in `css/pfad/zu/ihrem/verzeichnis/`):

```
$ scss-to-css pfad/zu/ihrem/verzeichnis
```

Kompilieren Sie eine **spezifische Datei** (Ausgaben in `css/pfad/zu/ihrem/datei.min.css`):

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
 -r, --relative-output                    Ausgabedateien werden relativ zu jeder Quelldatei anstatt zum Eingabeverzeichnis erstellt.
 -c, --copy                               Kopieren Sie kompiliertes CSS in die Zwischenablage, anstatt in eine Datei zu schreiben, wenn eine einzelne Quelldatei verarbeitet wird.
 -q, --quiet                              Unterdrücken Sie alle Protokolle außer Fehlern.

Parameteroptionen:
 --ignores="dir/,file1.scss,file2.sass"   Dateien/Verzeichnisse, die von der Kompilierung ausgeschlossen werden sollen.
 --comment="comment"                      Header-Kommentar dem kompilierten CSS voranstellen. Mit '\n' zeilenweise trennen.
 --ui-lang="code"                         ISO 639-1-Code der Sprache, in der die Benutzeroberfläche angezeigt werden soll.
 --config="path/to/file"                  Benutzerdefinierte Konfigurationsdatei laden.

Befehle:
 -i, --init                               Konfigurationsdatei erstellen (im Projektstammverzeichnis).
 -h, --help                               Hilfebildschirm anzeigen.
 -v, --version                            Versionsnummer anzeigen.
     --stats                              npm-Statistiken anzeigen.
     --debug [targetKey]                  Debug-Protokolle anzeigen.
```

#

### Konfigurationsdatei

**scss-to-css** kann mithilfe einer Datei namens `scss-to-css.config.mjs` oder `scss-to-css.config.js` im Projektstammverzeichnis angepasst werden.

Beispiel für Standardeinstellungen:

```js
export default {
    dryRun: false,            // Die Dateien nicht tatsächlich minimieren, sondern nur anzeigen, ob sie verarbeitet werden
    includeDotFolders: false, // Punktordner in die Dateisuche einbeziehen
    noSourceMaps: false,      // Die Generierung von Source Maps verhindern
    noMinify: false,          // Die Minimierung des ausgegebenen CSS deaktivieren
    noRecursion: false,       // Die rekursive Dateisuche deaktivieren
    relativeOutput: false,    // Ausgabedateien relativ zu jeder Quelldatei anstatt zum Eingabestammverzeichnis ausgeben
    copy: false,              // Kompiliertes CSS in die Zwischenablage kopieren, anstatt in eine Datei zu schreiben, wenn nur eine Datei verarbeitet wird
    quietMode: false,         // Alle Protokollmeldungen außer Fehlern unterdrücken
    ignores: '',              // Dateien/Verzeichnisse, die von der Minimierung ausgeschlossen werden sollen
    comment: ''               // Kopfzeilenkommentar, der dem minimierten Code vorangestellt wird
}
```

💡 Führen Sie `scss-to-css init` aus, um eine Vorlage für die `scss-to-css.config.mjs` in Ihrem Projektstammverzeichnis zu erstellen.

<br>

<img height=6px width="100%" src="https://cdn.jsdelivr.net/gh/adamlui/scss-to-css@7e4a141/assets/images/separators/aqua-gradient.png">

## 🔌 API-Nutzung

Sie können auch **scss-to-css** in Ihre App importieren, um deren API-Methoden zu verwenden, sowohl als ECMAScript-Modul als auch als CommonJS-Modul.

#### ECMAScript*:

```js
import scssToCSS from '@adamlui/scss-to-css'
```

#### CJS:

```js
const scssToCSS = require('@adamlui/scss-to-css')
```

###### _*Node.js Version 14 oder höher erforderlich_

#

### `compile(eingang[, optionen])`

💡 Kompiliert SCSS basierend auf der bereitgestellten Zeichenfolgeneingabe.

Wenn **Quellcode** übergeben wird, wird dieser direkt kompiliert, dann wird ein Objekt zurückgegeben, das `srcPath` + `code` + `srcMap` + `error` enthält:

```js
const quellcode = 'h1 { font-size: 40px ; code { font-face: Roboto Mono }}',
      kompEbnis = scssToCSS.compile(quellcode)

console.log(kompEbnis.error) // gibt einen Laufzeitfehler oder `undefined` aus, wenn kein Fehler vorliegt
console.log(kompEbnis.code)  // gibt minimiertes CSS aus: 'h1{font-size:40px}h1 code{font-face:Roboto Mono}'
```

Wenn ein **Dateipfad** übergeben wird, wird der Code der Datei geladen und dann in CSS kompiliert, wodurch ein Objekt wie oben zurückgegeben wird.

Wenn ein **Verzeichnispfad** übergeben wird, wird nach SCSS-Dateien gesucht (standardmäßig rekursiv), der Code jeder Datei wird geladen und dann kompiliert, dann wird ein Array von Objekten zurückgegeben, die `srcPath` + `code` + `srcMap` + `error` enthalten:

```js
// Gibt Pfade zu SCSS-Dateien im Arbeitsverzeichnis + allen verschachtelten Verzeichnissen aus
const kompEbnisse = scssToCSS.compile('.')
kompEbnisse.forEach(ergebnis => console.log(ergebnis.srcPath))

// Gibt kompiliertes CSS aus der zweiten SCSS-Datei aus, wenn es gefunden wird, oder `undefined`, wenn es nicht gefunden wird
console.log(kompEbnisse[1].code)
```

Optionen sind boolesche Werte und werden als Objekteigenschaften übergeben. Zum Beispiel:

```js
// Gibt ein Array von Datenobjekten zurück, wobei `.code` nicht minimiertes CSS enthält
scssToCSS.compile(eingangVer, { minify: false })
```

Verfügbare Parameter (und ihre Standardeinstellungen) sind:

Name             | Typ             | Beschreibung                                                                                 | Standardwert
-----------------|-----------------|----------------------------------------------------------------------------------------------|--------------
`recursive`      | Boolescher Wert | Rekursive Suche nach verschachtelten Dateien, wenn der Verzeichnispfad übergeben wird.       | `true`
`verbose`        | Boolescher Wert | Anmeldung in Konsole/Terminal anzeigen.                                                      | `true`
`dotFolders`     | Boolescher Wert | Beziehen Sie Punktordner in die Dateisuche ein.                                              | `false`
`minify`         | Boolescher Wert | Ausgabe-CSS minimieren.                                                                      | `true`
`sourceMaps`     | Boolescher Wert | Generieren Sie CSS-Quellkarten.                                                              | `true`
`relativeOutput` | Boolescher Wert | Ausgabedateien werden relativ zu jeder Quelldatei anstatt zum Eingabeverzeichnis erstellt.   | `false`
`ignores`        | Array           | Dateien/Verzeichnisse, die von der Kompilierung ausgeschlossen werden sollen.                | `[]`
`comment`        | Zeichenfolge    | Header-Kommentar, der dem kompilierten CSS vorangestellt wird. Mit '\n' zeilenweise trennen. | `''`

#

### `findSCSS(suchverzeichnis[, optionen])`

💡 Sucht nach allen SCSS-Dateien innerhalb der übergebenen Zeichenfolge `suchverzeichnis` (nützlich, um herauszufinden, welche Dateien [`compile()`](#compileeingang-optionen) verarbeiten wird) und gibt ein Array mit ihren Dateipfaden zurück.

Optionen sind boolesche Werte und werden als Objekteigenschaften übergeben. Zum Beispiel:

```js
// Suche nach SCSS-Dateien genau in assets/scss
const suchergEbnisse = scssToCSS.findSCSS('assets/scss', { recursive: false })
console.log(suchergEbnisse)

/* beispielausgabe:

findSCSS() » Searching for SCSS files...
findSCSS() » Search complete! 2 files found.
findSCSS() » Check returned array.
[
  'E:\\js\\utils\\scss-to-css\assets\\scss\\foo.scss',
  'E:\\js\\utils\\scss-to-css\assets\\scss\\bar.sass'
]
*/
```

Verfügbare Parameter (und ihre Standardeinstellungen) sind:

Name          | Typ             | Beschreibung                                                                     | Standardwert
--------------|-----------------|----------------------------------------------------------------------------------|--------------
`recursive`   | Boolescher Wert | Rekursive Suche nach verschachtelten Dateien im übergebenen suchverzeichnis.     | `true`
`verbose`     | Boolescher Wert | Anmeldung in Konsole/Terminal anzeigen.                                          | `true`
`dotFolders`  | Boolescher Wert | Beziehen Sie Punktordner in die Dateisuche ein.                                  | `false`
`ignores`     | Array           | Dateien/Verzeichnisse, die von den Suchergebnissen ausgeschlossen werden sollen. | `[]`

<br>

<img height=6px width="100%" src="https://cdn.jsdelivr.net/gh/adamlui/scss-to-css@7e4a141/assets/images/separators/aqua-gradient.png">

## 🏛️ MIT-Lizenz

**Urheberrechte © 2024 [Adam Lui](https://github.com/adamlui) und Mitwirkende**

Hiermit wird jeder Person, die eine Kopie dieser Software und der zugehörigen Dokumentationsdateien (die „Software“) erhält, kostenlos die Erlaubnis erteilt, mit der Software ohne Einschränkung zu handeln, einschließlich und ohne Einschränkung der Rechte zur Nutzung, zum Kopieren, Ändern und Zusammenführen , Kopien der Software zu veröffentlichen, zu verteilen, unterzulizenzieren und/oder zu verkaufen und Personen, denen die Software zur Verfügung gestellt wird, dies zu gestatten, vorbehaltlich der folgenden Bedingungen:

Der obige Urheberrechtshinweis und dieser Genehmigungshinweis müssen in allen Kopien oder wesentlichen Teilen der Software enthalten sein.

DIE SOFTWARE WIRD „WIE BESEHEN“ ZUR VERFÜGUNG GESTELLT, OHNE JEGLICHE AUSDRÜCKLICHE ODER STILLSCHWEIGENDE GEWÄHRLEISTUNG, EINSCHLIESSLICH, ABER NICHT BESCHRÄNKT AUF DIE GEWÄHRLEISTUNG DER MARKTGÄNGIGKEIT, EIGNUNG FÜR EINEN BESTIMMTEN ZWECK UND NICHTVERLETZUNG. IN KEINEM FALL SIND DIE AUTOREN ODER URHEBERRECHTSINHABER HAFTBAR FÜR JEGLICHE ANSPRÜCHE, SCHÄDEN ODER ANDERE HAFTUNG, WEDER AUS EINER VERTRAGLICHEN HANDLUNG, AUS HANDLUNG ODER ANDERWEITIG, DIE SICH AUS, AUS ODER IN ZUSAMMENHANG MIT DER SOFTWARE ODER DER NUTZUNG ODER ANDEREN HANDELN IN DER SOFTWARE ERGEBEN SOFTWARE.

<br>

<img height=6px width="100%" src="https://cdn.jsdelivr.net/gh/adamlui/scss-to-css@7e4a141/assets/images/separators/aqua-gradient.png">

## 🛠️ Verwandte Dienstprogramme

### [</> minify.js](https://github.com/adamlui/minify.js/#readme) &nbsp;<a href="https://github.com/toolleeo/cli-apps/#programming"><img height=18 src="https://cdn.jsdelivr.net/gh/adamlui/scss-to-css@7e4a141/assets/images/badges/awesome/badge.svg"></a>

> Alle JavaScript-Dateien rekursiv verkleinern.
<br>[Installieren](https://github.com/adamlui/minify.js/tree/main/node.js/docs/de/#-installation) /
[CLI-Nutzung](https://github.com/adamlui/minify.js/tree/main/node.js/docs/de/#-verwendung-der-befehlszeile) /
[API-Nutzung](https://github.com/adamlui/minify.js/tree/main/node.js/docs/de/#-api-nutzung) /
[Liesmich](https://github.com/adamlui/minify.js/tree/main/node.js/docs/de/#readme) /
[Diskutieren](https://github.com/adamlui/minify.js/discussions)

<br>

<img height=6px width="100%" src="https://cdn.jsdelivr.net/gh/adamlui/scss-to-css@7e4a141/assets/images/separators/aqua-gradient.png">

<picture><source media="(prefers-color-scheme: dark)" srcset="https://cdn.jsdelivr.net/gh/adamlui/scss-to-css@7e4a141/assets/images/icons/home/white/icon32x27.png"><img height=13 src="https://cdn.jsdelivr.net/gh/adamlui/scss-to-css@7e4a141/assets/images/icons/home/dark-gray/icon32x27.png"></picture> <a href="https://github.com/adamlui/js-utils/#readme">**Weitere JavaScript-Dienstprogramme**</a> /
<a href="https://github.com/adamlui/scss-to-css/discussions">Diskutieren</a> /
<a href="https://github.com/adamlui/scss-to-css/issues">Fehler melden</a> /
<a href="mailto:security@tidelift.com">Schwachstelle melden</a> /
<a href="#top">Zurück nach oben ↑</a>
