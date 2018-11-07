#!/bin/sh

#
# usecaseA: 	JSON Web Token (JWT) Authentication 
#		Specs: https://tools.ietf.org/html/rfc7519
#
# 		1) Users signup to the system with username, email, password 
#		and gets confirmation through /v1/authentication endpoint.
#
# 		2) Users signin through /v1/authentication endpoint 
#		with username and correct password and gets access granted.
#
# 		3) Users signin through /v1/authentication endpoint with 
#		username and incorrect password and gets access denied.
#

#TODO use a input a username, email, password.

counter=0
#TODO GET tests well alone; POSt doesn't test yet and waits.


commands=$(jq . queries.json)
queries=$(jq . queries.json)
#url="http://192.168.1.202/v1/opendatahub"
url="http://192.168.1.104/v1/authentication"

while true 
do
	echo $counter
	curl -G -s $url  --data-urlencode "queries=$queries"
	#curl --data-urlencode "{'commands'=[$commands, $commands]}" -X POST $url

	#curl -d '{"key1":"value1", "key2":"value2"}' -H "Content-Type: application/json" -X POST 192.168.1.202/v1/opendatahub

	username=`apg -n 1` 
	password=`apg -n 1` 
	email="$username@gmail.com" 

	counter=$((counter+1))
	sleep 1
done
