# Network Lab Exam Docker Compose Dev

Running dependency services for local development with Docker Compose

If you already have **Mongo Compass** do these things instead.

1. create `.development.env` file in `/BACKEND` outside `/src`
2. paste `MONGO_CONNECTION_STRING=<mongo_database_url>` (default url: mongodb://127.0.0.1:27017)

## Start the services

Run the following command to start all services in the background.

```sh
docker compose up -d
```

## All exposed services/ports

- **MongoDB**: 27017

## Stopping

```sh
docker compose down
```

## Destroying

To reset the data, you may destroy it.

```sh
docker compose down --volumes --remove-orphans
```
