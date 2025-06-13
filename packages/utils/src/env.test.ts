import { describe, expect, it, beforeEach, afterEach } from 'vitest';

import { getRequiredEnv, getOptionalEnv, isDevelopment, isProduction } from './env.js';

describe('env utilities', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    // Reset environment variables
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe('getRequiredEnv', () => {
    it('should return environment variable value when set', () => {
      process.env.TEST_VAR = 'test-value';
      expect(getRequiredEnv('TEST_VAR')).toBe('test-value');
    });

    it('should throw error when environment variable is not set', () => {
      delete process.env.TEST_VAR;
      expect(() => getRequiredEnv('TEST_VAR')).toThrow(
        'Required environment variable TEST_VAR is not set',
      );
    });

    it('should throw error when environment variable is empty string', () => {
      process.env.TEST_VAR = '';
      expect(() => getRequiredEnv('TEST_VAR')).toThrow(
        'Required environment variable TEST_VAR is not set',
      );
    });
  });

  describe('getOptionalEnv', () => {
    it('should return environment variable value when set', () => {
      process.env.TEST_VAR = 'test-value';
      expect(getOptionalEnv('TEST_VAR', 'default')).toBe('test-value');
    });

    it('should return default value when environment variable is not set', () => {
      delete process.env.TEST_VAR;
      expect(getOptionalEnv('TEST_VAR', 'default')).toBe('default');
    });

    it('should return empty string when environment variable is empty', () => {
      process.env.TEST_VAR = '';
      expect(getOptionalEnv('TEST_VAR', 'default')).toBe('');
    });
  });

  describe('isDevelopment', () => {
    it('should return true when NODE_ENV is development', () => {
      process.env.NODE_ENV = 'development';
      expect(isDevelopment()).toBe(true);
    });

    it('should return false when NODE_ENV is not development', () => {
      process.env.NODE_ENV = 'production';
      expect(isDevelopment()).toBe(false);
    });
  });

  describe('isProduction', () => {
    it('should return true when NODE_ENV is production', () => {
      process.env.NODE_ENV = 'production';
      expect(isProduction()).toBe(true);
    });

    it('should return false when NODE_ENV is not production', () => {
      process.env.NODE_ENV = 'development';
      expect(isProduction()).toBe(false);
    });
  });
});
