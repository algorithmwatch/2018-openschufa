# Flask Openschufa Backend

Clone the git repository.
```
git clone git@bitbucket.org:elsueno/openschufa.git
```
Change into the just created project directory.  
Create a python 3 virtual environment.  
Activate this environment, then run:
```
cd backend
pip install -r requirements.txt
```
Install pip-tools:
```
pip install pip-tools
```
Then, when you need to add a new toplevel python package during development, 
add it to `requirements.in`, then run:
```
pip-compile requirements.in
pip-sync
```
Create 2 databases:
```
createdb openschufa
createdb openschufa_test
```
Put the following environment variables in your `.profile`:
```
export SECRET_KEY=<a secret key>
export OPENSCHUFA_DATABASE_URL=postgresql://<user>:<password>@localhost/openschufa
export OPENSCHUFA_DATABASE_TEST_URL=postgresql://<user>:<password>@localhost/openschufa_test
```
Set FLASK_APP environment variable:
```
export FLASK_APP=/<Your project dir>/backend/main.py
```
Upgrade database:
```
flask db upgrade
```
Then each time the database models change:
```
flask db migrate
flask db upgrade
```
To start the app, run:
```
flask run
```
To run tests, do:
```
flask test
```