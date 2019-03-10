echo "track_commit_timestamp = on" >> $(docker inspect -f '{{ (index .Mounts 0).Source }}' labday-postgresql)/postgresql.conf;
cat $(docker inspect -f '{{ (index .Mounts 0).Source }}' labday-postgresql)/postgresql.conf | tail -n 1;
docker restart labday-postgresql
