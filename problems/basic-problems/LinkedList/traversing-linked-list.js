class ListLinked {
  constructor(data) {
    this.head = {
      value: data,
      next: null,
    };
    this.tail = this.head;
    this.size = 1;
  }
  appendNode(nodeData) {
    let newNode = {
      value: nodeData,
      next: null,
    };
    this.tail.next = newNode;
    this.tail = newNode;
    this.size += 1;
  }
  traversing() {
    let counter = 0;
    let currentNode = this.head;
    while (counter < this.size) {
      console.log(currentNode);
      
      currentNode = currentNode.next;
      counter++;
    }
  }
}

let list = new ListLinked(200); // object of List class
list.appendNode(300);
list.appendNode(400);
list.appendNode(500);
// console.log(list);
list.traversing();

module.exports = { ListLinked };
