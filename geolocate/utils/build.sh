#!/bin/bash

rm -rf dist/* && mkdir -p dist/data/ && cp app.json _locales/en/messages.json dist/data/

minify-js src dist --comment=" \
© 2024–2026 Adam Lui under the MIT license.\n \
Source: https://code.geolocatejs.org\n \
Documentation: https://docs.geolocatejs.org"
