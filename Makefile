bin = ./bin
source = ./source

all:
	#TODO do allthings inorder on a new machine

man:
	echo "make manpages and install them"

readme:
	echo "# cityboxio.backend" > README
	echo "" >> README
	banner citybox.io >> README
	echo "" >> README
	tree >> README

################################################################
#
#	DEPLOYMENT - make deploy
#
################################################################
deploy:
	#TODO make deploy SERVER=api.citybox.io
	#TODO doas rcctl slowcgi restart (execlude from setup.sh)
	#TODO doas rcctl httpd restart
	echo  	"NOTE: /etc/doas.conf must be appended by"	
	echo 	"premit presist USER cmd sh"

setup:
	@banner "citybox.io >"
	@echo "Welcome to Citybox.io Interactive Setup"

openbsd:
	#TODO a shellscript for the following:
	#TODO create user citybox on obsd
	#TODO configure /etc/doas.conf for user citybox to run things 
	#TODO update httpd configuration
	#TODO update rc.conf.local

#
#	Each microservice is an endpoint, commands endpointd, and queries endpointd 
# 	somehow supply the names of the microservice(s) here and the rest gets done
#	Makefile to be used on different machines to operate specific microservice(s)
#
# execute endpoint with specific name
# execute commands_endpointd with specific name
# execute queries_endpointd with specific name
#TODO 	execute the dependent tasks for microservices 
#	like configure slowcgi and httpd,etc. in another tasks
#TODO 	a loop with versions and endpoint names to populate microservices:
#endpoints_array = opendatahub rd apidoc ping 
#for endpoint in ${endpoints_array}
#	do
#		#cc -static -g -W -Wall -o $(bin)/$(endpoint) $(source)/endpoint.c 
#		echo $(endpoint}	
#	done
microservices: clean
	doas sh ./config/endpoint.sh v1 opendatahub
	doas sh ./config/endpointd.sh commands opendatahub
	doas sh ./config/endpointd.sh queries opendatahub

daemons:
	doas sh ./config/daemon.sh
	#TODO syslog setup (1.touch syslogfile, 2.restart syslogd)

endpoints:
	doas sh ./config/setup.sh


################################################################
#
#	DEVELOPMENT
#
################################################################
github:
	#TODO indent(1) sourcefiles; 
	#TODO check compile success without error nor warnings;
	git add .;git commit -m "$m";git push

################################################################
#
#	TESTING
#
################################################################
test:
	#TODO testall: endpoints daemons usersA userB
	#TODO test: run daemon and store its pid
	#TODO test: kill daemon via its pid

clean:
	@echo "cleaning ./bin"
	rm -rf ./bin
	mkdir ./bin
