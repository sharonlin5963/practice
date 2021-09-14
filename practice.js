//* 1 Fibonacci number
function fibonacci (position) {
  if (position < 2) return position;
  return fibonacci(position - 1) + fibonacci(position - 2);
};
fibonacci(0);
fibonacci(1);
fibonacci(2);
fibonacci(3);
fibonacci(4);

//* 2 Debounce
function debounce (func, delay = 500) {
  let timer = null;
  return function () {
    let context = this;
    let args = arguments;
    clearInterval(timer)
    timer = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  }
};

//* 3 Stack
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}
class Stack {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  // methods
  isEmpty() {
    return this.length === 0;
  }
  push(data) {
    const newNode = new Node(data);
    if (this.isEmpty()) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode; 
      this.tail = newNode;
    }
    this.length += 1;
  }
  getNode(index) {
    if (index < 0 || index >= this.length) return null;

    let currNode = this.head;
    let currIndex = 0;
    while (currIndex < index) {
      currIndex += 1;
      currNode = currNode.next;
    }
    return currNode;
  }
  pop() {
    if (this.length === 0) return;

    const prevNode = this.getNode(this.length - 2);
    const delNode = prevNode.next;
    prevNode.next = null;
    this.tail = prevNode;
    this.length -= 1;
    return delNode.data;
  }
  size() {
    return this.length;
  }
}
const myStack = new Stack();
myStack.push(1);
myStack.push(2);
myStack.push(3);
myStack.pop();
myStack.size();

//* 4 getPagination
function getPagination (offset, limit, total) {
  const currentPage = Math.floor(offset / limit) + 1;
  const pages = Math.floor(total / limit);
  const totalPage = (total % limit === 0) ? pages : pages + 1;
  let renderPages = [];
  for (let i = 1; i < total + 1 ; i++ ) {
    const subtraction = Math.abs(currentPage - i)
    if (subtraction <= 2 || subtraction === 0 ) {
      renderPages.push(i);
    }
  }
  // 刪除不存在頁數
  const renderPagesRef = [...renderPages];
  renderPagesRef.forEach((item) => {
    if (item > totalPage) {
      const id = renderPages.indexOf(item);
      renderPages.splice(id, 1);
    }
  })
  // 補頁數
  for (let i = renderPages.length; i < 5 ; i++ ) {
    const lastPage = renderPages[renderPages.length - 1];
    const newPage = (lastPage >= totalPage) ? renderPages[0] - 1 : renderPages[renderPages.length - 1] + 1;
    renderPages.push(newPage);
    renderPages.sort((a, b) => {
      return a - b;
    });
  }
  return { currentPage, totalPage, renderPages };
};
getPagination(0, 5, 33);
getPagination(5, 5, 33);
getPagination(10, 5, 33);
getPagination(15, 5, 33);
getPagination(20, 5, 33);
getPagination(25, 5, 33);
getPagination(30, 5, 33);
