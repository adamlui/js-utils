#!/bin/bash

rm -rf dist/* && mkdir -p dist/data/ && cp ../_locales/en/messages.json app.json minify.config.mjs dist/data/

node src/cli src dist --comment=" \
© 2023–2026 Adam Lui & contributors under the MIT license.\n \
Source: https://github.com/adamlui/minify.js/tree/main/node.js/src\n \
Documentation: https://github.com/adamlui/minify.js/tree/main/node.js/docs"
