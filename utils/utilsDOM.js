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
  if (id === "dijkstra" || id === "dfs") {
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
    divOrigin.classList.add(`${id}`);
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
          createTableInputHavelHakimi(nVertices);
          const pFootnote = document.createElement("p");
          pFootnote.classList.add("pFootnote");
          pFootnote.innerHTML = "* empty inputs are interpreted as 0 value";
          const dataEntry = document.querySelector(".dataEntry");
          dataEntry.append(pFootnote, bAlgorithm);
        } else if (algorithm === "floyd" || algorithm === "dijkstra") {
          createAdjacencyMatrix(nVertices);
          const pFootnote = document.createElement("p");
          pFootnote.classList.add("pFootnote");
          pFootnote.innerHTML =
            "* empty inputs are interpreted as infinite value or no connection";
          const dataEntry = document.querySelector(".dataEntry");
          dataEntry.append(pFootnote, bAlgorithm);
          //tables with adjacency list
        } else if (algorithm === "dfs") {
          createAdjacencyList(nVertices);
          const pFootnote = document.createElement("p");
          pFootnote.classList.add("pFootnote");
          pFootnote.innerHTML =
            "* select the connection between the different vertices.";
          const dataEntry = document.querySelector(".dataEntry");
          dataEntry.append(pFootnote, bAlgorithm);
        }
      }
    } else {
      deleteError();
      printError(`Please insert a valid number of vertices [2-${maxVertices}]`);
    }
  });

  const dataEntry = document.querySelector(".dataEntry");
  dataEntry.append(pSizeMatrix, inputSizeMatrix, bSizeMatrix, br);
}

function createTableInputHavelHakimi(size) {
  //create table
  const table = document.createElement("table");
  table.classList.add("empty");
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
  } /*else if (table.className === "result") {
    const solution = document.querySelector(".solution");
    solution.appendChild(table);
  }*/
}

