<div align="center">
    <h6>
        <picture>
            <source type="image/svg+xml" media="(prefers-color-scheme: dark)" srcset="https://media.scsstocss.org/images/icons/earth/white/icon32.svg?52b67bc">
            <img height=14 src="https://media.scsstocss.org/images/icons/earth/black/icon32.svg?52b67bc">
        </picture>
        &nbsp;Español |
        <a href="../..#readme">English</a> |
        <a href="../zh-cn#readme">简体中文</a> |
        <a href="../zh-tw#readme">繁體中文</a> |
        <a href="../ja#readme">日本語</a> |
        <a href="../hi#readme">हिंदी</a> |
        <a href="../bn#readme">বাংলা</a> |
        <a href="../mr#readme">मराठी</a> |
        <a href="../pa#readme">ਪੰਜਾਬੀ</a> |
        <a href="../de#readme">Deutsch</a> |
        <a href="../fr#readme">Français</a> |
        <a href="../it#readme">Italiano</a> |
        <a href="../nl#readme">Nederlands</a> |
        <a href="../pt#readme">Português</a>
    </h6>
</div>

# { } scss-to-css

### Compile recursivamente todos los archivos SCSS en CSS minimizado.

<a href="https://www.npmjs.com/package/@adamlui/scss-to-css"><img height=31 src="https://img.shields.io/npm/dm/%40adamlui%2Fscss-to-css?label=Descargas&logo=npm&color=af68ff&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="#%EF%B8%8F-licencia-mit"><img height=31 src="https://img.shields.io/badge/Licencia-MIT-orange.svg?logo=internetarchive&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://github.com/adamlui/js-utils/releases/tag/scss-to-css-1.10.6"><img height=31 src="https://img.shields.io/badge/Última_Compilación-1.10.6-44cc11.svg?logo=icinga&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://www.npmjs.com/package/@adamlui/scss-to-css?activeTab=code"><img height=31 src="https://img.shields.io/npm/unpacked-size/%40adamlui%2Fscss-to-css?label=Tama%C3%B1o%20Desempaquetado&style=for-the-badge&logo=ebox&logoColor=white&color=blue&labelColor=464646"></a>
<a href="https://sonarcloud.io/component_measures?metric=new_vulnerabilities&id=adamlui_scss-to-css:node.js/src/scss-to-css.js"><img height=31 src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fsonarcloud.io%2Fapi%2Fmeasures%2Fcomponent%3Fcomponent%3Dadamlui_scss-to-css%3Anode.js%2Fsrc%2Fscss-to-css.js%26metricKeys%3Dvulnerabilities&query=%24.component.measures.0.value&style=for-the-badge&logo=sonarcloud&logoColor=white&labelColor=464646&label=Vulnerabilidades&color=gold"></a>
<a href="https://github.com/toolleeo/cli-apps#conversion"><img height=31 src="https://img.shields.io/badge/Mencionado_en-Awesome-c4a2bd?logo=awesomelists&logoColor=white&labelColor=464646&style=for-the-badge"></a>

<img height=6px width="100%" src="https://media.scsstocss.org/images/separators/gradient-aqua.png?52b67bc">

## ⚡ Instalación

Como **utilidad global**:

```
$ npm install -g @adamlui/scss-to-css
```

Como **dependencia del desarrollador** (por ejemplo, para scripts de compilación), desde la raíz de tu proyecto:

```
$ npm install -D @adamlui/scss-to-css
```

Como **dependencia de tiempo de ejecución** (por ejemplo, para compilación sobre la marcha), desde la raíz de tu proyecto:

```
$ npm install @adamlui/scss-to-css
```

<br>

<a href="https://github.com/sponsors/adamlui"><img src="https://media.scsstocss.org/images/banners/sponsor/$10/banner1660x260.png?2cba0ae"></a>

<img height=6px width="100%" src="https://media.scsstocss.org/images/separators/gradient-aqua.png?52b67bc">

## 💻 Uso de la línea de comando

El **comando global** básico es:

```
$ scss-to-css
```

Salida de muestra:

<img src="https://cdn.jsdelivr.net/gh/adamlui/scss-to-css@b74edea/node.js/media/images/screenshots/cli/scss-to-css-docs-cmd-output.png">

**📝 Nota:** Los mapas de origen también se generan de forma predeterminada a menos que se pase `-S` o `--no-source-maps`.

#

Para especificar rutas de **entrada/salida**:

```
$ scss-to-css [ruta_de_entrada] [ruta_de_salida]
```

- `[ruta_de_entrada]`: Ruta al archivo SCSS o al directorio que contiene los archivos SCSS que se van a compilar, en relación con el directorio de trabajo actual.
- `[ruta_de_salida]`: Ruta al archivo o directorio donde se almacenarán los archivos CSS y de mapas fuente, en relación con la ubicación del archivo original (si no se proporciona, se utiliza `css/`).

**📝 Nota:** Si se pasan carpetas, los archivos se procesarán de forma recursiva a menos que se pase `-R` o `--no-recursion`.

#

Para usarlo como **script de paquete**, en `package.json` de tu proyecto:

