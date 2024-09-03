/**
 * Given an array of integers, create a function that returns an object
 * where each key is a unique integer from the array,
 * and the corresponding value is the number of times that integer appears in the array.
 */

/**
 * @param {number[]} arr
 * @return {object}
 */

function countFrequencyElement(arr) {
  const frequencyCounter = {};

  for (num of arr) {
     if (frequencyCounter[num]) {
            frequencyCounter[num]++;
        } else {
            frequencyCounter[num] = 1;
        }
    }

    return frequencyCounter;
  }


module.exports = { countFrequencyElement };
