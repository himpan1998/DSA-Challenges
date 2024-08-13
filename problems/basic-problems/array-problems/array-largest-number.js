/**
 *Write a function that takes an array and return the largest numbers:
 * Input: numbers=[5,6,2,8,9]
 * output: 8
 *
 */

/**
 * Finds and returns the largest number in an array of numbers.
 *
 * @param {Array<number>} numbers - The array of numbers to search through.
 * @returns {number} - The largest number found in the array.
 */

// Using for loop:
function arrayLargestNumber(numbers) {
  let max = 0;
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] > max) {
      max = numbers[i];
    }
  }
  return max;
}

// Using While loop:
function arrayLargestNum(numbers) {
  let i = 0;
  let max = 0;
  while (i < numbers.length) {
    if (numbers[i] > max) {
      max = numbers[i];
      i++;
    }
  }
  return max;
}

module.exports = { arrayLargestNumber, arrayLargestNum };
