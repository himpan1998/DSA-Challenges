/**
 * Write a function that checks if a number is even or odd.
 * Input: num=6
 * Output : even
 * Input: num=5
 * Output : odd
 */

/**
 * Determines if a number is even or odd.
 *
 * @param {number} num - The number to check.
 * @returns {string} - Returns "even" if the number is even, and "odd" if the number is odd.
 */
const checkEvenOdd = (num) => {
  return num % 2 === 0 ? "even" : "odd";
};

module.exports = { checkEvenOdd };
