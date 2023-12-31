import { writable } from 'svelte/store';
import { user } from './nhost';
import { ROUTE } from './routes';

export const adminPath = writable(ROUTE.ADMIN);

user.subscribe((value) => {
  adminPath.set(value ? ROUTE.ADMIN : ROUTE.ADMIN_LOGIN);
});
