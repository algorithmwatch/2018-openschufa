### Manage database remotely
__Setup ssh tunnel__  
```bash
ssh -N -v -L 5434:localhost:5432 openschufa@beta.openschufa.de >/dev/null 2>&1 &
```
You can now set up a pgAdmin4 connection with host `localhost` and port `5434`.
### Deploy frontend
__Deploy with rsync__
```bash
rsync -a --no-o --no-g --delete -e 'ssh' --rsync-path='sudo rsync' <path to project>/frontend/build/ openschufa@beta.openschufa.de:/var/www/openschufa
```