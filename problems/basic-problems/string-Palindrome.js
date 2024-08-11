//Problem Statement: Check if a String is a Palindrome;

function isStringPalindrome(str) {
  const reverseStr = str.split("").reverse().join("");
  return str.toLowerCase() == reverseStr.toLowerCase();
}

//Problem Statement: Check if a String is a Palindrome without using build in js function;
function isStringPalindrome2(str) {
    let newStr=str.toLowerCase();
    let left=0;
    let right=newStr.length-1;
    while(left<right){
        if(newStr[left]!==newStr[right]){
            return false;
            left++;
            right--;
        }
        return true;
    }
}
module.exports = { isStringPalindrome, isStringPalindrome2 };
