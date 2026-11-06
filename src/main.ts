import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { application } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: 'http://localhost:5173' });
  // applique les règles des DTO (@IsEmail, @MinLength...) et ignore les champs inconnus
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Swagger Options
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Nest-js Swagger - NestJS API')
    .setDescription('Swagger de l\'application les bons comptes')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  // Swagger path: http://localhost:3200/api/docs
  SwaggerModule.setup(`/docs`, app, document);

  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
