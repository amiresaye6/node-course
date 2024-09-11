console.log("amir")
console.log(..."amir")
console.log([..."amir"].map(e => e.toUpperCase()))


let myArr1 = [1, 2, 3]
let myArr3 = [4, 5, 6]
console.log([...myArr1, ...myArr3])

myArr1.push("amir", "alsayed")
console.log([...myArr1, ...myArr3])

let nums = [100, 200, -600, 500, 300]
console.log(Math.max(...nums))

let obj1 = {
    key1: "value1",
    key2: "value2"
}

let obj2 = {
    key3: "value3",
    key4: "value4"
}
console.log({...obj1, ...obj2})