```json
  "scripts": {
    "build:css": "<scss-to-css-cmd>"
  },
```

Reemplace `<scss-to-css-cmd>` con `scss-to-css` + argumentos opcionales. Luego, se puede usar `npm run build:css` para ejecutar el comando.

#

### Comandos de ejemplo

Compile todos los archivos SCSS en el **directorio actual** (salidas a `css/`):

```
$ scss-to-css
```

Compile todos los archivos SCSS en un **directorio específico** (salidas a `ruta/a/su/directorio/css/`):

```
$ scss-to-css ruta/a/su/directorio
```

Compile un **archivo específico** (salida a `ruta/a/su/css/archivo.min.css`):

```
$ scss-to-css ruta/a/su/archivo.scss
```

Especifique los directorios **entrada y salida** (salidas a `carpeta_salida/`):

```
$ scss-to-css carpeta_entrada carpeta_salida
```

**📝 Nota:** El CSS de salida se minimiza a menos que se pase `-M` o `--no-minify`.

#

### Opciones de línea de comando

```
Opciones booleanas:
 -n, --dry-run                            En realidad, no compile los archivos, solo muestre si se procesarán.
 -d, --include-dotfolders                 Incluya carpetas de puntos en la búsqueda de archivos.
 -S, --no-source-maps                     Evitar que se generen mapas de origen.
 -M, --no-minify                          Deshabilite la minificación del CSS de salida.
 -R, --no-recursion                       Deshabilite la búsqueda recursiva de archivos.
 -c, --copy                               Copie CSS compilado al portapapeles en lugar de escribir en un archivo si se procesa un único archivo fuente.
 -q, --quiet                              Suprime todos los registros excepto los errores.

Opciones de parámetros:
 --ignore-files="file1.scss,file2.scss"   Archivos para excluir de la compilación.
 --comment="comment"                      Anteponga el comentario del encabezado al CSS compilado. Separe por línea usando '\n'.

Comandos de información:
 -h, --help                               Muestra pantalla de ayuda.
 -v, --version                            Mostrar número de versión.
```

<br>

<img height=6px width="100%" src="https://media.scsstocss.org/images/separators/gradient-aqua.png?52b67bc">

## 🔌 Uso de API

También puede importar **scss-to-css** a su aplicación para usar sus métodos API, tanto como módulo ECMAScript como módulo CommonJS.

#### ECMAScript*:

```js
import scssToCSS from '@adamlui/scss-to-css';
```

#### CJS:

```js
const scssToCSS = require('@adamlui/scss-to-css');
```

###### _*Se requiere Node.js versión 14 o superior_

#

### `compile(entrada[, opciones])`

💡 Compila SCSS basándose en la entrada de cadena proporcionada.

Si se pasa **código fuente**, se compila directamente, luego se devuelve un objeto que contiene `srcPath` + `code` + `srcMap` + `error`:

```js
const códigoFuente = 'h1 { font-size: 40px ; code { font-face: Roboto Mono }}',
      compilarResultado = scssToCSS.compile(códigoFuente);

console.log(compilarResultado.error); // genera un error de tiempo de ejecución, o `undefined` si no hay error
console.log(compilarResultado.code);  // genera CSS minimizado: 'h1{font-size:40px}h1 code{font-face:Roboto Mono}'
```

Si se pasa una **ruta de archivo**, el código del archivo se carga y luego se compila en CSS, devolviendo un objeto como el anterior.

Si se pasa una **ruta de directorio**, se buscan los archivos SCSS (de forma recursiva de forma predeterminada), el código de cada uno se carga, luego se compila y luego se devuelve una matriz de objetos que contiene `srcPath` + `code` + `srcMap` + `error`:

```js
// Genera rutas a archivos SCSS en el directorio de trabajo + todos los directorios anidados
const compilarResultados = scssToCSS.compile('.');
compilarResultados.forEach(resultado => console.log(resultado.srcPath));

// Genera CSS compilado desde el segundo archivo SCSS si se encuentra, o `undefined` si no se encuentra
console.log(compilarResultados[1].code);
```

Las opciones son booleanas y se pasan como propiedades del objeto. Por ejemplo:

```js
// Devuelve una matriz de objetos de datos donde `.code` contiene CSS no minificado
scssToCSS.compile(dirEntrada, { minify: false });
```

Los parámetros disponibles (y sus configuraciones predeterminadas) son:

Nombre        | Tipo      | Descripción                                                                             | Valor por defecto
--------------|-----------|-----------------------------------------------------------------------------------------|-------------------
`recursive`   | Booleano  | Busque recursivamente archivos anidados si se pasa la ruta del directorio.              | `true`
`verbose`     | Booleano  | Mostrar registros en la consola/terminal.                                               | `true`
`dotFolders`  | Booleano  | Incluir carpetas de puntos en la búsqueda de archivos.                                  | `false`
`minify`      | Booleano  | Minimizar CSS de salida.                                                                | `true`
`sourceMaps`  | Booleano  | Generar mapas fuente CSS.                                                               | `true`
`ignoreFiles` | Formación | Archivos (por nombre) para excluir de la compilación.                                   | `[]`
`comment`     | Cadena    | Comentario de encabezado para anteponer al CSS compilado. Separe por línea usando '\n'. | `''`

