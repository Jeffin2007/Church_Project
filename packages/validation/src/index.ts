import { z } from 'zod';

import { EMAIL_REGEX, FAMILY_NUMBER_REGEX, PHONE_REGEX, UUID_REGEX } from '@qoas/constants';

/**
 * @qoas/validation — Shared Zod schemas
 * Used by frontend forms and backend DTOs.
 */

// ─── Primitives ───────────────────────────────────────────────────────────────

export const uuidSchema = z.string().regex(UUID_REGEX, 'Must be a valid UUID v4');

export const emailSchema = z
  .string()
  .min(1, 'Email is required')
  .regex(EMAIL_REGEX, 'Must be a valid email address')
  .toLowerCase()
  .trim();

export const phoneSchema = z.string().regex(PHONE_REGEX, 'Must be a valid phone number');

export const familyNumberSchema = z
  .string()
  .regex(FAMILY_NUMBER_REGEX, 'Must match format QOAS-YYYY-NNNN');

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(128, 'Password must not exceed 128 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character');

// ─── Auth Schemas ─────────────────────────────────────────────────────────────

export const loginWithEmailSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
});

export const loginWithFamilyNumberSchema = z.object({
  familyNumber: familyNumberSchema,
  password: z.string().min(1, 'Password is required'),
});

export const loginSchema = z.discriminatedUnion('method', [
  loginWithEmailSchema.extend({ method: z.literal('email') }),
  loginWithFamilyNumberSchema.extend({ method: z.literal('familyNumber') }),
]);

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export const resetPasswordSchema = z
  .object({
    token: z.string().min(1, 'Reset token is required'),
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

// ─── Pagination Schema ────────────────────────────────────────────────────────

export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(20),
  search: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('asc'),
});

// ─── Family Schemas ───────────────────────────────────────────────────────────

export const createFamilySchema = z.object({
  name: z.string().min(2, 'Family name must be at least 2 characters').max(200).trim(),
  address: z.string().max(500).trim().optional(),
  anbiyam: z.string().max(100).trim().optional(),
  ward: z.string().max(100).trim().optional(),
  headPhone: phoneSchema.optional(),
  headEmail: emailSchema.optional(),
});

// ─── Member Schema ────────────────────────────────────────────────────────────

export const createMemberSchema = z.object({
  name: z.string().min(2).max(200).trim(),
  dateOfBirth: z.string().datetime({ offset: true }).optional(),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
  relation: z.string().max(100).optional(),
  phone: phoneSchema.optional(),
  email: emailSchema.optional(),
  isBaptized: z.boolean().default(false),
  isConfirmed: z.boolean().default(false),
});

// ─── Type Exports ─────────────────────────────────────────────────────────────

export type LoginWithEmailInput = z.infer<typeof loginWithEmailSchema>;
export type LoginWithFamilyNumberInput = z.infer<typeof loginWithFamilyNumberSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type PaginationInput = z.infer<typeof paginationSchema>;
export type CreateFamilyInput = z.infer<typeof createFamilySchema>;
export type CreateMemberInput = z.infer<typeof createMemberSchema>;
