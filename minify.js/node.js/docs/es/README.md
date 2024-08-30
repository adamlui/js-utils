<div align="right">
    <h6>
        <picture>
            <source type="image/svg+xml" media="(prefers-color-scheme: dark)" srcset="https://media.minify-js.org/images/icons/earth/white/icon32.svg?d07ee82">
            <img height=14 src="https://media.minify-js.org/images/icons/earth/black/icon32.svg?d07ee82">
        </picture>
        &nbsp;Español |
        <a href="../..#readme">English</a> |
        <a href="../zh-cn#readme">简体中文</a> |
        <a href="../zh-tw#readme">繁體中文</a> |
        <a href="../hi#readme">हिंदी</a> |
        <a href="../bn#readme">বাংলা</a> |
        <a href="../mr#readme">मराठी</a> |
        <a href="../pa#readme">ਪੰਜਾਬੀ</a> |
        <a href="../de#readme">Deutsch</a> |
        <a href="../fr#readme">Français</a>
    </h6>
</div>

# </> minify.js

### Minimiza recursivamente todos los archivos JavaScript.

<a href="https://www.npmjs.com/package/@adamlui/minify.js"><img height=31 src="https://img.shields.io/npm/dm/%40adamlui%2Fminify.js?label=Descargas&logo=npm&color=af68ff&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="#%EF%B8%8F-licencia-mit"><img height=31 src="https://img.shields.io/badge/Licencia-MIT-orange.svg?logo=internetarchive&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://github.com/adamlui/minify.js/releases/tag/node-v1.8.5"><img height=31 src="https://img.shields.io/badge/Última_Compilación-1.8.5-44cc11.svg?logo=icinga&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://www.npmjs.com/package/@adamlui/minify.js?activeTab=code"><img height=31 src="https://img.shields.io/npm/unpacked-size/%40adamlui%2Fminify.js?label=Tama%C3%B1o%20Desempaquetado&style=for-the-badge&logo=ebox&logoColor=white&labelColor=464646&color=blue"></a>
<a href="https://sonarcloud.io/component_measures?metric=new_vulnerabilities&id=adamlui_minify.js:node.js/src/minify.js"><img height=31 src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fsonarcloud.io%2Fapi%2Fmeasures%2Fcomponent%3Fcomponent%3Dadamlui_minify.js%3Anode.js%2Fsrc%2Fminify.js%26metricKeys%3Dvulnerabilities&query=%24.component.measures.0.value&style=for-the-badge&logo=sonarcloud&logoColor=white&labelColor=464646&label=Vulnerabilidades&color=gold"></a>
<a href="https://github.com/toolleeo/cli-apps#programming"><img height=31 src="https://img.shields.io/badge/Mencionado_en-Awesome-c4a2bd?logo=awesomelists&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://minify-js.org"><img height=31 src="https://img.shields.io/badge/web-minify--js.org-lightgrey?logo=dribbble&logoColor=white&labelColor=464646&style=for-the-badge"></a>

<img src="https://cdn.jsdelivr.net/gh/adamlui/minify.js@3d56890/node.js/media/images/screenshots/cli/minify-js-docs-cmd-output.png">

<br>

<img height=6px width="100%" src="https://media.minify-js.org/images/separators/gradient-aqua.png?8b9ed02">

## ⚡ Instalación

Como **utilidad global**:

```
$ npm install -g @adamlui/minify.js
```

Como **dependencia del desarrollador** (por ejemplo, para scripts de compilación), desde la raíz de tu proyecto:

```
$ npm install -D @adamlui/minify.js
```

Como **dependencia del tiempo de ejecución** (por ejemplo, para minificación sobre la marcha), desde la raíz de tu proyecto:

```
$ npm install @adamlui/minify.js
```

<br>

<a href="https://github.com/sponsors/adamlui"><img src="https://media.minify-js.org/images/banners/sponsor/$10/banner1660x260.png?f6118ce"></a>

