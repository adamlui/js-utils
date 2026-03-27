<a id="top"></a>

<div align="center">
    <h6>
        <picture>
            <source type="image/svg+xml" media="(prefers-color-scheme: dark)" srcset="https://cdn.jsdelivr.net/gh/adamlui/scss-to-css@7e4a141/assets/images/icons/earth/white/icon32.svg">
            <img height=14 src="https://cdn.jsdelivr.net/gh/adamlui/scss-to-css@7e4a141/assets/images/icons/earth/black/icon32.svg">
        </picture>
        &nbsp;Italiano |
        <a href="../..#readme">English</a> |
        <a href="../zh-cn/#readme">简体中文</a> |
        <a href="../zh-tw/#readme">繁體中文</a> |
        <a href="../ja/#readme">日本語</a> |
        <a href="../hi/#readme">हिंदी</a> |
        <a href="../bn/#readme">বাংলা</a> |
        <a href="../mr/#readme">मराठी</a> |
        <a href="../pa/#readme">ਪੰਜਾਬੀ</a> |
        <a href="../de/#readme">Deutsch</a> |
        <a href="../es/#readme">Español</a> |
        <a href="../fr/#readme">Français</a> |
        <a href="../nl/#readme">Nederlands</a> |
        <a href="../pt/#readme">Português</a>
    </h6>
</div>

# { } scss-to-css

### Compila ricorsivamente tutti i file SCSS in CSS minimizzati.

<a href="https://npmstar.com/compare/@adamlui%2Fscss-to-css">
    <img height=31 src="https://img.shields.io/npm/dm/%40adamlui%2Fscss-to-css?label=Scaricamenti&logo=npm&color=af68ff&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="#%EF%B8%8F-licenza-del-mit">
    <img height=31 src="https://img.shields.io/badge/Licenza-MIT-orange.svg?logo=internetarchive&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://github.com/adamlui/js-utils/releases/tag/scss-to-css-2.4.1">
    <img height=31 src="https://img.shields.io/badge/Ultima_Versione-2.4.1-44cc11.svg?logo=icinga&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://www.npmjs.com/package/@adamlui/scss-to-css?activeTab=code">
    <img height=31 src="https://img.shields.io/npm/unpacked-size/%40adamlui%2Fscss-to-css?label=Dimensioni+Senza+Confezione&style=for-the-badge&logo=ebox&logoColor=white&color=blue&labelColor=464646"></a>
<a href="https://sonarcloud.io/component_measures?metric=vulnerabilities&selected=adamlui_js-utils%3Ascss-to-css&id=adamlui_js-utils">
    <img height=31 src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fsonarcloud.io%2Fapi%2Fmeasures%2Fcomponent%3Fcomponent%3Dadamlui_scss-to-css%3Asrc%2Fscss-to-css.js%26metricKeys%3Dvulnerabilities&query=%24.component.measures.0.value&style=for-the-badge&logo=sonar&logoColor=white&labelColor=464646&label=Vulnerabilit%C3%A0&color=gold"></a>
<a href="https://github.com/toolleeo/cli-apps/#conversion">
    <img height=31 src="https://img.shields.io/badge/Menzionato_in-Awesome-ff69b4?logo=awesomelists&logoColor=white&labelColor=464646&style=for-the-badge"></a>

<img height=6px width="100%" src="https://cdn.jsdelivr.net/gh/adamlui/scss-to-css@7e4a141/assets/images/separators/aqua-gradient.png">

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

<a href="https://github.com/sponsors/adamlui"><img src="https://cdn.jsdelivr.net/gh/adamlui/scss-to-css@f3129dd/assets/images/banners/sponsor/$10/banner1660x260.png"></a>

<img height=6px width="100%" src="https://cdn.jsdelivr.net/gh/adamlui/scss-to-css@7e4a141/assets/images/separators/aqua-gradient.png">

## 💻 Utilizzo della riga di comando

Il **comando globale** di base è:

```
$ scss-to-css
```

Output di esempio:

<img src="https://cdn.jsdelivr.net/gh/adamlui/scss-to-css@fe2867e/assets/images/screenshots/cli/scss-to-css-docs-cmd-output.png">

**📝 Nota:** Anche le mappe sorgente vengono generate per impostazione predefinita a meno che non venga passato `-S` o `--no-source-maps`.

