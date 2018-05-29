#!/bin/bash

exec 1> >(logger -s -t $(basename $0)) 2>&1

export FLASK_APP=/home/openschufa/sites/openschufa/backend/main.py
export SECRET_KEY=secret_key
export OPENSCHUFA_DATABASE_URL=postgresql://openschufa:openschufa@localhost/openschufa
source /home/openschufa/.venvs/openschufa/bin/activate
flask get_users
