
bin = ./bin
source = ./source

all:
	#TODO do allthings inorder on a new machine

man:
	echo "make manpages and install them"

setup:
	@banner "citybox.io >"
	@echo "Welcome to Citybox.io Interactive Setup"

readme:
	echo "# cityboxio.backend" > README
	echo "" >> README
	banner citybox.io >> README
	echo "" >> README
	tree >> README

deploy:
	#TODO make deploy SERVER=api.citybox.io

openbsd:
	#TODO a shellscript for the following:
	#TODO create user citybox on obsd
	#TODO configure /etc/doas.conf for user citybox to run things 
	#TODO update httpd configuration
	#TODO update rc.conf.local

github:
	#TODO indent(1) sourcefiles; 
	#TODO check compile success without error nor warnings;
	git add .;git commit -m "$m";git push

microservices:
	#TODO each microservice is an endpoint, commands endpointd, and queries endpointd 
	#TODO somehow supply the names of the microservice(s) here and the rest gets done
	#TODO Makefile to be used on different machines to operate specific microservice(s)

daemons:
	doas sh ./daemon.sh
	#TODO syslog setup (1.touch syslogfile, 2.restart syslogd)

endpoints:
	doas sh ./setup.sh

#endpoints_array = opendatahub rd apidoc ping 
#for endpoint in ${endpoints_array}
#	do
#		#cc -static -g -W -Wall -o $(bin)/$(endpoint) $(source)/endpoint.c 
#		echo $(endpoint}	
#	done

test:
	#TODO testall: endpoints daemons usersA userB
	#TODO test: run daemon and store its pid
	#TODO test: kill daemon via its pid

clear:
	echo "clear ./bin"
