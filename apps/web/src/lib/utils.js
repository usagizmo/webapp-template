/**
 * @typedef {import('@nhost/nhost-js').NhostSession} NhostSession
 */

/**
 * @param {{ error?: { message: string } | null }} res
 * @returns {boolean}
 */
export const tryErrorAlertOnNhostApi = (res) => {
  const errorMessage = res.error?.message;
  errorMessage && alert(errorMessage);
  return !!errorMessage;
};

/**
 * @param {unknown} err
 * @returns {boolean}
 */
export const tryErrorAlertOnHoudiniApi = (err) => {
  if (!Array.isArray(err) || typeof err[0] !== 'object' || !err[0]) return false;
  const errorMessage = err[0].message;
  errorMessage && alert(errorMessage);
  return !!errorMessage;
};

/**
 * @param {string | undefined} cookiesSession
 * @returns {NhostSession | null}
 */
export const parseSession = (cookiesSession) => {
  return cookiesSession ? JSON.parse(cookiesSession) : null;
};

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
 * Returns the same object with an added 'id' property if it doesn't already have one
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
