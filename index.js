"use strict";

import { floyd as floyd } from "./algorithms/floyd.js";

import {
  createMatrix as createMatrix,
  readTable as readTable,
  deletingTemporalTable as deletingTemporalTable,
} from "../utilDOM/utilDOM.js";

window.onload = () => {
  main();
};

function main() {
  const sizeButton = document.querySelector("#sizeButton");
  sizeButton.addEventListener("click", function () {
    let matrixSize = document.querySelector("#matrixSize");
    matrixSize = matrixSize.value;
    if (matrixSize > 1 && matrixSize <= 15 && matrixSize.length > 0) {
      deletingTemporalTable();
      createMatrix(matrixSize);
    } else {
      printError();
    }
  });
  const clearButton = document.querySelector("#clearButton");
  clearButton.addEventListener("click", function () {
    deletingTemporalTable();
  });
  const floydButton = document.querySelector("#floyd");
  floydButton.addEventListener("click", function () {
    const table = document.querySelector("table");
    const error = document.querySelector(".error");
    if (table === null || error !== null) {
      printError();
    } else {
      const result = document.querySelector(".result");
      if (result === null) {
        let size = parseInt(matrixSize.value);
        const matrixArray = readTable(size);
        floyd(matrixArray);
      }
    }
  });
  const dijkstraButton = document.querySelector("#dijkstra");
  dijkstraButton.addEventListener("click", function () {
    const table = document.querySelector("table");
    const error = document.querySelector(".error");
    if (table === null || error !== null) {
      printError();
    } else {
      const result = document.querySelector(".result");
      if (result === null) {
        let size = parseInt(matrixSize.value);
        const matrixArray = readTable(size);
        // query source node
        const inputOrigin = document.createElement("input");
        inputOrigin.id = "origin";
        const pOrigin = document.createElement("p");
        pOrigin.classList.add("nobr");
        pOrigin.innerHTML = "Source Node: ";
        const bOrigin = document.createElement("button");
        bOrigin.textContent = "OK";
        bOrigin.style.marginLeft = "5px";
        bOrigin.addEventListener("click", function () {
          let origin = parseInt(document.querySelector("#origin").value);
          dijsktra(matrixArray, origin);
          bOrigin.disabled = true;
        });
        const divOrigin = document.createElement("div");
        divOrigin.classList.add("dijkstra");
        divOrigin.appendChild(pOrigin);
        divOrigin.appendChild(inputOrigin);
        divOrigin.appendChild(bOrigin);
        const wrapper = document.querySelector(".wrapper");
        wrapper.appendChild(divOrigin);
      }
    }
  });
}

function printError() {
  const error = document.querySelector(".error");
  if (error === null) {
    const pError = document.createElement("p");
    pError.classList.add("error");
    pError.innerHTML = "An error has occurred";
    const sizeDiv = document.querySelector("#size");
    sizeDiv.appendChild(pError);
  }
}

function minDistance(dist, sptSet, numbVertices) {
  // Initialize min value
  let min = Infinity; //Number.MAX_VALUE;
  let min_index = -1;

  for (let v = 0; v < numbVertices; v++) {
    if (sptSet[v] == false && dist[v] <= min) {
      min = dist[v];
      min_index = v;
    }
  }
  return min_index;
}

function dijsktra(arr, src) {
  console.log("dijsktra algorithm...");
  console.log("origin: ", src);
  console.log(arr);

  // test dijsktra

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
      }
    }
  }

  // Print the constructed distance array
  for (let i = 0; i < dist.length; i++) {
    console.log(`vertex ${i}: ${dist[i]}`);
  }
  console.log(dist);
}
