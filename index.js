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
          dijkstra(matrixArray, origin);
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
    console.log(`recorriendo vertice: ${v}`);
    if (sptSet[v] == false && dist[v] <= min) {
      min = dist[v];
      min_index = v;
      console.log(`distancia minima y vertice: min = ${dist[v]}, v: ${v}`);
    }
  }
  return min_index;
}

function createTableDijkstra(size, arr) {
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
    //tv.innerHTML = "";
    vertexs.appendChild(tv);

    let tr = document.createElement("tr");
    tr.appendChild(th);
    //vertexs.appendChild(tv);
    //column
    for (let j = 0; j <= arr[i].length - 1; j++) {
      let td = document.createElement("td");
      let input = document.createElement("input");
      if (arr.length !== 0) {
        if (arr[i][j] === "Infinity") {
          input.value = "∞";
        } else {
          input.value = arr[i][j];
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

function dijkstra(arr, src) {
  let distTemp = [];
  let finalArray = [];
  let originTemp = [];
  let finalOrigin = [];
  console.time("dijkstra");
  console.log("dijkstra algorithm...");
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
    console.log(`================= iteracion: ${count} =================`);
    // Pick the minimum distance vertex
    // from the set of vertices not yet
    // processed. u is always equal to
    // src in first iteration.
    let u = minDistance(dist, sptSet, arr.length);
    console.log(`valor de u: ${u}`);
    // Mark the picked vertex as processed
    sptSet[u] = true;
    // Update dist value of the adjacent
    // vertices of the picked vertex.
    for (let v = 0; v < arr.length; v++) {
      console.log(` --------------- vertice: ${v} ---------------`);

      // Update dist[v] only if is not in
      // sptSet, there is an edge from u
      // to v, and total weight of path
      // from src to v through u is smaller
      // than current value of dist[v]
      console.log(sptSet[v]);
      if (
        !sptSet[v] &&
        arr[u][v] != 0 &&
        dist[u] != Infinity &&
        dist[u] + arr[u][v] < dist[v]
      ) {
        console.log(
          `operation: ${dist[u]} + ${arr[u][v]} = ${
            dist[u] + arr[u][v]
          } =>>>>>>>>>>>>>>>>>>>>>>>> u:${u} v:${v} uv:${arr[u][v]} distuv: ${
            dist[u][v]
          }`
        );
        dist[v] = dist[u] + arr[u][v]; // -------------------------------------> add vertex origin A,B,C,D,E...
        originTemp.push(u);
        console.log(`dist[v] = ${dist[v]}`);
      } else {
        originTemp.push(0);
      }
      /*else if (arr[u][v] === 0) {
        console.log("Es el mismo vertice");
      } else if (dist[u] === Infinity) {
        console.log("con este vertice no tiene conexión");
      } else {
        console.log("la suma de las distancias no mejora la distancia");
      }*/
    }

    for (let i = 0; i < dist.length; i++) {
      //console.log(`vertex ${i}: ${dist[i]}`);
      //distTemp.push(`(${dist[i]}, ${u})`);
      distTemp.push(`${dist[i]}`);
    }
    //push
    finalArray.push(distTemp);
    distTemp = [];

    finalOrigin.push(originTemp);
    originTemp = [];
  }

  // Print the constructed distance array
  /* console.log("RESULTADO FINAL: ");
  for (let i = 0; i < dist.length; i++) {
    console.log(`vertex ${i}: ${dist[i]}`);
  }*/

  //console.log(dist);
  console.log(finalOrigin);
  console.timeEnd("dijkstra");
  console.log(finalArray);

  // test modify array

  /*for (let i = 0; i < finalArray.length; i++) {
    for (let j = 0; j < finalArray[i].length; j++) {
      if (finalOrigin[i][j] !== 0) {
        finalArray[i][j] = [finalArray[i][j], finalOrigin[i][j]];
      }
      console.log(`i-j: ${i}, ${j}`);
    }
  }
  finalArray[0][0] = [finalArray[0][0], 0];
  console.log(finalArray);*/
  //console.log(finalArray);
  createTableDijkstra(finalArray.length, finalArray);
  // createMatrix(finalArray.length, finalArray);
}
