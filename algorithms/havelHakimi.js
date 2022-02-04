"use strict";

//havel-hakimi

/*function removeZerosFromArray(array) {
  var filterZeros = array.filter((element) => element != 0);
  console.log(`filterZeros: ${filterZeros}`);
  return filterZeros;
}*/

function checkIsAllZero(arr) {
  const someIsNotZero = arr.some((item) => item !== 0);
  const isAllZero = !someIsNotZero;
  return isAllZero;
}

function checkIfExistMinus1(arr) {
  return arr.includes(-1);
}
function sortArrayDescendingOrder(array) {
  return array.sort(function (a, b) {
    return b - a;
  });
}

/*function checkArrayLengthLessThanFirstParameter(firstParam, array) {
  console.log(
    `checkArrayLengthLessThanFirstParameter: array:${array}, firstParam: ${firstParam}, arrayLength: ${array.length}`
  );

  return firstParam > array.length;
}*/

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

//Main code
function havelHakimi(array) {
  //console.log(`initial array: ${array}`);
  //step 1
  //var removeZeros = removeZerosFromArray(array);

  //step 2
  /*if (removeZeros.length == 0) {
    console.log(
      `removeZeros: ${removeZeros}, removeZerosLength: ${removeZeros.length}`
    );
    return true;
  }*/

  //step 3
  var sortedArray = sortArrayDescendingOrder(array);
  console.log(`sortedArray: ${sortedArray}`);

  //step 4
  var firstShiftedElement = sortedArray.shift();
  //console.log(`firstShiftedElement: ${firstShiftedElement}`);

  //step 5
  var subtractedArray = subtractOneUpToFirstParameter(
    firstShiftedElement,
    sortedArray
  );

  //step 6
  if (
    //checkArrayLengthLessThanFirstParameter(firstShiftedElement, sortedArray)
    checkIfExistMinus1(sortedArray)
  ) {
    let lastValue = -1;
    console.log(`secuencia NO grafica  ==> ${lastValue} `);
    return false;
  }

  //Check if sorted array contain all 0
  if (checkIsAllZero(sortedArray)) {
    console.log("toda la secuencia son zeros, SI es secuencia grafica.");
    return true;
  }

  //step 7
  return havelHakimi(subtractedArray);
}

export { havelHakimi };
