"use strict";

import { floyd } from "./algorithms/floyd.js";
import { dijkstra } from "./algorithms/dijkstra.js";
import { havelHakimi } from "./algorithms/havelHakimi.js";
import { dfs } from "./algorithms/dfs.js";
import { bfs } from "./algorithms/bfs.js";
import { Graph } from "./utils/graph.js";
import {
  numVertices,
  readDataTableMatrix,
  readDataTableAdjList,
  readHavelHakimiTable,
  deleteTemporalTable,
  deleteResultTable,
  printError,
  makeButtonAlgorithm,
  deleteError,
  principalButtonsAnimation,
  secondaryButtonsAnimation,
  createStructure,
  printMessageSolution,
  createTableResultDfs,
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
        let origin = document.querySelector("#origin").value.toUpperCase();
        const adjacencyMatrixArray = readDataTableMatrix(size);
        //select th vertices, add on array, delete first element,send index of array like origin
        const trvertices = document
          .querySelector("table tr ")
          .querySelectorAll("th");
        const vertices = [];
        for (let i = 1; i < trvertices.length; i++) {
          vertices.push(trvertices[i].innerText);
        }

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
      const size = parseInt(nVertices.value);
      const boption = document.querySelector(".boption").id;
      const AdjacencyListMap = readDataTableAdjList(size, boption);
      // Using the above implemented graph class
      const g = new Graph(size);
      g.addadjList(AdjacencyListMap);
      g.printGraph();
      let origin = document.querySelector("#origin").value.toUpperCase();
      const trvertices = document.querySelectorAll("table th ");
      const vertices = [];
      for (let i = 0; i < trvertices.length; i++) {
        vertices.push(trvertices[i].innerText);
      }
      if (vertices.indexOf(origin) !== -1) {
        deleteError();
        console.time("dfs");
        createTableResultDfs(dfs(g, origin));
        console.timeEnd("dfs");
      } else {
        printError(
          `Please enter a valid source vertex [${vertices[0]}-${
            vertices[vertices.length - 1]
          }]`
        );
      }
    });
    numVertices(bAlgorithm);
  });

  //bfs
  const bBfs = document.querySelector("#bfs");
  bBfs.addEventListener("click", function () {
    deleteTemporalTable();
    console.log("bfs");
    principalButtonsAnimation(this);
    const bAlgorithm = makeButtonAlgorithm(bBfs.id, function () {
      secondaryButtonsAnimation(this, "clicked");
      deleteResultTable();
      const size = parseInt(nVertices.value);
      const boption = document.querySelector(".boption").id;
      const AdjacencyListMap = readDataTableAdjList(size, boption);
      // Using the above implemented graph class
      const g = new Graph(size);
      //test pass adjList to adjMatrix:
      let values = Array.from(AdjacencyListMap.values());
      console.log("VALUES", values);
      const test = g.convertToAdjMatrix(values);
      console.log("TEST: ", test);
      g.addadjList(AdjacencyListMap);
      g.printGraph();
      let origin = document.querySelector("#origin").value.toUpperCase();
      const trvertices = document.querySelectorAll("table th ");
      const vertices = [];
      for (let i = 0; i < trvertices.length; i++) {
        vertices.push(trvertices[i].innerText);
      }
      if (vertices.indexOf(origin) !== -1) {
        deleteError();

        console.time("bfs");
        bfs(test, origin); // graph, adjacency or matrix?
        //createTableResultDfs(dfs(g, origin));
        console.timeEnd("bfs");
      } else {
        printError(
          `Please enter a valid source vertex [${vertices[0]}-${
            vertices[vertices.length - 1]
          }]`
        );
      }
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
