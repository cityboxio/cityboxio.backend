#!/bin/sh

counter=0
while true
do
curl -s 192.168.1.202/v1/opendatahub?commands="123467890good"
curl -s 192.168.1.202/v1/opendatahub?commands="1234678XXXXXXXgood"
curl -s 192.168.1.202/v1/opendatahub?commands="good"
curl -s 192.168.1.202/v1/opendatahub?commands="UserB:$counter"
#TODO some json tests, try big ones
#echo $counter
counter=$((counter+1))
done
