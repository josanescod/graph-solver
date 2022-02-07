"use strict";

import { floyd as floyd } from "./algorithms/floyd.js";
import { dijkstra as dijkstra } from "./algorithms/dijkstra.js";
import { havelHakimi as havelHakimi } from "./algorithms/havelHakimi.js";

import {
  numVertices as numVertices,
  readDataTableMatrix as readDataTableMatrix,
  readHavelHakimiTable as readHavelHakimiTable,
  deleteTemporalTable as deleteTemporalTable,
  deleteResultTable as deleteResultTable,
  printError as printError,
  makeButtonAlgorithm as makeButtonAlgorithm,
  deleteError as deleteError,
  principalButtonsAnimation as principalButtonsAnimation,
  secondaryButtonsAnimation as secondaryButtonsAnimation,
  createStructure as createStructure,
  printMessageSolution as printMessageSolution,
} from "../utils/utilsDOM.js";

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
      const degreeSequenceArray = readHavelHakimiTable(size);
      console.time("havel-hakimi");
      let isSequence = havelHakimi(degreeSequenceArray);
      console.timeEnd("havel-hakimi");
      if (isSequence) {
        printMessageSolution("it's a graphic sequence");
      } else {
        printMessageSolution("it's not a graphic sequence");
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
      const adjacencyMatrixArray = readDataTableMatrix(size);
      floyd(adjacencyMatrixArray);
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
        const adjacencyMatrixArray = readDataTableMatrix(size);
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
          dijkstra(adjacencyMatrixArray, vertices.indexOf(origin));
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

  //dfs
  const bDfs = document.querySelector("#dfs");
  bDfs.addEventListener("click", function () {
    deleteTemporalTable();
    console.log("dfs");
    principalButtonsAnimation(this);

    const bAlgorithm = makeButtonAlgorithm(bDfs.id, function () {
      secondaryButtonsAnimation(this, "clicked");
      deleteResultTable();
      let size = parseInt(nVertices.value);
      console.log(size);
      // table adjacency list

      // readAdjacencyList(size)
      /*const adjacencyListArray = readAdjacencyList(size);
      dfs(adjacencyListArray);*/
    });

    numVertices(bAlgorithm);
  });

  const clearContent = document.querySelector("#clearContent");
  clearContent.addEventListener("click", function () {
    secondaryButtonsAnimation(this, "cleared");
    if (document.querySelector("#nVertices")) {
      deleteTemporalTable();
    }
  });
}
