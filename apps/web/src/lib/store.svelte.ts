import type { GetUserQuery } from './$generated/graphql';
import { ROUTE } from './routes';

export type User = GetUserQuery['user'];

export interface Store {
  get user(): User | null;
  set user(value: User | null);

  get adminPath(): string;
}

/**
 * Create a store
 * @returns Store
 */
function createStore(): Store {
  let user = $state<User | null>(null);

  return {
    get user(): User | null {
      return user;
    },
    set user(value) {
      user = value;
    },

    get adminPath(): string {
      return user ? ROUTE.ADMIN : ROUTE.ADMIN_LOGIN;
    },
  };
}

export const store = createStore();