<img height=6px width="100%" src="https://media.minify-js.org/images/separators/gradient-aqua.png?8b9ed02">

## 💻 Uso de la línea de comando

El **comando global** básico es:

```
$ minify-js
```

**📝 Nota:** Pase `-n` o `--dry-run` para ver solo qué archivos se procesarán.

#

Para especificar rutas de **entrada/salida**:

```
$ minify-js [ruta_entrada] [ruta_salida]
```

- `[ruta_entrada]`: Ruta al archivo JS o al directorio que contiene los archivos JS que se van a minimizar, en relación con el directorio de trabajo actual.
- `[ruta_salida]`: Ruta al archivo o directorio donde se almacenarán los archivos minimizados, en relación con la ubicación del archivo original (si no se proporciona, se utiliza `min/`).

**📝 Nota:** Si se pasan carpetas, los archivos se procesarán de forma recursiva a menos que se pase `-R` o `--no-recursion`.

#

Para usarlo como **script de paquete**, en `package.json` de tu proyecto:

```json
  "scripts": {
    "build:js": "<minify-js-cmd>"
  },
```

Reemplace `<minify-js-cmd>` con `minify-js` + argumentos opcionales. Luego, se puede usar `npm run build:js` para ejecutar el comando.

#

### Comandos de ejemplo

Minimice todos los archivos JavaScript en el **directorio actual** (salidas a `min/`):

```
$ minify-js
```

Minimice todos los archivos JavaScript en un **directorio específico** (salidas a `ruta/a/su/directorio/min/`):

```
$ minify-js ruta/a/su/directorio
```

Minimice un **archivo específico** (salidas a `ruta/a/su/min/archivo.min.js`):

```
$ minify-js ruta/a/su/archivo.js
```

Especifique los directorios **entrada y salida** (salidas a `carpeta_salida/`):

```
$ minify-js carpeta_entrada carpeta_salida
```

#

### Opciones de línea de comando

```
Opciones booleanas:
 -n, --dry-run                        En realidad, no minimice los archivos, solo muestre si se procesarán.
 -d, --include-dotfolders             Incluya carpetas de puntos en la búsqueda de archivos.
 -D, --include-dotfiles               Incluya archivos de puntos en la búsqueda de archivos.
 -R, --no-recursion                   Deshabilite la búsqueda recursiva de archivos.
 -M, --no-mangle                      Disable mangling names.
 -X, --no-filename-change             Deshabilite el cambio de extensión de archivo a .min.js
 -c, --copy                           Copie el código minimizado al portapapeles en lugar de escribirlo en un archivo si se procesa un único archivo fuente.
 -q, --quiet                          Suprime todos los registros excepto los errores.

Opciones de parámetros:
 --ignore-files="file1.js,file2.js"   Archivos para excluir de la minificación.
 --comment="comentar"                 Anteponga el comentario del encabezado al código minimizado. Separe por línea usando '\n'.

Comandos de información:
 -h, --help                           Mostrar pantalla de ayuda.
 -v, --version                        Mostrar número de versión.
```

<br>

<img height=6px width="100%" src="https://media.minify-js.org/images/separators/gradient-aqua.png?8b9ed02">

## 🔌 Uso de API

También puede importar **minify.js** a su aplicación para usar sus métodos API, tanto como módulo ECMAScript como módulo CommonJS.

#### ESM*:

```js
import minifyJS from '@adamlui/minify.js';
```

#### CJS:

```js
const minifyJS = require('@adamlui/minify.js');
```

###### _*Se requiere Node.js versión 14 o superior_

#

### `minify(entrada[, opciones])`

💡 Minimiza el código JavaScript según la entrada de cadena proporcionada.

Si se pasa **código fuente**, se minimiza directamente, luego se devuelve un objeto que contiene `srcPath` + `code` + `error`:

