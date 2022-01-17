"use strict";

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
  const readButton = document.querySelector("#readButton");
  readButton.addEventListener("click", function () {
    const table = document.querySelector("table");
    const error = document.querySelector(".error");
    if (table === null || error !== null) {
      printError();
    } else {
      const result = document.querySelector(".result");
      if (result === null) {
        let size = parseInt(matrixSize.value);
        const matrixArray = readTable(size);
        console.log(matrixArray);

        createMatrix(size, matrixArray);
        //floyd
        let arrayFLoyd = floyd(matrixArray);
        console.log(arrayFLoyd);
        createMatrix(size, arrayFLoyd);
      }
    }
  });
}

function createMatrix(size, arr = []) {
  const letters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
  ];
  //create table
  const table = document.createElement("table");
  if (arr.length !== 0) {
    table.classList.add("result");
  } else {
    table.classList.add("empty");
  }
  const vertexs = document.createElement("tr");
  const theaderEmpty = document.createElement("th");
  //row
  for (let i = 0; i <= size - 1; i++) {
    let th = document.createElement("th");
    th.innerHTML = letters[i];
    let tv = document.createElement("th");
    tv.innerHTML = letters[i];
    vertexs.appendChild(tv);

    let tr = document.createElement("tr");
    tr.appendChild(th);
    vertexs.appendChild(tv);
    //column
    for (let j = 0; j <= size - 1; j++) {
      let td = document.createElement("td");
      let input = document.createElement("input");
      if (arr.length !== 0) {
        if (arr[i][j] === Infinity) {
          input.value = "∞";
        } else {
          input.value = arr[i][j];
        }
      }
      td.appendChild(input);
      tr.appendChild(td);
    }

    vertexs.insertBefore(theaderEmpty, vertexs.firstChild);
    table.appendChild(tr);
    table.insertBefore(vertexs, table.firstChild);
  }
  const wrapper = document.querySelector(".wrapper");
  if (table.className === "empty") {
    wrapper.appendChild(table);
  } else if (table.className === "result") {
    const presult = document.createElement("p");
    presult.innerHTML = "PRINT RESULT";
    const wrapper2 = document.querySelector(".wrapper2");
    wrapper2.appendChild(presult);
    wrapper2.appendChild(table);
  }
}

function readTable(size) {
  let arrayInputs = [];
  let newArr = [];
  const input = document.querySelectorAll("input");
  for (let i = 1; i < input.length; i++) {
    if (input[i].value === "-" || input[i].value === "") {
      arrayInputs.push(Infinity);
    } else {
      arrayInputs.push(parseInt(input[i].value));
    }
  }
  for (let i = 0; i < arrayInputs.length; i += size) {
    newArr.push(arrayInputs.slice(i, i + size));
  }
  return newArr;
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

function deletingTemporalTable() {
  const error = document.querySelector(".error");
  if (error !== null) {
    error.remove();
  }
  const table = document.querySelector("table");
  if (table !== null) {
    table.remove();
  }
  const tableResult = document.querySelector(".result");
  if (tableResult !== null) {
    tableResult.remove();
    const pResult = document.querySelector(".wrapper2 p");
    pResult.remove();
  }
}

//floyd   https://www.geeksforgeeks.org/floyd-warshall-algorithm-dp-16/
function floyd(arr) {
  console.time("floyd");
  //let finalArray = [...arr]; // don't work
  const clone = (items) =>
    items.map((item) => (Array.isArray(item) ? clone(item) : item)); //deep clone
  let finalArray = clone(arr);
  for (let i = 0; i < finalArray.length; i++) {
    for (let j = 0; j < finalArray.length; j++) {
      finalArray[i][j] = "0";
    }
  }
  console.log(finalArray);
  console.log(arr);
  let count = 0;
  //let numberOfOperations = arr.length * arr.length * arr.length;
  let numberOfOperations = 0;
  for (let k = 0; k < arr.length; k++) {
    console.log(`------------- matrix nº ${k} -------------`);
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        count++;
        console.log(`
        k:${k},
        i:${i},
        j:${j},
        arr[i][k]: ${arr[i][k]}, 
        arr[k][j]: ${arr[k][j]}, 
        arr[i][j]: ${arr[i][j]}
        `);

        if (arr[i][k] + arr[k][j] < arr[i][j]) {
          console.log(
            `changing values... in matrix: ${k},
            ${arr[i][j]} > ${arr[i][k]} + ${arr[k][j]}`
          );
          finalArray[i][j] = arr[i][k] + arr[k][j];
        }
        numberOfOperations++;
        console.log(`number of operations: ${numberOfOperations}`);
        if (numberOfOperations === arr.length * arr.length) {
          console.log("MATRICES???================> ", finalArray);
          numberOfOperations = 0;
        }
      }
    }
  }
  console.log(`number of iterations: ${count}`);
  console.timeEnd("floyd");
  return finalArray;
}
