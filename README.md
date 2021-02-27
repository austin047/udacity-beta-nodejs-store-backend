# Storefront Backend Project

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `yarn` in your terminal at the project root.

## Required Technologies
Your application must make use of the following libraries:
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing


## Installation and setup
### Installation  Requirments
 - Git 
 - Docker and Docker compose installations 

 ### Setup steps
- Clone repo `git clone https://github.com/austin047/udacity-beta-nodejs-store-backend.git`
- `cd udacity-beta-nodejs-store-backend`

- Copy the `.env.example` file and rename to `.env`: NB, this file is needed for both docker and your server

- Run `docker-compose up` - builds the image if the images do not exist and starts the containers. Posgress Database run in the container on port 5432 
[optional] Run `docker-compose up -d` to run docker container in the backgroud

- Run `yarn` - to install all project dependencies

- Run Migrations  `yarn migrate:up` - creates tables in the database 

- Run `yarn watch` - starts the project on default port 3000 (http://localhost:3000/api)

### Tests steps
- Run `yarn test` - Runs all tests, runs test on port '5000'


## udacity-beta-nodejs-store-backend