function createTableResultHavelHakimi(vertices, arr) {
  //create table
  const table = document.createElement("table");
  table.classList.add("result");
  const vertexs = document.createElement("tr");
  const theaderEmpty = document.createElement("th");
  //vertexs
  for (let i = 0; i <= vertices - 1; i++) {
    let tv = document.createElement("th");
    tv.innerHTML = letters[i];
    vertexs.appendChild(tv);
  }
  //row
  for (let i = 0; i <= arr.length - 1; i++) {
    let th = document.createElement("th");
    let tr = document.createElement("tr");
    tr.appendChild(th);
    //column
    for (let j = 0; j <= arr[i].length - 1; j++) {
      let td = document.createElement("td");
      let input = document.createElement("input");
      if (arr.length !== 0) {
        input.disabled = true;
        if (arr[i][j] === "") {
          input.value = "";
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
    const solution = document.querySelector(".solution");
    solution.appendChild(table);
  }
}

function createTableDijkstra(arr, src) {
  // to loop vertically through a 2d array
  let j = 0;
  while (j < arr[0].length) {
    for (let i = 0; i < arr.length; i++) {
      if (i !== 0) {
        if (j === src) {
          arr[i][j][1] = src;
        } else if (arr[i][j][1] === 0) {
          arr[i][j][1] = arr[i - 1][j][1];
        }
      } else {
        arr[i][j][1] = src;
      }
    }
    j++;
  }

  let z = 0;
  // change numbers for letters
  while (z < arr[0].length) {
    for (let i = 0; i < arr.length; i++) {
      arr[i][z][1] = letters[arr[i][z][1]];
    }
    z++;
  }
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
  for (let i = 0; i <= arr.length - 1; i++) {
    let th = document.createElement("th");
    th.innerHTML = " ";
    let tv = document.createElement("th");
    tv.innerHTML = letters[i];
    vertexs.appendChild(tv);

    let tr = document.createElement("tr");
    tr.appendChild(th);
    //column
    for (let j = 0; j <= arr[i].length - 1; j++) {
      let td = document.createElement("td");
      let input = document.createElement("input");
      if (arr.length !== 0) {
        input.disabled = true;
        input.setAttribute("type", "text");
        if (arr[i][j][0] === "Infinity") {
          input.value = `∞,${arr[i][j][1]}`;
        } else {
          input.value = `${arr[i][j][0]},${arr[i][j][1]}`;
        }
      }
      td.appendChild(input);
      tr.appendChild(td);
    }
    vertexs.insertBefore(theaderEmpty, vertexs.firstChild);
    table.appendChild(tr);
    table.insertBefore(vertexs, table.firstChild);
  }

  const dataEntry = document.querySelector(".dataEntry");
  if (table.className === "empty") {
    dataEntry.appendChild(table);
  } else if (table.className === "result") {
    const solution = document.querySelector(".solution");
    solution.appendChild(table);
  }
  // A B C D ....
  // create new Row with letters and put firstElement table 'result'
  let tableResult = document.querySelector("table.result");
  let trTableResult = tableResult.firstChild;
  let thArrayTrTableReslult = trTableResult.querySelectorAll("th");
  for (let i = 0; i <= arr.length; i++) {
    thArrayTrTableReslult[i].innerHTML = letters[i];
  }

  const newTh = document.createElement("th");
  newTh.innerHTML = " ";
  trTableResult.insertBefore(newTh, trTableResult.firstChild);
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

//sort adjacencyListVertexs
function sortAdjacencyListVertexs(arr) {
  const finalArray = [];
  let rowArray = [];
  let newFirstLetter = 0;
  let newRang = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = newFirstLetter; j < arr.length; j++) {
      rowArray.push(arr[j]);
    }
    newRang = arr.length - (arr.length - newFirstLetter);
    for (let z = 0; z < newRang; z++) {
      rowArray.push(arr[z]);
    }
    let temp = rowArray.splice(1, rowArray.length);
    temp.sort();
    rowArray = rowArray.concat(temp);
    finalArray.push(rowArray);
    newFirstLetter++;
    rowArray = [];
  }
  return finalArray;
}

function createAdjacencyList(size) {
  const selectedVertexs = letters.slice(0, size);
  const vertexsArray = sortAdjacencyListVertexs(selectedVertexs);
  const table = document.createElement("table");
  table.classList.add("empty");
  for (let i = 0; i <= size - 1; i++) {
    let tr = document.createElement("tr");
    //column
    for (let j = 0; j <= size - 1; j++) {
      let td = document.createElement("th");

      if (j !== 0) {
        td = document.createElement("td");
        let badjList = document.createElement("button");
        badjList.classList.add("badjList");
        badjList.innerText = vertexsArray[i][j];
        badjList.addEventListener("click", function () {
          this.classList.contains("picked")
            ? this.classList.remove("picked")
            : this.classList.add("picked");
          let parent = this.parentElement.parentElement.firstChild.innerHTML;
          let rows = document.querySelectorAll("tr ");
          for (let i = 0; i < rows.length; i++) {
            let rowTh = rows[i].querySelector("th");
            if (rowTh.innerHTML === this.innerHTML) {
              let buttonsInARow = rows[i].querySelectorAll("td button");
              buttonsInARow.forEach((b) => {
                if (b.innerHTML === parent) {
                  b.classList.contains("picked")
                    ? b.classList.remove("picked")
                    : b.classList.add("picked");
                }
              });
            }
          }
        });
        if (j !== size) {
          let p = document.createElement("p");
          p.classList.add("nobr");
          p.innerText = " -> ";
          td.appendChild(badjList);
          td.appendChild(p);
        }
        td.appendChild(badjList);
      } else {
        td.innerHTML = vertexsArray[i][j];
      }
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  const pTitle = document.createElement("p");
  pTitle.innerHTML = "ADJACENCY LIST";

  const dataEntry = document.querySelector(".dataEntry");
  dataEntry.appendChild(pTitle);
  dataEntry.appendChild(table);
}

function readDataTableMatrix(size) {
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

function readDataTableAdjList(size) {
  const trs = document.querySelectorAll("table tr");
  const adjList = new Map();
  for (let i = 0; i < size; i++) {
    adjList.set(letters[i], []);
  }
  for (let i = 0; i < trs.length; i++) {
    let buttonsRow = trs[i].querySelectorAll("td button");
    for (let j = 0; j < buttonsRow.length; j++) {
      //
      if (buttonsRow[j].classList.contains("picked")) {
        adjList.get(letters[i]).push(buttonsRow[j].innerHTML);
      }
    }
  }
  return adjList;
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
    const br = document.querySelector("br");
    for (let i = 0; i <= 3; i++) {
      br.nextElementSibling.remove();
    }
    emptyTable.remove();
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
  const idButtons = [
    "havel-hakimi",
    "floyd",
    "dijkstra",
    "dfs",
    "clearContent",
  ];
  const sections = ["dataEntry", "solution", "footer"]; //nav
  const nav = document.createElement("nav");
  for (let id of idButtons) {
    let newButton = document.createElement("button");
    newButton.id = id;
    if (id === "clearContent") {
      id = "clear";
    }
    newButton.innerText = id;

    if (newButton.id === "dfs") {
      newButton.classList.add("uppercase");
    } else {
      newButton.classList.add("capitalize");
    }
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

function printMessageSolution(message) {
  const solution = document.querySelector(".solution");
  const msolution = document.createElement("p");
  msolution.classList.add("mSolution");
  msolution.innerHTML = message;
  solution.appendChild(msolution);
}
export {
  makeButtonAlgorithm,
  numVertices,
  createTableDijkstra,
  createAdjacencyMatrix,
  readDataTableMatrix,
  readDataTableAdjList,
  readHavelHakimiTable,
  deleteTemporalTable,
  deleteResultTable,
  printError,
  deleteError,
  principalButtonsAnimation,
  secondaryButtonsAnimation,
  createStructure,
  printMessageSolution,
  letters,
  createTableResultHavelHakimi,
};
