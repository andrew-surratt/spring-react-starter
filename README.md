# Spring and React Starter
Template for Spring Boot and React Web Apps

## Features

* Database integration with JPA
* Authentication with Auth0
* Authorization with JWT
* Session management with Redis
* Reverse proxy with Nginx
* Example CRUD Rest Controller
* Example Chat Websocket Handler
* Example React FE with Material UI (see [FE Readme](frontend/README.md))

## Configuration

1. Make a copy of `application.yml.example` to configure each environment:
   * Configure the production properties with `application.yml`
   * Configure the development properties with `application-development.yml`

## Run With Docker
This will run the backend, frontend, and other dependencies.

### Dependencies

- Docker/Docker Compose

### Run Targeting Development
The development configuration includes debugging tools such as hot-reloading and exposed endpoints for each container.

``docker compose -f ./docker-compose-dev.yml up -d --build``

### Run Targeting Production
The production configuration includes optimizations such as multi-stage builds to remove unnecessary files from the final container, and security enhancements such as a reverse proxy, and internal networking to the backend.

``docker compose -f ./docker-compose.yml up -d --build``

### Scaling Further
Note that docker compose will start all services together. The containers can be deployed separately to manage and scale each service as needed.

## Run With Maven
This will run the backend only

### Dependencies

- Maven
- Java
- Redis

### Install

`mvn clean install`

### Run

`mvn spring-boot:run`

## Auth

The app is configured to use Auth0 with JWTs
