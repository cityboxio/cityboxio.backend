/**
 **
 ** endpointd.c -- the server for endpoint.c;
 **
 **/

#include <stdio.h>
#include <stdlib.h>
#include <errno.h>
#include <string.h>
#include <unistd.h>
#include <syslog.h>


#include <sys/stat.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <sys/un.h>

//#define SOCK_PATH "/var/www/run/endpoint.sock"
#define SOCK_PATH "/var/www/run/opendatahub.commands.sock"
//TODO	endpointd.h #define or struct of all endpoints?
//	and endpoint.c write case statments for each endpoint?
//	case SOCK_PATH equal "opendatahub"
//	case SOCK_PATH equal "rd"
//TODO	if a microservice deployed on a sperate machine;
//	control which cases gets implmented via Makefile/endpoint.h flags

int s, s2, len;
unsigned t;
struct sockaddr_un local, remote;

int 
main(void)
{
	//TODO	add pledge
	
	openlog("opendatahub.commands.daemon", LOG_PID | LOG_NDELAY, LOG_PERROR);
	//TODO	update syslog.conf to log to two seperate files based on 
	//	commands.sock, queries.sock per endpoint	
	//TODO 	customize openlog params
	//TODO 	close log

	/* Create a new UNIX Socket */
	if ((s = socket(AF_UNIX, SOCK_STREAM, 0)) == -1) {
	//if ((s = socket(AF_UNIX, SOCK_DGRAM, 0)) == -1) {
		perror("socket");
		exit(1);
	}

	local.sun_family = AF_UNIX;
	//strcpy(local.sun_path, SOCK_PATH);

	strlcpy(local.sun_path, SOCK_PATH, sizeof(SOCK_PATH));

	unlink(local.sun_path);

	len = strlen(local.sun_path) + sizeof(local.sun_family+1);
	if (bind(s, (struct sockaddr *)&local, len) == -1) {
		perror("bind");
		exit(1);
	}

	//TODO refactor into a sock_config() or somthing	
	//TODO make SOCK_PATH socket permisions and ownership here. 
	// and not in the setup script
	//
	if (chmod(SOCK_PATH, 0777) != 0)
		//TODO syslog
		perror("chmod() error");
	else {
		//TODO syslog
		printf("permission changed\n");
	}

	if (listen(s, 5) == -1) {
		perror("listen");
		exit(1);
	}


	for(;;) {
		int done, n;
		//TODO adjust proper LOG_DEBUG for debugging things
		syslog(LOG_INFO, "%s", "Waiting for connection...");
		printf("Waiting for a connection...\n");
		
		t = sizeof(remote);
		if ((s2 = accept(s, (struct sockaddr *)&remote, &t)) == -1) {
			perror("accept");
			exit(1);
		}

		//TODO Should be forking a process dedicated to handle this client only
		//TODO non-blocking mode (MSG_DONTWAIT flag)
		printf("Connected.\n");
		
		/* httpd default maxrequestbody is 1048576bytes (1M) */
		int buffer_size = 1048576;
		char buffer[buffer_size];
		done = 0;
		do {
			//printf("buffer: %s\n", buffer);
			n = recv(s2, buffer, buffer_size, 0);
			syslog(LOG_DEBUG, "s2: %i\n", s2);
			syslog(LOG_DEBUG, "buffer: %s\n", buffer);
			syslog(LOG_DEBUG, "n: %i\n", n);

			if (n <= 0) {
				if (n < 0) perror("recv");
				printf("CQRS command: %s\n", buffer);
				syslog(LOG_INFO, "CQRS command: %s", buffer);
				syslog(LOG_DEBUG, "CQRS command: %s", buffer);
				//TODO logging should be done to the daemon logs
				//syslog(LOG_DAEMON, "CQRS command: %s", buffer);
				syslog(LOG_USER, "CQRS command: %s", buffer);
				// zero back the str(received message) to hold next request
				memset(buffer,'\0',sizeof(buffer)); 
				done = 1;
			}

			if (!done){
				
				/* start of reading data from a file */
				//TODO fix truncation after endoflines
				FILE *fp;
				int ch;
				char txt[9000]; //TODO decide on the max size of a response.
				int len=0;
				fp=fopen("./../DATA/README.md", "r");

				do{
					ch=fgetc(fp);
					txt[len]=ch;
					len++;
				} while(ch!=EOF);
				//} while(ch!=EOF && ch!='\n');
				fclose(fp);
				//puts(txt);
				/* end of reading data from a file */
			
				//TODO if the request was a command then this daemon is a command daemon
				//-> return to client an acknolgment that the their message was resviced(json format)
				//TODO if the request was a query then this daemon is a query daemon 
				//-> return to query result (json format)
				//char* payload = "Ok, here is some json response";
				char* payload = txt;
				//if (send(s2, buffer, n, 0) < 0) {
				if (send(s2, payload, strlen(payload), 0) < 0) {
					perror("send");
					done = 1;
				}
			}
		} while (!done);

			close(s2);
		}
		return(EXIT_SUCCESS);
}
