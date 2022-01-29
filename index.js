"use strict";

import { floyd as floyd } from "./algorithms/floyd.js";
import { dijkstra as dijkstra } from "./algorithms/dijkstra.js";

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
