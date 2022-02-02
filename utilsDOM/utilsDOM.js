"use strict";

function makeButtonAlgorithm(id, functionAlgo) {
  if (id === "dijkstra") {
    const inputOrigin = document.createElement("input");
    inputOrigin.id = "origin";
    const pOrigin = document.createElement("p");
    pOrigin.classList.add("nobr");
    pOrigin.innerHTML = "Source vertex: ";
    const bAlgo = document.createElement("button");
    bAlgo.innerHTML = "OK";
    bAlgo.classList.add(`${id}`, "secondary");
    bAlgo.addEventListener("click", functionAlgo);
    const divOrigin = document.createElement("div");
    divOrigin.classList.add("dijkstra");
    divOrigin.appendChild(pOrigin);
    divOrigin.appendChild(inputOrigin);
    divOrigin.appendChild(bAlgo);
    return divOrigin;
  } else {
    const bAlgo = document.createElement("button");
    bAlgo.innerHTML = "OK";
    bAlgo.classList.add(`${id}`, "secondary");
    bAlgo.addEventListener("click", functionAlgo);
    return bAlgo;
  }
}
function sizeAdjacencyMatrix(bAlgorithm) {
  const maxVertices = 10;
  const pSizeMatrix = document.createElement("p");
  pSizeMatrix.innerHTML = `Insert number of vertices [2-${maxVertices}]:`;
  pSizeMatrix.classList.add("nobr");
  const inputSizeMatrix = document.createElement("input");
  inputSizeMatrix.id = "matrixSize";
  inputSizeMatrix.setAttribute("type", "text");
  const bSizeMatrix = document.createElement("button");
  bSizeMatrix.id = "sizeButton";
  bSizeMatrix.innerHTML = "OK";
  const br = document.createElement("br");
  bSizeMatrix.addEventListener("click", function () {
    let matrixSize = document.querySelector("#matrixSize");
    matrixSize = matrixSize.value;
    if (matrixSize > 1 && matrixSize <= maxVertices && matrixSize.length > 0) {
      deleteError();
      deleteEmptyTable();
      if (!document.querySelector(".empty")) {
        createAdjacencyMatrix(matrixSize);
        const pFootnote = document.createElement("p");
        pFootnote.classList.add("pFootnote");
        pFootnote.innerHTML =
          "* empty inputs are interpreted as infinite value or no connection";
        const wrapper = document.querySelector(".wrapper");
        wrapper.append(pFootnote, bAlgorithm);
      }
    } else {
      printError(`Please insert a valid number of vertices [2-${maxVertices}]`);
    }
  });

  const wrapper = document.querySelector(".wrapper");
  wrapper.append(pSizeMatrix, inputSizeMatrix, bSizeMatrix, br);
}

function createAdjacencyMatrix(size, arr = []) {
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
    let tr = document.createElement("tr");
    tr.appendChild(th);
    vertexs.appendChild(tv);
    //column
    for (let j = 0; j <= size - 1; j++) {
      let td = document.createElement("td");
      let input = document.createElement("input");
      if (arr.length !== 0) {
        input.disabled = true;
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
  const pTitle = document.createElement("p");
  pTitle.innerHTML = "ADJACENCY MATRIX";

  const wrapper = document.querySelector(".wrapper");
  if (table.className === "empty") {
    wrapper.appendChild(pTitle);
    wrapper.appendChild(table);
  } else if (table.className === "result") {
    const wrapper2 = document.querySelector(".wrapper2");
    wrapper2.appendChild(table);
  }
}

function readDataTable(size) {
  let arrayInputs = [];
  let newArr = [];
  const input = document.querySelectorAll("table input");
  for (let i = 0; i < input.length; i++) {
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

function deleteTemporalTable() {
  console.clear();
  const error = document.querySelector(".error");
  if (error !== null) {
    error.remove();
  }
  const wrapper = document.querySelector(".wrapper");
  while (wrapper.firstChild) {
    wrapper.removeChild(wrapper.lastChild);
  }
  const wrapper2 = document.querySelector(".wrapper2");
  while (wrapper2.firstChild) {
    wrapper2.removeChild(wrapper2.lastChild);
  }
}

function deleteResultTable() {
  console.clear();
  const wrapper2 = document.querySelector(".wrapper2");
  while (wrapper2.firstChild) {
    wrapper2.removeChild(wrapper2.lastChild);
  }
}

function deleteEmptyTable() {
  const emptyTable = document.querySelector(".empty");
  if (emptyTable !== null) {
    const pElements = document.querySelectorAll("p");
    pElements[1].remove();
    emptyTable.remove();
    pElements[2].remove();
  }
  const wrapper2 = document.querySelector(".wrapper2");
  while (wrapper2.firstChild) {
    wrapper2.removeChild(wrapper2.lastChild);
  }
}

function printError(message) {
  const error = document.querySelector(".error");
  if (error === null) {
    const pError = document.createElement("p");
    pError.classList.add("error");
    pError.innerHTML = message;
    const sizeDiv = document.querySelector("#size");
    sizeDiv.appendChild(pError);
  }
}

function deleteError() {
  const error = document.querySelector(".error");
  if (error !== null) {
    error.remove();
  }
}

export {
  makeButtonAlgorithm,
  sizeAdjacencyMatrix,
  createAdjacencyMatrix,
  readDataTable,
  deleteTemporalTable,
  deleteResultTable,
  printError,
  deleteError,
};
