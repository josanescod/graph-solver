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
  principalButtonsAnimation as principalButtonsAnimation,
  secondaryButtonsAnimation as secondaryButtonsAnimation,
  createStructure as createStructure,
} from "../utilsDOM/utilsDOM.js";

window.onload = () => {
  createStructure();
  main();
};

function main() {
  const floydButton = document.querySelector("#floyd");
  floydButton.addEventListener("click", function () {
    deleteTemporalTable();
    console.log("floyd");
    principalButtonsAnimation(this);
    const bAlgorithm = makeButtonAlgorithm(floydButton.id, function () {
      secondaryButtonsAnimation(this, "clicked");
      deleteResultTable();
      let size = parseInt(matrixSize.value);
      const matrixArray = readDataTable(size);
      floyd(matrixArray);
    });

    sizeAdjacencyMatrix(bAlgorithm);
  });

  const dijkstraButton = document.querySelector("#dijkstra");
  dijkstraButton.addEventListener("click", function () {
    deleteTemporalTable();
    console.log("dijkstra");
    principalButtonsAnimation(this);
    if (!document.querySelector("#matrixSize")) {
      const bAlgorithm = makeButtonAlgorithm(dijkstraButton.id, function () {
        secondaryButtonsAnimation(this, "clicked");
        deleteResultTable();
        let size = parseInt(matrixSize.value);
        const matrixArray = readDataTable(size);
        //select th vertices, add on array, delete first element,send index of array like origin
        const trvertices = document
          .querySelector("table tr ")
          .querySelectorAll("th");

        const vertices = [];
        for (let i = 1; i < trvertices.length; i++) {
          vertices.push(trvertices[i].innerText);
        }
        let origin = document.querySelector("#origin").value.toUpperCase();
        if (vertices.indexOf(origin) !== -1) {
          deleteError();
          dijkstra(matrixArray, vertices.indexOf(origin));
        } else {
          printError(
            `Please enter a valid source vertex [${vertices[0]}-${
              vertices[vertices.length - 1]
            }]`
          );
        }
      });
      sizeAdjacencyMatrix(bAlgorithm);
    }
  });

  const clearContent = document.querySelector("#clearContent");
  clearContent.addEventListener("click", function () {
    secondaryButtonsAnimation(this, "cleared");
    if (document.querySelector("#matrixSize")) {
      deleteTemporalTable();
    }
  });
}
