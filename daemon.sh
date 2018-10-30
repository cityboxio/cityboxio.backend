#! /bin/sh

doas rcctl disable syslogd 
doas rcctl enable syslogd 
doas rcctl stop syslogd 
doas rcctl start syslogd 
echo "##############################"
echo "compiling endpointd daemon"
cc ./src/endpointd.c -o ./bin/endpointd
#cc -o $bin/endpointd $source/endpointd.c
echo "##############################"
echo "TODO installing endpointd daemon"
echo "running endpointd daemon"
cd bin
./endpointd


