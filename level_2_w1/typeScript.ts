// definning types in typescript

// variable: dataType

const func = (param: string) => {
    // param here must be passed as a string
    console.log(param);
}

// if i passed any value but the string, it will rais an error


// arrays

// the datatypes in the array at the start will be the only values that are allawable

let names = ["amir", "alsayed", "abdulsame"]

names.push("botato")
// names.push(true) // this will rais an error

let rand = ["amir", true, 10]
rand.push("alsayed")
rand.push(false)
rand.push(50)

// objects

let obj = {
    name: "amir",
    email: "amiralsayed@gmail.cm",
    age: 22
}

// in objects we can not change the data type of each properity once i declard it

// so i cant set name with 52  or false

// obj.name = 50;
obj.name = "amiralsayed"

// we can not add any additional properites too to the obj object

// this will rais an error becaseu email is missig and the sasme will hapen if i add new value
// obj = {
//     name: 'any',
//     age: 222
// }


// declaring types

// normal variables

let myName: string;
let myAge: number;

let loggedIn: boolean;

// arrays
// array of strings

let strArray: string[] = []; // init an empty string array

strArray.push("botato", "amir")

// mixed types in a string
// using union type
let mixedArray: (string | boolean | number)[] = [];

mixedArray.push("amir", "alsayed", true, 50);


let mixedVar: string | number;

mixedVar = "123"
mixedVar = 123


// objects

let objj: object;
// or

let objjj: {
    name: string,
    aga: number,
    email: string,
    isOnline: boolean
}


// any type

let amir: any = 'amir'
amir = true;

let anyarray: any[] = []

anyarray.push("amir", true, 15, 155.2)

let anyObj: {
    name: any,
    age: any
}

// declaring function type usint Function data type

let funcc: Function;

// funcc = (data: any) => {
//     console.log(data);
// }

// adding obtional parameters using "?" character

funcc = (data: string, name: string, obt?: number | boolean) => {
    console.log(data, name, obt ? obt : null);

}

funcc("amir", 52, true)


// to determine the return data type of a func

const funccc = (arg: number): number => {

    return arg ** 2
}

// definning our own types a.k.a aliasing

type myNewType = string | number;

let strOrNum: myNewType = 10;


type myObjType = {
    name: any,
    age: string | number,
    isOnline: boolean
}


// function signature
let greet: (a: string, b: boolean) => void;

// lets use it now 

greet = (name: string, greetHim: boolean) => {
    console.log(`hi ${name}` && greetHim);
    
}

let calc: (num: number, num2: number, action: string) => number | string;


calc = (firstNumber: number, secondNumber: number, arg: string) => {
    return arg === "add" ? firstNumber + secondNumber : arg === "sub" ? firstNumber - secondNumber : "not allowed"
}

