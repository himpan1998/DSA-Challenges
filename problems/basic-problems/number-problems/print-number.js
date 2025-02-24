/**
 * Prints the numbers from 1 to 10, each on a new line.
 */
function printNumber() {
  for (let i = 1; i <= 10; i++) {
    // console.log(i);
  }
}

// using While-loop: 1 to 20;
function printNumber1() {
  let i = 1;
  while (i <= 20) {
    // console.log(i);
    i++;
  }
}

// using do...while loop:

function printNumber2() {
  let i = 1;
  do {
    // console.log(i);
    i++;
  } while (i <= 10);
}

// Print Reverse Number 10 to 1

// Using for Loop:
function printReverseNumber() {
  for (let i = 10; i >= 1; i--) {
    // console.log(i);
  }
}

// Using While loop :
function printReverseNumber1() {
  let i = 20;
  while (i >= 1) {
    // console.log(i);
    i--;
  }
}

// do...while loop:
function printReverseNumber2() {
  let i = 20;
  do {
    // console.log(i);
    i--;
  } while (i >= 1);
}

module.exports = {
  printNumber,
  printNumber1,
  printNumber2,
  printReverseNumber,
  printReverseNumber1,
  printReverseNumber2,
};
