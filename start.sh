#!/bin/sh
#
# Simple wrapper that will just install dependencies and start the app. It assumes that node is installed on the system.
#



if ! type "npm" > /dev/null; then
	echo "Need to install node to continue";
	exit 1;
fi

npm install; node app $1