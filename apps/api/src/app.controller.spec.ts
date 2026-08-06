import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return API status information', () => {
      expect(appController.root()).toEqual({
        success: true,
        message: 'Queen of All Saints Digital Parish API is running',
        version: '1.0',
        environment: 'demo',
      });
    });
  });
});
