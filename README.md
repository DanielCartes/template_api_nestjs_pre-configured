# NODE SERVICE BASE REPOSITORY WITH NESTJS

The following repository contains a preconfigured template for a REST service in Node.js with NestJS framework.

## Contains the following preconfigured tools

- TypeScript
- Automatic generation of OpenAPI 3.0 (Swagger - OAS)
- Validation in dto

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

## Comandos para instalar las bibliotecas utilizadas (para crear un proyecto desde cero)

1.- Consular por las opciones para crear clases de forma rapida, etc.:
> `nest`

2.- Ejemplo (creación de un modulo):
> `nest generate module NOMBRE_MODULO`

3.- Creador de id dinámico:
> `npm i uuid`
> `npm i @types/uuid`

4.- Validar data recibida en al api (dto):
> `npm install class-validator class-transformer`

5.- Generación automática de OpenApi 3.0 (Swagger).
> `npm install --save @nestjs/swagger swagger-ui-express`

