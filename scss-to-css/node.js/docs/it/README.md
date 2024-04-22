<div align="center">
    <h6>
        <picture>
            <source type="image/svg+xml" media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/earth-icon/white/icon32.svg">
            <img height=14 src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/earth-icon/black/icon32.svg">
        </picture>
        &nbsp;Italiano |
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
        <a href="../nl#readme">Nederlands</a> |
        <a href="../pt#readme">Português</a>
    </h6>
</div>

# { } scss-to-css

### Compila ricorsivamente tutti i file SCSS in CSS minimizzati.

<a href="https://www.npmjs.com/package/@adamlui/scss-to-css"><img height=31 src="https://img.shields.io/npm/dm/%40adamlui%2Fscss-to-css?label=Scaricamenti&logo=npm&color=af68ff&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="#%EF%B8%8F-licenza-del-mit"><img height=31 src="https://img.shields.io/badge/Licenza-MIT-orange.svg?logo=internetarchive&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://github.com/adamlui/js-utils/releases/tag/scss-to-css-1.7.14"><img height=31 src="https://img.shields.io/badge/Ultima_Versione-1.7.14-44cc11.svg?logo=icinga&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://www.npmjs.com/package/@adamlui/scss-to-css?activeTab=code"><img height=31 src="https://img.shields.io/npm/unpacked-size/%40adamlui%2Fscss-to-css?label=Dimensioni+Senza+Confezione&style=for-the-badge&logo=ebox&logoColor=white&color=blue&labelColor=464646"></a>
<a href="https://sonarcloud.io/component_measures?metric=new_vulnerabilities&id=adamlui_scss-to-css:node.js/src/scss-to-css.js"><img height=31 src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fsonarcloud.io%2Fapi%2Fmeasures%2Fcomponent%3Fcomponent%3Dadamlui_scss-to-css%3Anode.js%2Fsrc%2Fscss-to-css.js%26metricKeys%3Dvulnerabilities&query=%24.component.measures.0.value&style=for-the-badge&logo=sonarcloud&logoColor=white&labelColor=464646&label=Vulnerabilit%C3%A0&color=gold"></a>
<a href="https://github.com/toolleeo/cli-apps#conversion"><img height=31 src="https://img.shields.io/badge/Menzionato_in-Awesome-c4a2bd?logo=awesomelists&logoColor=white&labelColor=464646&style=for-the-badge"></a>

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

## ⚡ Installazione

Come **utilità globale**:

```
$ npm install -g @adamlui/scss-to-css
```

Come **dipendenza dello sviluppatore** (ad esempio per gli script di compilazione), dalla root del tuo progetto:

```
$ npm install -D @adamlui/scss-to-css
```

Come **dipendenza runtime** (ad esempio per la compilazione al volo), dalla radice del progetto:

```
$ npm install @adamlui/scss-to-css
```

<br>

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

## 💻 Utilizzo della riga di comando

Il **comando globale** di base è:

```
$ scss-to-css
```

Output di esempio:

<img src="https://raw.githubusercontent.com/adamlui/scss-to-css/main/node.js/media/images/screenshots/cli-scss-to-css-docs.png">

**💡 Nota:** Anche le mappe sorgente vengono generate per impostazione predefinita a meno che non venga passato `-S` o `--no-source-maps`.

#

Per specificare i percorsi **input/output**:

```
$ scss-to-css [percorso_input] [percorso_output]
```

- `[percorso_input]`: Percorso del file SCSS o della direttorio contenente i file SCSS da compilare, relativo alla direttorio di lavoro corrente.
- `[percorso_output]`: Percorso del file o della direttorio in cui verranno archiviati i file CSS + mappa sorgente, relativo alla posizione del file originale (se non fornito, viene utilizzato `css/`).

**💡 Nota:** Se vengono passate cartelle, i file verranno elaborati in modo ricorsivo a meno che non venga passato `-R` o `--no-recursion`.

#

Da utilizzare come **script di pacchetto**, nel `package.json` del tuo progetto:

```json
  "scripts": {
    "build:css": "<scss-to-css-cmd>"
  },
```

Sostituisci `<scss-to-css-cmd>` con `scss-to-css` + argomenti facoltativi. Quindi, è possibile utilizzare `npm run build:css` per eseguire il comando.

