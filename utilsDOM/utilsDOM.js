"use strict";

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
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

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

function numVertices(bAlgorithm) {
  const maxVertices = 15;
  const pSizeMatrix = document.createElement("p");
  pSizeMatrix.innerHTML = `Insert number of vertices [2-${maxVertices}]:`;
  pSizeMatrix.classList.add("nobr");
  const inputSizeMatrix = document.createElement("input");
  inputSizeMatrix.id = "nVertices";
  inputSizeMatrix.setAttribute("type", "text");
  const bSizeMatrix = document.createElement("button");
  bSizeMatrix.id = "sizeButton";
  bSizeMatrix.innerHTML = "OK";
  const br = document.createElement("br");
  bSizeMatrix.addEventListener("click", function () {
    secondaryButtonsAnimation(this, "clicked");
    let nVertices = document.querySelector("#nVertices");
    nVertices = nVertices.value;
    if (nVertices > 1 && nVertices <= maxVertices && nVertices.length > 0) {
      deleteError();
      deleteEmptyTable();

      if (!document.querySelector(".empty")) {
        const algorithm = bAlgorithm.className.split(" ")[0];
        // how to check if bAlgorithm is havel-hakimi or not, in the first case print a table 1 x n
        if (algorithm === "havel-hakimi") {
          createTable1row(nVertices);
          const pFootnote = document.createElement("p");
          pFootnote.classList.add("pFootnote");
          pFootnote.innerHTML = "* empty inputs are interpreted as 0 value";
          const dataEntry = document.querySelector(".dataEntry");
          dataEntry.append(pFootnote, bAlgorithm);
        } else {
          createAdjacencyMatrix(nVertices);
          const pFootnote = document.createElement("p");
          pFootnote.classList.add("pFootnote");
          pFootnote.innerHTML =
            "* empty inputs are interpreted as infinite value or no connection";
          const dataEntry = document.querySelector(".dataEntry");

          dataEntry.append(pFootnote, bAlgorithm);
        }
      }
    } else {
      printError(`Please insert a valid number of vertices [2-${maxVertices}]`);
    }
  });

  const dataEntry = document.querySelector(".dataEntry");
  dataEntry.append(pSizeMatrix, inputSizeMatrix, bSizeMatrix, br);
}

function createTable1row(size, arr = []) {
  //create table
  const table = document.createElement("table");
  if (arr.length !== 0) {
    table.classList.add("result");
  } else {
    table.classList.add("empty");
  }
  const vertexs = document.createElement("tr");
  const theaderEmpty = document.createElement("th");
  //vertexs
  for (let i = 0; i <= size - 1; i++) {
    let tv = document.createElement("th");
    tv.innerHTML = letters[i];
    vertexs.appendChild(tv);
  }
  //row
  for (let i = 0; i <= 1; i++) {
    let th = document.createElement("th");
    let tr = document.createElement("tr");
    tr.appendChild(th);
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
    if (i < 1) {
      table.appendChild(tr);
    }
    table.insertBefore(vertexs, table.firstChild);
  }
  const pTitle = document.createElement("p");
  pTitle.innerHTML = "DEGREE SEQUENCE";
  const dataEntry = document.querySelector(".dataEntry");
  if (table.className === "empty") {
    dataEntry.appendChild(pTitle);
    dataEntry.appendChild(table);
  } else if (table.className === "result") {
    const solution = document.querySelector(".solution");
    solution.appendChild(table);
  }
}

