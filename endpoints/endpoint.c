#include <stdio.h>
#include <stdlib.h>
#include <errno.h>
#include <err.h>
#include <unistd.h>
#include <stdarg.h>
#include <string.h>
#include <libgen.h>

#include <syslog.h>

#include <sys/types.h>
#include <sys/socket.h>
#include <sys/un.h>

#define SOCK_PATH "/run/endpoint.sock"

int
main(void)
{
	//if (-1 == pledge("stdio", NULL)) 
	//	err(EXIT_FAILURE, "pledge");
	puts("Status: 200 OK\r");
	puts("Content-Type: text/json\r");
	/*  
	 *  application/atom+xml                  atom;
	 *  application/json                      json map topojson;
	 *  application/ld+json                   jsonld;
	 *  application/rss+xml                   rss;
	 *  application/vnd.geo+json              geojson;
	 *  application/xml                       rdf xml;
	 *  application/javascript                js;	
	 */

	puts("\r");

	printf("\n");
	printf("GATEWAY_INTERFACE: %s\n", getenv("GATEWAY_INTERFACE"));
	printf("SERVER_NAME: %s\n", getenv("SERVER_NAME"));
	printf("SERVER_SOFTWARE: %s\n", getenv("SERVER_SOFTWARE"));
	printf("SERVER_PROTOCOL: %s\n", getenv("SERVER_PROTOCOL"));
	printf("SERVER_PORT: %s\n", getenv("SERVER_PORT"));
	printf("REQUEST_METHOD: %s\n", getenv("REQUEST_METHOD"));
	printf("PATH_INFO: %s\n", getenv("PATH_INFO"));
	printf("PATH_TRANSLATED: %s\n", getenv("PATH_TRANSLATED"));
	printf("SCRIPT_NAME: %s\n", getenv("SCRIPT_NAME"));
	printf("DOCUMENT_ROOT: %s\n", getenv("DOCUMENT_ROOT"));
	printf("QUERY_STRING: %s\n", getenv("QUERY_STRING"));
	printf("REMOTE_HOST: %s\n", getenv("REMOTE_HOST"));
	printf("REMOTE_ADDR: %s\n", getenv("REMOTE_ADDR"));
	printf("AUTH_TYPE: %s\n", getenv("AUTH_TYPE"));
	printf("REMOTE_USER: %s\n", getenv("REMOTE_USER"));
	printf("REMOTE_IDENT: %s\n", getenv("REMOTE_IDENT"));
	printf("CONTENT_TYPE: %s\n", getenv("CONTENT_TYPE"));
	printf("CONTENT_LENGTH: %s\n", getenv("CONTENT_LENGTH"));
	printf("HTTP_FROM: %s\n", getenv("HTTP_FROM"));
	printf("HTTP_ACCEPT: %s\n", getenv("HTTP_ACCEPT"));
	printf("HTTP_USER_AGENT: %s\n", getenv("HTTP_USER_AGENT"));
	printf("HTTP_REFERER: %s\n", getenv("HTTP_REFERER"));
	
	printf("\n");
	printf("if REQUEST_METHOD is POST and QUERY_STRING commmands then use bind mount write-only\n");
	printf("if REQUEST_METHOD is GET and QUERY_STRING queries then use bind mount read-only\n");

	printf("%s", basename(getenv("SCRIPT_NAME")));



	//openlog(basename(getenv("SCRIPT_NAME")), LOG_PID, LOG_LOCAL3);
	syslog(LOG_WARNING, "Attempting: %s", "xyz");
	//syslog(LOG_AUTHPRIV | LOG_ERR);
	//syslog(LOG_INFO, "%s logging to a bind mounted dir for CQRS", "tsutsu");
	//syslog(LOG_ERR, "Success/failure?: %m");
	closelog();

	////
	/* daemon stuff */
	////
	int s, t, len;
	struct sockaddr_un remote;
	char str[100];

	//if ((s = socket(AF_UNIX, SOCK_DGRAM, 0)) == -1) {
	if ((s = socket(AF_UNIX, SOCK_STREAM, 0)) == -1) {
		perror("socket");
		exit(1);
	}

	printf("\n\nendpoint client trying to connect...\n\n");

	remote.sun_family = AF_UNIX;
	//strcpy(remote.sun_path, SOCK_PATH);
	strlcpy(remote.sun_path, SOCK_PATH, sizeof(SOCK_PATH));
	//len = strlen(remote.sun_path) + sizeof(remote.sun_family);
	len = strlen(remote.sun_path) + sizeof(remote.sun_family+1);
	if (connect(s, (struct sockaddr *)&remote, len) == -1) {
		perror("connect");
		exit(1);
	}

	printf("Connected.\n");

	//while(printf("> "), fgets(str, 100, stdin), !feof(stdin)) {
	//if (send(s, str, strlen(str), 0) == -1) {
	char* payload = "AAAAAAAAAA"; 
	if (send(s, payload, strlen(payload), 0) == -1) {
		//if (send(s, "hahaha", strlen("hahaha"), 0) == -1) {
		perror("send");
		exit(1);
	}

	if ((t=recv(s, str, 100, 0)) > 0) {
		str[t] = '\0';
		printf("echo> %s", str);
		printf("echo> %s", "server sent an acknolwdment");
	} else {
		if (t < 0) perror("recv");
		else printf("Server closed connection\n");
		exit(1);
	}
	//}

	close(s);

	return(EXIT_SUCCESS);
}
