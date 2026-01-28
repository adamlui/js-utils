#!/bin/bash

rm -rf dist/* && mkdir -p dist/data/ && cp app.json _locales/en/messages.json dist/data/

minify-js src dist --comment=" \
© 2024–2026 Adam Lui under the MIT license.\n \
Source: https://github.com/adamlui/js-utils/tree/main/geolocate/src\n \
Documentation: github.com/adamlui/js-utils/tree/main/geolocate/docs"
