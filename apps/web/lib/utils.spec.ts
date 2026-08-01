import { describe, it, expect } from 'vitest';
import { cn, truncate, getInitials } from './utils';

describe('Web Utility Functions', () => {
  describe('cn', () => {
    it('merges class names correctly', () => {
      expect(cn('px-2 py-1', 'bg-red-500')).toBe('px-2 py-1 bg-red-500');
    });

    it('handles conditional classes', () => {
      expect(cn('base', true && 'active', false && 'disabled')).toBe('base active');
    });
  });

  describe('truncate', () => {
    it('truncates long strings with ellipsis', () => {
      expect(truncate('Hello World Long Text', 10)).toBe('Hello W...');
    });

    it('returns original string if within limit', () => {
      expect(truncate('Short', 10)).toBe('Short');
    });
  });

  describe('getInitials', () => {
    it('extracts initials from name', () => {
      expect(getInitials('John Doe')).toBe('JD');
    });

    it('handles single names', () => {
      expect(getInitials('John')).toBe('J');
    });
  });
});
