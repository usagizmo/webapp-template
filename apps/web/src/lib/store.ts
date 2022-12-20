import { writable } from 'svelte/store';
import { isLoggedIn } from './nhost';
import { ROUTE, type ROUTE_VALUE } from './routes';

export const adminPath = writable<ROUTE_VALUE>(ROUTE.ADMIN);

isLoggedIn.subscribe((value) => {
  adminPath.set(value ? ROUTE.ADMIN : ROUTE.ADMIN_LOGIN);
});
