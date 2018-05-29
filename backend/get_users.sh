#!/bin/bash

exec 1> >(logger -s -t $(basename $0)) 2>&1

source /home/openschufa/.venvs/openschufa/bin/activate
flask get_users
