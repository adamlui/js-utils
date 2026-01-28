#!/bin/bash

rm -rf dist/* && mkdir -p dist/data/ && cp app.json dist/data/

minify-js src dist --comment=" \
© 2024 Adam Lui & contributors under the MIT license.\n \
Source: https://github.com/adamlui/scss-to-css/tree/main/src\n \
Documentation: https://github.com/adamlui/scss-to-css/tree/main/docs"
