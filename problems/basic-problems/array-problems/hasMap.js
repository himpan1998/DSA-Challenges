// create a new map
let myMap = new Map();

// Setting key-value pairs
myMap.set("name", "Alice");
myMap.set("age", 30);
myMap.set("city", "Wonderland");

// Getting a value by key
console.log(myMap.get("name")); // Output: Alice

// Checking if a key exists
console.log(myMap.has("age")); // Output: true

// Deleting a key-value pair
myMap.delete("city");

let keyValuePairs = [
  ["name", "Rohit"],
  ["age", "24"],
  ["gender", "Male"],
];

function printKeyValue() {
  keyValuePairs.forEach(([key, value]) => {
    myMap.set(key, value);
  });
}
// console.log("myMap", printKeyValue());

function deleteKey() {
  keysToDelete = ["age", "gender"];
  keysToDelete.forEach((key) => {
    myMap.delete(key);
  });
}

module.exports = {
  printKeyValue,
  deleteKey,
};
