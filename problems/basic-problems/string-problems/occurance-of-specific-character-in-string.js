/**
 * To calculate the number of occurrences of a specific character in a string
 */

/**
 * count how many times the character appears.
 * @param {string} str
 * @param {character} char
 * @return {number}
 */

function countCharacter(str, char) {
  let count = 0;
  let strLower = str.toLowerCase();
  let charLower = char.toLowerCase();
  for (let i = 0; i < strLower.length; i++) {
    if (strLower[i] === charLower) {
      count++;
    }
  }
  return count;
}

function countCharacter2(str, char) {
  const lowerCaseStr = str.toLowerCase();
  const lowerCaseChar = char.toLowerCase();
  return lowerCaseStr.split(lowerCaseChar).length - 1;
}

module.exports = { countCharacter, countCharacter2 };
