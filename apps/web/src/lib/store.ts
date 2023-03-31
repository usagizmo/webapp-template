import { writable } from 'svelte/store';
import { user } from './nhost';
import { ROUTE, type RouteValue } from './routes';

export const adminPath = writable<RouteValue>(ROUTE.ADMIN);

user.subscribe((value) => {
  adminPath.set(value ? ROUTE.ADMIN : ROUTE.ADMIN_LOGIN);
});
