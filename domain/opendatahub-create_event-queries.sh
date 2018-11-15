#!/bin/sh
#
#
#

echo "EventCreated and stored to the eventstore"
echo "This commands appends the eventstore with something $@"
#echo "event_created bin json $1 `date`" >> /var/citybox/DATA/opendatahub.events
citybox-redis koolevent "value of its `date`"
logger -i -t citybox-events "event_created bin json $1 `date`" 

#echo "event_created bin json $1 `date`" >> /var/log/cityboxio/citybox.events.log
logger -i -s "domain/event speaks...."

#TODO events shouldn't be in /DATA but in /EVENTSTORE
#echo "event_created bin json $1 `date`" >> /var/citybox/EVENTSTORE/opendatahub.events
# or syslog EventCreated(payload: $1) to /var/log/citybox/opendatahub.events
