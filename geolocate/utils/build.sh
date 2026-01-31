#!/bin/bash

rm -rf dist/* && mkdir -p dist/data/ && cp _locales/en/messages.json app.json geolocate.config.mjs dist/data/

minify-js src dist --comment=" \
© 2024–2026 Adam Lui under the MIT license.\n \
Source: https://github.com/adamlui/js-utils/tree/main/geolocate/src\n \
Documentation: github.com/adamlui/js-utils/tree/main/geolocate/docs"
