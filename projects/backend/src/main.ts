import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   const config = new DocumentBuilder()
    .setTitle('Box Tracker API')
    .setDescription('The Box Tracker API swagger documentation')
    .setContact(
      'Alex Foxleigh',
      'https://www.alexfoxleigh.com',
      'alex@alexfoxleigh.com'
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
  });
  await app.listen(process.env.BACKEND_PORT ?? 4000);
}
bootstrap();
