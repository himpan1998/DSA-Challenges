/**
 * Reverses the given string.
 *
 * @param {string} str - The string to reverse.
 * @returns {string} - The reversed string.
 */
function reverseString(str) {
  return str.split("").reverse().join("");
}

module.exports = { reverseString };
