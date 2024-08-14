/**
 * Given an unsorted array of integers, find the length of the longest consecutive elements sequence.
 * Input: arr=[100, 4, 200, 1, 3, 2]
 * Output:[1,2,3,4]
 */

/**
 * @param {Array} arr
 * @return {number}
 */

function longestConsecutiveSequence(arr) {
  if (arr.length === 0) return 0;

  // Sort the array
  arr.sort((a, b) => a - b);

  let maxStreak = 1;
  let currentStreak = 1;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] !== arr[i - 1]) {
      if (arr[i] === arr[i - 1] + 1) {
        // If the current number is consecutive
        currentStreak++;
      } else {
        // Reset the streak count
        maxStreak = Math.max(maxStreak, currentStreak);
        currentStreak = 1;
      }
    }
  }
  return Math.max(maxStreak, currentStreak);
}

module.exports = { longestConsecutiveSequence };
