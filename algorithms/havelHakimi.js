"use strict";

//havel-hakimi
function checkIsAllZero(arr) {
  const someIsNotZero = arr.some((item) => item !== 0);
  const isAllZero = !someIsNotZero;
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
  console.log(`substractOneUpToFirstParameter: ${newArray}`);
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
    console.log(
      `esta el tempArray ordenado? ${isArrayReverseSorted(
        tempArray
      )}: ${tempArray}`
    );
    tempArray = sortArrayDescendingOrder(tempArray);
  }

  arrayFinal.push(tempArray);

  //step 4
  if (tempArray.includes(-1)) {
    let lastValue = [-1];
    arrayFinal.push(lastValue);
    console.log(`secuencia NO grafica  ==> ${lastValue} `);
    console.log(arrayFinal);
    console.log(`${n} times executed`);
    normalizeArray(arrayFinal);
    arrayFinal = [];
    n = 0;
    return false;
  } else if (checkIsAllZero(tempArray)) {
    console.log("toda la secuencia son zeros, SI es secuencia grafica.");
    console.log(arrayFinal);
    console.log(`${n} times executed`);
    normalizeArray(arrayFinal);
    arrayFinal = [];
    n = 0;
    return true;
  }

  tempArray = [];
  //step 5
  return havelHakimi(subtractedArray);
}

export { havelHakimi };
