import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Root', () => {
    it('GET /api/v1 → 200 with API info', () => {
      return request(app.getHttpServer())
        .get('/api/v1')
        .expect(200)
        .expect((res) => {
          expect(res.body.data || res.body).toMatchObject({
            success: true,
            message: 'Queen of All Saints Digital Parish API is running',
            version: '1.0',
            environment: 'demo',
          });
        });
    });
  });

  describe('Health', () => {
    it('GET /health → 200', () => {
      return request(app.getHttpServer()).get('/health').expect(200);
    });

    it('GET /health/db → 200', () => {
      return request(app.getHttpServer()).get('/health/db').expect(200);
    });
  });

  describe('Auth', () => {
    it('POST /api/v1/auth/login → 401 with invalid credentials', () => {
      return request(app.getHttpServer())
        .post('/api/v1/auth/login')
        .send({ email: 'nobody@test.com', password: 'wrong' })
        .expect(401);
    });

    it('GET /api/v1/auth/me → 401 without token', () => {
      return request(app.getHttpServer()).get('/api/v1/auth/me').expect(401);
    });
  });
});
