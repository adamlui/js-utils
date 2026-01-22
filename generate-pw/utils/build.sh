#!/bin/bash

cp app.json dist/

minify-js src dist --comment=" \
© 2024–2026 Adam Lui & contributors under the MIT license.\n \
Source: https://code.generatepw.org\n \
Documentation: https://docs.generatepw.org"
