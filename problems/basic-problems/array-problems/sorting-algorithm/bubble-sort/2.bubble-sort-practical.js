let arr = [15, 16, 6, 8, 5, 9];

/***
 * common Approach
 */
function bubbleSortArray(arr) {
  let n = arr.length;
  for (i = 0; i < n - 1; i++) {
    for (j = 0; j < n - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

// console.log(bubbleSortArray(arr));

/***
 * This approach will avoid unnecessary comparision better than above code
 * in innner loop do some modification n-1-i , will reduce comparision...more optimize then above code
 */

function bubbleSortArray(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (j = 0; j < n - 1 - i; j++) {
      if (arr[j > arr[j + 1]]) {
        temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

// console.log(bubbleSortArray(arr));

/***
 * Optimized bubble sort
 */

let newArr = [16, 14, 5, 6, 8];

function optimizedBubbleSort(arr) {
  let n = arr.length;
  for (i = 0; i < n - 1; i++) {
    let flag = 0;
    for (j = 0; j < n - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        flag = 1;
      }
    }
    if (flag === 0) {
      break;
    }
  }
  return arr;
}

// console.log(optimizedBubbleSort(newArr));

/**
 * Time Complexity:
 * Best Case : if array is already sorted : O(n)
 * Average case: (n-1)*(n-1) : O(n^2)
 * Worst case: (n-1)*(n-1) : O(n^2)
 */
