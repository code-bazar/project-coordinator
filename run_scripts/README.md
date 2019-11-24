# Steps to run this application

You have to have docker swarm initialized in order to properly deploy this application.

## 1. Build docker image
Run ```build.sh``` script with version parameter e.g.

```./build.sh 1.0```

## 2. Set proper version in ```docker-compose.yml```

```
version: '3.1'

services:
  webapp:
    image: project-coordinator:<VERSION>
    deploy:
        replicas: 1
    ports:
      - 3000:3000

```

## 3. Run the application
Run ```start.sh``` script as below:

```./start.sh ```

# To stop application

Run ```./stop.sh``` script.

# To see specific service logs

Run ```./logs.sh``` script with service name as a parameter e.g.

```./logs.sh webapp```