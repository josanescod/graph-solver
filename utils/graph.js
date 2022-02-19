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

  convertToAdjListArray() {
    const get_keys = this.adjList.keys();
    let adjL = [];
    for (let i of get_keys) {
      let get_values = this.adjList.get(i);
      let temp = [];
      //iterate over the adjacency list concatenate the values into a string
      for (let j of get_values) {
        if (/[a-zA-Z]/.test(j)) {
          temp.push(letters.indexOf(j));
        } else {
          temp.push(parseInt(j));
        }
      }
      adjL.push(temp);
    }
    return adjL;
  }
}

export { Graph };
