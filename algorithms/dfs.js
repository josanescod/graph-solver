("use strict");

import { Stack } from "../utils/stack.js";
let stack = new Stack();
let result = [];
let stackArr = [];
let resultArr = [];
let addVertices = [];
let removedVertices = [];
let temp = [];

function dfs(g, node, visited = {}) {
  var neighbours = g.adjList.get(node);
  console.log(`Visiting node ${node}`);
  visited[node] = true;
  stack.push(node);
  result.push(node);
  addVertices.push(node);
  removedVertices.push("-");
  console.log(`Stack: ${stack.elements}`);
  for (let e of stack.elements) {
    temp.push(e);
  }
  stackArr.push(temp);
  if (resultArr[resultArr.length - 1] === undefined) {
    resultArr.push([node]);
  } else {
    let newArr = [];
    for (let e of result) {
      newArr.push(e);
    }
    resultArr.push(newArr);
  }
  temp = [];
  for (let neighbour of neighbours) {
    if (!visited[neighbour]) {
      dfs(g, neighbour, visited);
    }
  }
  console.log(`<- Backtracking from ${node}`);
  stack.pop(node);
  removedVertices.push(node);
  addVertices.push("-");
  resultArr.push(resultArr[resultArr.length - 1]);
  console.log(`Stack: ${stack.elements}`);
  for (let e of stack.elements) {
    temp.push(e);
  }
  stackArr.push(temp);
  temp = [];

  //when stack has 0 elements finish function, save values and reset variables
  if (stack.elements.length === 0) {
    let definitiveArray = [stackArr, addVertices, removedVertices, resultArr];
    stackArr = [];
    addVertices = [];
    removedVertices = [];
    resultArr = [];
    result = [];
    return definitiveArray;
  }
}

export { dfs };
