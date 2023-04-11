import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de Swagger para generar openApi automáticamente
  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API de prueba para testear la implementación básica de un servicio creado con nest.js')
    .setVersion('0.1')
    .setLicense('Copyright © Daniel Cartes', 'Chile')
    .addServer('http://localhost:3000', 'Local')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  //Para cerrar la conexion a la base de datos al cerrar la aplicacion
  app.enableShutdownHooks();

  //Activamos las validaciones de dtos de forma global
  app.useGlobalPipes(new ValidationPipe({transform: true}));

  app.enableCors();
  app.setGlobalPrefix('/api/test/v1');

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
