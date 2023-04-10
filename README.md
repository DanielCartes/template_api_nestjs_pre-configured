# NODE SERVICE BASE REPOSITORY WITH NESTJS

The following repository contains a preconfigured template for a REST service in Node.js with NestJS framework.

## Contains the following preconfigured tools

- TypeScript
- Healthcheck
- Prettier (linter that helps with code quality)
- Logger (preconfigured winston library to work with datadog)
- Connection to Oracle DB
- Preconfigured Dockerfile with oracle-linux image and oracledb client library
- Automatic generation of OpenAPI 3.0 (Swagger - OAS)


## Usage
1.- Copy the contents of this repository into the desired folder.
2.- Rename the .env.example file to .env.
3.- Fill in environment variables.
4.- Install dependencies:
> `npm install`

5.- Run the service:

> `npm run start:dev`

## OAS
Assuming the service is running locally on port 3000, the automatically generated OAS file can be found by accessing http://localhost:3000/docs.json.

## Ejemplos
Usage examples can be found in the example-module:

- Calling stored procedures in Oracle
- Calling external APIs
- Logger usage