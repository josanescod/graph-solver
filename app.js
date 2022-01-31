"use strict";

import { floyd as floyd } from "./algorithms/floyd.js";
import { dijkstra as dijkstra } from "./algorithms/dijkstra.js";
import {
  sizeAdjacencyMatrix as sizeAdjacencyMatrix,
  readTable as readTable,
  deletingTemporalTable as deletingTemporalTable,
  printError as printError,
  makeButtonAlgorithm as makeButtonAlgorithm,
} from "../utilsDOM/utilsDOM.js";

window.onload = () => {
  main();
};

function main() {
  const floydButton = document.querySelector("#floyd");
  floydButton.addEventListener("click", function () {
    if (!document.querySelector("#matrixSize")) {
      const bAlgorithm = makeButtonAlgorithm(floydButton.id, function () {
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
      sizeAdjacencyMatrix(bAlgorithm);
    }
  });
  const dijkstraButton = document.querySelector("#dijkstra");
  dijkstraButton.addEventListener("click", function () {
    if (!document.querySelector("#matrixSize")) {
      const bAlgorithm = makeButtonAlgorithm(dijkstraButton.id, function () {
        const table = document.querySelector("table");
        const error = document.querySelector(".error");
        if (table === null || error !== null) {
          printError();
        } else {
          const result = document.querySelector(".result");
          if (result === null) {
            let size = parseInt(matrixSize.value);
            console.log(size);
            const matrixArray = readTable(size);
            console.log("matrix: ", matrixArray);
            let origin = parseInt(document.querySelector("#origin").value);
            dijkstra(matrixArray, origin);
          }
        }
      });
      sizeAdjacencyMatrix(bAlgorithm);
    }
  });

  const clearButton = document.querySelector("#clearButton");
  clearButton.addEventListener("click", function () {
    if (document.querySelector("#matrixSize")) {
      deletingTemporalTable();
    }
  });
}
