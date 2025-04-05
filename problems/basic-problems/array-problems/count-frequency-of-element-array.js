/**
 * Write a function that count how many times each element appears in the array.
 * Input: numbers = [1, 2, 3, 4, 5, 3, 2, 2];
 * Output: { '1': 1, '2': 3, '3': 2, '4': 1, '5': 1 }
 */

/**
 * Counts the frequency of each element in an array and returns an object
 * where the keys are the elements and the values are their counts.
 *
 * @param {Array<number>} numbers - The array of numbers to count.
 * @returns {Object} - An object with the frequency count of each element.
 */

function countFrequency(numbers) {
  // console.log("numbers:", numbers);
  const operations = numbers.join("-");
  // console.log("operations:", operations);
  const frequency = {};
  for (let i = 0; i < numbers.length; i++) {
    const num = numbers[i];
    frequency[num] = (frequency[num] || 0) + 1;
  }

  return frequency;
}
countFrequency([1, 2, 3, 49, 5, 3, 2, 2]);
// module.exports={countFrequency}/
