import { writable } from 'svelte/store';
import { isLoggedIn } from './nhost';
import { ROUTE, type RouteValue } from './routes';

export const adminPath = writable<RouteValue>(ROUTE.ADMIN);

isLoggedIn.subscribe((value) => {
  adminPath.set(value ? ROUTE.ADMIN : ROUTE.ADMIN_LOGIN);
});
