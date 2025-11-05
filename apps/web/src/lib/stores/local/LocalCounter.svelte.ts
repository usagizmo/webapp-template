/**
 * Counter LocalStore (component-scoped)
 * Usage: `const counter = new LocalCounter()`
 */
export class LocalCounter {
  #count = $state(0);

  readonly count = $derived<number>(this.#count);

  increment() {
    this.#count += 1;
  }
}