function createAdjacencyMatrix(size, arr = []) {
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

  const dataEntry = document.querySelector(".dataEntry");
  if (table.className === "empty") {
    dataEntry.appendChild(pTitle);
    dataEntry.appendChild(table);
  } else if (table.className === "result") {
    const solution = document.querySelector(".solution");
    solution.appendChild(table);
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

function readHavelHakimiTable(size) {
  let arrayInputs = [];
  let newArr = [];
  const input = document.querySelectorAll("table input");
  for (let i = 0; i < input.length; i++) {
    if (input[i].value === "-" || input[i].value === "") {
      arrayInputs.push(0);
    } else {
      arrayInputs.push(parseInt(input[i].value));
    }
  }
  for (let i = 0; i < arrayInputs.length; i += size) {
    newArr.push(arrayInputs.slice(i, i + size));
  }
  return newArr.flat();
}

function deleteTemporalTable() {
  console.clear();
  const error = document.querySelector(".error");
  if (error !== null) {
    error.remove();
  }
  const dataEntry = document.querySelector(".dataEntry");
  while (dataEntry.firstChild) {
    dataEntry.removeChild(dataEntry.lastChild);
  }
  const solution = document.querySelector(".solution");
  while (solution.firstChild) {
    solution.removeChild(solution.lastChild);
  }
  const bSelected = document.querySelector(".selected");
  if (bSelected !== null) {
    bSelected.classList.remove("selected");
  }
}

function deleteResultTable() {
  console.clear();
  const solution = document.querySelector(".solution");
  while (solution.firstChild) {
    solution.removeChild(solution.lastChild);
  }
}

function deleteEmptyTable() {
  const emptyTable = document.querySelector(".empty");
  if (emptyTable !== null) {
    const pElements = document.querySelectorAll("p");
    pElements[1].remove();
    emptyTable.remove();
    if (pElements[2]) {
      pElements[2].remove();
    }
  }
  const solution = document.querySelector(".solution");
  while (solution.firstChild) {
    solution.removeChild(solution.lastChild);
  }
  const origin = document.querySelector("#origin");
  if (origin !== null) {
    origin.value = "";
  }
}

function printError(message) {
  const error = document.querySelector(".error");
  if (error === null) {
    const pError = document.createElement("p");
    pError.classList.add("error");
    pError.innerHTML = message;
    const menuDiv = document.querySelector("nav");
    menuDiv.appendChild(pError);
  }
}

function deleteError() {
  const error = document.querySelector(".error");
  if (error !== null) {
    error.remove();
  }
}

function principalButtonsAnimation(button) {
  const bSelected = document.querySelector(".selected");
  if (bSelected === null) {
    button.classList.add("selected");
  } else {
    bSelected.classList.remove("selected");
    button.classList.add("selected");
  }
}

function secondaryButtonsAnimation(button, attribute) {
  const bCleared = document.querySelector(`.${attribute}`);
  if (bCleared === null) {
    button.classList.add(`${attribute}`);
    button.disabled = true;
    window.setTimeout(function () {
      button.classList.remove(`${attribute}`);
      button.disabled = false;
    }, 250);
  }
}

function footerData() {
  const date = new Date().getFullYear();
  const footerText = document.querySelector(".footerText");
  footerText.innerText = date;
}

function createStructure() {
  const idButtons = ["havel-hakimi", "floyd", "dijkstra", "clearContent"];
  const sections = ["dataEntry", "solution", "footer"]; //nav
  const nav = document.createElement("nav");
  for (let id of idButtons) {
    let newButton = document.createElement("button");
    newButton.id = id;
    if (id === "clearContent") {
      id = "clear";
    }
    newButton.innerText = id;
    newButton.classList.add("capitalize");
    nav.appendChild(newButton);
  }
  document.body.appendChild(nav);
  //sections
  for (let section of sections) {
    let newSection = document.createElement("section");
    if (section === "footer") {
      const footer = document.createElement("footer");
      newSection.classList.add("footerText");
      footer.appendChild(newSection);
      document.body.appendChild(footer);
      footerData();
    } else {
      newSection.classList.add(section);
      document.body.appendChild(newSection);
    }
  }
}

export {
  makeButtonAlgorithm,
  numVertices,
  createAdjacencyMatrix,
  readDataTable,
  readHavelHakimiTable,
  deleteTemporalTable,
  deleteResultTable,
  printError,
  deleteError,
  principalButtonsAnimation,
  secondaryButtonsAnimation,
  createStructure,
  letters,
};
