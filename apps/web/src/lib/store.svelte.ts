import { create } from 'mutative';
import type { GetUserQuery } from './$generated/graphql';
import { ROUTE } from './routes';
import type { UserInputs } from './nhost';

export type User = NonNullable<GetUserQuery['user']>;

export interface Store {
  get user(): User | null;
  set user(value: User | null);
  setUserBio: (value: string) => void;

  get userInputs(): UserInputs;
  setUserInputs(value: Partial<UserInputs>): void;

  get adminPath(): string;
}

/**
 * Create a store
 * @returns Store
 */
function createStore(): Store {
  let user = $state<User | null>(null);

  let userInputs = $state<UserInputs>({
    displayName: 'Guest',
    email: 'email@add.com',
    password: 'password0',
  });

  return {
    get user(): User | null {
      return user;
    },
    set user(value) {
      user = value;
    },
    setUserBio(value: string): void {
      if (!user?.profile) return;
      user = create(user, (draft) => {
        draft.profile!.bio = value;
      });
    },

    get userInputs(): UserInputs {
      return userInputs;
    },
    setUserInputs(value: Partial<UserInputs>): void {
      userInputs = create(userInputs, (draft) => {
        Object.assign(draft, value);
      });
    },

    get adminPath(): string {
      return user ? ROUTE.ADMIN : ROUTE.ADMIN_LOGIN;
    },
  };
}

export const store = createStore();
