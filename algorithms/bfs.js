"use strict";
import { letters } from "../utils/utilsDOM.js";
import { Queue } from "../utils/queue.js";

//queueArr,addVertices,removedVertices,resultArr
//let result=[];
let queue = new Queue();
let queueArr = [];
let resultArr = [];
let addedVertices = [];
let removedVertices = [];
let temp = [];

function convertToAdjMatrix(arr) {
  let adjM = [];
  for (let i = 0; i < arr.length; i++) {
    let temp = [];
    for (let j = 0; j < arr.length; j++) {
      temp.push(0);
    }
    adjM.push(temp);
  }
  //insert values adjList to adjMatrix
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      adjM[i][arr[i][j]] = 1;
    }
  }
  return adjM;
}

function bfs(graph, start, visited = []) {
  graph = convertToAdjMatrix(graph);

  if (/[a-zA-Z]/.test(start)) {
    start = letters.indexOf(start);
  }

  let result = [];
  //A Queue to manage the nodes that have yet to be visited
  //Adding the node to start from
  queue.add(parseInt(start));
  addedVertices.push(parseInt(start));
  //resultArr.push([parseInt(start)]);
  removedVertices.push("-");

  //A boolean array indicating whether we have already visited a node
  visited = [];
  //(The start node is already visited)
  visited[start] = true;

  //While there are nodes left to visit...
  while (queue.size() > 0) {
    var node = queue.remove();

    console.log("Removing node " + node + " from the queue...");
    result.push(node);

    //...for all neighboring nodes that haven't been visited yet....
    for (var i = 1; i < graph[node].length; i++) {
      if (graph[node][i] && !visited[i]) {
        // Do whatever you want to do with the node here.
        // Visit it, set the distance and add it to the queue
        visited[i] = true;
        queue.add(i);
        addedVertices.push(i);
        removedVertices.push("-");

        console.log("visitando nodos vecinos...");

        console.log("Visiting node " + i + " and adding it to the queue");
      }
    }

    addedVertices.push("-");
    removedVertices.push(node);
  }

  //calculate resultArr
  for (let i = 0; i < addedVertices.length; i++) {
    temp = addedVertices.slice(0, i);
    resultArr.push(temp);
  }

  //resultArr = [];
  for (let i = 0; i < resultArr.length; i++) {
    //console.log(resultArr[i]);
    if (resultArr[i].includes("-")) {
      resultArr[i] = resultArr[i].filter((val) => val !== "-");
    }
  }
  resultArr.shift();
  resultArr.push(resultArr[resultArr.length - 1]);

  //console.log(resultArr);

  return [addedVertices, removedVertices, result, resultArr];
}

export { bfs };
