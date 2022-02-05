"use strict";
import { letters as letters } from "../utilsDOM/utilsDOM.js";

//havel-hakimi
function checkIsAllZero(arr) {
  let isAllZero = true;
  if (arr.length === 0) {
    isAllZero = false;
  } else {
    for (let value of arr) {
      if (value !== 0) {
        isAllZero = false;
      }
    }
  }

  return isAllZero;
}

function sortArrayDescendingOrder(array) {
  return array.sort(function (a, b) {
    return b - a;
  });
}
function subtractOneUpToFirstParameter(firstParam, array) {
  const newArray = [];
  for (var index = 0; index < array.length; index++) {
    if (index < firstParam) {
      newArray.push(array[index] - 1);
    } else {
      newArray.push(array[index]);
    }
  }
  return newArray;
}

function isArrayReverseSorted(arr) {
  let sorted = true;
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < arr[i + 1]) {
      sorted = false;
      break;
    }
  }
  return sorted;
}

let arrayFinal = [];
let n = 0;

function normalizeArray(arr) {
  const width = arr[0].length;
  for (let i = 0; i < arr.length; i++) {
    let widthInsideArray = arr[i].length;
    if (width > widthInsideArray) {
      let difference = width - widthInsideArray;
      for (let j = 0; j < difference; j++) {
        arr[i].unshift("");
      }
    }
  }
}

function createTableHavelHakimi(vertices, arr) {
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
}
//Main code
function havelHakimi(array) {
  n++;
  let tempArray = [];

  //step 1
  var sortedArray = sortArrayDescendingOrder(array);

  if (n === 1) {
    sortedArray.forEach((element) => {
      tempArray.push(element);
    });
    arrayFinal.push(tempArray);
    tempArray = [];
  }

  console.log(`sortedArray: ${sortedArray}`);

  //step 2
  var firstShiftedElement = sortedArray.shift();
  //console.log(`firstShiftedElement: ${firstShiftedElement}`);

  //step 3
  var subtractedArray = subtractOneUpToFirstParameter(
    firstShiftedElement,
    sortedArray
  );

  subtractedArray.forEach((element) => {
    tempArray.push(element);
  });

  if (!isArrayReverseSorted(tempArray)) {
    tempArray = sortArrayDescendingOrder(tempArray);
  }

  arrayFinal.push(tempArray);

  //step 4
  if (arrayFinal.length === 0 && tempArray.includes(-1)) {
    console.log(arrayFinal);
    console.log(`number of iterations: ${n}`);
    normalizeArray(arrayFinal);
    const nVertices = parseInt(document.querySelector("#nVertices").value);
    createTableHavelHakimi(nVertices, arrayFinal);
    arrayFinal = [];
    n = 0;
    return false;
  } else if (checkIsAllZero(tempArray)) {
    console.log(arrayFinal);
    console.log(`number of iterations: ${n}`);
    normalizeArray(arrayFinal);
    const nVertices = parseInt(document.querySelector("#nVertices").value);
    createTableHavelHakimi(nVertices, arrayFinal);
    arrayFinal = [];
    n = 0;
    return true;
  } else if (tempArray.length === 0) {
    console.log(arrayFinal);
    console.log(`number of iterations: ${n}`);
    arrayFinal.pop();
    normalizeArray(arrayFinal);
    const nVertices = parseInt(document.querySelector("#nVertices").value);
    createTableHavelHakimi(nVertices, arrayFinal);
    arrayFinal = [];
    n = 0;
    return false;
  }

  tempArray = [];
  //step 5
  return havelHakimi(subtractedArray);
}

export { havelHakimi };
