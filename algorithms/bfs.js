"use strict";
import { letters } from "../utils/utilsDOM.js";

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
  //console.log("GRAPH inside BFS: ", graph, "ORIGIN: ", start);
  let result = [];
  //A Queue to manage the nodes that have yet to be visited
  var queue = [];
  //Adding the node to start from
  queue.push(start);
  //A boolean array indicating whether we have already visited a node
  visited = [];
  //(The start node is already visited)
  visited[start] = true;
  // Keeping the distances (might not be necessary depending on your use case)
  var distances = []; // No need to set initial values since every node is visted exactly once
  //(the distance to the start node is 0)
  distances[start] = 0;
  //While there are nodes left to visit...
  while (queue.length > 0) {
    console.log("Visited nodes: " + visited);
    console.log("Distances: " + distances);
    var node = queue.shift();
    console.log("Removing node " + node + " from the queue...");
    result.push(node);
    //...for all neighboring nodes that haven't been visited yet....
    for (var i = 1; i < graph[node].length; i++) {
      if (graph[node][i] && !visited[i]) {
        // Do whatever you want to do with the node here.
        // Visit it, set the distance and add it to the queue
        visited[i] = true;
        distances[i] = distances[node] + 1;
        queue.push(i);
        console.log(
          "Visiting node " +
            i +
            ", setting its distance to " +
            distances[i] +
            " and adding it to the queue"
        );
      }
    }
  }
  //console.log("No more nodes in the queue. Distances: " + distances);
  console.log(`Result: ${result}`);
  return [distances, result];
}

export { bfs };
