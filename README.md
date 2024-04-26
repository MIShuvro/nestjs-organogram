### Project Start With Docker Compose(Must need to setup docker in pc)
```
docker compose up

browse phpMyadmin: http://localhost:8080
project URL: http://localhost:3000/api-doc
redis: connect any redis GUI with 6379 port 
```

### Project Start With Local PC(for better experience env added already in project, if you need to change any value then you will)

```
npm install
npm run start:dev
project URL: http://localhost:3000/api-doc
redis: connect any redis GUI with 6379 port
database: connect any DB GUI with 3306 port
```

### Delete any kind of running port if you need
```
search the port
sudo lsof -i :3306

then kill with PID
sudo kill -9 PID
```
