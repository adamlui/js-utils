<a id="top"></a>

<div align="right">
    <h6>
        <picture>
            <source type="image/svg+xml" media="(prefers-color-scheme: dark)" srcset="https://cdn.jsdelivr.net/gh/adamlui/js-utils@f2dc346/assets/images/icons/earth/white/icon32.svg">
            <img height=14 src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@f2dc346/assets/images/icons/earth/black/icon32.svg">
        </picture>
        &nbsp;Español |
        <a href="../..#readme">English</a> |
        <a href="../zh-cn/#readme">简体中文</a> |
        <a href="../zh-tw/#readme">繁體中文</a> |
        <a href="../hi/#readme">हिंदी</a> |
        <a href="../bn/#readme">বাংলা</a> |
        <a href="../de/#readme">Deutsch</a> |
        <a href="../fr/#readme">Français</a>
    </h6>
</div>

# > generate-pw

### Genere, fortalezca y valide aleatoriamente contraseñas criptográficamente seguras.

<a href="https://npmstar.com/compare/generate-pw">
    <img height=31 src="https://img.shields.io/npm/dm/generate-pw?label=Descargas&logo=npm&color=af68ff&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://github.com/adamlui/js-utils/releases/tag/generate-pw-2.3.2">
    <img height=31 src="https://img.shields.io/badge/Ultima_Versión-2.3.2-44cc11.svg?logo=icinga&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="#%EF%B8%8F-licencia-mit">
    <img height=31 src="https://img.shields.io/badge/Licencia-MIT-orange.svg?logo=internetarchive&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://www.npmjs.com/package/generate-pw?activeTab=code">
    <img height=31 src="https://img.shields.io/npm/unpacked-size/generate-pw?style=for-the-badge&logo=ebox&logoColor=white&labelColor=464646&color=blue&label=Tama%C3%B1o%20Desempaquetado"></a>
<a href="https://sonarcloud.io/component_measures?metric=vulnerabilities&selected=adamlui_js-utils%3Agenerate-pw&id=adamlui_js-utils">
    <img height=31 src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fsonarcloud.io%2Fapi%2Fmeasures%2Fcomponent%3Fcomponent%3Dadamlui_js-utils%3Agenerate-pw%2Fsrc%2Fgenerate-pw.js%26metricKeys%3Dvulnerabilities&query=%24.component.measures.0.value&style=for-the-badge&logo=sonar&logoColor=white&labelColor=464646&label=Vulnerabilidades&color=gold"></a>
<a href="https://github.com/toolleeo/cli-apps/#password-managers">
    <img height=31 src="https://img.shields.io/badge/Mencionado_en-Awesome-ff69b4?logo=awesomelists&logoColor=white&labelColor=464646&style=for-the-badge"></a>

<br>

<img height=6px width="100%" src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@0d36e26/assets/images/separators/aqua-gradient.png">

## 💡 Acerca de

**generate-pw** es una biblioteca liviana y fácil de usar que le permite generar, fortalecer y validar aleatoriamente contraseñas criptográficamente seguras.

- **Sin dependencias externas —** Solo se utilizan métodos criptográficos integrados para una aleatorización segura
- **Altamente personalizable:** Especifique la longitud, la cantidad, los juegos de caracteres a usar, etc.
- **Compatibilidad con múltiples entornos:** Uso en Node.js o el navegador web
- **Línea de comando utilizable —** Simplemente escriba `generate-pw`, eso es todo

<img height=6px width="100%" src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@0d36e26/assets/images/separators/aqua-gradient.png">

## ⚡ Instalación

Como **utilidad global**:

```
$ npm install -g generate-pw
```

Como **dependencia de tiempo de ejecución**, desde la raíz de tu proyecto:

```
$ npm install generate-pw
```

<br>

<a href="https://github.com/sponsors/adamlui"><img src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@0d36e26/assets/images/banners/sponsor/$10/banner1660x260.png"></a>

<img height=6px width="100%" src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@0d36e26/assets/images/separators/aqua-gradient.png">

## 🔌 Importando la API