```js
const códigoFuente = 'function add(first, second) { return first + second; }',
      minificarResultado = minifyJS.minify(códigoFuente);

console.log(minificarResultado.error); // genera un error de tiempo de ejecución, o `undefined` si no hay error
console.log(minificarResultado.code);  // salidas JS minimizadas: 'function add(n,d){return n+d}'
```

Si se pasa una **ruta de archivo**, el código del archivo se carga y luego se minimiza, devolviendo un objeto como el anterior.

Si se pasa una **ruta de directorio**, se buscan archivos JavaScript (de forma recursiva de forma predeterminada), el código de cada uno se carga, luego se minimiza y luego se devuelve una matriz de objetos que contiene `srcPath` + `code` + `error`:

```js
// Genera rutas a los archivos JS de origen en el directorio de trabajo + todos los directorios anidados
const minificarResultados = minifyJS.minify('.');
minificarResultados.forEach(resultado => console.log(resultado.srcPath));

// Genera código minimizado del segundo archivo JS si se encuentra, o `undefined` si no se encuentra
console.log(minificarResultados[1].code);
```

Las opciones son booleanas y se pasan como propiedades del objeto. Por ejemplo:

```js
// Devuelve una matriz de objetos de datos donde también se procesan archivos de puntos si `entrada` es una ruta
minifyJS.minify(entrada, { dotFiles: true });
```

Los parámetros disponibles (y sus configuraciones predeterminadas) son:

Nombre        | Tipo      | Descripción                                                                                 | Valor por defecto
--------------|-----------|---------------------------------------------------------------------------------------------|-------------------
`recursive`   | Booleano  | Busque recursivamente archivos anidados si se pasa la ruta del directorio.                  | `true`
`verbose`     | Booleano  | Mostrar registros en la consola/terminal.                                                   | `true`
`dotFolders`  | Booleano  | Incluya carpetas de puntos en la búsqueda de archivos.                                      | `false`
`dotFiles`    | Booleano  | Incluya archivos de puntos en la búsqueda de archivos.                                      | `false`
`mangle`      | Booleano  | Acorte los nombres de las variables (normalmente a un carácter).                            | `true`
`ignoreFiles` | Formación | Archivos (por nombre) para excluir de la minificación.                                      | `[]`
`comment`     | Cadena    | Comentario de encabezado para anteponer al código minimizado. Separe por línea usando '\n'. | `''`

#

### `findJS(dirBúsqueda[, opciones])`

