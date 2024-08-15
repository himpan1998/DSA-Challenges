/**
 *Find the first element in the array that does not repeat.
 * Input:[1, 2, 3, 4, 5, 3, 2, 2];
 * Output: 1
 */

/**
 * Finds the first element in the array that does not repeat.
 *
 * @param {Array<number>} arr - The array to search for the non-repeating element.
 * @returns {number} - The first non-repeating element in the array.
 */

function findNonRepeatedElement(arr) {
  let frequency = new Map();

  for (num of arr) {
    frequency[num] = (frequency[num] || 0) + 1;
  }

  for (num of arr) {
    if (frequency[num] === 1) {
      return num;
    }
  }
  return null;
}

module.exports = {
  findNonRepeatedElement,
};
