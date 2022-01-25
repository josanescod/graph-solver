"use strict";

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
    const wrapper2 = document.querySelector(".wrapper2");
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

function deletingTemporalTable() {
  const error = document.querySelector(".error");
  if (error !== null) {
    error.remove();
  }
  const table = document.querySelector("table");
  if (table !== null) {
    table.remove();
  }
  const tablesResult = document.querySelectorAll(".result");
  if (tablesResult !== null) {
    tablesResult.forEach((table) => {
      table.remove();
    });
  }
  const dijsktraButton = document.querySelector(".dijkstra");
  if (dijsktraButton !== null) {
    dijsktraButton.remove();
  }
}

export { createMatrix, readTable, deletingTemporalTable };
