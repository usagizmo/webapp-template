export const useCounter = () => new Counter();

class Counter {
  #count = $state(0);

  readonly count = $derived<number>(this.#count);

  increment() {
    this.#count += 1;
  }
}
