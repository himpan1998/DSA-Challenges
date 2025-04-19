/**
 * Reverses the given string.
 *
 * @param {string} str - The string to reverse.
 * @returns {string} - The reversed string.
 */
function reverseString(str) {
  let result = "";
  for (let i = str.length - 1; i >= 0; i--) {
    result += str[i];
    console.log(result);
  }
  return result;
}
console.log(reverseString("hello"));

module.exports = { reverseString };
