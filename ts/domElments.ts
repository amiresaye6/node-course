// if you use the normal way it will reais an error because the ts doesnt have any way of knowing what dome elments are in the file 

// to solve it use the "!" at the end like so


const anchor = document.querySelector("a")!;
const inn = document.querySelector("input")!;

console.log(anchor);


// or you can specify the type too

const form = document.getElementById("inputYOUrData") as HTMLFormElement;


// example

form.addEventListener('supmit', (e: Event) => {
    e.preventDefault();
    // do some data manubilation here

    console.log(inn.valueAsNumber); // this will print its value but as a number directly
})

// classes 

class User {
    name: string;
    age: number | string;
    email: string;
    isOnline: boolean = false;

    constructor(n: string, age: number | string, e: string, isOnline: boolean) {
        this.name = n;
        this.age = age;
        this.email = e;
        this.isOnline = isOnline;
    }

    format() {
        return `hi ${this.name}, and ${this.email} is online? ${this.isOnline}`
    }
}

// using class as a data type

let users: User[] = [];
// same as
let strs: string[] = [];


// another way of clreatign the fields of a class 

class Userr {
    constructor(
        public name: string,
        readonly age: number | string,
        private email: string,
        private isOnline: boolean,
    ) {}
}


//interfaces

interface isPerson {
    name: string;
    age: number;
    speak(a: string): void;
    spend(b: number): number;

}


let me: isPerson = {
    name: "amir",
    age: 22,
    speak(text) {
        console.log(text);
    },
    spend(amount) {
        console.log(amount);
        return amount
    }
}
