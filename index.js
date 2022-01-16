"use strict";

window.onload = () => {
  main();
};

function main() {
  const sizeButton = document.querySelector("#sizeButton");
  sizeButton.addEventListener("click", function () {
    const matrixSize = document.querySelector("#matrixSize").value;
    if (matrixSize > 1 && matrixSize <= 10 && matrixSize.length > 0) {
      deletingTemporalTable();
      createMatrix(parseInt(matrixSize));
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
        const matrixArray = readTable(parseInt(matrixSize.value));
        console.log(matrixArray);
        createMatrix(parseInt(matrixSize.value), matrixArray);
      }
    }
  });
}

function createMatrix(size, arr = []) {
  const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
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
        input.value = arr[i][j];
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
    arrayInputs.push(input[i].value);
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
