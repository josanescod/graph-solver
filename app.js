"use strict";

import { floyd as floyd } from "./algorithms/floyd.js";
import { dijkstra as dijkstra } from "./algorithms/dijkstra.js";
import {
  sizeAdjacencyMatrix as sizeAdjacencyMatrix,
  readDataTable as readDataTable,
  deleteTemporalTable as deleteTemporalTable,
  deleteResultTable as deleteResultTable,
  printError as printError,
  makeButtonAlgorithm as makeButtonAlgorithm,
  deleteError as deleteError,
} from "../utilsDOM/utilsDOM.js";

window.onload = () => {
  main();
};

function main() {
  const floydButton = document.querySelector("#floyd");
  floydButton.addEventListener("click", function () {
    deleteTemporalTable();
    console.log("floyd");
    const bAlgorithm = makeButtonAlgorithm(floydButton.id, function () {
      const result = document.querySelector(".result");
      if (result === null) {
        let size = parseInt(matrixSize.value);
        const matrixArray = readDataTable(size);
        floyd(matrixArray);
      }
    });

    sizeAdjacencyMatrix(bAlgorithm);
  });

  const dijkstraButton = document.querySelector("#dijkstra");
  dijkstraButton.addEventListener("click", function () {
    deleteTemporalTable();
    console.log("dijkstra");
    if (!document.querySelector("#matrixSize")) {
      const bAlgorithm = makeButtonAlgorithm(dijkstraButton.id, function () {
        const result = document.querySelector(".result");
        /*if (result === null) {*/
        deleteResultTable();
        let size = parseInt(matrixSize.value);
        const matrixArray = readDataTable(size);
        //select th vertexs, add on array, delete first element,send index of array like origin
        const trvertexs = document
          .querySelector("table tr ")
          .querySelectorAll("th");
        console.log(trvertexs);

        const vertexs = [];
        for (let i = 1; i < trvertexs.length; i++) {
          vertexs.push(trvertexs[i].innerText);
        }
        console.log("vertexs", vertexs);
        let origin = document.querySelector("#origin").value.toUpperCase();
        console.log(origin);
        if (vertexs.indexOf(origin) !== -1) {
          deleteError();
          console.log(vertexs.indexOf(origin));
          dijkstra(matrixArray, vertexs.indexOf(origin));
        } else {
          printError();
        }
        /*}*/
      });
      sizeAdjacencyMatrix(bAlgorithm);
    }
  });

  const clearButton = document.querySelector("#clearButton");
  clearButton.addEventListener("click", function () {
    if (document.querySelector("#matrixSize")) {
      deleteTemporalTable();
    }
  });
}