💡 Busca todos los archivos JavaScript no minificados dentro de la cadena `searchDir` pasada (útil para descubrir qué archivos procesará [`minify()`](#minifyentrada-opciones)) y devuelve una matriz que contiene sus rutas de archivo.

Las opciones son booleanas y se pasan como propiedades del objeto. Por ejemplo:

```js
// Busque archivos JS no minificados exactamente en assets/js
const resultadosBúsqueda = minifyJS.findJS('assets/js', { recursive: false });
console.log(resultadosBúsqueda);

/* salida de muestra:

findJS() » Searching for unminified JS files...
findJS() » Search complete! 2 files found.
findJS() » Check returned array.
[
  'E:\\js\\utils\\minify.js\\assets\\js\\foo.js',
  'E:\\js\\utils\\minify.js\\assets\\js\\bar.js'
]
*/
```

Los parámetros disponibles (y sus configuraciones predeterminadas) son:

Nombre        | Tipo      | Descripción                                                       | Valor por defecto
--------------|-----------|-------------------------------------------------------------------|-------------------
`recursive`   | Booleano  | Se pasó la búsqueda recursiva de archivos anidados en searchDir.  | `true`
`verbose`     | Booleano  | Mostrar registros en la consola/terminal.                         | `true`
`dotFolders`  | Booleano  | Incluya carpetas de puntos en la búsqueda de archivos.            | `false`
`dotFiles`    | Booleano  | Incluya archivos de puntos en la búsqueda de archivos.            | `false`
`ignoreFiles` | Formación | Archivos (por nombre) para excluir de los resultados de búsqueda. | `[]`

<br>

<img height=6px width="100%" src="https://media.minify-js.org/images/separators/gradient-aqua.png?8b9ed02">

## 🏛️ Licencia MIT

**Derechos de autor © 2023–2024 [Adam Lui](https://github.com/adamlui) y colaboradores**

Por el presente se otorga permiso, sin cargo, a cualquier persona que obtenga una copia de este software y los archivos de documentación asociados (el "Software"), para operar con el Software sin restricciones, incluidos, entre otros, los derechos de uso, copia, modificación, fusión. , publicar, distribuir, sublicenciar y/o vender copias del Software, y permitir que las personas a quienes se les proporciona el Software lo hagan, sujeto a las siguientes condiciones:

El aviso de derechos de autor anterior y este aviso de permiso se incluirán en todas las copias o partes sustanciales del Software.

EL SOFTWARE SE PROPORCIONA "TAL CUAL", SIN GARANTÍA DE NINGÚN TIPO, EXPRESA O IMPLÍCITA, INCLUYENDO, PERO NO LIMITADO A, LAS GARANTÍAS DE COMERCIABILIDAD, IDONEIDAD PARA UN PROPÓSITO PARTICULAR Y NO INFRACCIÓN. EN NINGÚN CASO LOS AUTORES O TITULARES DE DERECHOS DE AUTOR SERÁN RESPONSABLES DE NINGÚN RECLAMO, DAÑO U OTRA RESPONSABILIDAD, YA SEA EN UNA ACCIÓN CONTRACTUAL, AGRAVIO O DE OTRA MANERA, QUE SURJA DE, FUERA DE O EN RELACIÓN CON EL SOFTWARE O EL USO U OTRAS NEGOCIOS EN EL SOFTWARE.

<br>

<img height=6px width="100%" src="https://media.minify-js.org/images/separators/gradient-aqua.png?8b9ed02">

## 🛠️ Utilidades relacionadas

### [</> minify.js (Gulp)](https://gulp.minify-js.org) &nbsp;<a href="https://github.com/toolleeo/cli-apps#programming"><img height=18 src="https://media.minify-js.org/images/badges/awesome/badge.svg?b78dcd3"></a>

> Complemento Gulp para minimizar recursivamente todos los archivos JavaScript.
<br>[Instalar](https://gulp.minify-js.org/#-installation) /
[Léame](https://gulp.minify-js.org/#readme) /
[Conversar](https://github.minify-js.org/discussions)

### [{ } scss-to-css](https://github.com/adamlui/scss-to-css) &nbsp;<a href="https://github.com/toolleeo/cli-apps#conversion"><img height=18 src="https://media.minify-js.org/images/badges/awesome/badge.svg?b78dcd3"></a>

> Recursively compile all SCSS files into minified CSS.
<br>[Instalar](https://node.scsstocss.org/#-installation) /
[Léame](https://node.scsstocss.org/#readme) /
[Uso de CLI](https://node.scsstocss.org/#-command-line-usage) /
[Uso de API](https://node.scsstocss.org/#-api-usage) /
[Conversar](https://github.scsstocss.org/discussions)

<br>

<img height=6px width="100%" src="https://media.minify-js.org/images/separators/gradient-aqua.png?8b9ed02">

<picture><source media="(prefers-color-scheme: dark)" srcset="https://media.minify-js.org/images/icons/home/white/icon32x27.png?d07ee82"><img height=13 src="https://media.minify-js.org/images/icons/home/dark-gray/icon32x27.png?d07ee82"></picture> <a href="https://js-utils.com">**Más utilidades de JavaScript**</a> /
<a href="https://github.minify-js.org/discussions">Conversar</a> /
<a href="#-minifyjs">Volver arriba ↑</a>
