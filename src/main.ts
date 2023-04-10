
import tracer from './tracer';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { checkEnvVariables } from './config/configuration';
require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  checkEnvVariables();

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API para la gestión y ejecución de reglas de última milla')
    .setVersion('0.1')
    .setLicense('Copyright © 2022 Blue Express', 'Av. El Retiro 9800, Parque Industrial Los Maitenes, Pudahuel, Santiago')
    .addServer('http://localhost:3000', 'Local')
    .addServer('https://devapigw.bluex.cl', 'Dev enviroment')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  //Para cerrar la conexion a la base de datos al cerrar la aplicacion
  app.enableShutdownHooks();

  //Activamos las validaciones de dtos de forma global
  app.useGlobalPipes(new ValidationPipe({transform: true}));

  app.enableCors();
  app.setGlobalPrefix('/api/lastmile-rules/v1');

  await app.listen(process.env.PORT || 3000);


}

bootstrap();
