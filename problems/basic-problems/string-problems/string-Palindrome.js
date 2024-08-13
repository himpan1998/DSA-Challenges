/**
 * Checks if the given string is a palindrome.
 *
 * A palindrome is a word, phrase, number, or other sequence of characters
 * that reads the same forward and backward (ignoring spaces, punctuation, and capitalization).
 *
 * @param {string} str - The string to check.
 * @returns {boolean} - Returns true if the string is a palindrome, false otherwise.
 */
function isStringPalindrome(str) {
  const reverseStr = str.split("").reverse().join("");
  return str.toLowerCase() == reverseStr.toLowerCase();
}

// without using build in js function;
function isStringPalindrome2(str) {
  let newStr = str.toLowerCase();
  let left = 0;
  let right = newStr.length - 1;
  while (left < right) {
    if (newStr[left] !== newStr[right]) return false;
    left++;
    right--;
  }
  return true;
}
module.exports = { isStringPalindrome, isStringPalindrome2 };
