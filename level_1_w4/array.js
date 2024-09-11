const { copyFileSync } = require("fs");

console.log(Array.from("amir alsayed"));
// [
//     'a', 'm', 'i', 'r',
//     ' ', 'a', 'l', 's',
//     'a', 'y', 'e', 'd'
// ]
console.log(Array.from("21348678913"));
// [
//     '2', '1', '3', '4',
//     '8', '6', '7', '8',
//     '9', '1', '3'
// ]
console.log(Array.from(46743466));
// []


// implement map function on it
//      convert string to itrable            convert str into num
console.log(Array.from("1234867897164", num => +num + +num));

let arr = [1, 2, 3, 4, 5, 5, 7, 8, 2, 5, 58, 1, 5, 5, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

// leave only unique numbers
let setArr = new Set(arr);
// it returns it as a set and we want it as an array
console.log(setArr)


// convert the set into array

const newArr = Array.from(setArr)
console.log(newArr)


// the same solutin can be done like so
console.log([...new Set(arr)])


// =========================================================

let myArray = [10, 20, 30, 40, 50, "A", "B"]

// myArray.copyWithin(3)
// [
//     10, 20, 30, 10,
//     20, 30, 40
// ]

// myArray.copyWithin(4, 6)
// [
//     10, 20, 30, 40,
//     'B', 'A', 'B'
// ]

// myArray.copyWithin(1, -2)
// [
//     10, 'A', 'B', 40,
//     50, 'A', 'B'
// ]

myArray.copyWithin(1, -2, -1)
// [
//     10, 'A', 30, 40,
//     50, 'A', 'B'
// ]

console.log(myArray)

// array methods

// some

let numss = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// let check = nums.some(e => e > 5)
// console.log(check) // true

// check range

let range = {
    min: 10,
    max: 20
}

let rangeChicker = numss.some(function (e) {
    return e >= this.min && e <= this.max
}, range);
console.log(rangeChicker)


// every

const location = {
    50: "place 1",
    30: "place 3",
    20: "place 2",
    40: "place 4"
}

let mainLocation = 15

let locationArray = Object.keys(location) // array of strings
console.log(locationArray)
locationArray = locationArray.map(num => parseInt(num))
console.log(locationArray)

//check if all locations greater than mainlocation

let res = locationArray.every(function (num) {
    return num > this
}, mainLocation);
console.log(res)

// all in one line

let newNumsArray = Object.keys(location).map(e => +e).every(function (e) {
    return e > this
}, mainLocation);
console.log(newNumsArray)