#

### Comandi di esempio

Compila tutti i file SCSS nella **direttorio corrente** (output in `css/`):

```
$ scss-to-css
```

Compila tutti i file SCSS in una **direttorio specifica** (output in `percorso/della/tua/direttorio/css/`):

```
$ scss-to-css percorso/della/tua/direttorio
```

Compila un **file specifico** (output in `percorso/della/tua/css/file.min.css`):

```
$ scss-to-css percorso/della/tua/file.scss
```

Specifica entrambe le direttorio **input e output** (output in `cartella_output/`):

```
$ scss-to-css cartella_input cartella_output
```

**💡 Nota:** Il CSS di output viene minimizzato a meno che non venga passato `-M` o `--no-minify`.

#

### Opzioni della riga di comando

```
Opzioni di configurazione:
 -n, --dry-run               In realtà non compilare i file, mostra solo se verranno elaborati.
 -d, --include-dotfolders    Includi cartelle punto nella ricerca di file.
 -S, --no-source-maps        Impedisce la generazione delle mappe di origine.
 -M, --no-minify             Disabilita la minimizzazione dei CSS di output.
 -R, --no-recursion          Disabilita la ricerca ricorsiva dei file.
 -q, --quiet                 Elimina tutta la registrazione tranne gli errori.

Comandi informativi:
 -h, --help                  Visualizza la schermata di aiuto.
 -v, --version               Mostra il numero di versione.
```

<br>

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

## 🔌 Utilizzo dell'API

Puoi anche importare **scss-to-css** nella tua app per utilizzare i suoi metodi API, sia come modulo ECMAScript che come modulo CommonJS.

#### ECMAScript*:

```js
import * as scssToCSS from '@adamlui/scss-to-css';
```

#### CJS:

```js
const scssToCSS = require('@adamlui/scss-to-css');
```

###### _*È richiesta la versione 14 di Node.js o successiva_

#

### `compile(percorsoInput[, opzioni])`

Compila SCSS trovato nel `percorsoInput` fornito nei dati CSS.

Se viene passato un **percorso file**, il codice del file viene compilato in CSS, quindi viene restituito un oggetto contenente `srcPath` + `code` + `srcMap` + `error`:

```js
const compileResult = scssToCSS.compile('assets/style.scss');

console.log(compileResult.error); // restituisce un errore di runtime o `undefined` se non è presente alcun errore
console.log(compileResult.code);  // output compilato CSS da assets/style.scss
```

Se viene passato un **percorso di direttorio**, vengono cercati i file SCSS (ricorsivamente per impostazione predefinita), il codice di ognuno viene caricato e poi compilato, quindi viene restituito un array di oggetti contenenti `srcPath` + `code` + `srcMap` + `error`:

```js
// Restituisce i percorsi dei file SCSS nella direttorio di lavoro + tutte le direttorio nidificate
const compileResults = scssToCSS.compile('.');
compileResults.forEach(result => console.log(result.srcPath));

// Restituisce il CSS compilato dal 2° file SCSS se trovato, o `undefined` se non trovato
console.log(compileResults[1].code);
```

Le opzioni sono booleane, passate come proprietà dell'oggetto. Per esempio:

```js
// Restituisce un array di oggetti dati in cui `.code` contiene CSS non minimizzati
scssToCSS.compile(inputPath, { minify: false });
```

I parametri disponibili (e le relative impostazioni predefinite) sono:

Nome         | Descrizione                                                                       | Valore di default
-------------|-----------------------------------------------------------------------------------|-------------------
`recursive`  | Cerca ricorsivamente i file nidificati se il percorso della direttorio è passato. | `true`
`verbose`    | Mostra l'accesso nella console/terminale.                                         | `true`
`dotFolders` | Includi cartelle punto nella ricerca di file.                                     | `false`
`minify`     | Minimizza il CSS di output.                                                       | `true`
`sourceMaps` | Genera mappe di origine CSS.                                                      | `true`

#

### `findSCSS(dirRicerca[, opzioni])`

Cerca tutti i file SCSS all'interno della stringa `dirRicerca` passata (utile per scoprire quali file [`compile()`](#compilepercorsoinput-opzioni) elaboreranno) e restituisce un array contenente i relativi percorsi di file.

