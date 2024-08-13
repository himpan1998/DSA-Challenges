/**
 * Given two strings, str1 and str2, determine if they are anagrams of each other.
 */

/**
 * Concept:Two strings are anagrams if:
 * they contain the same characters in the same frequencies, but in potentially different orders.
 * i.e : letters & length of the both sting str1 and str2 must be same.
 * str1.length==str2.length
 * order of letters may be different.
 * 'hello' ---> 'ellho' (Anagram)
 * Input : str1,str2
 * Output: 'hello' ---> 'ellho' (Anagram)
 */

/**
 * @param {string} str1
 * @param {string} str2
 * @return {Boolean} true or false
 */

function checkAnagram(str1, str2) {
  if(str1.length!==str2.length){
    return false
  }
//   return count(str1)
}

module.exports = { checkAnagram };
