#! /bin/sh
#
#	Script to configure an endpoint daemon
#

source="./src"
bin="./bin"

daemon_type=$1 
endpoint_name=$2 
daemon_name="$endpoint_name-$daemon_type-daemon"
sock="$endpoint_name.$daemon_type.sock"

#echo "configuring cc Flag of $daemon_type for $endpoint_name from $source to $bin" 
#TODO why pass SOCK_PATH just pass daemon type and make subsitute in the endpointd.c 

cc -D SOCK='"'$sock'"' -o ./bin/$daemon_name -Wall ./src/endpointd.c

#if [ "$daemon_type" == "commands" ]; then
#echo "this $daemon_name is commands; to add it to the socketpath"
#cc -D ENDPOINT_NAME="$endpoint_name" -D DAEMON_TYPE='"commands"' -o ./bin/$daemon_name -Wall ./src/endpointd.c

#elif [ "$daemon_type" == "queries" ]; then
##echo "this $daemon_name is queries; to add it to the socketpath"
#cc -D ENDPOINT_NAME='"$endpoint_name"' -D DAEMON_TYPE='"queries"' -o ./bin/$daemon_name -Wall ./src/endpointd.c

#else
#echo "exit script as daemon_type is not recognized"
#fi

#echo "##############################"
#echo "compiling endpointd daemon"
#cc -D DAEMON_TYPE='' -o ./bin/
#-Wall ./src/endpointd.c

#cc -D SOCK_PATH='"/var/www/run/opendatahub.commands.sock"' -o ./bin/endpointd -Wall ./src/endpointd.c

#echo "##############################"
#
#echo "restarting syslogd"
#doas rcctl restart syslogd 
#
#echo "##############################"
#
#echo "TODO installing endpointd daemon via rcctl to the openbsd system"
#echo "running endpointd daemon"
#cd bin
#./endpointd
