import { create } from 'mutative';
import type { GetUserQuery } from './$generated/graphql';
import { ROUTE } from './routes';
import type { UserInputs } from './nhost';

export type User = NonNullable<GetUserQuery['user']>;

export class Store {
  #user: User | null = $state<User | null>(null);
  #userInputs: UserInputs = $state<UserInputs>({
    displayName: 'Guest',
    email: 'email@add.com',
    password: 'password0',
  });

  /**
   * Get the user
   * @returns The user
   */
  get user(): User | null {
    return this.#user;
  }

  /**
   * Set the user
   */
  set user(user: User | null) {
    this.#user = user;
  }

  /**
   * Get the user display name
   * @param userBio - The user display name
   */
  setUserBio(userBio: string): void {
    if (!this.#user?.profile) return;
    this.#user = create(this.#user, (draft) => {
      draft.profile!.bio = userBio;
    });
  }

  /**
   * Get the user inputs
   * @returns The user inputs
   */
  get userInputs(): UserInputs {
    return this.#userInputs;
  }

  /**
   * Set the user inputs
   * @param userInputs - The user inputs
   */
  setUserInputs(userInputs: Partial<UserInputs>): void {
    this.#userInputs = create(this.#userInputs, (draft) => {
      Object.assign(draft, userInputs);
    });
  }

  /**
   * Get the admin path
   * @returns The admin path
   */
  get adminPath(): string {
    return this.#user ? ROUTE.ADMIN : ROUTE.ADMIN_LOGIN;
  }
}

export const store = new Store();
