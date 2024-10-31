<div align="right">
    <h6>
        <picture>
            <source type="image/svg+xml" media="(prefers-color-scheme: dark)" srcset="https://media.js-utils.org/images/icons/earth/white/icon32.svg?7c33be0">
            <img height=14 src="https://media.js-utils.org/images/icons/earth/black/icon32.svg?7c33be0">
        </picture>
        &nbsp;Español |
        <a href="../..#readme">English</a> |
        <a href="../zh-cn#readme">简体中文</a> |
        <a href="../zh-tw#readme">繁體中文</a> |
        <a href="../hi#readme">हिंदी</a> |
        <a href="../bn#readme">বাংলা</a> |
        <a href="../de#readme">Deutsch</a> |
        <a href="../fr#readme">Français</a>
    </h6>
</div>

# > generate-pw

### Genere, fortalezca y valide aleatoriamente contraseñas criptográficamente seguras.

<a href="https://www.npmjs.com/package/generate-pw"><img height=31 src="https://img.shields.io/npm/dm/generate-pw?label=Descargas&logo=npm&color=af68ff&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="#%EF%B8%8F-licencia-mit"><img height=31 src="https://img.shields.io/badge/Licencia-MIT-orange.svg?logo=internetarchive&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://github.com/adamlui/js-utils/releases/tag/generate-pw-1.5.11"><img height=31 src="https://img.shields.io/badge/Ultima_Versión-1.5.11-44cc11.svg?logo=icinga&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://www.npmjs.com/package/generate-pw?activeTab=code"><img height=31 src="https://img.shields.io/npm/unpacked-size/generate-pw?style=for-the-badge&logo=ebox&logoColor=white&labelColor=464646&color=blue&label=Tama%C3%B1o%20Desempaquetado"></a>
<a href="https://github.com/adamlui/js-utils/blob/generate-pw-1.5.11/generate-pw/dist/generate-pw.min.js"><img height=31 src="https://img.shields.io/github/size/adamlui/js-utils/generate-pw/dist/generate-pw.min.js?branch=generate-pw-1.5.11&label=Tama%C3%B1o%20Minimizado&logo=databricks&logoColor=white&labelColor=464646&color=ff69b4&style=for-the-badge"></a>
<a href="https://sonarcloud.io/component_measures?metric=new_vulnerabilities&id=adamlui_js-utils:generate-pw/src/generate-pw.js"><img height=31 src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fsonarcloud.io%2Fapi%2Fmeasures%2Fcomponent%3Fcomponent%3Dadamlui_js-utils%3Agenerate-pw%2Fsrc%2Fgenerate-pw.js%26metricKeys%3Dvulnerabilities&query=%24.component.measures.0.value&style=for-the-badge&logo=sonarcloud&logoColor=white&labelColor=464646&label=Vulnerabilidades&color=gold"></a>
<a href="https://github.com/toolleeo/cli-apps#password-managers"><img height=31 src="https://img.shields.io/badge/Mencionado_en-Awesome-c4a2bd?logo=awesomelists&logoColor=white&labelColor=464646&style=for-the-badge"></a>

<br>

<img height=6px width="100%" src="https://media.js-utils.org/images/separators/gradient-aqua.png?c0192d3">

## 💡 Acerca de

**generate-pw** es una biblioteca liviana y fácil de usar que le permite generar, fortalecer y validar aleatoriamente contraseñas criptográficamente seguras.

- **Sin dependencias externas —** Solo se utilizan métodos criptográficos integrados para una aleatorización segura
- **Altamente personalizable:** Especifique la longitud, la cantidad, los juegos de caracteres a usar, etc.
- **Compatibilidad con múltiples entornos:** Uso en Node.js o el navegador web
- **Línea de comando utilizable —** Simplemente escriba `generate-pw`, eso es todo

<img height=6px width="100%" src="https://media.js-utils.org/images/separators/gradient-aqua.png?c0192d3">

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

<a href="https://github.com/sponsors/adamlui"><img src="https://media.js-utils.org/images/banners/sponsor/$10/banner1660x260.png?09f5d64"></a>

<img height=6px width="100%" src="https://media.js-utils.org/images/separators/gradient-aqua.png?c0192d3">

## 🔌 Importando la API

### <img height=18 src="https://media.js-utils.org/images/icons/platforms/node.js/icon25x28.png?3e22bae"> Node.js

#### ECMAScript*:

```js
import pw from 'generate-pw';
```

#### CommonJS:

```js
const pw = require('generate-pw');
```

###### _*Se requiere Node.js versión 14 o superior_

### <picture><source media="(prefers-color-scheme: dark)" srcset="https://media.js-utils.org/images/icons/platforms/web/light/icon25.png?3e22bae"><img width=16 src="https://media.js-utils.org/images/icons/platforms/web/dark/icon25.png?3e22bae"></picture> Web

