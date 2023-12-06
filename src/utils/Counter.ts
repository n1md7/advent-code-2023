export class Counter {
  private count: number = 0;

  constructor(value: number) {
    this.count = value;
  }

  get val() {
    return this.count;
  }

  inc() {
    return ++this.count;
  }

  dec() {
    return --this.count;
  }

  add(value: number) {
    return (this.count += value);
  }

  sub(value: number) {
    return (this.count -= value);
  }

  pow(value: number) {
    return (this.count **= value);
  }

  set(value: number) {
    this.count = value;
  }
}
