/**
 * Validation utilities
 */

/**
 * Check if value is a valid email address
 * @param email - Email address to validate
 * @returns True if valid email format
 */
export function isValidEmail(email: string): boolean {
  // Basic email validation with consecutive dots check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && !email.includes('..');
}

/**
 * Check if string meets minimum length requirement
 * @param value - String to check
 * @param minLength - Minimum required length
 * @returns True if string meets minimum length
 */
export function hasMinLength(value: string, minLength: number): boolean {
  return value.length >= minLength;
}

/**
 * Check if string is non-empty (after trimming)
 * @param value - String to check
 * @returns True if string is not empty
 */
export function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

/**
 * Sanitize string by removing potentially dangerous characters
 * @param value - String to sanitize
 * @returns Sanitized string
 */
export function sanitizeString(value: string): string {
  return value.replace(/[<>]/g, '');
}