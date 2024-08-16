/**
 * Given an array of integers, find and return the duplicate elements in the array.
 * Input : arrNum =[1, 2, 3, 4, 5, 3, 2];
 * Output : [2, 3]
 */

/**
 * Finds and returns the duplicate numbers in an array.
 *  
 * @param {Array<number>} arrNum - The array of numbers to search for duplicates.
 * @returns {Array<number>} - An array containing the duplicate numbers.
 */

function findDuplicate(arrNum) {
  let sortedArray = arrNum.slice().sort();
  let result = [];
  for (let i = 0; i < sortedArray.length - 1; i++) {
    if (sortedArray[i + 1] === sortedArray[i]) {
      result.push(sortedArray[i]);
    }
  }
  return result;
}

function findRepeatedArray(arr) {
  return arr.filter((val, index, selfArray) => {
    return selfArray.indexOf(val) !== index;
  });
}

function findRepeatedArray1(arr) {
  let result = [];
  arr.filter((val, index, selfArray) => {
    if (selfArray.indexOf(val) !== index && !result.includes(val)) {
      result.push(val);
    }
  });
  return result;
}

module.exports = {
  findDuplicate,
  findRepeatedArray,
  findRepeatedArray1,
};
