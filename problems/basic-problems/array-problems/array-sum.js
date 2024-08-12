// P.S: Write a function that take an array of numbers and return the sums.
// Input:[1,5,6,9,4];
// output: 23

// using for loop:
function arraySum(numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  return sum;
}

// using while loop:
function arraySum1(numbers) {
  let sum = 0;
  let i = 0;
  while (i < numbers.length) {
    sum += numbers[i];
    i++;
  }
  return sum;
}

// Using do...while oop:
function arraySum2(numbers) {
  let sum = 0;
  let i = 0;
  do {
    sum += numbers[i];
    i++;
  } while (i < numbers.length);
  return sum;
}
// using for...of :
function arraySum3(numbers) {
  let sum = 0;
  for (let number of numbers) {
    sum += number;
  }
  return sum;
}

// using for each  loop :

function arraySum4(numbers) {
  let sum = 0;
  numbers.forEach((ele) => {
    sum += ele;
  });
  return sum;
}

// Using for....in loop  : Less Ideal

function arraySumForIn(numbers) {
  let sum = 0;
  for (let index in numbers) {
    if (numbers.hasOwnProperty(index)) {
      sum += numbers[index];
    }
    return sum;
  }
}

// Using array.reduce:
function arraySumReduce(numbers) {
  return numbers.reduce((sum, current) => sum + current, 0);
}

// Note : for...in is generally suitable for iterating
// over object properties. For arrays, it is more efficient and
// clearer to use methods like forEach, for...of, or reduce.
module.exports = {
  arraySum,
  arraySum1,
  arraySum2,
  arraySum3,
  arraySum4,
  arraySumForIn,
  arraySumReduce,
};
