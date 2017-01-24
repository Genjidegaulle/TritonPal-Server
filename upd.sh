#!/bin/bash

if [ $# -lt 1 ]
then
	echo "add name"
	exit
fi


echo "~~~~~~~~~~~~~~~~~~~~~ ADDDING ~~~~~~~~~~~~~~~~~~"
git add --all

echo "~~~~~~~~~~~~~~~~~~~~~ COMMITING ~~~~~~~~~~~~~~~~~~"
git commit -m "$@"

echo "~~~~~~~~~~~~~~~~~~~~~ PUSHING  ~~~~~~~~~~~~~~~~~~"
git push heroku master

#sleep 5
heroku logs -t