### <img height=18 src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@0d36e26/assets/images/icons/platforms/node.js/icon25x28.png"> Node.js

#### ECMAScript*:

```js
import pw from 'generate-pw'
```

#### CommonJS:

```js
const pw = require('generate-pw')
```

###### _*Se requiere Node.js versión 14 o superior_

### <picture><source media="(prefers-color-scheme: dark)" srcset="https://cdn.jsdelivr.net/gh/adamlui/js-utils@0d36e26/assets/images/icons/platforms/web/light/icon25.png"><img width=16 src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@0d36e26/assets/images/icons/platforms/web/dark/icon25.png"></picture> Web

#### <> Etiqueta de secuencia de comandos HTML:

```html
<script src="https://cdn.jsdelivr.net/npm/generate-pw@2.3.2/dist/generate-pw.min.js"></script>
```

#### ES6:

```js
(async () => {
    await import('https://cdn.jsdelivr.net/npm/generate-pw@2.3.2/dist/generate-pw.min.js')
    // Tu código aquí...
})()
```

### <img height=17 src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@0d36e26/assets/images/icons/platforms/tampermonkey/icon28.png"><img height=17.5 src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@0d36e26/assets/images/icons/platforms/violentmonkey/icon25.png"> Greasemonkey

```js
...
// @require https://cdn.jsdelivr.net/npm/generate-pw@2.3.2/dist/generate-pw.min.js
// ==/UserScript==

// Tu código aquí...
```

<br>

**💡 Nota:** Para importar siempre la última versión (¡no se recomienda en producción!), elimine la etiqueta de versión `@2.3.2` de la URL de jsDelivr: `https://cdn.jsdelivr.net/npm/generate-pw/dist/generate-pw.min.js`

<br>

<img height=6px width="100%" src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@0d36e26/assets/images/separators/aqua-gradient.png">

## 📋 Uso de API

### `generatePassword([opciones])`

Genera **una** contraseña si no se proporciona la opción `qty` y devuelve una cadena:

```js
const contraseña = pw.generatePassword({ length: 11, numbers: true })
console.log(contraseña) // salida de muestra: 'bAsZm3mq6Qn'
```

...o **múltiples** contraseñas si se proporciona la opción `qty`, devolviendo una matriz de cadenas:

```js
const contraseñas = pw.generatePassword({ qty: 5, length: 8, symbols: true })
console.log(contraseñas)

/* salida de muestra:

generatePassword() » Generating passwords...
generatePassword() » Passwords generated!
generatePassword() » Check returned array.
[ '!zSf@Q.s', '!,HT\\;m=', '?Lq&FV>^', 'gf}Y;}Ne', 'Stsx(GqE' ]
*/
```

**💡 Nota:** Si no se pasan opciones, las contraseñas tendrán 8 caracteres y estarán compuestas por letras mayúsculas y minúsculas.

