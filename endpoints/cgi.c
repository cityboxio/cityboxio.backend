#include <err.h>
#include <stdlib.h>
#include <stdio.h>
#include <unistd.h>
#include <syslog.h>
#include <stdarg.h>
#include <libgen.h>


int
main(void)
{
	if (-1 == pledge("stdio", NULL)) 
		err(EXIT_FAILURE, "pledge");
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



	openlog(basename(getenv("SCRIPT_NAME")), LOG_PID, LOG_LOCAL3);
	syslog(LOG_WARNING, "Attempting: %s", "xyz");
	//syslog(LOG_AUTHPRIV | LOG_ERR);
	syslog(LOG_INFO, "%s logging to a bind mounted dir for CQRS", "tsutsu");
	syslog(LOG_ERR, "Success/failure?: %m");
	closelog();
	return(EXIT_SUCCESS);
}