#### <> Etiqueta de secuencia de comandos HTML:

```html
<script src="https://cdn.jsdelivr.net/npm/generate-pw@1.5.11/dist/generate-pw.min.js"></script>
```

#### ES6:

```js
(async () => {
    await import('https://cdn.jsdelivr.net/npm/generate-pw@1.5.11/dist/generate-pw.min.js');
    // Tu código aquí...
})();
```

### <img height=17 src="https://media.js-utils.org/images/icons/platforms/tampermonkey/icon28.png?4fd2fa7"><img height=17.5 src="https://media.js-utils.org/images/icons/platforms/violentmonkey/icon25.png?2fe972c"> Greasemonkey

```js
...
// @require https://cdn.jsdelivr.net/npm/generate-pw@1.5.11/dist/generate-pw.min.js
// ==/UserScript==

// Tu código aquí...
```

<br>

**💡 Nota:** Para importar siempre la última versión (¡no se recomienda en producción!), elimine la etiqueta de versión `@1.5.11` de la URL de jsDelivr: `https://cdn.jsdelivr.net/npm/generate-pw/dist/generate-pw.min.js`

<br>

<img height=6px width="100%" src="https://media.js-utils.org/images/separators/gradient-aqua.png?c0192d3">

## 📋 Uso de API

### `generatePassword([opciones])`

Genera **una** contraseña si no se proporciona la opción `qty` y devuelve una cadena:

```js
const contraseña = pw.generatePassword({ length: 11, numbers: true });
console.log(contraseña); // salida de muestra: 'bAsZm3mq6Qn'
```

...o **múltiples** contraseñas si se proporciona la opción `qty`, devolviendo una matriz de cadenas:

```js
const contraseñas = pw.generatePassword({ qty: 5, length: 8, symbols: true });
console.log(contraseñas);

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
const contraseñas = pw.generatePasswords(5, { length: 3, uppercase: false });
console.log(contraseñas);

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
const strictPW = pw.strictify('abcdef', ['numbers', 'symbols']);
console.log(strictPW); // sample output: 'a!c2ef'
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
const fortalezaPW = pw.validateStrength('Aa?idsE');
console.log(fortalezaPW);

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
`qty`*                | Entero   | Número de contraseñas a generar.                                                             | `1`
`charset`             | Cadena   | Caracteres a incluir en la(s) contraseña(s).                                                 | `''`
`exclude`             | Cadena   | Caracteres para excluir de la(s) contraseña(s).                                              | `''`
`numbers`             | Booleano | Permitir números en contraseña(s).                                                           | `false`
`symbols`             | Booleano | Permitir símbolos en la(s) contraseña(s).                                                    | `false`
`lowercase`           | Booleano | Permitir letras minúsculas en la(s) contraseña(s).                                           | `true`
`uppercase`           | Booleano | Permitir letras mayúsculas en la(s) contraseña(s).                                           | `true`
`excludeSimilarChars` | Booleano | Excluya caracteres similares (por ejemplo, o,0,O,i,l,1,\|) en la(s) contraseña(s).           | `false`
`strict`              | Booleano | Requiere al menos un carácter de cada carácter permitido establecido en la(s) contraseña(s). | `false`

##### _*Solo disponible en [`generatePassword([opciones])`](#generatepasswordopciones) ya que [`generatePasswords(qty[, opciones])`](#generatepasswordsqty-opciones) toma un argumento `qty`_

<br>

<img height=6px width="100%" src="https://media.js-utils.org/images/separators/gradient-aqua.png?c0192d3">

## 💻 Uso de la línea de comando

Cuando se instala [globalmente](#-instalación), **generate-pw** también se puede usar desde la línea de comando. El comando básico es:

```
$ generate-pw
```

<img src="https://media.generatepw.org/images/screenshots/cli/generate-pw-cmd-output.png?7b16322">

#

### Opciones de línea de comando

```
Opciones de parámetros:
 --length=n                  Genere contraseña(s) de n longitud.
 --qty=n                     Generar n contraseña(s).
 --charset=cars              Incluya únicamente cars en la(s) contraseña(s).
 --exclude=cars              Excluir cars de la(s) contraseña(s).

Opciones booleanas:
 -n, --include-numbers       Permitir números en contraseña(s).
 -y, --include-symbols       Permitir símbolos en la(s) contraseña(s).
 -L, --no-lowercase          No permitir letras minúsculas en la(s) contraseña(s).
 -U, --no-uppercase          No permitir letras mayúsculas en la(s) contraseña(s).
 -S, --no-similar            Excluya caracteres similares en la(s) contraseña(s).
 -s, --strict                Requiere al menos un carácter de cada carácter permitido establecido en la(s) contraseña(s).
 -q, --quiet                 Suprime todos los registros excepto los errores.

