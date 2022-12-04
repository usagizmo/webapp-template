import { writable } from 'svelte/store';
import { isLoggedIn } from './nhost';
import { ROUTE } from './routes';

export const adminPath = writable(ROUTE.ADMIN);

isLoggedIn.subscribe((value) => {
  adminPath.set(value ? ROUTE.ADMIN : ROUTE.ADMIN_LOGIN);
});
