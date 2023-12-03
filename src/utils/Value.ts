export class Value<T = unknown> {
  private value: T;

  constructor(value: T) {
    this.value = value;
  }

  get val() {
    return this.value;
  }

  set(value: T) {
    this.value = value;
  }
}