Comandos de información:
 -h, --help                  Mostrar pantalla de ayuda.
 -v, --version               Mostrar número de versión.
```

<br>

<img height=6px width="100%" src="https://media.js-utils.org/images/separators/gradient-aqua.png?c0192d3">

## 🏛️ Licencia MIT

**Derechos de autor © 2024 [Adam Lui](https://github.com/adamlui) y contribuyentes**

Por el presente se otorga permiso, sin cargo, a cualquier persona que obtenga una copia de este software y los archivos de documentación asociados (el "Software"), para operar con el Software sin restricciones, incluidos, entre otros, los derechos de uso, copia, modificación, fusión. , publicar, distribuir, sublicenciar y/o vender copias del Software, y permitir que las personas a quienes se les proporciona el Software lo hagan, sujeto a las siguientes condiciones:

El aviso de derechos de autor anterior y este aviso de permiso se incluirán en todas las copias o partes sustanciales del Software.

EL SOFTWARE SE PROPORCIONA "TAL CUAL", SIN GARANTÍA DE NINGÚN TIPO, EXPRESA O IMPLÍCITA, INCLUYENDO PERO NO LIMITADO A LAS GARANTÍAS DE COMERCIABILIDAD, IDONEIDAD PARA UN PROPÓSITO PARTICULAR Y NO INFRACCIÓN. EN NINGÚN CASO LOS AUTORES O TITULARES DE DERECHOS DE AUTOR SERÁN RESPONSABLES DE NINGÚN RECLAMO, DAÑO U OTRA RESPONSABILIDAD, YA SEA EN UNA ACCIÓN CONTRACTUAL, AGRAVIO O DE OTRA MANERA, QUE SURJA DE, FUERA DE O EN RELACIÓN CON EL SOFTWARE O EL USO U OTRAS NEGOCIOS EN EL SOFTWARE.

<br>

<img height=6px width="100%" src="https://media.js-utils.org/images/separators/gradient-aqua.png?c0192d3">

## 🛠️ Utilidades relacionadas

### <picture><source media="(prefers-color-scheme: dark)" srcset="https://media.generate-ip.org/images/icons/node-graph/white/icon55x49.png?b4eb06e"><img height=21 src="https://media.generate-ip.org/images/icons/node-graph/black/icon55x49.png?b4eb06e"></picture> [generate-ip](https://js-utils.org/generate-ip) &nbsp;<a href="https://github.com/toolleeo/cli-apps#networking"><img height=18 src="https://media.js-utils.org/images/badges/awesome/badge.svg?7b16322"></a>

> Generar, formatear y validar aleatoriamente direcciones IPv4 + IPv6 + MAC.
<br>[Instalar](https://docs.generate-ip.org/#-installation) /
[Léame](https://docs.generate-ip.org/#readme) /
[Uso de API](https://docs.generate-ip.org/#-api-usage) /
[Uso de CLI](https://docs.generate-ip.org/#-command-line-usage) /
[Conversar](https://github.js-utils.org/discussions)

### <picture><source media="(prefers-color-scheme: dark)" srcset="https://media.geolocatejs.org/images/icons/wire-globe/white/icon32.png?e735b99"><img height=22 src="https://media.geolocatejs.org/images/icons/wire-globe/black/icon32.png?e735b99"></picture> [geolocate](https://js-utils.org/geolocate) &nbsp;<a href="https://github.com/toolleeo/cli-apps#networking"><img height=18 src="https://media.js-utils.org/images/badges/awesome/badge.svg?7b16322"></a>

> Obtenga datos de geolocalización de IP de la CLI.
<br>[Instalar](https://docs.geolocatejs.org/#-installation) /
[Léame](https://docs.geolocatejs.org/#readme) /
[Uso de CLI](https://docs.geolocatejs.org/#-command-line-usage) /
[Uso de API](https://docs.geolocatejs.org/#-api-usage) /
[Conversar](https://github.js-utils.org/discussions)

<br>

<img height=6px width="100%" src="https://media.js-utils.org/images/separators/gradient-aqua.png?c0192d3">

<picture><source media="(prefers-color-scheme: dark)" srcset="https://media.js-utils.org/images/icons/home/white/icon32x27.png?e735b99"><img height=13 src="https://media.js-utils.org/images/icons/home/dark-gray/icon32x27.png?e735b99"></picture> <a href="https://js-utils.org">**Más utilidades de JavaScript**</a> /
<a href="https://github.js-utils.org/discussions">Conversar</a> /
<a href="#-generate-pw">Volver arriba ↑</a>
