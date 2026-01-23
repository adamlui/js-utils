#!/bin/bash

cp app.json _locales/en/messages.json dist/data/

minify-js src dist --comment=" \
© 2024–2026 Adam Lui & contributors under the MIT license.\n \
Source: https://code.generatepw.org\n \
Documentation: https://docs.generatepw.org"
