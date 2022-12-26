export const tryErrorAlertOnNhostApi = (res: { error?: { message: string } | null }): boolean => {
  const errorMessage = res.error?.message;
  errorMessage && alert(errorMessage);
  return !!errorMessage;
};

export const tryErrorAlertOnHoudiniApi = (err: unknown): boolean => {
  if (!Array.isArray(err) || typeof err[0] !== 'object' || !err[0]) return false;
  const errorMessage = err[0].message;
  errorMessage && alert(errorMessage);
  return !!errorMessage;
};

// for using *.id as a key in #each
export const hasId = <T extends { id?: unknown }>(obj: T): obj is T & { id: unknown } => !!obj.id;
export const toWithId = <T extends object>(obj: T): T & { id: unknown } => {
  if (hasId(obj)) return obj;
  throw new Error('.id is required');
};
