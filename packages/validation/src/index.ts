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
  .regex(FAMILY_NUMBER_REGEX, 'Must be a valid family card or registration number');

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
  email: z.string().min(1, 'Family number, phone, or email is required'),
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

// ─── Member Registration Schemas ──────────────────────────────────────────────

export const familyRelationshipEnum = z.enum([
  'Head of Family',
  'Spouse',
  'Son',
  'Daughter',
  'Father',
  'Mother',
  'Brother',
  'Sister',
  'Grandfather',
  'Grandmother',
  'Grandson',
  'Granddaughter',
  'Son-in-Law / Daughter-in-Law',
  'Relative',
  'Other',
]);

export const personalDetailsStepSchema = z.object({
  name: z.string().min(2, 'Full Name must be at least 2 characters').max(200).trim(),
  tamilName: z.string().max(200).trim().optional().or(z.literal('')),
  relation: familyRelationshipEnum,
  dob: z.string().min(1, 'Date of birth is required'),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
  community: z.string().max(100).trim().optional().or(z.literal('')),
  placeOfBirth: z.string().max(200).trim().optional().or(z.literal('')),
});

export const contactDetailsStepSchema = z.object({
  phone: z.string().optional().or(z.literal('')),
  alternatePhone: z.string().optional().or(z.literal('')),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  address: z.string().max(500).optional().or(z.literal('')),
  city: z.string().max(100).optional().or(z.literal('')),
  pincode: z.string().max(20).optional().or(z.literal('')),
  isFamilyHead: z.boolean().default(false),
  isLivingWithFamily: z.boolean().default(true),
  parentGuardian: z.string().max(200).optional().or(z.literal('')),
  schoolInstitution: z.string().max(200).optional().or(z.literal('')),
});

export const createMemberSchema = z.object({
  name: z.string().min(2, 'Full Name is required').max(200).trim(),
  tamilName: z.string().optional(),
  preferredName: z.string().optional(),
  relation: familyRelationshipEnum,
  dob: z.string().min(1, 'Date of birth is required'),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
  placeOfBirth: z.string().optional(),
  nationality: z.string().optional(),
  phone: z.string().optional(),
  alternatePhone: z.string().optional(),
  email: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  pincode: z.string().optional(),
  isFamilyHead: z.boolean().optional(),
  isLivingWithFamily: z.boolean().optional(),
  parentGuardian: z.string().optional(),
  schoolInstitution: z.string().optional(),
  educationLevel: z.string().optional(),
  courseDegree: z.string().optional(),
  yearOfStudy: z.string().optional(),
  occupation: z.string().optional(),
  employer: z.string().optional(),
  designation: z.string().optional(),
  maritalStatus: z.string().optional(),
  isBaptized: z.boolean().default(false),
  baptismDate: z.string().optional(),
  baptismParish: z.string().optional(),
  receivedFirstCommunion: z.boolean().default(false),
  firstHolyCommunionDate: z.string().optional(),
  isConfirmed: z.boolean().default(false),
  confirmationDate: z.string().optional(),
  isMarried: z.boolean().default(false),
  marriageDate: z.string().optional(),
  spouseName: z.string().optional(),
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
