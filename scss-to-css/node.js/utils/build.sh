#!/bin/bash

cp app.json dist/

minify-js src dist --comment=" \
© 2024 Adam Lui & contributors under the MIT license.\n \
Source: https://github.com/adamlui/scss-to-css/tree/main/node.js/src\n \
Documentation: https://github.com/adamlui/scss-to-css/tree/main/node.js/docs"
