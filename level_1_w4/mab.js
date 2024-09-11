let mabUser = { name: "amir" }
let myMap = new Map();

myMap.set(mabUser, "object value")
console.log(myMap)

// weak map means that once the key is no longer accessable, the grbage collector will remove it


let myWeakMap = new WeakMap();

myWeakMap.set({obj: "value"}, "object value")
console.log(myWeakMap)
let refObj = {Name: "amir"}
myWeakMap.set(refObj, "object value")
console.log(myWeakMap)
refObj = null;
console.log(myWeakMap)
