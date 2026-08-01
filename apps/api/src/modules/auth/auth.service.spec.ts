import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { getLoggerToken } from 'nestjs-pino';

import { AuthService } from './auth.service';
import { PrismaService } from '../../database/prisma.service';
import { AuditService } from '../../core/audit/audit.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: {
            user: { findUnique: jest.fn() },
            session: {
              create: jest.fn(),
              delete: jest.fn(),
              deleteMany: jest.fn(),
              findMany: jest.fn().mockResolvedValue([]),
            },
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn().mockResolvedValue('mock-token'),
            verify: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              const config: Record<string, string | number> = {
                'jwt.accessSecret': 'test-access-secret',
                'jwt.refreshSecret': 'test-refresh-secret',
                'jwt.accessExpiresIn': 900,
                'jwt.refreshExpiresIn': 604800,
              };
              return config[key];
            }),
          },
        },
        {
          provide: AuditService,
          useValue: {
            log: jest.fn().mockResolvedValue(undefined),
          },
        },
        {
          provide: getLoggerToken(AuthService.name),
          useValue: {
            info: jest.fn(),
            warn: jest.fn(),
            error: jest.fn(),
            debug: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('hashPassword', () => {
    it('should hash a password', async () => {
      const hash = await service.hashPassword('TestPassword@1');
      expect(hash).toBeDefined();
      expect(hash).not.toBe('TestPassword@1');
      expect(hash).toMatch(/^\$2b\$/); // bcrypt prefix
    });
  });

  describe('validatePassword', () => {
    it('should return true for correct password', async () => {
      const hash = await service.hashPassword('CorrectPassword@1');
      const result = await service.validatePassword('CorrectPassword@1', hash);
      expect(result).toBe(true);
    });

    it('should return false for wrong password', async () => {
      const hash = await service.hashPassword('CorrectPassword@1');
      const result = await service.validatePassword('WrongPassword@1', hash);
      expect(result).toBe(false);
    });
  });

  describe('getSessions', () => {
    it('should return empty array (stub)', async () => {
      const sessions = await service.getSessions('some-user-id');
      expect(sessions).toEqual([]);
    });
  });
});
