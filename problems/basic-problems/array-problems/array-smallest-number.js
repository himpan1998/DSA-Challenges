/**
 * Write a function that takes an array and return the smallest numbers.
 * Input: numbers= [2,3,4,1,5,8,9]
 * Output :1
 */

/**
 * Finds and returns the smallest number in an array of numbers.
 *
 * @param {Array<number>} numbers - The array of numbers to search through.
 * @returns {number} - The smallest number found in the array.
 */

function arraySmallestNumber(numbers) {
  let smallest = numbers[0];
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] < smallest) {
      smallest = numbers[i];
    }
  }
  return smallest;
}

module.exports = { arraySmallestNumber };
