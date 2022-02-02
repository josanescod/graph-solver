"use strict";
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

function createTableDijkstra(arr, src) {
  const letters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
  ];

  // to loop vertically through a 2d array
  let j = 0;
  while (j < arr[0].length) {
    for (let i = 0; i < arr.length; i++) {
      if (i !== 0) {
        if (j === src) {
          arr[i][j][1] = src;
        } else if (arr[i][j][1] === 0) {
          arr[i][j][1] = arr[i - 1][j][1];
        }
      } else {
        arr[i][j][1] = src;
      }
    }
    j++;
  }

  let z = 0;
  // change numbers for letters
  while (z < arr[0].length) {
    for (let i = 0; i < arr.length; i++) {
      arr[i][z][1] = letters[arr[i][z][1]];
    }
    z++;
  }
  //create table
  const table = document.createElement("table");
  if (arr.length !== 0) {
    table.classList.add("result");
  } else {
    table.classList.add("empty");
  }
  const vertexs = document.createElement("tr");
  const theaderEmpty = document.createElement("th");

  //row
  for (let i = 0; i <= arr.length - 1; i++) {
    let th = document.createElement("th");
    th.innerHTML = " ";
    let tv = document.createElement("th");
    tv.innerHTML = letters[i];
    vertexs.appendChild(tv);

    let tr = document.createElement("tr");
    tr.appendChild(th);
    //column
    for (let j = 0; j <= arr[i].length - 1; j++) {
      let td = document.createElement("td");
      let input = document.createElement("input");
      if (arr.length !== 0) {
        input.disabled = true;
        input.setAttribute("type", "text");
        if (arr[i][j][0] === "Infinity") {
          input.value = `∞,${arr[i][j][1]}`;
        } else {
          input.value = `${arr[i][j][0]},${arr[i][j][1]}`;
        }
      }
      td.appendChild(input);
      tr.appendChild(td);
    }
    vertexs.insertBefore(theaderEmpty, vertexs.firstChild);
    table.appendChild(tr);
    table.insertBefore(vertexs, table.firstChild);
  }

  const wrapper = document.querySelector(".wrapper");
  if (table.className === "empty") {
    wrapper.appendChild(table);
  } else if (table.className === "result") {
    const wrapper2 = document.querySelector(".wrapper2");
    wrapper2.appendChild(table);
  }
  // A B C D ....
  // create new Row with letters and put firstElement table 'result'
  let tableResult = document.querySelector("table.result");
  let trTableResult = tableResult.firstChild;
  let thArrayTrTableReslult = trTableResult.querySelectorAll("th");
  for (let i = 0; i <= arr.length; i++) {
    thArrayTrTableReslult[i].innerHTML = letters[i];
  }

  const newTh = document.createElement("th");
  newTh.innerHTML = " ";
  trTableResult.insertBefore(newTh, trTableResult.firstChild);
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
  console.timeEnd("dijkstra");
}

export { dijkstra };
