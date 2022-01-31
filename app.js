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
  });
  const dijkstraButton = document.querySelector("#dijkstra");
  dijkstraButton.addEventListener("click", function () {
    const bAlgorithm = makeButtonAlgorithm(dijkstraButton.id, function () {
      const table = document.querySelector("table");
      const error = document.querySelector(".error");
      if (table === null || error !== null) {
        printError();
      } else {
        const result = document.querySelector(".result");
        if (result === null) {
          let size = parseInt(matrixSize.value);
          const matrixArray = readTable(size);
          const inputOrigin = document.createElement("input");
          inputOrigin.id = "origin";
          const pOrigin = document.createElement("p");
          pOrigin.classList.add("nobr");
          pOrigin.innerHTML = "Source Node: ";
          const bOrigin = document.createElement("button");
          bOrigin.textContent = "OK";
          bOrigin.style.marginLeft = "5px";
          bOrigin.classList.add("secondary");
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
    sizeAdjacencyMatrix(bAlgorithm);
  });

  const clearButton = document.querySelector("#clearButton");
  clearButton.addEventListener("click", function () {
    deletingTemporalTable();
  });
}
