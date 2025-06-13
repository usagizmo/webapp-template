/**
 * Environment variable validation schemas using Zod
 */

import { z } from 'zod';

/**
 * Base environment schema
 */
const baseEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

/**
 * Web application environment schema
 */
const webEnvSchema = baseEnvSchema.extend({
  PUBLIC_SUPABASE_URL: z.string().url('Invalid Supabase URL'),
  PUBLIC_SUPABASE_ANON_KEY: z.string().min(1, 'Supabase anon key is required'),
  PUBLIC_GA4_MEASUREMENT_ID: z.string().optional().default(''),
});

/**
 * Backend environment schema
 */
const backendEnvSchema = baseEnvSchema.extend({
  DATABASE_URL: z
    .string()
    .optional()
    .default('')
    .refine((val) => val === '' || z.string().url().safeParse(val).success, 'Invalid database URL'),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional().default(''),
});

/**
 * Validate web environment variables
 * @param env - Environment variables object (defaults to process.env)
 * @returns Validated environment configuration
 */
export function validateWebEnv(env: Record<string, string | undefined> = process.env) {
  const result = webEnvSchema.safeParse(env);

  if (!result.success) {
    const errorMessages = result.error.issues.map(
      (issue) => `${issue.path.join('.')}: ${issue.message}`,
    );
    throw new Error(`Environment validation failed:\n${errorMessages.join('\n')}`);
  }

  return {
    public: {
      supabaseUrl: result.data.PUBLIC_SUPABASE_URL,
      supabaseAnonKey: result.data.PUBLIC_SUPABASE_ANON_KEY,
      ga4MeasurementId: result.data.PUBLIC_GA4_MEASUREMENT_ID,
    },
    server: {
      nodeEnv: result.data.NODE_ENV,
    },
  } as const;
}

/**
 * Validate backend environment variables
 * @param env - Environment variables object (defaults to process.env)
 * @returns Validated backend environment configuration
 */
export function validateBackendEnv(env: Record<string, string | undefined> = process.env) {
  const result = backendEnvSchema.safeParse(env);

  if (!result.success) {
    const errorMessages = result.error.issues.map(
      (issue) => `${issue.path.join('.')}: ${issue.message}`,
    );
    throw new Error(`Environment validation failed:\n${errorMessages.join('\n')}`);
  }

  return {
    nodeEnv: result.data.NODE_ENV,
    databaseUrl: result.data.DATABASE_URL,
    supabaseServiceRoleKey: result.data.SUPABASE_SERVICE_ROLE_KEY,
  } as const;
}

/**
 * Environment utility functions
 */
export const envUtils = {
  isDevelopment: (env = process.env.NODE_ENV) => env === 'development',
  isProduction: (env = process.env.NODE_ENV) => env === 'production',
  isTest: (env = process.env.NODE_ENV) => env === 'test',
} as const;

/**
 * Type-safe environment variable getter
 */
export function getEnvVar(key: string, defaultValue?: string): string {
  const value = process.env[key];
  if (value === undefined) {
    if (defaultValue !== undefined) return defaultValue;
    throw new Error(`Required environment variable ${key} is not set`);
  }
  return value;
}

/**
 * Export schemas for direct use
 */
export { backendEnvSchema, baseEnvSchema, webEnvSchema };
