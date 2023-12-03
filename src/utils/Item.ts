export class Item<T = number> {
  private value: T;
  private index: number;

  constructor(value: T, index = -1) {
    this.value = value;
    this.index = index;
  }

  get val() {
    return this.value;
  }

  get idx() {
    return this.index;
  }

  set(value: T): void;
  set(value: T, index: number): void;
  set(...args: [T, number?]): void {
    const [value, index] = args;
    this.value = value;

    if (index !== undefined) {
      this.index = index;
    }
  }

  setIndex(index: number): void {
    this.index = index;
  }

  setValue(value: T): void {
    this.value = value;
  }
}
