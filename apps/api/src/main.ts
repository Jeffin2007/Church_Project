import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  // ─── Logger ─────────────────────────────────────────────────────────────────
  app.useLogger(app.get(Logger));

  const configService = app.get(ConfigService);

  // ─── Security ────────────────────────────────────────────────────────────────
  app.use(helmet());
  app.use(cookieParser());

  // ─── CORS ────────────────────────────────────────────────────────────────────
  app.enableCors({
    origin: configService.get<string>('app.clientUrl'),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-ID'],
    exposedHeaders: ['X-Request-ID'],
  });

  // ─── API Versioning ──────────────────────────────────────────────────────────
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // ─── Global Prefix ────────────────────────────────────────────────────────────
  app.setGlobalPrefix('api');

  // ─── Global Pipes ────────────────────────────────────────────────────────────
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // ─── Global Filters ───────────────────────────────────────────────────────────
  app.useGlobalFilters(new HttpExceptionFilter());

  // ─── Global Interceptors ──────────────────────────────────────────────────────
  app.useGlobalInterceptors(new TransformInterceptor());

  // ─── Swagger ──────────────────────────────────────────────────────────────────
  const isDev = configService.get<string>('app.nodeEnv') !== 'production';

  if (isDev) {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('Queen of All Saints — API')
      .setDescription(
        'REST API for the Queen of All Saints Church Management System.\n\n' +
          '**Base URL**: `/api/v1/`\n' +
          '**Auth**: HttpOnly cookie (`access_token`) issued on login.',
      )
      .setVersion('1.0')
      .setContact('QOAS Admin', 'https://queenofallsaints.in', 'admin@queenofallsaints.in')
      .addTag('auth', 'Authentication & session management')
      .addTag('health', 'Health checks')
      .addTag('family', 'Family management')
      .addTag('payment', 'Payment & dues')
      .addTag('ministry', 'Ministry management')
      .addCookieAuth('access_token')
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api/docs', app, document, {
      swaggerOptions: {
        persistAuthorization: true,
      },
    });
  }

  // ─── Start ────────────────────────────────────────────────────────────────────
  const port = configService.get<number>('app.port') ?? 3001;
  await app.listen(port);

  const logger = app.get(Logger);
  logger.log(`🚀 API running on http://localhost:${port}/api/v1`, 'Bootstrap');
  if (isDev) {
    logger.log(`📚 Swagger docs: http://localhost:${port}/api/docs`, 'Bootstrap');
  }
}

void bootstrap();
