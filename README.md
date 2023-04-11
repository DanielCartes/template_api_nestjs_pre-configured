# NODE SERVICE BASE REPOSITORY WITH NESTJS
The following repository contains a preconfigured template for a REST service in Node.js with NestJS framework.

## Contains the following preconfigured tools
- TypeScript
- Automatic generation of OpenAPI 3.0 (Swagger - OAS)
- Automatic validation (request data)

## Usage
1.- Copy the contents of this repository into the desired folder.
2.- Rename the .env.example file to .env.
3.- Fill in environment variables.
4.- Install dependencies:
> `npm install`

5.- Run the service:

> `npm run start:dev`

## OpenApi 3.0
Assuming the service is running locally on port 3000, the automatically generated OAS file can be found by accessing http://localhost:3000/docs

## Examples
Usage examples can be found in the example-module:

- Calling stored procedures in Oracle
- Calling external APIs
- Logger usage

## Commands to install the libraries used (to create a project from scratch)
1.- Consult the options for creating classes quickly, etc:
> `nest`

2.- Example (creating a module):
> `nest generate module NOMBRE_MODULO`

3.- Dynamic ID creator:
> `npm i uuid`
> `npm i @types/uuid`

4.- Validate data received in the API (dto):
> `npm install class-validator class-transformer`

5.- Automatic generation of OpenAPI 3.0 (Swagger - OAS).
> `npm install --save @nestjs/swagger swagger-ui-express`

