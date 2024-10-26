// to cabture wahtever passed and know its datat types

const addUid = <anyThing extends object>(obj: anyThing) => {
    return { ...obj, date: new Date().toISOString() }
}


interface Person<T> {
    name: string;
    age: number;
    data: T;
    gender: "mail" | "femail";
}


const person: Person<object> = {
    name: "amir",
    age: 22,
    data: {
        name: "amir"
    },
    gender: "mail"
}

const personTwo: Person<string> = {
    name: "amir",
    age: 22,
    data: "str",
    gender: "mail"
}

const personThree: Person<number[]> = {
    name: "amir",
    age: 22,
    data: [1, 2, 3],
    gender: "mail"
}


enum resourseType { BOOK, AUTHOR, DIRECTOR, ADMIN, AMIR}

interface newPerson {
    adminUser: resourseType;
    name: string;
    age: number;
}

const me: newPerson = {
    adminUser: resourseType.ADMIN,
    name: "amir",
    age: 22
}

// tubles

let tub: [string, string, number, boolean] = ["amir", "alsayed", 22, false];
