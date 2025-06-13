/**
 * Zod schemas for validation
 */

import { z } from 'zod';

/**
 * Email validation schema
 */
export const emailSchema = z
  .string()
  .email('Invalid email format')
  .refine((email) => !email.includes('..'), 'Consecutive dots are not allowed');

/**
 * Non-empty string schema
 */
export const nonEmptyStringSchema = z.string().trim().min(1, 'String cannot be empty');

/**
 * Minimum length string schema factory
 */
export const minLengthStringSchema = (minLength: number, message?: string) =>
  z.string().min(minLength, message ?? `String must be at least ${minLength} characters`);

/**
 * String sanitization schema
 */
export const sanitizedStringSchema = z.string().transform((value) => value.replace(/[<>]/g, ''));

/**
 * Common validation schemas
 */
export const commonSchemas = {
  email: emailSchema,
  nonEmptyString: nonEmptyStringSchema,
  sanitizedString: sanitizedStringSchema,
  minLength: minLengthStringSchema,
} as const;

/**
 * Type-safe validation functions
 */
export const validate = {
  email: (value: unknown) => emailSchema.safeParse(value),
  nonEmptyString: (value: unknown) => nonEmptyStringSchema.safeParse(value),
  sanitizedString: (value: unknown) => sanitizedStringSchema.safeParse(value),
  minLength: (value: unknown, minLength: number) =>
    minLengthStringSchema(minLength).safeParse(value),
} as const;
