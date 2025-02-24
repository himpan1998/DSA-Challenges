const {
  checkEvenOdd,
} = require("./problems/basic-problems/number-problems/even-odd-problem");
const {
  reverseString,
} = require("./problems/basic-problems/string-problems/reverse-string");
const {
  isStringPalindrome,
  isStringPalindrome2,
} = require("./problems/basic-problems/string-problems/string-Palindrome");
const {
  printNumber,
  printNumber1,
  printNumber2,
  printReverseNumber,
  printReverseNumber1,
  printReverseNumber2,
} = require("./problems/basic-problems/number-problems/print-number");
const {
  arraySum,
  arraySum1,
  arraySum2,
  arraySum3,
  arraySum4,
  arraySumForIn,
  arraySumReduce,
} = require("./problems/basic-problems/array-problems/array-sum");
const {
  arrayLargestNumber,
  arrayLargestNum,
} = require("./problems/basic-problems/array-problems/array-largest-number");
const {
  arraySmallestNumber,
} = require("./problems/basic-problems/array-problems/array-smallest-number");
const {
  findDuplicate,
  findRepeatedArray,
  findRepeatedArray1,
} = require("./problems/basic-problems/array-problems/find-duplicate(repeated)-element-in-array");
// Execute the problems
const {
  findUniqueElements,
  findDistinctArray,
} = require("./problems/basic-problems/array-problems/distinct-element-in-array");
const {
  findNonRepeatedElement,
} = require("./problems/basic-problems/array-problems/first-non-repeating-element-in-array");

const {
  removeDuplicateElements,
} = require("./problems/basic-problems/array-problems/remove-duplicates-from-array");
const {
  missingNumberArray,
} = require("./problems/basic-problems/array-problems/missing-number-in-array");
const {
  checkAnagram,
} = require("./problems/basic-problems/string-problems/anagram-check");
const {
  countCharacter,
  countCharacter2,
} = require("./problems/basic-problems/string-problems/occurance-of-specific-character-in-string");
const {
  longestConsecutiveSequence,
} = require("./problems/intermediate-problems/array-problems/longest-consecutive-sequence");

const {
  countFrequency,
} = require("./problems/basic-problems/array-problems/count-frequency-of-element-array");
const {
  missingArrayElement,
} = require("./problems/basic-problems/array-problems/missing-number-with-count-given");
const {
  countFrequencyElement,
} = require("./problems/basic-problems/object-problems/frequency-counter");
const {
  List,
} = require("./problems/basic-problems/LinkedList/linked-list-concept");
const {
  ListLinked,
} = require("./problems/basic-problems/LinkedList/traversing-linked-list");
// Execute the problems

const { createCounter } = require("./problems/clousers");

const {
  printKeyValue,
  deleteKey,
} = require("./problems/basic-problems/array-problems/hasMap");

// console.log(outerFunction());
// console.log(reverseString("laugh"));
// console.log(isStringPalindrome("Level"));
// console.log(isStringPalindrome2("dad"));
// printNumber();
// printNumber1();
// printNumber2();
// reverseNumber();
// reverseNumber1();
// printReverseNumber();
// console.log(arraySum([1, 2, 3, 9]));
// console.log(arraySum1([1, 2, 3, 10]));
// console.log(arraySum2([1, 2, 3, 11]));
// console.log(arraySum3([1, 2, 3, 12]));
// console.log(arraySum4([1, 2, 3, 13]));
// console.log(arraySumForIn([1, 2, 3, 13]));
// console.log(arraySumReduce([1, 2, 3, 13]));
// console.log(arrayLargestNumber([1, 2, 3, 13]));
// console.log(arrayLargestNum([1, 2, 3, 19]));
// console.log(arraySmallestNumber([1, 2, 3, 19]));
// console.log(findDuplicate([1, 2, 3, 4, 5, 3, 2]));
// console.log(findRepeatedArray([1, 2, 3, 4, 5, 3, 2]));
// console.log(findRepeatedArray1([1, 2, 3, 4, 5, 3, 2,4]));
// console.log(findUniqueElements([1, 2, 3, 4, 5, 3, 2, 4]));
// console.log(findDistinctArray([1, 2, 3, 4, 5, 3, 2, 4]));
// console.log(checkAnagram("Hello","elloH"));
// console.log(countCharacter("Hello World", "l"));
// console.log(countCharacter2("Hello World", "O"));
// console.log(longestConsecutiveSequence([100, 4, 200, 1, 3, 2]));
// console.log(countFrequency([1,2,3,4,5,3,2,2]));
// console.log(findNonRepeatedElement([2,3,4,5,3,2,2]));
// console.log(removeDuplicateElements([1, 2, 3, 4, 5, 3, 2, 2]));
// console.log(missingNumberArray([1, 2, 4, 6]));
// console.log(missingArrayElement([1, 2, 3, 5], 10));
// console.log(countFrequencyElement([1,1,1, 2, 2,3,3,3, 5]));
// console.log(list);
// console.log(list);
// console.log(list);

function arrayLargestNummber(numbers) {
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
console.log(
  "--------------------------------------------------------------------------------------------------------------------------------"
);
// console.log(arrayLargestNummber([1, 2, 3, 19]));

let nestedArray = [1, [2, [3, 4], 5], 6];

function flattenArray(array) {
  let result = [];
  for (let i = 0; i < array.length; i++) {
    if (Array.isArray(array[i])) {
      result = result.concat(flattenArray(array[i]));
    } else {
      result.push(array[i]);
    }
  }
  return result;
}

console.log(flattenArray(nestedArray));

const cars = new Array("BMW", "Volvo", "Saab", "Ford", "Fiat", "Audi");
let cars2 = cars.concat("Honda");
console.log("cars2:", cars2);

const arr = [1, 23, 4, 5, 6, 7, 8, 9, 10];
let arr1 = arr.concat(11, 12, 13, 14, 15);
console.log(arr1);
