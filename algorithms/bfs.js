"use strict";
import { letters } from "../utils/utilsDOM.js";
import { Queue } from "../utils/queue.js";

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
function changeNumbersByLetters(
  queueArr,
  addedVertices,
  removedVertices,
  resultArr
) {
  //queueArr
  for (let i = 0; i < queueArr.length; i++) {
    for (let j = 0; j < queueArr[i].length; j++) {
      queueArr[i][j] = letters[queueArr[i][j]];
    }
  }

  //addedVertices
  for (let i = 0; i < addedVertices.length; i++) {
    if (addedVertices[i] !== "-") {
      addedVertices[i] = letters[addedVertices[i]];
    }
  }
  //removedVertices
  for (let i = 0; i < removedVertices.length; i++) {
    if (removedVertices[i] !== "-") {
      removedVertices[i] = letters[removedVertices[i]];
    }
  }
  //resultArr
  let newResult = [];

  for (let i = 0; i < resultArr.length; i++) {
    let temp = [];
    for (let j = 0; j < resultArr[i].length; j++) {
      temp.push(letters[resultArr[i][j]]);
    }
    newResult.push(temp);
  }
  return [queueArr, addedVertices, removedVertices, newResult];
}

function bfs(graph, start, boption, visited = []) {
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
        console.log("Visiting node " + i + " and adding it to the queue");
      }
    }

    addedVertices.push("-");
    removedVertices.push(node);
  }

  if (queue.size() === 0) {
    //calculate resultArr
    for (let i = 0; i < addedVertices.length; i++) {
      temp = addedVertices.slice(0, i);
      resultArr.push(temp);
    }

    for (let i = 0; i < resultArr.length; i++) {
      if (resultArr[i].includes("-")) {
        resultArr[i] = resultArr[i].filter((val) => val !== "-");
      }
    }
    resultArr.shift();
    resultArr.push(resultArr[resultArr.length - 1]);

    //calculate queueArr
    let queueTemp = [];
    for (let i = 0; i < removedVertices.length; i++) {
      if (removedVertices[i] !== "-") {
        queueTemp.shift();
      } else {
        queueTemp.push(addedVertices[i]);
      }

      let arrTemp = queueTemp.slice();
      queueArr.push(arrTemp);
    }

    let definitiveArray;
    if (boption === "letters") {
      definitiveArray = changeNumbersByLetters(
        queueArr,
        addedVertices,
        removedVertices,
        resultArr
      );
    } else {
      definitiveArray = [queueArr, addedVertices, removedVertices, resultArr];
    }

    queueArr = [];
    queueTemp = [];
    addedVertices = [];
    removedVertices = [];
    resultArr = [];
    result = [];
    return definitiveArray;
  }
}

export { bfs };
