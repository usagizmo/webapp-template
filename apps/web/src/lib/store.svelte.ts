import type { User } from '@nhost/nhost-js';
import { ROUTE } from './routes';

interface Store {
  user: User | null;
  setUser: (user: User | null) => void;
  adminPath: string;
}

/**
 * Create the store
 * @returns The store
 */
function createStore(): Store {
  let _user = $state<User | null>(null);
  const adminPath = $derived(_user ? ROUTE.ADMIN : ROUTE.ADMIN_LOGIN);

  return {
    get user(): User | null {
      return _user;
    },
    setUser(user: User | null): void {
      _user = user ?? null;
    },
    get adminPath(): string {
      return adminPath;
    },
  };
}

export const store = createStore();
