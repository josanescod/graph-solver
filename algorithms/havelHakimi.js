"use strict";
import { createTableResultHavelHakimi } from "../utils/utilsDOM.js";

let arrayFinal = [];
let n = 0;

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
  for (let index = 0; index < array.length; index++) {
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

//havel-hakimi
function havelHakimi(array) {
  n++;
  let tempArray = [];

  //step 1
  let sortedArray = sortArrayDescendingOrder(array);

  if (n === 1) {
    sortedArray.forEach((element) => {
      tempArray.push(element);
    });
    arrayFinal.push(tempArray);
    tempArray = [];
  }

  console.log(`sortedArray: ${sortedArray}`);

  //step 2
  let firstShiftedElement = sortedArray.shift();
  //step 3
  let subtractedArray = subtractOneUpToFirstParameter(
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
    createTableResultHavelHakimi(nVertices, arrayFinal);
    arrayFinal = [];
    n = 0;
    return false;
  } else if (checkIsAllZero(tempArray)) {
    console.log(`sortedArray: ${tempArray}`);
    console.log(arrayFinal);
    console.log(`number of iterations: ${n}`);
    normalizeArray(arrayFinal);
    const nVertices = parseInt(document.querySelector("#nVertices").value);
    createTableResultHavelHakimi(nVertices, arrayFinal);
    arrayFinal = [];
    n = 0;
    return true;
  } else if (tempArray.length === 0) {
    console.log(arrayFinal);
    console.log(`number of iterations: ${n}`);
    arrayFinal.pop();
    normalizeArray(arrayFinal);
    const nVertices = parseInt(document.querySelector("#nVertices").value);
    createTableResultHavelHakimi(nVertices, arrayFinal);
    arrayFinal = [];
    n = 0;
    return false;
  }

  tempArray = [];
  //step 5
  return havelHakimi(subtractedArray);
}

export { havelHakimi };
