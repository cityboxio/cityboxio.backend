daemons <- -> endpoints via forked stream unixdomainsocks at chrooted /run for CQRS commands\queries.

Copy/Paste for manual debugging
--------------------------------
cc echos.c -o echos; cc echoc.c -o echoc;./echos
./echoc;cat /var/log/messages;
ps -axl # to check process for daemons 
