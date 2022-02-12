("use strict");

import { Stack as Stack } from "../utils/stack.js";

let stack = new Stack();
let result = [];
let pilaArr = [];
let temp = [];

function dfs(g, node, visited = {}) {
  var neighbours = g.adjList.get(node);
  console.log(`Visiting node ${node}`);
  visited[node] = true;
  stack.push(node);
  result.push(node);
  console.log(`Estado de la pila: ${stack.elements}, ${typeof stack.elements}`);
  for (let e of stack.elements) {
    console.log(e);
    temp.push(e);
  }

  console.log(`temp: ${temp}`);
  pilaArr.push(temp);
  console.log(`pilaArr ${pilaArr}`);
  temp = [];

  for (let neighbour of neighbours) {
    if (!visited[neighbour]) {
      dfs(g, neighbour, visited);
    }
  }
  console.log(`<- Backtracking from ${node}`);
  stack.pop(node);
  console.log(`Estado de la pila: ${stack.elements}, ${typeof stack.elements}`);
  for (let e of stack.elements) {
    console.log(e);
    temp.push(e);
  }

  console.log(`temp: ${temp}`);
  pilaArr.push(temp);
  console.log(`pilaArr ${pilaArr}`);
  temp = [];
  return { result, pilaArr };
}

export { dfs };
