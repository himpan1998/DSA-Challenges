let arr = [1, [2, 3], 4, 5, [6, 7, [8, [3, [2, 1], 4], 10]]];

function flatenArray(arr) {
  // console.log("arr", arr);
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      result.push(...flatenArray(arr[i]));
    } else {
      result.push(arr[i]);
    }
  }
  // console.log("result", result);
  return result;
}

// console.log(flatenArray(arr));
// console.log(flatenArray(arr));
