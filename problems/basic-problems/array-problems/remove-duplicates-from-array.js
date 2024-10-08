/**
 * Remove duplicate elements from an array and return the array with only unique elements.
 * Input: arr= [1, 2, 3, 4, 5, 3, 2, 2];
 * Output: [1,2,3,4,5]
 */

/**
 * Removes duplicate elements from an array and returns an array with only unique elements.
 *
 * @param {number[]} arr - The array with possible duplicate elements.
 * @returns {number[]} - An array containing only unique elements from the input array.
 */

function removeDuplicateElements(arr) {
  let removeDuplicate= new Set(arr);
  return [...removeDuplicate];
}

module.exports = {
  removeDuplicateElements,
};
