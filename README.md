# REPOSITORIO BASE SERVICIO NODE CON NESTJS

El siguiente repositorio contiene una plantilla preconfigurada de un servicio REST en node (NestJS) con las configuraciones exigidas por BlueExpress (tomadas desde https://bxpress.atlassian.net/wiki/spaces/ARCHBX/pages/)

## Contiene las siguientes herramientas preconfiguradas

- TypeScript
- Conexión a Oracle DB.
- Healthcheck.
- Logger (librería winston preconfigurada para trabajar con datadog).
- Módulo de conexión a beetrack.
- Generación automática de OpenApi 3.0 (oas).
- Prettier (linter que ayuda a la calidad del código).
- Dockerfile preconfigurada con imagen oracle-linux y la libreria cliente de oracledb.

## Uso
1.- Copiar el contenido de este repositorio en el repositorio entregado por arquitectura Bluex.
2.- Renombrar el archivo `.env.example` a `.env`.
3.- Rellenar variables de entorno.
4.- Instalar dependencias:
> `npm install`

5.- Montar el servicio:

> `npm run start:dev`

## OAS
Asumiendo que el servicio se ejecuta localmente en el puerto 3000, el archivo OAS generado de forma automática puede encontrarse ingresando a http://localhost:3000/docs.json. Desde aquí se recomienda pegar el spec generado en https://editor.swagger.io/ (Para transformarlo a yaml automaticamente) y guardar el yaml en la carpeta oas.

## Ejemplos
Se pueden encontrar ejemplos de uso en el módulo example-module
- Llamar procedimientos almacenados en oracle
- Llamadas a api externas
- Uso del logger