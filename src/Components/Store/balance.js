import { makeAutoObservable } from "mobx";

class Balance {
  count = 1000;
  constructor() {
    makeAutoObservable(this);
  }
  increment() {
    this.count = this.count + 1;
  }
  decrement() {
    this.count = this.count - 1;
  }
  change(value) {
    this.count = value;
  }
}

export default new Balance();
