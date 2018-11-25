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

//#include "endpoint.h" //TODO use Makefile

// Http header for JSON API calls 
#define HEADER_STATUS "Status: 200 OK\r"
#define HEADER_CONTENT_TYPE "Content-Type: application/json\r\r"

//#define SOCK_PATH "/run/endpoint.sock"
//#define SOCK_PATH "/run/"
//TODO printf("if REQUEST_METHOD is POST and QUERY_STRING commmands then use bind mount write-only\n");
//TODO printf("if REQUEST_METHOD is GET and QUERY_STRING queries then use bind mount read-only\n");


//TODO function prototypes

// daemon client variables
int s, t, len;
struct sockaddr_un remote;
char SOCK_PATH[100];
char str[80];

int	
setup_sockpath(void)
{
	char* current_request = getenv("REQUEST_METHOD");
	printf("%i", strncmp(current_request, "GET", 3));
	
	strlcat(SOCK_PATH, "/run/", sizeof(SOCK_PATH));
	strlcat(SOCK_PATH, getprogname(), sizeof(SOCK_PATH));

	if (strncmp(current_request, "GET", sizeof("GET")) == 0) {
		strlcat(SOCK_PATH, ".queries.sock", sizeof(SOCK_PATH));
		printf("\nsyslog its a GET request\n");
		printf("\n\nthe socket path:  %s\n\n\n", SOCK_PATH);
	} else if (strncmp(current_request, "POST", sizeof("POST")) == 0) {
		strlcat(SOCK_PATH, ".commands.sock", sizeof(SOCK_PATH));
		printf("syslog its a POST request");
		printf("\n\nthe socket path:  %s\n\n\n", SOCK_PATH);
	} else {
		printf("A json body sayin only GET and POST requests are supported");
		printf("syslog an unsupported request happened");
	}

	printf("\n\n\nREQUEST_METHOD: %s\n", current_request);

	//openlog(basename(getenv("SCRIPT_NAME")), LOG_PID, LOG_LOCAL3);
	return(EXIT_SUCCESS);
}
	int
main(void)
{
	//TODO update pledge
	//if (-1 == pledge("stdio", NULL)) 
	//	err(EXIT_FAILURE, "pledge");

	puts(HEADER_STATUS);
	puts(HEADER_CONTENT_TYPE);

	////
	/* daemon stuff */
	////

	setup_sockpath();
	printf("\nafter setup %s\n", SOCK_PATH);
	
	//TODO int daemon_client_setup()
	//if ((s = socket(AF_UNIX, SOCK_DGRAM, 0)) == -1) {
	if ((s = socket(AF_UNIX, SOCK_STREAM, 0)) == -1) {
		perror("socket");
		exit(1);
	}

	//TODO daemon_client_connect()
	//TODO full detailed syslog instead of printf
	printf("\n\n %s endpoint client trying to connect...\n\n", getenv("SCRIPT_NAME"));

	remote.sun_family = AF_UNIX;
	//strcpy(remote.sun_path, SOCK_PATH);
	printf("\nbefore strlcpy %s\n", SOCK_PATH);
	strlcpy(remote.sun_path, SOCK_PATH, sizeof(remote.sun_path));
	printf("\nbefore len %s\n", SOCK_PATH);
	//len = strlen(remote.sun_path) + sizeof(remote.sun_family);
	//len = strlen(remote.sun_path) + sizeof(remote.sun_family);
	len = strlen(remote.sun_path) + sizeof(remote.sun_family+1);
	printf("\nafter len %s\n", SOCK_PATH);
	if (connect(s, (struct sockaddr *)&remote, len) == -1) {
		//syslog(LOG_ERR, "daemon socket %s not found", SOCK_PATH);
		printf("daemon socket %s not found", SOCK_PATH);
		perror("connect");
		exit(1);
	}

	printf("Connected.\n");

	//while(printf("> "), fgets(str, 100, stdin), !feof(stdin)) {
	//if (send(s, str, strlen(str), 0) == -1) {
	char* payload = getenv("QUERY_STRING");
	printf("QUERY_STRING: %s\n", getenv("QUERY_STRING"));
	printf("PAYLOAD: %s\n", payload);
	if (send(s, payload, strlen(payload), 0) == -1) {
		perror("send");
		exit(1);
	}

	if ((t=recv(s, str, 100, 0)) > 0) {
		str[t] = '\0';
		printf("server-to-client> %s", str);
		printf("server-to-client> %s", "server daemon sent us somthing");
	} else {
		if (t < 0) perror("recv");
		else printf("Server closed connection\n");
		exit(1);
	}
	//}
	close(s);

	closelog();
	return(EXIT_SUCCESS);
}


void
show_env(void)
{
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
	printf("%s", basename(getenv("SCRIPT_NAME")));

	//openlog(basename(getenv("SCRIPT_NAME")), LOG_PID, LOG_LOCAL3);
	syslog(LOG_DEBUG, "http enviroment shown");
}
