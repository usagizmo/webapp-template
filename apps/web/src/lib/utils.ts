export const getRouteScope = (path: string) => path.split('/')[1];

export const tryErrorAlertOnNhostApi = (res: { error?: { message: string } | null }): boolean => {
  const errorMessage = res.error?.message;
  errorMessage && alert(errorMessage);
  return !!errorMessage;
};

export const tryErrorAlertOnHoudiniApi = (err: unknown): boolean => {
  if (!Array.isArray(err) || typeof err[0] !== 'object' || !err[0]) return true;
  const errorMessage = err[0].message;
  errorMessage && alert(errorMessage);
  return !!errorMessage;
};
