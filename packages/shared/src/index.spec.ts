import { describe, it, expect } from 'vitest';
import { Role } from '@qoas/types';
import {
  generateFamilyNumber,
  parseFamilyNumber,
  hasRole,
  normalizeName,
  maskEmail,
  generateUuidV7,
  isValidUuid,
  rupeesToPaise,
  paiseToRupees,
  formatPaise,
} from './index';

describe('Shared Utilities', () => {
  describe('UUID v7', () => {
    it('generates valid UUID v7', () => {
      const id = generateUuidV7();
      expect(isValidUuid(id)).toBe(true);
    });
  });

  describe('Money Handling (Paise)', () => {
    it('converts Rupees to Paise', () => {
      expect(rupeesToPaise(500.5)).toBe(50050);
      expect(rupeesToPaise(100)).toBe(10000);
    });

    it('converts Paise to Rupees', () => {
      expect(paiseToRupees(50050)).toBe(500.5);
    });

    it('formats Paise as INR currency string', () => {
      const formatted = formatPaise(50050);
      expect(formatted).toContain('500.50');
    });
  });

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
