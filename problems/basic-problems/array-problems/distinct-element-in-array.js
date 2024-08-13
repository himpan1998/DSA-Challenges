/**
 * Given an array of integers, find and return the unique elements in the array.
 * Input: arr = [1, 2, 3, 4, 5, 3, 2];
 * Output: [1,2, 3,4,5]
 */

/**
 * Removes duplicates from the array and returns an array of unique elements.
 * @param {Array} arr - The input array containing possible duplicate elements.
 * @returns {Array} - A new array with only unique elements.
 */

function findUniqueElements(arr) {
  return arr.filter((val, index, selfArray) => {
    return selfArray.indexOf(val) === index;
  });
}

module.exports = { findUniqueElements };
