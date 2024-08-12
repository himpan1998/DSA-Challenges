//Problem Statement: Write a function that takes an array and return the largest numbers:

/**
 *
 */
function arraySmallestNumber(numbers) {
  let smallest = numbers[0];
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] < smallest) {
      smallest = numbers[i];
    }
  }
  return smallest;
}

module.exports = { arraySmallestNumber };
