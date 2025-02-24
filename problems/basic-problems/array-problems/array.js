//create a new array: The new Array() constructor creates an Array object.
const cars = new Array("BMW", "Volvo", "Saab", "Ford", "Fiat", "Audi");
// console.log(typeof cars);

// at
let car = cars.at(0);
console.log("car:", car);

// concat
let cars2 = cars.concat("Honda");
console.log("cars2:", cars2);

const arr = [1, 23, 4, 5, 6, 7, 8, 9, 10];
let arr1 = arr.concat(11, 12, 13, 14, 15);
console.log(arr1);
