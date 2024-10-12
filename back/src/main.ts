import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })
  );
  app.enableCors({
    origin: 'https://project-puri2-0.vercel.app',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  });
  await app.listen(3000);
}

bootstrap();