#

### `findSCSS(dirBúsqueda[, opciones])`

💡 Busca todos los archivos SCSS dentro de la cadena `dirBúsqueda` pasada (útil para descubrir qué archivos procesará [`compile()`](#compileentrada-opciones)) y devuelve una matriz que contiene sus rutas de archivo.

Las opciones son booleanas y se pasan como propiedades del objeto. Por ejemplo:

```js
// Busca archivos SCSS exactamente en assets/scss
const resultadosBúsqueda = scssToCSS.findSCSS('assets/scss', { recursive: false });
console.log(resultadosBúsqueda);

/* salida de muestra:

findSCSS() » Searching for SCSS files...
findSCSS() » Search complete! 2 files found.
findSCSS() » Check returned array.
[
  'E:\\js\\utils\\scss-to-css\assets\\scss\\foo.scss',
  'E:\\js\\utils\\scss-to-css\assets\\scss\\bar.scss'
]
*/
```

Los parámetros disponibles (y sus configuraciones predeterminadas) son:

Nombre        | Tipo      | Descripción                                                       | Valor por defecto
--------------|-----------|-------------------------------------------------------------------|-------------------
`recursive`   | Booleano  | Se pasó la búsqueda recursiva de archivos anidados en sesarchDir. | `true`
`verbose`     | Booleano  | Mostrar registros en la consola/terminal.                         | `true`
`dotFolders`  | Booleano  | Incluir carpetas de puntos en la búsqueda de archivos.            | `false`
`ignoreFiles` | Formación | Archivos (por nombre) para excluir de los resultados de búsqueda. | `[]`

<br>

<img height=6px width="100%" src="https://media.scsstocss.org/images/separators/gradient-aqua.png?52b67bc">

## 🏛️ Licencia MIT

**Derechos de autor © 2024 [Adam Lui](https://github.com/adamlui) y colaboradores**

Por el presente se otorga permiso, sin cargo, a cualquier persona que obtenga una copia de este software y los archivos de documentación asociados (el "Software"), para operar con el Software sin restricciones, incluidos, entre otros, los derechos de uso, copia, modificación, fusión. , publicar, distribuir, sublicenciar y/o vender copias del Software, y permitir que las personas a quienes se les proporciona el Software lo hagan, sujeto a las siguientes condiciones:

El aviso de derechos de autor anterior y este aviso de permiso se incluirán en todas las copias o partes sustanciales del Software.

EL SOFTWARE SE PROPORCIONA "TAL CUAL", SIN GARANTÍA DE NINGÚN TIPO, EXPRESA O IMPLÍCITA, INCLUYENDO, PERO NO LIMITADO A, LAS GARANTÍAS DE COMERCIABILIDAD, IDONEIDAD PARA UN PROPÓSITO PARTICULAR Y NO INFRACCIÓN. EN NINGÚN CASO LOS AUTORES O TITULARES DE DERECHOS DE AUTOR SERÁN RESPONSABLES DE NINGÚN RECLAMO, DAÑO U OTRA RESPONSABILIDAD, YA SEA EN UNA ACCIÓN CONTRACTUAL, AGRAVIO O DE OTRA MANERA, QUE SURJA DE, FUERA DE O EN RELACIÓN CON EL SOFTWARE O EL USO U OTRAS NEGOCIOS EN EL SOFTWARE.

<br>

<img height=6px width="100%" src="https://media.scsstocss.org/images/separators/gradient-aqua.png?52b67bc">

## 🛠️ Utilidades relacionadas

### [🖼️ img-to-webp](https://imgtowebp.org)

> Comprime recursivamente todas las imágenes a WEBP.
<br>[Descargar](https://cdn.jsdelivr.net/gh/adamlui/js-utils/img-to-webp/img-to-webp.js) /
[Conversar](https://github.js-utils.com/discussions)

### [</> minify.js](https://minify-js.org) &nbsp;<a href="https://github.com/toolleeo/cli-apps#programming"><img height=18 src="https://media.scsstocss.org/images/badges/awesome/badge.svg?52b67bc"></a>

> Minimice recursivamente todos los archivos JavaScript.
<br>[Instalar](https://node.minify-js.org/#-installation) /
[Léame](https://node.minify-js.org/#readme) /
[Uso de CLI](https://node.minify-js.org/#-command-line-usage) /
[Uso de API](https://node.minify-js.org/#-api-usage) /
[Conversar](https://github.js-utils.com/discussions)

<br>

<img height=6px width="100%" src="https://media.scsstocss.org/images/separators/gradient-aqua.png?52b67bc">

<picture><source media="(prefers-color-scheme: dark)" srcset="https://media.scsstocss.org/images/icons/home/white/icon32x27.png?52b67bc"><img height=13 src="https://media.scsstocss.org/images/icons/home/dark-gray/icon32x27.png?52b67bc"></picture> <a href="https://js-utils.com">**Más utilidades de JavaScript**</a> /
<a href="https://github.scsstocss.org/discussions">Conversar</a> /
<a href="#--scss-to-css">Volver arriba ↑</a>
