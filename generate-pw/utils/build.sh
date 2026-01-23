#!/bin/bash

cp app.json dist/
mkdir -p dist/_locales/en && cp _locales/en/messages.json dist/_locales/en/

minify-js src dist --comment=" \
© 2024–2026 Adam Lui & contributors under the MIT license.\n \
Source: https://code.generatepw.org\n \
Documentation: https://docs.generatepw.org"
