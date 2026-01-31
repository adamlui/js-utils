#!/bin/bash

rm -rf dist/* && mkdir -p dist/data/ && cp _locales/en/messages.json app.json generate-pw.config.mjs dist/data/

minify-js src dist --comment=" \
© 2024–2026 Adam Lui & contributors under the MIT license.\n \
Source: https://github.com/adamlui/js-utils/tree/main/generate-pw/src\n \
Documentation: https://github.com/adamlui/js-utils/tree/main/generate-pw/docs"
