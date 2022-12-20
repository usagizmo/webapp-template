export const ROUTE = {
  HOME: '/',
  ADMIN: '/admin',
  ADMIN_LOGIN: '/admin/login',
  ADMIN_SIGNUP: '/admin/signup',
  SECRET: '/secret',
} as const satisfies {
  [key in string]: `/${string}`;
};

export type RouteValue = typeof ROUTE[keyof typeof ROUTE];
