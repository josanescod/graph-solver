"use strict";

import { floyd as floyd } from "./algorithms/floyd.js";
import { dijkstra as dijkstra } from "./algorithms/dijkstra.js";
import { havelHakimi as havelHakimi } from "./algorithms/havelHakimi.js";

import {
  numVertices as numVertices,
  readDataTable as readDataTable,
  readHavelHakimiTable as readHavelHakimiTable,
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
  main();
};

function main() {
  createStructure();

  const bHavelHakimi = document.querySelector("#havel-hakimi");
  bHavelHakimi.addEventListener("click", function () {
    deleteTemporalTable();
    console.log("havel-hakimi");
    principalButtonsAnimation(this);

    const bAlgorithm = makeButtonAlgorithm(bHavelHakimi.id, function () {
      secondaryButtonsAnimation(this, "clicked");
      deleteResultTable();
      let size = parseInt(nVertices.value);
      const matrixArray = readHavelHakimiTable(size);
      console.time("havel-hakimi");
      let isSequence = havelHakimi(matrixArray);
      console.timeEnd("havel-hakimi");
      if (isSequence) {
        console.log("SI que es secuencia grafica");
      } else {
        console.log("NO es secuencia grafica");
      }
    });

    numVertices(bAlgorithm);
  });

  const bFloyd = document.querySelector("#floyd");
  bFloyd.addEventListener("click", function () {
    deleteTemporalTable();
    console.log("floyd");
    principalButtonsAnimation(this);
    const bAlgorithm = makeButtonAlgorithm(bFloyd.id, function () {
      secondaryButtonsAnimation(this, "clicked");
      deleteResultTable();
      let size = parseInt(nVertices.value);
      const matrixArray = readDataTable(size);
      floyd(matrixArray);
    });

    numVertices(bAlgorithm);
  });

  const bDijkstra = document.querySelector("#dijkstra");
  bDijkstra.addEventListener("click", function () {
    deleteTemporalTable();
    console.log("dijkstra");
    principalButtonsAnimation(this);
    if (!document.querySelector("#nVertices")) {
      const bAlgorithm = makeButtonAlgorithm(bDijkstra.id, function () {
        secondaryButtonsAnimation(this, "clicked");
        deleteResultTable();
        let size = parseInt(nVertices.value);
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
      numVertices(bAlgorithm);
    }
  });

  const clearContent = document.querySelector("#clearContent");
  clearContent.addEventListener("click", function () {
    secondaryButtonsAnimation(this, "cleared");
    if (document.querySelector("#nVertices")) {
      deleteTemporalTable();
    }
  });
}
