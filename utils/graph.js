"use strict";

import { letters } from "../utils/utilsDOM.js";

class Graph {
  constructor(nVertices) {
    this.nVertices = nVertices;
    this.adjList = new Map();
  }

  //add vertex to the graph
  addVertex(v) {
    //initialize the adjacent list with a null array
    this.adjList.set(v, []);
  }

  //add edge to the graph
  addEdge(v, w) {
    this.adjList.get(v).push(w);
    //since graph is undirected, add an edge from w to v also
    this.adjList.get(w).push(v);
  }

  addadjList(map) {
    this.adjList = map;
  }
  //print the vertex and adjacency list
  printGraph() {
    //get all the vertices
    const get_keys = this.adjList.keys();
    //iterate over the vertices
    for (let i of get_keys) {
      let get_values = this.adjList.get(i);
      let conc = "";
      //iterate over the adjacency list concatenate the values into a string
      for (let j of get_values) {
        conc += j + " ";
      }
      console.log(i + " -> " + conc);
    }
  }

  convertToAdjMatrix(arr) {
    let adjM = [];
    console.log(`arr: ${arr}`);
    let newArr = [];
    //check if values are letters
    if (/[a-zA-Z]/.test(arr[0][0])) {
      console.log("data are letters, changing to numbers...");
      for (let i = 0; i < arr.length; i++) {
        let temp = [];
        for (let j = 0; j < arr[i].length; j++) {
          temp.push(letters.indexOf(arr[i][j]));
        }
        newArr.push(temp);
      }
      console.log(newArr);
    }
    for (let i = 0; i < newArr.length; i++) {
      let temp = [];
      for (let j = 0; j < newArr.length; j++) {
        temp.push(0);
      }
      adjM.push(temp);
    }
    //insert values adjList to adjMatrix
    for (let i = 0; i < newArr.length; i++) {
      for (let j = 0; j < newArr[i].length; j++) {
        adjM[i][newArr[i][j]] = 1;
      }
    }
    console.log("DEVOLVEMOS ESTE ARRAY MATRIX =>", adjM);
    return adjM;
  }

  convertToAdjList(arr) {
    let adjL = [];
    for (let i = 0; i < arr.length; i++) {
      let temp = [];
      for (let j = 0; j < arr[i].length; j++) {
        if (arr[i][j] === 1) {
          temp.push(j);
        }
      }
      adjL.push(temp);
    }
    return adjL;
  }
}

export { Graph };
