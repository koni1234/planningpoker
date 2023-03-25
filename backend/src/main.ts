import { AppModule } from 'Modules/app.module';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port);
}
bootstrap();