Le opzioni sono booleane, passate come proprietà dell'oggetto. Per esempio:

```js
// Cerca i file SCSS esattamente in assets/scss
const searchResults = scssToCSS.findSCSS('assets/scss', { recursive: false });
console.log(searchResults);

/* uscita del campione:

findSCSS() » Searching for SCSS files...
findSCSS() » Search complete! 2 files found.
findSCSS() » Check returned array.
[
  'E:\\js\\utils\\scss-to-css\assets\\scss\\foo.scss',
  'E:\\js\\utils\\scss-to-css\assets\\scss\\bar.scss'
]
*/
```

I parametri disponibili (e le relative impostazioni predefinite) sono:

Nome         | Descrizione                                                   | Valore di default
-------------|---------------------------------------------------------------|-------------------
`recursive`  | Cerca ricorsivamente i file nidificati in dirRicerca passati. | `true`
`verbose`    | Mostra l'accesso nella console/terminale.                     | `true`
`dotFolders` | Includi cartelle punto nella ricerca di file.                 | `false`

<br>

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

## 🏛️ Licenza del MIT

**Diritto d'autore © 2024 [Adam Lui](https://github.com/adamlui) e contributori**

Con la presente viene concesso il permesso, a titolo gratuito, a chiunque ottenga una copia di questo software e dei file di documentazione associati (il "Software"), di trattare il Software senza restrizioni, inclusi, senza limitazione, i diritti di utilizzare, copiare, modificare, unire , pubblicare, distribuire, concedere in sublicenza e/o vendere copie del Software e consentire alle persone a cui viene fornito il Software di farlo, alle seguenti condizioni:

L'avviso sul copyright di cui sopra e il presente avviso di autorizzazione saranno inclusi in tutte le copie o parti sostanziali del Software.

IL SOFTWARE VIENE FORNITO "COSÌ COM'È", SENZA GARANZIA DI ALCUN TIPO, ESPLICITA O IMPLICITA, INCLUSE MA NON LIMITATE ALLE GARANZIE DI COMMERCIABILITÀ, IDONEITÀ PER UNO SCOPO PARTICOLARE E NON VIOLAZIONE. IN NESSUN CASO GLI AUTORI O I TITOLARI DEL COPYRIGHT SARANNO RESPONSABILI PER QUALSIASI RECLAMO, DANNI O ALTRA RESPONSABILITÀ, SIA IN UN'AZIONE CONTRATTO, ILLECITO O ALTRIMENTI, DERIVANTE DA, DA O IN CONNESSIONE CON IL SOFTWARE O L'UTILIZZO O ALTRI RAPPORTI DEL SOFTWARE.

<br>

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

## 🛠️ Utilità correlate

### [🖼️ img-to-webp](https://github.com/adamlui/js-utils/tree/main/img-to-webp)

> Comprimi ricorsivamente tutte le immagini in WEBP.
<br>[Scaricamento](https://raw.githubusercontent.com/adamlui/js-utils/main/img-to-webp/img-to-webp.js) /
[Discutere](https://github.js-utils.com/discussions)

### [</> minify.js](https://minify-js.org) <a href="https://github.com/toolleeo/cli-apps#programming"><img height=18 src="https://awesome.re/mentioned-badge.svg"></a>

> Minimizza ricorsivamente tutti i file JavaScript.
<br>[Installare](https://node.minify-js.org/#-installation) /
[Leggimi](https://node.minify-js.org/#readme) /
[Utilizzo della CLI](https://node.minify-js.org/#-command-line-usage) /
[Utilizzo dell'API](https://node.minify-js.org/#-api-usage) /
[Discutere](https://github.js-utils.com/discussions)

<br>

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

<picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/adamlui/js-utils/main/media/images/icons/home/white/icon32x27.png"><img height=13 src="https://raw.githubusercontent.com/adamlui/js-utils/main/media/images/icons/home/dark-gray/icon32x27.png"></picture> <a href="https://js-utils.com">**Altre utilità JavaScript**</a> /
<a href="https://github.com/adamlui/scss-to-css/discussions">Discutere</a> /
<a href="#--scss-to-css">Torna in cima ↑</a>