Ver: [Opciones disponibles](#opciones-disponibles-para-funciones-generate)

#

### `generatePasswords(qty[, opciones])`

Genera **múltiples** contraseñas basadas en la `qty` dada y devuelve una matriz de cadenas:

```js
const contraseñas = pw.generatePasswords(5, { length: 3, uppercase: false })
console.log(contraseñas)

/* salida de muestra:

generatePasswords() » Generating passwords...
generatePasswords() » Passwords generated!
generatePasswords() » Check returned array.
[ 'yilppxru', 'ckvkyjfp', 'zolcpyfb' ]
*/
```

**💡 Nota:** Si no se pasa ningún argumento `qty`, solo se generará una contraseña, devuelta como una cadena.

Ver: [Opciones disponibles](#opciones-disponibles-para-funciones-generate)

#

### `strictify(contraseña[, tiposCarRequeridos, opciones])`

Modifica la `contraseña` dada para usar al menos un carácter de cada elemento `requiredCharTypes` pasado, devolviendo una cadena:

```js
const strictPW = pw.strictify('abcdef', ['numbers', 'symbols'])
console.log(strictPW) // sample output: 'a!c2ef'
```

**💡 Nota:** Si no se pasa ninguna matriz `tiposCarRequeridos`, se requerirán todos los tipos disponibles.

Los `tiposCarRequeridos` disponibles son: `['número', 'símbolo', 'inferior', 'superior']`

Opciones disponibles (pasadas como propiedades del objeto):

Nombre    | Tipo     | Descripción                               | Valor por Defecto
----------|----------|-------------------------------------------|-------------------
`verbose` | Booleano | Mostrar registros en la consola/terminal. | `true`

#

### `validateStrength(contraseña[, opciones])`

Valida la seguridad de una contraseña y devuelve un objeto que contiene:
- `strengthScore` (0–100)
- matriz `recommendations`
- `isGood` booleano (`true` si `strengthScore` >= 80)

Ejemplo:

```js
const fortalezaPW = pw.validateStrength('Aa?idsE')
console.log(fortalezaPW)

/* salidas:

validateStrength() » Validating password strength...
validateStrength() » Password strength validated!
validateStrength() » Check returned object for score/recommendations.
{
  strengthScore: 60,
  recommendations: [
    'Make it at least 8 characters long.',
    'Include at least one number.'
  ],
  isGood: false
}
*/
```

Opciones disponibles (pasadas como propiedades del objeto):

Nombre    | Tipo     | Descripción                               | Valor por Defecto
----------|----------|-------------------------------------------|-------------------
`verbose` | Booleano | Mostrar registros en la consola/terminal. | `true`

#

### Opciones disponibles para funciones `generate*()`

Cualquiera de estos se puede pasar al objeto de opciones para cada función `generate*()`:

Nombre                | Tipo     | Descripción                                                                                  | Valor por Defecto
----------------------|----------|----------------------------------------------------------------------------------------------|---------------
`verbose`             | Booleano | Mostrar registros en la consola/terminal.                                                    | `true`
`length`              | Entero   | Longitud de la(s) contraseña(s).                                                             | `8`
`qty`                 | Entero   | Número de contraseñas a generar.                                                             | `1`
`strength`            | Cadena   | `<'weak'\|'basic'\|'strong'>` Aplicar ajuste preestablecido de intensidad.                   | `''`
`charset`             | Cadena   | Caracteres a incluir en la(s) contraseña(s).                                                 | `''`
`exclude`             | Cadena   | Caracteres para excluir de la(s) contraseña(s).                                              | `''`
`numbers`             | Booleano | Permitir números en contraseña(s).                                                           | `false`
`symbols`             | Booleano | Permitir símbolos en la(s) contraseña(s).                                                    | `false`
`lowercase`           | Booleano | Permitir letras minúsculas en la(s) contraseña(s).                                           | `true`
`uppercase`           | Booleano | Permitir letras mayúsculas en la(s) contraseña(s).                                           | `true`
`similarChars`        | Booleano | Incluya caracteres similares (por ejemplo, o, 0, O, i, l, 1, |) en la(s) contraseña(s).      | `false`
`strict`              | Booleano | Requiere al menos un carácter de cada carácter permitido establecido en la(s) contraseña(s). | `true`
`entropy`             | Booleano | Calcular/registrar la entropía estimada.                                                     | `true`

##### _*Solo disponible en [`generatePassword([opciones])`](#generatepasswordopciones) ya que [`generatePasswords(qty[, opciones])`](#generatepasswordsqty-opciones) toma un argumento `qty`_

<br>

<img height=6px width="100%" src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@0d36e26/assets/images/separators/aqua-gradient.png">

## 💻 Uso de la línea de comando

**generate-pw** también se puede usar directamente desde la línea de comandos. El comando básico es:

```
$ generate-pw
```

<img src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@0d3424a/generate-pw/assets/images/screenshots/cli/generate-pw-cmd-output.png">

#

### Opciones de línea de comando

```
Opciones de parámetros:
 --length=n                  Genere contraseña(s) de n longitud.
 --qty=n                     Generar n contraseña(s).
 --charset=cars              Incluya únicamente cars en la(s) contraseña(s).
 --exclude=cars              Excluir cars de la(s) contraseña(s).
 --ui-lang="code"            Código ISO 639-1 de idioma para mostrar la interfaz de usuario.
 --config="path/to/file"     Cargar archivo de configuración personalizado.

Opciones booleanas:
 -w, --weak                  Generar contraseña(s) débil(es).
 -b, --basic                 Generar contraseña(s) de intensidad básica.
 -t, --strong                Generar contraseña(s) fuerte(s).
 -N, --no-numbers            No permita números en la(s) contraseña(s).
 -Y, --no-symbols            PermitNo permita símbolos en la(s) contraseña(s).
 -L, --no-lowercase          No permitir letras minúsculas en la(s) contraseña(s).
 -U, --no-uppercase          No permitir letras mayúsculas en la(s) contraseña(s).
 -s, --similar-chars         Incluya caracteres similares en la(s) contraseña(s).
 -S, --unstrict              No se requiere al menos un carácter de cada conjunto de caracteres permitidos en la(s) contraseña(s).
 -E, --no-entropy            Calcular/registrar la entropía estimada.
 -q, --quiet                 Suprime todos los registros excepto los errores.

Comandos:
 -i, --init                  Crear archivo de configuración (en la raíz del proyecto).
 -h, --help                  Mostrar pantalla de ayuda.
 -v, --version               Mostrar número de versión.
     --stats                 Mostrar estadísticas de npm.
     --debug [targetKey]     Mostrar registros de depuración.
```

#

**generate-pw** se puede personalizar mediante un archivo `generate-pw.config.mjs` o `generate-pw.config.js` ubicado en la raíz de su proyecto.

Ejemplo de configuración predeterminada:

```js
export default {
    length: 12,                 // longitud de la(s) contraseña(s) a generar
    qty: 1,                     // cantidad de contraseñas a generar
    strength: '',               // <'weak'|'basic'|'strong'> aplicar ajuste preestablecido de intensidad
    charset: '',                // incluir solo los caracteres especificados en la(s) contraseña(s)
    exclude: '',                // excluir los caracteres especificados de la(s) contraseña(s)
    excludeNums: false,         // permitir números en la(s) contraseña(s)
    excludeSymbols: false,      // permitir símbolos en la(s) contraseña(s)
    excludeLowerChars: false,   // no permitir letras minúsculas en la(s) contraseña(s)
    excludeUpperChars: false,   // no permitir letras mayúsculas en la(s) contraseña(s)
    similarChars: false,        // incluya caracteres similares en la(s) contraseña(s)
    unstrict: false,            // no se requiere un carácter o más de cada conjunto de caracteres permitidos en la(s) contraseña(s)
    noEntropy: false,           // calcular/registrar la entropía estimada
    quietMode: false            // suprimir todos los registros excepto los errores
}
```

💡 Ejecute `generate-pw init` para generar una plantilla de `generate-pw.config.mjs` en la raíz de su proyecto.

<br>

<img height=6px width="100%" src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@0d36e26/assets/images/separators/aqua-gradient.png">

## 🏛️ Licencia MIT

**Derechos de autor © 2024–2026 [Adam Lui](https://github.com/adamlui) y contribuyentes**

Por el presente se otorga permiso, sin cargo, a cualquier persona que obtenga una copia de este software y los archivos de documentación asociados (el "Software"), para operar con el Software sin restricciones, incluidos, entre otros, los derechos de uso, copia, modificación, fusión. , publicar, distribuir, sublicenciar y/o vender copias del Software, y permitir que las personas a quienes se les proporciona el Software lo hagan, sujeto a las siguientes condiciones:

El aviso de derechos de autor anterior y este aviso de permiso se incluirán en todas las copias o partes sustanciales del Software.

EL SOFTWARE SE PROPORCIONA "TAL CUAL", SIN GARANTÍA DE NINGÚN TIPO, EXPRESA O IMPLÍCITA, INCLUYENDO PERO NO LIMITADO A LAS GARANTÍAS DE COMERCIABILIDAD, IDONEIDAD PARA UN PROPÓSITO PARTICULAR Y NO INFRACCIÓN. EN NINGÚN CASO LOS AUTORES O TITULARES DE DERECHOS DE AUTOR SERÁN RESPONSABLES DE NINGÚN RECLAMO, DAÑO U OTRA RESPONSABILIDAD, YA SEA EN UNA ACCIÓN CONTRACTUAL, AGRAVIO O DE OTRA MANERA, QUE SURJA DE, FUERA DE O EN RELACIÓN CON EL SOFTWARE O EL USO U OTRAS NEGOCIOS EN EL SOFTWARE.

<br>

<img height=6px width="100%" src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@0d36e26/assets/images/separators/aqua-gradient.png">

## 🛠️ Utilidades relacionadas

### <picture><source media="(prefers-color-scheme: dark)" srcset="https://cdn.jsdelivr.net/gh/adamlui/js-utils@5c34563/generate-ip/assets/images/icons/node-graph/white/icon55x49.png"><img height=21 src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@5c34563/generate-ip/assets/images/icons/node-graph/black/icon55x49.png"></picture> [generate-ip](https://github.com/adamlui/js-utils/tree/main/generate-ip/#readme) &nbsp;<a href="https://github.com/toolleeo/cli-apps/#networking"><img height=18 src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@0d36e26/assets/images/badges/awesome/badge.svg"></a>

> Generar, formatear y validar aleatoriamente direcciones IPv4 + IPv6 + MAC.
<br>[Instalar](https://github.com/adamlui/js-utils/tree/main/generate-ip/docs/#-installation) /
[Léame](https://github.com/adamlui/js-utils/tree/main/generate-ip/docs/#readme) /
[Uso de API](https://github.com/adamlui/js-utils/tree/main/generate-ip/docs/#-api-usage) /
[Uso de CLI](https://github.com/adamlui/js-utils/tree/main/generate-ip/docs/#-command-line-usage) /
[Conversar](https://github.com/adamlui/js-utils/discussions)

### <picture><source media="(prefers-color-scheme: dark)" srcset="https://cdn.jsdelivr.net/gh/adamlui/js-utils@0d3424a/geolocate/assets/images/icons/wire-globe/white/icon32.png"><img height=22 src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@0d3424a/geolocate/assets/images/icons/wire-globe/black/icon32.png"></picture> [geolocate](https://github.com/adamlui/js-utils/tree/main/geolocate/#readme) &nbsp;<a href="https://github.com/toolleeo/cli-apps/#networking"><img height=18 src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@0d36e26/assets/images/badges/awesome/badge.svg"></a>

> Obtenga datos de geolocalización de IP de la CLI.
<br>[Instalar](https://github.com/adamlui/js-utils/tree/main/geolocate/docs/#-installation) /
[Léame](https://github.com/adamlui/js-utils/tree/main/geolocate/docs/#readme) /
[Uso de CLI](https://github.com/adamlui/js-utils/tree/main/geolocate/docs/#-command-line-usage) /
[Uso de API](https://github.com/adamlui/js-utils/tree/main/geolocate/docs/#-api-usage) /
[Conversar](https://github.com/adamlui/js-utils/discussions)

<br>

<img height=6px width="100%" src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@0d36e26/assets/images/separators/aqua-gradient.png">

<picture><source media="(prefers-color-scheme: dark)" srcset="https://cdn.jsdelivr.net/gh/adamlui/js-utils@0d36e26/assets/images/icons/home/white/icon32x27.png"><img height=13 src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@0d36e26/assets/images/icons/home/dark-gray/icon32x27.png"></picture> <a href="https://github.com/adamlui/js-utils/#readme">**Más utilidades de JavaScript**</a> /
<a href="https://github.com/adamlui/js-utils/discussions">Conversar</a> /
<a href="https://github.com/adamlui/js-utils/issues">Reportar error</a> /
<a href="mailto:security@tidelift.com">Reportar vulnerabilidad</a> /
<a href="#top">Volver arriba ↑</a>
