import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { Global, ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global API Prefix
  app.setGlobalPrefix('api');

  // Security header 
  app.use(helmet())

  // Cookie parse 
  app.use(cookieParser())

  // Global Validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,   // removes extra fields
    forbidNonWhitelisted: true,      // throws an error if extra fields are sent
    transform: true,   // converts types (e.g., string "1" to number 1)
  }))

  app.enableCors({
    origin: [
      "http://localhost:5173",
      "https://mailpilot-ai1.vercel.app"
    ],
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
