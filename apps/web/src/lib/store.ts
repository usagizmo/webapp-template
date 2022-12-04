import { writable } from 'svelte/store';
import { isLoggedIn } from './nhost';

export const adminPath = writable('/admin');

isLoggedIn.subscribe((value) => {
  adminPath.set(value ? '/admin' : '/admin/login');
});
