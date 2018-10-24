#!/bin/sh

city=$1
#cat cities.geojson | jq -r --arg city "$city" '.features[] | select(.properties.NAME=="$city")'
cat cities.geojson | jq ".features[] | select(.properties.NAME==\"$city\")"
