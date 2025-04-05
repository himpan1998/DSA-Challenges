/**
 *Find the common elements between two arrays.
 const arr1 = [1, 2, 3, 4, 5];
 const arr2 = [3, 4, 5, 6], 
 * Output: [3, 4, 5]
 */

/**
 * Finds the common elements between two arrays.
 *
 * @param {Array<number>} arr1 - The first array.
 * @param {Array<number>} arr2 - The second array.
 * @returns {Array<number>} - An array containing the common elements between the two input arrays.
 */

// Approach:1 : Uisng Basic Loop
function interSectionArray(arr1, arr2) {
  let commonArrayElements = [];
  for (let i = 0; i < arr1.length; i++) {
    // console.log(arr1[i]);

    for (let j = 0; j < arr2.length; j++) {
      // console.log(arr2[j]);
      if (arr1[i] === arr2[j]) {
        commonArrayElements.push(arr1[i]);
      }
    }
  }
  return commonArrayElements;
}

const common = interSectionArray([1, 2, 3, 4, 5], [3, 4, 5, 6]);
// console.log(common); // T.C : O(n*m)

//  Approach: 2  Using Build in method
function interSectionElement(arr1, arr2) {
  let commonElement = [];
  let elementSet = new Set(arr2);
  for (let i = 0; i < arr1.length; i++) {
    if (elementSet.has(arr1[i])) {
      commonElement.push(arr1[i]);
    }
  }
  return commonElement;
}

const intersection = interSectionElement([1, 2, 3, 4, 5], [3, 4, 5, 6, 7]);
// console.log(intersection); // T.C : O(n+m)

// module.exports = {
//   interSectionArray,
//   interSectionElement,
// };

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// let map = new Map();

// map.set("name", "Himanshu");
// map.set("age", 30);

// console.log(map);
// console.log(map.get("name"));
// console.log(map.get("age"));
// console.log(map.get("gender"));
// if (map.get("gender") === undefined) {
//   console.log("Tu to sixer nikla reee");
// } else {
//   console.log("Tu chakka nhi hai ree");
// }

// console.log(map.has("age"));
// console.log(map.has("gender"));
// map.delete("age");
// console.log(map.has("age"));

// Map,entries,Object

let map = new Map([
  ["product_name", "TMT"],
  ["age", 30],
  ["city", "New York"],
]);

for (let [key, value] of map) {
  // console.log("key", key);
  // console.log("value", value);
}

for (let entry of map) {
  let key = entry[0];
  let value = entry[1];
  // console.log("entry", entry);
  // console.log("key", key);
  // console.log("value", value);
}

for (let [key, value] of map) {
  // console.log([key, value]);
}

map.forEach((key, value) => {
  // console.log(`${key}:${value}`);
});

let mySet = new Set();
mySet.add(1);
mySet.add(2);
mySet.add(3);
mySet.add(3);
// console.log(mySet);
// Duplicate, will not be added
// console.log(mySet); // Output: Set { 1, 2 ,3}

// console.log(mySet.has(1)); // Output: true
// console.log(mySet.has(4)); // Output: false

mySet.delete(1);
// console.log(mySet); // Output: Set { 2 }

// const arr1 = [1, 2, 3, 4, 5];
const arr2 = [3, 4, 5, 6, 7];

// array to set conversion
const set = new Set(arr2);
// console.log(set);
// console.log(set.has(9));

let mySets = new Set([1, 2, 3, 4, 5]);
// console.log(mySets); {1,2,3,4,5}

for (let value of mySets) {
  // console.log(value);
}

mySets.forEach((value) => {
  // console.log(value);
});

let iterator = mySets.values();
console.log(iterator); // {1,2,3,4,5}

for (let value of iterator) {
  console.log(value);
}

let entries = mySets.entries();
console.log(entries);

for (let [key, value] of entries) {
  console.log(key, value);
}
