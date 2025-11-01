/**
 * SvelteKit route path type definition
 */
export type RoutePath = '/' | '/auth/login' | '/auth/signup' | '/dashboard' | '/secret';

/**
 * Navigation item type definition
 */
export type NavItem = {
  label: string;
  href: RoutePath;
};
