"use strict";
import { createAdjacencyMatrix } from "../utils/utilsDOM.js";

//floyd https://www.geeksforgeeks.org/floyd-warshall-algorithm-dp-16/
function floyd(arr) {
  console.time("floyd");
  let finalArray = [...arr];
  let count = 0;
  let numberOfOperations = 0;
  let valuesInMatrix = 0;
  for (let k = 0; k < arr.length; k++) {
    console.log(`------------- matrix nº ${k} -------------`);
    let tempOPS = [];
    let tempMatrix = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        count++;
        if (arr[i][k] + arr[k][j] < arr[i][j]) {
          finalArray[i][j] = arr[i][k] + arr[k][j]; // workaround if you remove this line it doesn't work
          tempOPS.push(arr[i][k] + arr[k][j]);
        } else {
          tempOPS.push(arr[i][j]);
        }
        numberOfOperations++;
        valuesInMatrix++;
        if (numberOfOperations === arr.length) {
          tempMatrix.push(tempOPS);
          tempOPS = [];
          numberOfOperations = 0;
        }
        if (valuesInMatrix === arr.length * arr.length) {
          console.log(tempMatrix);
          createAdjacencyMatrix(arr.length, tempMatrix);
          tempMatrix = [];
          valuesInMatrix = 0;
        }
      }
    }
  }

  console.log(`number of iterations: ${count}`);
  console.timeEnd("floyd");
}

export { floyd };
