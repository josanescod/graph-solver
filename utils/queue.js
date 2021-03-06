"use strict";

class Queue {
  elements = [];

  add(element) {
    return this.elements.push(element);
  }

  remove() {
    return this.elements.shift();
  }

  isEmpty() {
    return this.elements.length === 0;
  }

  empty() {
    this.elements.length = 0;
  }

  size() {
    return this.elements.length;
  }

  returnQueue() {
    //console.log(this.elements);
    return this.elements;
  }
}

export { Queue };
