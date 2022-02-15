"use strict";

import { createTableDijkstra } from "../utils/utilsDOM.js";

function minDistance(dist, sptSet, numbVertices) {
  let min = Infinity;
  let min_index = -1;

  for (let v = 0; v < numbVertices; v++) {
    if (sptSet[v] == false && dist[v] <= min) {
      min = dist[v];
      min_index = v;
    }
  }
  return min_index;
}

//dijkstra https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/
function dijkstra(arr, src) {
  let distTemp = [];
  let finalArray = [];
  let originTemp = [];
  let finalOrigin = [];
  console.time("dijkstra");
  let dist = new Array(arr.length);
  let sptSet = new Array(arr.length);

  // Initialize all distances as
  // INFINITE and stpSet[] as false
  for (let i = 0; i < arr.length; i++) {
    dist[i] = Infinity; //Number.MAX_VALUE;
    sptSet[i] = false;
  }
  // Distance of source vertex
  // from itself is always 0
  dist[src] = 0;
  // Find shortest path for all vertices
  for (let count = 0; count < arr.length - 1; count++) {
    // Pick the minimum distance vertex
    // from the set of vertices not yet
    // processed. u is always equal to
    // src in first iteration.
    let u = minDistance(dist, sptSet, arr.length);
    // Mark the picked vertex as processed
    sptSet[u] = true;
    // Update dist value of the adjacent
    // vertices of the picked vertex.
    for (let v = 0; v < arr.length; v++) {
      // Update dist[v] only if is not in
      // sptSet, there is an edge from u
      // to v, and total weight of path
      // from src to v through u is smaller
      // than current value of dist[v]
      if (
        !sptSet[v] &&
        arr[u][v] != 0 &&
        dist[u] != Infinity &&
        dist[u] + arr[u][v] < dist[v]
      ) {
        dist[v] = dist[u] + arr[u][v];
        originTemp.push(u);
      } else {
        originTemp.push(0);
      }
    }
    for (let i = 0; i < dist.length; i++) {
      distTemp.push(`${dist[i]}`);
    }
    //push
    finalArray.push(distTemp);
    distTemp = [];
    finalOrigin.push(originTemp);
    originTemp = [];
  }
  console.log(finalOrigin);
  console.log(finalArray);
  // test modify array
  for (let i = 0; i < finalArray.length; i++) {
    for (let j = 0; j < finalArray[i].length; j++) {
      if (finalOrigin[i][j] !== 0) {
        finalArray[i][j] = [finalArray[i][j], finalOrigin[i][j]];
      } else {
        finalArray[i][j] = [finalArray[i][j], 0];
      }
    }
  }

  createTableDijkstra(finalArray, src);
  //return finalArray;
  console.timeEnd("dijkstra");
}

export { dijkstra };
