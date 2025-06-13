import { describe, expect, it } from 'vitest';

import { commonSchemas, validate } from './schemas.js';

describe('zod schemas', () => {
  describe('emailSchema', () => {
    it('should validate correct email addresses', () => {
      const validEmails = ['test@example.com', 'user.name@domain.co.jp', 'user+tag@domain.org'];

      validEmails.forEach((email) => {
        const result = validate.email(email);
        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.data).toBe(email);
        }
      });
    });

    it('should reject invalid email addresses', () => {
      const invalidEmails = [
        'invalid-email',
        '@domain.com',
        'user@',
        'user..name@domain.com', // consecutive dots
        '',
      ];

      invalidEmails.forEach((email) => {
        const result = validate.email(email);
        expect(result.success).toBe(false);
      });
    });
  });

  describe('nonEmptyStringSchema', () => {
    it('should validate non-empty strings', () => {
      const validStrings = ['hello', 'world', '123', ' trimmed '];

      validStrings.forEach((str) => {
        const result = validate.nonEmptyString(str);
        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.data.trim().length).toBeGreaterThan(0);
        }
      });
    });

    it('should reject empty or invalid strings', () => {
      const invalidStrings = ['', '   ', null, undefined, 123];

      invalidStrings.forEach((str) => {
        const result = validate.nonEmptyString(str);
        expect(result.success).toBe(false);
      });
    });
  });

  describe('minLengthStringSchema', () => {
    it('should validate strings meeting minimum length', () => {
      const result = validate.minLength('hello world', 5);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toBe('hello world');
      }
    });

    it('should reject strings shorter than minimum length', () => {
      const result = validate.minLength('hi', 5);
      expect(result.success).toBe(false);
    });
  });

  describe('sanitizedStringSchema', () => {
    it('should remove dangerous characters', () => {
      const result = commonSchemas.sanitizedString.parse('Hello <script>alert("xss")</script>');
      // cspell:disable-next-line
      expect(result).toBe('Hello scriptalert("xss")/script');
    });

    it('should handle normal text', () => {
      const result = commonSchemas.sanitizedString.parse('Normal text');
      expect(result).toBe('Normal text');
    });

    it('should handle empty strings', () => {
      const result = commonSchemas.sanitizedString.parse('');
      expect(result).toBe('');
    });
  });
});
