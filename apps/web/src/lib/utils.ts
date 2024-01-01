import type { NhostSession } from '@nhost/nhost-js';

/**
 * Set the Nhost session in a cookie
 * @param res - The response from an Nhost API call
 * @returns - True if there was an error, false otherwise
 */
export function tryErrorAlertOnNhostApi(res: unknown): boolean {
  if (typeof res !== 'object' || res === null || !('error' in res)) return false;

  const error = (res as { error: { message?: string } }).error;
  if (typeof error !== 'object' || error === null || !error.message) return false;

  alert(error.message);
  return true;
}

/**
 * Tries to show an error alert based on Houdini API errors if available
 * @param errors - An array of error objects with a 'message' property, or null
 * @returns - Returns true if an error message was shown, otherwise false
 */
export function tryErrorAlertOnHoudiniApi(errors: unknown): boolean {
  if (!Array.isArray(errors)) return false;

  const error = errors.find((e) => e && typeof e === 'object' && 'message' in e && e.message);
  if (!error) return false;

  alert(error.message);
  return true;
}

/**
 * Parse the session from a cookie
 * @param cookiesSession - The session from a cookie
 * @returns - The parsed session
 */
export function parseSession(cookiesSession: string): NhostSession | null {
  return cookiesSession ? JSON.parse(cookiesSession) : null;
}
