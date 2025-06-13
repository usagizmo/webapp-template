import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { envUtils, getEnvVar, validateBackendEnv, validateWebEnv } from './env-schemas.js';

describe('env schemas', () => {
  describe('validateWebEnv', () => {
    it('should validate correct web environment', () => {
      const mockEnv = {
        NODE_ENV: 'development',
        PUBLIC_SUPABASE_URL: 'https://example.supabase.co',
        PUBLIC_SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        PUBLIC_GA4_MEASUREMENT_ID: 'G-XXXXXXXXXX',
      };

      const result = validateWebEnv(mockEnv);
      expect(result.public.supabaseUrl).toBe(mockEnv.PUBLIC_SUPABASE_URL);
      expect(result.public.supabaseAnonKey).toBe(mockEnv.PUBLIC_SUPABASE_ANON_KEY);
      expect(result.public.ga4MeasurementId).toBe(mockEnv.PUBLIC_GA4_MEASUREMENT_ID);
      expect(result.server.nodeEnv).toBe('development');
    });

    it('should use default values for optional fields', () => {
      const mockEnv = {
        PUBLIC_SUPABASE_URL: 'https://example.supabase.co',
        PUBLIC_SUPABASE_ANON_KEY: 'valid-key',
      };

      const result = validateWebEnv(mockEnv);
      expect(result.public.ga4MeasurementId).toBe('');
      expect(result.server.nodeEnv).toBe('development');
    });

    it('should throw error for invalid web environment', () => {
      const mockEnv = {
        PUBLIC_SUPABASE_URL: 'invalid-url',
        PUBLIC_SUPABASE_ANON_KEY: '',
      };

      expect(() => validateWebEnv(mockEnv)).toThrow('Environment validation failed');
    });
  });

  describe('validateBackendEnv', () => {
    it('should validate correct backend environment', () => {
      const mockEnv = {
        NODE_ENV: 'production',
        DATABASE_URL: 'postgresql://user:pass@localhost:5432/db',
        SUPABASE_SERVICE_ROLE_KEY: 'service-role-key',
      };

      const result = validateBackendEnv(mockEnv);
      expect(result.nodeEnv).toBe('production');
      expect(result.databaseUrl).toBe(mockEnv.DATABASE_URL);
      expect(result.supabaseServiceRoleKey).toBe(mockEnv.SUPABASE_SERVICE_ROLE_KEY);
    });

    it('should use default values for optional fields', () => {
      const mockEnv = {};

      const result = validateBackendEnv(mockEnv);
      expect(result.nodeEnv).toBe('development');
      expect(result.databaseUrl).toBe('');
      expect(result.supabaseServiceRoleKey).toBe('');
    });
  });

  describe('envUtils', () => {
    it('should correctly identify development environment', () => {
      expect(envUtils.isDevelopment('development')).toBe(true);
      expect(envUtils.isDevelopment('production')).toBe(false);
    });

    it('should correctly identify production environment', () => {
      expect(envUtils.isProduction('production')).toBe(true);
      expect(envUtils.isProduction('development')).toBe(false);
    });

    it('should correctly identify test environment', () => {
      expect(envUtils.isTest('test')).toBe(true);
      expect(envUtils.isTest('development')).toBe(false);
    });
  });

  describe('getEnvVar', () => {
    const originalEnv = process.env;

    beforeEach(() => {
      process.env = { ...originalEnv };
    });

    afterEach(() => {
      process.env = originalEnv;
    });

    it('should return environment variable value', () => {
      process.env.TEST_VAR = 'test-value';
      expect(getEnvVar('TEST_VAR')).toBe('test-value');
    });

    it('should return default value when env var is not set', () => {
      delete process.env.TEST_VAR;
      expect(getEnvVar('TEST_VAR', 'default')).toBe('default');
    });

    it('should throw error when required env var is not set', () => {
      delete process.env.TEST_VAR;
      expect(() => getEnvVar('TEST_VAR')).toThrow(
        'Required environment variable TEST_VAR is not set',
      );
    });
  });
});
