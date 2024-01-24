import { produce } from 'immer';
import type { GetUserQuery } from './$generated/graphql';
import { ROUTE } from './routes';

export type User = NonNullable<GetUserQuery['user']>;

export interface Store {
  get user(): User | null;
  set user(value: User | null);

  get adminPath(): string;

  set userBio(value: string);
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

    set userBio(value: string) {
      if (!user?.profile) return;
      user = produce(user, (draft) => {
        draft.profile!.bio = value;
      });
    },
  };
}

export const store = createStore();
