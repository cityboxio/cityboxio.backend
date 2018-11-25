#!/bin/sh

#	A command handler receives a command and brokers a result from the appropriate aggregate. 
#	"A result" is either a successful application of the command, or an exception. 
#	
#	This is the common sequence of steps a command handler follows:
# 	- Validate the command on its own merits.
#	- Validate the command on the current state of the aggregate.
#	- If validation is successful, 0..n events (1 is common).
# 	- Attempt to persist the new events. If there's a concurrency conflict during this step, either give up, or retry things.

#	EventCreated and stored to the eventstore
#	This commands appends the eventstore with something $@
#	
#	Events stored in /var/log/cityboxio/citybox.events.log
#	
logger -i -t citybox-events "create_event_attempted $@"
#	Validating the command on its own merits
#	Validate the command on the current state of the aggregate in redis.
citybox-redis koolevent "$@"
logger -i -t citybox-events "create_event_succeeded $@"
