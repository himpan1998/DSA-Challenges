// Problem Statement: Write a function that takes an array and return the largest numbers:

// Using for loop:
function arrayLargestNumber(numbers) {
  let max = 0;
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] > max) {
      max = numbers[i];
    }
  }
  return max;
}

// Using While loop:
function arrayLargestNum(numbers) {
  let i = 0;
  let max = 0;
  while (i < numbers.length) {
    if (numbers[i] > max) {
      max = numbers[i];
      i++;
    }
  }
  return max;
}

module.exports = { arrayLargestNumber, arrayLargestNum };
