TODO

- Write Operations - CQRS Commands
-- website sends write events in json to a webserver(obsd httpd) via POST\PUT verbs
-- obsd httpd recevies the json to a specific endpoint 
-- jq is used to make sense of json
-- specific endpoint utility uses endpoint.commands.syslog (and logs via a merkle tree manner of previous syslog messages)
-- every endpoint acts as a single microservers and has its two seperate append-only syslog files(one for commands and one for query events), rotated backup is done via the OS to external drives, snapeshots too. 
-- a filedatabase(csv) daemon that monitors the syslog file uses syslog events to create a state-only file database 
-- a graph database daemon that monitors the syslog file uses syslog events to create a state-only graph database
OR use 	syslog.conf(5) as a unix pub/sub thingy :)
-- each endpoint/microservice stores its events but not "stateful data" 

- Read Operations - CQRS Query
-- website sends read events in json to a webserver(obsd httpd) via GET verbs
-- obsd httpd recevies the json to a specific endpoint 
-- jq is used to make sense of json
-- specific endpoint utility uses endpoint.query.syslog (and logs via a merkle tree manner of previous syslog messages)
