#!/bin/bash

cp app.json dist/

minify-js src dist --comment=" \
© 2024–2026 Adam Lui & contributors under the MIT license.\n \
Source: https://code.generate-ip.org\n \
Documentation: https://docs.generate-ip.org"
