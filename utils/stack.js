"use strict";

class Stack {
  elements = [];
  push(element) {
    return this.elements.push(element);
  }

  pop(element) {
    return this.elements.pop(element);
  }

  isEmpty() {
    return this.elements.length === 0;
  }

  empty() {
    return (this.elements = []);
  }

  size() {
    return this.elements.length;
  }

  printStack() {
    return this.elements;
  }
}

export { Stack };
