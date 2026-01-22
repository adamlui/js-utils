#!/bin/bash

cp app.json dist/

minify-js src dist --comment=" \
© 2024–2026 Adam Lui under the MIT license.\n \
Source: https://code.geolocatejs.org\n \
Documentation: https://docs.geolocatejs.org"
