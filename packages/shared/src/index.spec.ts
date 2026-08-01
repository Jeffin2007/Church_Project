import { describe, it, expect } from 'vitest';
import { Role } from '@qoas/types';
import {
  generateFamilyNumber,
  parseFamilyNumber,
  hasRole,
  normalizeName,
  maskEmail,
} from './index';

describe('Shared Utilities', () => {
  describe('family number utilities', () => {
    it('generates formatted family number', () => {
      expect(generateFamilyNumber(2024, 42)).toBe('QOAS-2024-0042');
    });

    it('parses valid family number', () => {
      const parsed = parseFamilyNumber('QOAS-2024-0042');
      expect(parsed).toEqual({ prefix: 'QOAS', year: 2024, sequence: 42 });
    });

    it('returns null for invalid family number', () => {
      expect(parseFamilyNumber('INVALID')).toBeNull();
    });
  });

  describe('hasRole', () => {
    it('returns true when user role is higher than or equal to required role', () => {
      expect(hasRole(Role.SUPER_ADMIN, Role.ADMIN)).toBe(true);
      expect(hasRole(Role.ADMIN, Role.ADMIN)).toBe(true);
    });

    it('returns false when user role is lower than required role', () => {
      expect(hasRole(Role.FAMILY_MEMBER, Role.ADMIN)).toBe(false);
    });
  });

  describe('string utilities', () => {
    it('normalizes names', () => {
      expect(normalizeName('  john  doe  ')).toBe('John Doe');
    });

    it('masks email addresses', () => {
      expect(maskEmail('john.doe@example.com')).toBe('j***@example.com');
    });
  });
});
