#!/bin/sh

counter=0
while true
do
#curl -s 192.168.1.202/v1/opendatahub?commands="opendatahub-123467890good"
#curl -s 192.168.1.202/v1/rd?commands="rd-1234678XXXXXXXgood"
#curl -s 192.168.1.202/v1/opendatahub?commands="opendatahub-good"
curl -s 192.168.1.202/v1/opendatahub?commands="opendatahub-UserA:sending:command$counter"
curl -d "param1=value1&param2=value2" -H -X POST 192.168.1.202/v1/opendatahub?queries="opendatahub-UserA:sending:query:$counter"
#curl -s 192.168.1.202/v1/rd?commands="rd-UserA:$counter"
#TODO some json tests, try big ones
#echo $counter
counter=$((counter+1))
sleep 2
done
