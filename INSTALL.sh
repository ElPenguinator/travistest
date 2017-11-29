#!/bin/bash

PID_ANGULAR=""
PID_NODE=""
PID_MONGO=""

if [[ $1 == "dev" ]]
then
    # run angular compilation
    cd web-app ; \
    ng build --watch -dev & PID_ANGULAR=$!

    # run mongodb server
    # And run api server
    cd ../api ; \
    mongod --dbpath data/ & PID_MONGO=$! ; \
    node api.js & PID_NODE=$! ;

    while :
    do
        # TASK 1
        read -t 1 -n 1 key

        if [[ $key == "q" ]]
        then
            (kill -9 $PID_ANGULAR > /dev/null 2>&1);
            (kill -9 $PID_NODE > /dev/null 2>&1);
            (kill -9 $PID_MONGO > /dev/null 2>&1);
            break
        fi
    done
else
	if [[ $1 == "test_api" ]]
	then
		# run mongodb server
		# And run api server
		cd api ; \
		rm -rf dataTest; \
		mkdir dataTest; \
		mongod --dbpath dataTest/ & PID_MONGO=$! ; \
		node api.js & PID_NODE=$! ;
		npm test;
		
		(kill -9 $PID_NODE > /dev/null 2>&1);
		(kill -9 $PID_MONGO > /dev/null 2>&1);
	else
		echo "Usage: ./INSTALL.sh dev or ./INSTALL.sh test_api"
	fi
fi

#Another modification