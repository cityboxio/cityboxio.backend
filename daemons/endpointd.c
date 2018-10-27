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

#define SOCK_PATH "/var/www/run/endpoint.sock"

int 
main(void)
{
	int s, s2, len;
	unsigned t;
	struct sockaddr_un local, remote;
	char str[100];

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
	
	//TODO make SOCK_PATH socket permisions and ownership here. 
	// and not in the setup script
	//
	if (chmod(SOCK_PATH, 0777) != 0)
		perror("chmod() error");
	else {
		printf("permission changed\n");	
	}

	if (listen(s, 5) == -1) {
		perror("listen");
		exit(1);
	}

	for(;;) {
		int done, n;
		
		syslog(LOG_INFO, "%s", "Waiting for connection...");
		printf("Waiting for a connection...\n");
		
		t = sizeof(remote);
		if ((s2 = accept(s, (struct sockaddr *)&remote, &t)) == -1) {
			perror("accept");
			exit(1);
		}

		//TODO Should be forking a process dedicated to handle this client only
		printf("Connected.\n");

		done = 0;
		do {
			n = recv(s2, str, 100, 0);
			syslog(LOG_DEBUG, "s2: %i\n", s2);	
			syslog(LOG_DEBUG, "str: %s\n", str);	
			syslog(LOG_DEBUG, "n: %i\n", n);	

			if (n <= 0) {
				if (n < 0) perror("recv");
				syslog(LOG_INFO, "CQRS command: %s", str);
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
			
				//char* payload = "Ok, here is some json response";
				char* payload = txt;
				//if (send(s2, str, n, 0) < 0) {
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