#

Per specificare i percorsi **input/output**:

```
$ scss-to-css [percorso_input] [percorso_output]
```

- `[percorso_input]`: Percorso del file SCSS o della direttorio contenente i file SCSS da compilare, relativo alla direttorio di lavoro corrente.
- `[percorso_output]`: Percorso del file o della directory in cui verranno salvati i file CSS e le mappe sorgente, relativo alla directory principale di input (se non specificato, viene utilizzata la directory `css/`).

**📝 Nota:** Se vengono passate cartelle, i file verranno elaborati in modo ricorsivo a meno che non venga passato `-R` o `--no-recursion`.

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

Compila tutti i file SCSS in una **direttorio specifica** (output in `css/percorso/della/tua/direttorio/`):

```
$ scss-to-css percorso/della/tua/direttorio
```

Compila un **file specifico** (output in `css/percorso/della/tua/file.min.css`):

```
$ scss-to-css percorso/della/tua/file.scss
```

Specifica entrambe le direttorio **input e output** (output in `cartella_output/`):

```
$ scss-to-css cartella_input cartella_output
```

**📝 Nota:** Il CSS di output viene minimizzato a meno che non venga passato `-M` o `--no-minify`.

#

### Opzioni della riga di comando

```
Opzioni booleane:
 -n, --dry-run                            In realtà non compilare i file, mostra solo se verranno elaborati.
 -d, --include-dotfolders                 Includi cartelle punto nella ricerca di file.
 -S, --no-source-maps                     Impedisce la generazione delle mappe di origine.
 -M, --no-minify                          Disabilita la minimizzazione dei CSS di output.
 -R, --no-recursion                       Disabilita la ricerca ricorsiva dei file.
 -r, --relative-output                    I file di output verranno generati in relazione a ciascun file sorgente anziché alla directory principale di input.
 -c, --copy                               Copia il CSS compilato negli appunti invece di scrivere nel file se viene elaborato un singolo file sorgente.
 -q, --quiet                              Elimina tutta la registrazione tranne gli errori.

Opzioni dei parametri:
 --ignores="dir/,file1.scss,file2.sass"   File/cartelle da escludere dalla compilazione.
 --comment="comment"                      Anteponi il commento dell'intestazione al CSS compilato. Separare per riga utilizzando '\n'.
 --ui-lang="code"                         Codice ISO 639-1 della lingua in cui visualizzare l'interfaccia utente.
 --config="path/to/file"                  Carica il file di configurazione personalizzato.

Comandi:
 -i, --init                               Crea un file di configurazione (nella directory principale del progetto).
 -h, --help                               Visualizza la schermata di aiuto.
 -v, --version                            Mostra il numero di versione.
     --stats                              Mostra le statistiche npm.
     --debug [targetKey]                  Mostra i log di debug.
```

#

### File di configurazione

**scss-to-css** può essere personalizzato utilizzando un file `scss-to-css.config.mjs` o `scss-to-css.config.js` posizionato nella directory principale del progetto.

Esempio di impostazioni predefinite:

```js
export default {
    dryRun: false,            // non minimizzare effettivamente i file, mostra solo se verranno elaborati
    includeDotFolders: false, // includi le cartelle nascoste nella ricerca dei file
    noSourceMaps: false,      // impedisci la generazione delle source map
    noMinify: false,          // disabilita la minimizzazione del CSS di output
    noRecursion: false,       // disabilita la ricerca ricorsiva dei file
    relativeOutput: false,    // salva i file di output in relazione a ciascun file sorgente anziché alla directory radice di input
    copy: false,              // copia il CSS compilato negli appunti anziché scriverlo su file se viene elaborato un singolo file
    quietMode: false,         // sopprimi tutti i log tranne gli errori
    ignores: '',              // file/directory da escludere dalla minimizzazione
    comment: ''               // commento di intestazione da aggiungere al codice minimizzato
}
```

💡 Esegui `scss-to-css init` per generare un modello di file `scss-to-css.config.mjs` nella directory principale del progetto.

<br>

<img height=6px width="100%" src="https://cdn.jsdelivr.net/gh/adamlui/scss-to-css@7e4a141/assets/images/separators/aqua-gradient.png">

## 🔌 Utilizzo dell'API

