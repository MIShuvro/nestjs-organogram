import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';
import * as fs from 'fs';
import * as process from 'process';
import { AppConfigService } from '@common/app-config/service/app-config.service';

export async function setupSwagger(app: INestApplication) {
  let swaggerDocPath = '/api-doc';
  let { SWAGGER_USERNAME, SWAGGER_PASSWORD } = process.env;

  const config = new DocumentBuilder()
    .setTitle(AppConfigService.appConfig.SWAGGER_TITLE)
    .setDescription('Live Class API DOC')
    .setVersion('1.0')
    .addApiKey(
      { type: 'apiKey', name: 'Authorization', in: 'header', scheme: 'bearer', bearerFormat: 'Bearer' },
      'auth'
    )
    .addApiKey(
      { type: 'apiKey', name: 'Authorization', in: 'header', scheme: 'bearer', bearerFormat: 'Bearer' },
      'auth-student'
    )
    .addApiKey(
      {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
        scheme: 'bearer',
        bearerFormat: 'Bearer'
      },
      'lms'
    )
    .addApiKey(
      { type: 'apiKey', name: 'X-TENMS-SERVICE-KEY', in: 'header', scheme: 'bearer', bearerFormat: 'Bearer' },
      'tenms-service-key'
    )
    .addApiKey(
      { type: 'apiKey', name: 'X-TENMS-MEDIA-LIVE-KEY', in: 'header', scheme: 'bearer', bearerFormat: 'Bearer' },
      'tenms-media-live-key'
    )
    .addApiKey(
      { type: 'apiKey', name: 'Authorization', in: 'header', scheme: 'bearer', bearerFormat: 'Bearer' },
      'session-token'
    )
    .addApiKey(
      { type: 'apiKey', name: 'Authorization', in: 'header', scheme: 'bearer', bearerFormat: 'Bearer' },
      'auth-service'
    )
    .addApiKey(
      {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
        scheme: 'bearer',
        bearerFormat: 'Bearer'
      },
      'studio-server-auth'
    )
    .addApiKey(
      {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
        scheme: 'bearer',
        bearerFormat: 'Bearer'
      },
      'studio-server-auth'
    )
    .addApiKey(
      { type: 'apiKey', name: 'X-Gumlet-Token', in: 'header', scheme: 'bearer', bearerFormat: 'Bearer' },
      'x-gumlet-token'
    )
    .addServer(
      AppConfigService.appConfig.SWAGGER_SERVER_BASE_URL,
      AppConfigService.appConfig.SWAGGER_SERVER_BASE_URL_DESCRIPTION
    )

    .build();

  const document = SwaggerModule.createDocument(app, config);
  fs.writeFileSync('./swagger-spec.json', JSON.stringify(document));
  app.use(
    [swaggerDocPath, swaggerDocPath + '-json'],
    basicAuth({
      challenge: true,
      users: { [SWAGGER_USERNAME]: SWAGGER_PASSWORD }
    })
  );

  SwaggerModule.setup(swaggerDocPath, app, document, {
    swaggerOptions: { persistAuthorization: true, ignoreGlobalPrefix: true }
  });
}
