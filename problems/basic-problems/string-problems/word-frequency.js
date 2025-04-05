/**
 * @params {string} string
 * @return {object} object
 */
// Apporach: 1
function countWordFrequency(text) {
  //   console.log("text", text);
  let wordCount = {}; // Create an object to store word counts
  let words = text.split(" "); // Split the text into an array of words

  for (let i = 0; i < words.length; i++) {
    // console.log(wordCount[[words[i]]]);

    if (wordCount[words[i]]) {
      // Check if the word is already in the object
      wordCount[words[i]] += 1; // Update the count
    } else {
      wordCount[words[i]] = 1; // Insert the word with an initial count of 1
    }
  }

  return wordCount; // Return the object with word counts
}
let wordCount = countWordFrequency("hello world hello everyone");
// console.log(wordCount); // Output: { hello: 2, world: 1, everyone: 1 }

// Approach: 2
function repeationWord(str) {
  let map = new Map();
  //   console.log(map);  {}
  let arr = str.split(" ");
  //   console.log(array);  [ 'hello', 'world', 'hello', 'everyone' ]
  for (let i = 0; i < arr.length; i++) {
    if (map.has(arr[i])) {
      map.set(arr[i], map.get(arr[i]) + 1);
    } else {
      map.set(arr[i], 1);
    }
  }
  return map;
}

let text = "hello world hello everyone";
let wordMap = repeationWord(text);
console.log(wordMap); // Output: Map { 'hello' => 2, 'world' => 1, 'everyone' => 1 }

module.exports = {
  countWordFrequency,
  repeationWord,
};
