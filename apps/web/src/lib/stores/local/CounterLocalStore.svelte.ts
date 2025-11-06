/**
 * Counter LocalStore (component-scoped)
 * Usage: `const counter = new CounterLocalStore()`
 */
export class CounterLocalStore {
  #count = $state(0);

  readonly count = $derived<number>(this.#count);

  increment() {
    this.#count += 1;
  }
}
