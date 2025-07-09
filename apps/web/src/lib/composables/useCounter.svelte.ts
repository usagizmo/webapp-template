export const useCounter = () => new Counter();

class Counter {
  #count = $state(0);

  get count() {
    return this.#count;
  }

  increment() {
    this.#count += 1;
  }
}
