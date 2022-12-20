export const ROUTE = {
  HOME: '/',
  ADMIN: '/admin',
  ADMIN_LOGIN: '/admin/login',
  ADMIN_SIGNUP: '/admin/signup',
  SECRET: '/secret',
} as const satisfies {
  [key in string]: `/${string}`;
};

export type ROUTE_VALUE = typeof ROUTE[keyof typeof ROUTE];