Puoi anche importare **scss-to-css** nella tua app per utilizzare i suoi metodi API, sia come modulo ECMAScript che come modulo CommonJS.

#### ECMAScript*:

```js
import scssToCSS from '@adamlui/scss-to-css'
```

#### CJS:

```js
const scssToCSS = require('@adamlui/scss-to-css')
```

###### _*È richiesta la versione 14 di Node.js o successiva_

#

### `compile(input[, opzioni])`

💡 Compila SCSS in base alla stringa di input fornita.

Se viene passato il **codice sorgente**, viene compilato direttamente, quindi viene restituito un oggetto contenente `srcPath` + `code` + `srcMap` + `error`:

```js
const codiceSrg = 'h1 { font-size: 40px ; code { font-face: Roboto Mono }}',
      risultatoCompilazione = scssToCSS.compile(codiceSrg)

console.log(risultatoCompilazione.error) // restituisce un errore di runtime o `undefined` se non è presente alcun errore
console.log(risultatoCompilazione.code)  // restituisce CSS minimizzato: 'h1{font-size:40px}h1 code{font-face:Roboto Mono}'
```

Se viene passato un **percorso file**, il codice del file viene caricato e quindi compilato in CSS, restituendo un oggetto come sopra.

Se viene passato un **percorso di direttorio**, vengono cercati i file SCSS (ricorsivamente per impostazione predefinita), il codice di ognuno viene caricato e poi compilato, quindi viene restituito un array di oggetti contenenti `srcPath` + `code` + `srcMap` + `error`:

```js
// Restituisce i percorsi dei file SCSS nella direttorio di lavoro + tutte le direttorio nidificate
const risultatiCompilazione = scssToCSS.compile('.')
risultatiCompilazione.forEach(risultato => console.log(risultato.srcPath))

// Restituisce il CSS compilato dal 2° file SCSS se trovato, o `undefined` se non trovato
console.log(risultatiCompilazione[1].code)
```

Le opzioni sono booleane, passate come proprietà dell'oggetto. Per esempio:

```js
// Restituisce un array di oggetti dati in cui `.code` contiene CSS non minimizzati
scssToCSS.compile(dirInput, { minify: false })
```

I parametri disponibili (e le relative impostazioni predefinite) sono:

Nome             | Tipo     | Descrizione                                                                                                         | Valore di default
-----------------|----------|---------------------------------------------------------------------------------------------------------------------|-------------------
`recursive`      | Booleano | Cerca ricorsivamente i file nidificati se il percorso della direttorio è passato.                                   | `true`
`verbose`        | Booleano | Mostra l'accesso nella console/terminale.                                                                           | `true`
`dotFolders`     | Booleano | Includi cartelle punto nella ricerca di file.                                                                       | `false`
`minify`         | Booleano | Minimizza il CSS di output.                                                                                         | `true`
`sourceMaps`     | Booleano | Genera mappe di origine CSS.                                                                                        | `true`
`relativeOutput` | Booleano | I file di output verranno generati in relazione a ciascun file sorgente anziché alla directory principale di input. | `false`
`ignores`        | Vettore  | File/cartelle da escludere dalla compilazione.                                                                      | `[]`
`comment`        | Stringa  | Commento dell'intestazione da anteporre al CSS compilato. Separare per riga utilizzando '\n'.                       | `''`

#

### `findSCSS(dirRicerca[, opzioni])`

💡 Cerca tutti i file SCSS all'interno della stringa `dirRicerca` passata (utile per scoprire quali file [`compile()`](#compileinput-opzioni) elaboreranno) e restituisce un array contenente i relativi percorsi di file.

Le opzioni sono booleane, passate come proprietà dell'oggetto. Per esempio:

```js
// Cerca i file SCSS esattamente in assets/scss
const searchResults = scssToCSS.findSCSS('assets/scss', { recursive: false })
console.log(searchResults)

/* uscita del campione:

findSCSS() » Searching for SCSS files...
findSCSS() » Search complete! 2 files found.
findSCSS() » Check returned array.
[
  'E:\\js\\utils\\scss-to-css\assets\\scss\\foo.scss',
  'E:\\js\\utils\\scss-to-css\assets\\scss\\bar.sass'
]
*/
```

