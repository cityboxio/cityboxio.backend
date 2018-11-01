#!/bin/sh
#
#	Script to configure an endpoint
#

source="./src"
bin="./bin"
server_ip="192.168.1.202" #TODO use an env variable
endpoint_version=$1 
endpoint_name=$2 

#[ "$#" -lt 1 ] && printf "Please supply a version number and endpoint name" && exit 

echo "##############################"
echo "compiling $endpoint"
cc -static -g -W -Wall -o $bin/$endpoint_name $source/endpoint.c
echo "installing $endpoint_name to /var/www/$endpoint_version"
doas install -o www -g www -m 0500 $bin/$endpoint_name /var/www/v1
url="http://$server_ip/$endpoint_version/$endpoint_name"
echo "accessible from $url"
echo "##############################"
