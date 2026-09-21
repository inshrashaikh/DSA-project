class Stack {
  constructor() {
    this.items = [];
  }

  // Add an item to the top of the stack.
  push(item) {
    this.items.push(item);
  }

  // Remove and return the top item, or undefined if the stack is empty.
  pop() {
    if (this.isEmpty()) {
      return undefined;
    }

    return this.items.pop();
  }

  // View the top item without removing it.
  peek() {
    if (this.isEmpty()) {
      return undefined;
    }

    return this.items[this.items.length - 1];
  }

  // Check whether the stack has no items.
  isEmpty() {
    return this.items.length === 0;
  }

  // Return the current number of items in the stack.
  size() {
    return this.items.length;
  }

  // Remove all items from the stack.
  clear() {
    this.items = [];
  }

  // Return a copy of the internal array to protect the original data.
  toArray() {
    return [...this.items];
  }
}

export default Stack;
