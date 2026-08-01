/**
 * @qoas/shared — Common business utilities
 * Used by both frontend (Next.js) and backend (NestJS).
 */

import { FAMILY_NUMBER_PREFIX } from '@qoas/constants';
import type { Role } from '@qoas/types';
import { ROLE_HIERARCHY } from '@qoas/constants';

// ─── Family Number ────────────────────────────────────────────────────────────

/**
 * Generate the next family number for a given year and sequence.
 * Format: QOAS-YYYY-NNNN
 */
export function generateFamilyNumber(year: number, sequence: number): string {
  const paddedSeq = sequence.toString().padStart(4, '0');
  return `${FAMILY_NUMBER_PREFIX}-${year}-${paddedSeq}`;
}

/**
 * Parse a family number into its components.
 */
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

/**
 * Check if a role has sufficient privilege for a required role.
 * Uses the frozen role hierarchy.
 */
export function hasRole(userRole: Role, requiredRole: Role): boolean {
  const userIndex = ROLE_HIERARCHY.indexOf(userRole as (typeof ROLE_HIERARCHY)[number]);
  const requiredIndex = ROLE_HIERARCHY.indexOf(requiredRole as (typeof ROLE_HIERARCHY)[number]);
  return userIndex >= requiredIndex;
}

/**
 * Get all roles that a given role has access to (itself + lower).
 */
export function getAccessibleRoles(role: Role): string[] {
  const index = ROLE_HIERARCHY.indexOf(role as (typeof ROLE_HIERARCHY)[number]);
  return index === -1 ? [] : [...ROLE_HIERARCHY.slice(0, index + 1)];
}

// ─── Date Utilities ───────────────────────────────────────────────────────────

/**
 * Format a Date or ISO string to ISO 8601 string (UTC).
 * Ensures consistent date serialization per Project Constitution.
 */
export function toIso8601(date: Date | string): string {
  return new Date(date).toISOString();
}

/**
 * Calculate age from date of birth.
 */
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

/**
 * Normalize a name (trim, collapse spaces, title case).
 */
export function normalizeName(name: string): string {
  return name
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

/**
 * Mask an email for display (e.g. j***@example.com).
 */
export function maskEmail(email: string): string {
  const [local, domain] = email.split('@');
  if (!local || !domain) return email;
  const masked = local[0] + '***';
  return `${masked}@${domain}`;
}

/**
 * Mask a phone number (e.g. +91 ***-***-8900).
 */
export function maskPhone(phone: string): string {
  if (phone.length < 4) return '***';
  return `***-***-${phone.slice(-4)}`;
}
