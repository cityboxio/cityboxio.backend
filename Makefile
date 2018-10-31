
bin = ./bin
source = ./source

all:
	#TODO do allthings inorder on a new machine

readme:
	#TODO Generate README via `r !tree`
	echo "# cityboxio.backend" > README
	tree >> README

#TODO indent(1) sourcefiles
deploy:
	#TODO make deploy SERVER=api.citybox.io

openbsd:
	#TODO a shellscript for the following:
	#TODO create user citybox on obsd
	#TODO configure /etc/doas.conf for user citybox to run things 
	#TODO update httpd configuration
	#TODO update rc.conf.local

github:
	git add .;git commit -m "$m";git push

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
