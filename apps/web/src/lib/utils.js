/**
 * @typedef {import('@nhost/nhost-js').NhostSession} NhostSession
 */

/**
 * Set the Nhost session in a cookie
 * @param {{ error?: { message: string } | null }} res - The response from an Nhost API call
 * @returns {boolean} - True if there was an error, false otherwise
 */
export function tryErrorAlertOnNhostApi(res) {
  const errorMessage = res.error?.message;
  errorMessage && alert(errorMessage);
  return !!errorMessage;
}

/**
 * Tries to show an error alert based on Houdini API errors if available
 * @param {{ message: string }[] | null} errors - An array of error objects with a 'message' property, or null
 * @returns {boolean} - Returns true if an error message was shown, otherwise false
 */
export function tryErrorAlertOnHoudiniApi(errors) {
  if (!Array.isArray(errors) || typeof errors[0] !== 'object' || !errors[0]) return false;
  const errorMessage = errors[0].message;
  errorMessage && alert(errorMessage);
  return !!errorMessage;
}

/**
 * Parse the session from a cookie
 * @param {string | undefined} cookiesSession - The session from a cookie
 * @returns {NhostSession | null} - The parsed session
 */
export function parseSession(cookiesSession) {
  return cookiesSession ? JSON.parse(cookiesSession) : null;
}

/**
 * Checks if an object has an 'id' property
 * @template  T
 * @param {T} obj - Object to check for the presence of an 'id' property
 * @returns {obj is T & { id: string }} - True if the object has an 'id' property, false otherwise
 */
export function hasId(obj) {
  if (obj == null || typeof obj !== 'object') return false;
  return !!('id' in obj);
}

/**
 * Ensures that the object has an 'id' property
 * Throws an error if the object doesn't have an 'id' property
 * @template {object} T
 * @param {T} obj - Object to ensure has an 'id' property
 * @returns {T & { id: string }} - The same object with an 'id' property
 * @throws {Error} - Throws an error if the object doesn't have an 'id' property
 */
export function toWithId(obj) {
  if (hasId(obj)) return obj;
  throw new Error('.id is required');
}
