#!/bin/bash

cp app.json dist/
mkdir -p dist/_locales/en && cp _locales/en/messages.json dist/_locales/en/

node src/cli src dist --comment=" \
© 2023–2026 Adam Lui & contributors under the MIT license.\n \
Source: https://github.com/adamlui/minify.js/tree/main/node.js/src\n \
Documentation: https://github.com/adamlui/minify.js/tree/main/node.js/docs"