I parametri disponibili (e le relative impostazioni predefinite) sono:

Nome          | Tipo     | Descrizione                                                   | Valore di default
--------------|----------|---------------------------------------------------------------|-------------------
`recursive`   | Booleano | Cerca ricorsivamente i file nidificati in dirRicerca passati. | `true`
`verbose`     | Booleano | Mostra l'accesso nella console/terminale.                     | `true`
`dotFolders`  | Booleano | Includi cartelle punto nella ricerca di file.                 | `false`
`ignores`     | Vettore  | File/cartelle da escludere dai risultati della ricerca.       | `[]`

<br>

<img height=6px width="100%" src="https://cdn.jsdelivr.net/gh/adamlui/scss-to-css@7e4a141/assets/images/separators/aqua-gradient.png">

## 🏛️ Licenza del MIT

**Diritto d'autore © 2024 [Adam Lui](https://github.com/adamlui) e contributori**

Con la presente viene concesso il permesso, a titolo gratuito, a chiunque ottenga una copia di questo software e dei file di documentazione associati (il "Software"), di trattare il Software senza restrizioni, inclusi, senza limitazione, i diritti di utilizzare, copiare, modificare, unire , pubblicare, distribuire, concedere in sublicenza e/o vendere copie del Software e consentire alle persone a cui viene fornito il Software di farlo, alle seguenti condizioni:

L'avviso sul copyright di cui sopra e il presente avviso di autorizzazione saranno inclusi in tutte le copie o parti sostanziali del Software.

IL SOFTWARE VIENE FORNITO "COSÌ COM'È", SENZA GARANZIA DI ALCUN TIPO, ESPLICITA O IMPLICITA, INCLUSE MA NON LIMITATE ALLE GARANZIE DI COMMERCIABILITÀ, IDONEITÀ PER UNO SCOPO PARTICOLARE E NON VIOLAZIONE. IN NESSUN CASO GLI AUTORI O I TITOLARI DEL COPYRIGHT SARANNO RESPONSABILI PER QUALSIASI RECLAMO, DANNI O ALTRA RESPONSABILITÀ, SIA IN UN'AZIONE CONTRATTO, ILLECITO O ALTRIMENTI, DERIVANTE DA, DA O IN CONNESSIONE CON IL SOFTWARE O L'UTILIZZO O ALTRI RAPPORTI DEL SOFTWARE.

<br>

<img height=6px width="100%" src="https://cdn.jsdelivr.net/gh/adamlui/scss-to-css@7e4a141/assets/images/separators/aqua-gradient.png">

## 🛠️ Utilità correlate

### [</> minify.js](https://github.com/adamlui/minify.js/#readme) &nbsp;<a href="https://github.com/toolleeo/cli-apps/#programming"><img height=18 src="https://cdn.jsdelivr.net/gh/adamlui/scss-to-css@7e4a141/assets/images/badges/awesome/badge.svg"></a>

> Minimizza ricorsivamente tutti i file JavaScript.
<br>[Installare](https://github.com/adamlui/minify.js/tree/main/node.js/#-installation) /
[Leggimi](https://github.com/adamlui/minify.js/tree/main/node.js/#readme) /
[Utilizzo della CLI](https://github.com/adamlui/minify.js/tree/main/node.js/#-command-line-usage) /
[Utilizzo dell'API](https://github.com/adamlui/minify.js/tree/main/node.js/#-api-usage) /
[Discutere](https://github.com/adamlui/minify.js/discussions)

<br>

<img height=6px width="100%" src="https://cdn.jsdelivr.net/gh/adamlui/scss-to-css@7e4a141/assets/images/separators/aqua-gradient.png">

<picture><source media="(prefers-color-scheme: dark)" srcset="https://cdn.jsdelivr.net/gh/adamlui/scss-to-css@7e4a141/assets/images/icons/home/white/icon32x27.png"><img height=13 src="https://cdn.jsdelivr.net/gh/adamlui/scss-to-css@7e4a141/assets/images/icons/home/dark-gray/icon32x27.png"></picture> <a href="https://github.com/adamlui/js-utils/#readme">**Altre utilità JavaScript**</a> /
<a href="https://github.com/adamlui/scss-to-css/discussions">Discutere</a> /
<a href="#top">Torna in cima ↑</a>
