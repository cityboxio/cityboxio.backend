#! /bin/sh
source="endpoints"

server_ip="192.168.1.202"
endpoints="opendatahub rd" # array of all the endpoints 
for endpoint in $endpoints;
do
	echo "##############################"
	url="http://$server_ip/v1/$endpoint"
	echo "testing $url"
	#
	# commands and queries for each endpoint are stored in bin/
	#
	echo "##############################"
	# curl -sD- -o/dev/null https://api.citybox.io/v1/$endpoint
	curl $url	
	echo "##############################"
done

#http://192.168.1.202/v1/test?commands=blahblah
#http://192.168.1.202/v1/test?queries=[which_db_to_query(flat, graph, etc. addressed via codename; along with sensiable defaults],whats the query
