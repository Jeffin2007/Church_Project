/**
 * @qoas/shared — Common business utilities
 * Used by both frontend (Next.js) and backend (NestJS).
 */

import { v7 as uuidv7, validate as validateUuid } from 'uuid';
import { FAMILY_NUMBER_PREFIX, ROLE_HIERARCHY } from '@qoas/constants';
import type { Role } from '@qoas/types';

// ─── UUID v7 ─────────────────────────────────────────────────────────────────

/**
 * Generate a time-ordered UUID v7 string.
 */
export function generateUuidV7(): string {
  return uuidv7();
}

/**
 * Validate whether a string is a valid UUID (v4 or v7).
 */
export function isValidUuid(id: string): boolean {
  return validateUuid(id);
}

// ─── Money Handling (Integer Paise) ──────────────────────────────────────────

/**
 * Convert Rupees (e.g. 500.50) to integer Paise (50050).
 */
export function rupeesToPaise(rupees: number): number {
  return Math.round(rupees * 100);
}

/**
 * Convert integer Paise (50050) to Rupees float (500.50).
 */
export function paiseToRupees(paise: number): number {
  return paise / 100;
}

/**
 * Format integer Paise as INR display string (e.g. 50050 → "₹500.50").
 */
export function formatPaise(paise: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(paiseToRupees(paise));
}

// ─── Family Number ────────────────────────────────────────────────────────────

export function generateFamilyNumber(year: number, sequence: number): string {
  const paddedSeq = sequence.toString().padStart(4, '0');
  return `${FAMILY_NUMBER_PREFIX}-${year}-${paddedSeq}`;
}

export function parseFamilyNumber(
  familyNumber: string,
): { prefix: string; year: number; sequence: number } | null {
  const parts = familyNumber.split('-');
  if (parts.length !== 3) return null;
  const [prefix, yearStr, seqStr] = parts;
  const year = parseInt(yearStr ?? '', 10);
  const sequence = parseInt(seqStr ?? '', 10);
  if (isNaN(year) || isNaN(sequence)) return null;
  return { prefix: prefix ?? '', year, sequence };
}

// ─── Role Utilities ──────────────────────────────────────────────────────────

export function hasRole(userRole: Role, requiredRole: Role): boolean {
  const userIndex = ROLE_HIERARCHY.indexOf(userRole as (typeof ROLE_HIERARCHY)[number]);
  const requiredIndex = ROLE_HIERARCHY.indexOf(requiredRole as (typeof ROLE_HIERARCHY)[number]);
  return userIndex >= requiredIndex;
}

export function getAccessibleRoles(role: Role): string[] {
  const index = ROLE_HIERARCHY.indexOf(role as (typeof ROLE_HIERARCHY)[number]);
  return index === -1 ? [] : [...ROLE_HIERARCHY.slice(0, index + 1)];
}

// ─── Date Utilities ───────────────────────────────────────────────────────────

export function toIso8601(date: Date | string): string {
  return new Date(date).toISOString();
}

export function calculateAge(dateOfBirth: Date | string): number {
  const dob = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
}

// ─── String Utilities ─────────────────────────────────────────────────────────

export function normalizeName(name: string): string {
  return name
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function maskEmail(email: string): string {
  const [local, domain] = email.split('@');
  if (!local || !domain) return email;
  const masked = local[0] + '***';
  return `${masked}@${domain}`;
}

export function maskPhone(phone: string): string {
  if (phone.length < 4) return '***';
  return `***-***-${phone.slice(-4)}`;
}

export * from './families-data';
