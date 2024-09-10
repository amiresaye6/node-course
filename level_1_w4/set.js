const myData = [1, 3, 5, 8, 9, 7, 8, 5, 6, 2, 1, 5, 9, 4, 'A']

let myUniqueData = new Set(myData);
console.log(myUniqueData);

console.log(myUniqueData.has('A'))
console.log(myUniqueData.has('a'))
console.log(myUniqueData.has('a'.toUpperCase()))

myUniqueData.add(1).add("amir").add('A')

console.log(myUniqueData.size)
console.log(myUniqueData.delete(8))
console.log(myUniqueData.has(8))
console.log(myUniqueData.has("amir"))
console.log(myUniqueData.clear)
