/**
 * Environment variable validation for the monorepo
 */

import { getOptionalEnv, getRequiredEnv } from './env.js';

/**
 * Validate and get all required environment variables for the web app
 * @returns Validated environment configuration
 */
export function validateWebEnv() {
  return {
    // Public variables (can be exposed to client)
    public: {
      supabaseUrl: getRequiredEnv('PUBLIC_SUPABASE_URL'),
      supabaseAnonKey: getRequiredEnv('PUBLIC_SUPABASE_ANON_KEY'),
      ga4MeasurementId: getOptionalEnv('PUBLIC_GA4_MEASUREMENT_ID', ''),
    },
    // Server-only variables
    server: {
      nodeEnv: getOptionalEnv('NODE_ENV', 'development'),
    },
  };
}

/**
 * Validate and get all required environment variables for backend operations
 * @returns Validated backend environment configuration
 */
export function validateBackendEnv() {
  return {
    nodeEnv: getOptionalEnv('NODE_ENV', 'development'),
    databaseUrl: getOptionalEnv('DATABASE_URL', ''),
    supabaseServiceRoleKey: getOptionalEnv('SUPABASE_SERVICE_ROLE_KEY', ''),
  };
}

/**
 * Common environment checks
 */
export const ENV_CHECKS = {
  isDevelopment: () => process.env.NODE_ENV === 'development',
  isProduction: () => process.env.NODE_ENV === 'production',
  isTest: () => process.env.NODE_ENV === 'test',
} as const;
