/**
 * Find the missing number for given array Input
 * Input: arr=[1,2,3,5]
 * count=10
 * Output;[4,6,7,8,9,10]
 */

/**
 * finding missing number for given array input
 * @param {number[]} arr
 * @return {number[]}
 */

function missingArrayElement(arr, count) {
  output = [];
  for (let i = 1; i <= count; i++) {
    if (!arr.includes(i)) {
      output.push(i);
    }
  }
  return output;
}

module.exports = { missingArrayElement };
