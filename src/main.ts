import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.enableCors();

  // Set Validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      errorHttpStatusCode: 422,
      whitelist: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Notification Service - API')
    .setDescription(
      'The notification Service API is our proprietary REST API implementation.',
    )
    .setVersion('1.0')
    .addServer(process.env.APP_URL)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.APP_PORT || 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
