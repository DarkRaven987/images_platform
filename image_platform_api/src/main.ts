import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.SERVICE_PORT || 3000;

  app.enableCors();

  await app.listen(port);
  Logger.log(`AUTH service is running on port ${port}`);
}
bootstrap();
