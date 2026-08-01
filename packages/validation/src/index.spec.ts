import { describe, it, expect } from 'vitest';
import {
  emailSchema,
  familyNumberSchema,
  uuidSchema,
  loginWithEmailSchema,
} from './index';

describe('Validation Schemas', () => {
  describe('emailSchema', () => {
    it('validates correct email addresses', () => {
      expect(emailSchema.parse('test@example.com')).toBe('test@example.com');
    });

    it('rejects invalid email addresses', () => {
      expect(() => emailSchema.parse('invalid-email')).toThrow();
    });
  });

  describe('familyNumberSchema', () => {
    it('validates correct family number format', () => {
      expect(familyNumberSchema.parse('QOAS-2024-0001')).toBe('QOAS-2024-0001');
    });

    it('rejects invalid family number format', () => {
      expect(() => familyNumberSchema.parse('INVALID-123')).toThrow();
    });
  });

  describe('uuidSchema', () => {
    it('validates valid UUID v4', () => {
      const validUuid = '123e4567-e89b-41d4-a716-446655440000';
      expect(uuidSchema.parse(validUuid)).toBe(validUuid);
    });

    it('rejects non-UUID strings', () => {
      expect(() => uuidSchema.parse('not-a-uuid')).toThrow();
    });
  });

  describe('loginWithEmailSchema', () => {
    it('validates email login payload', () => {
      const valid = { email: 'user@example.com', password: 'SecretPassword1' };
      expect(loginWithEmailSchema.parse(valid)).toEqual({
        email: 'user@example.com',
        password: 'SecretPassword1',
      });
    });
  });
});
