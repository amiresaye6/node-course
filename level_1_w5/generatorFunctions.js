// generator functions are functions that you  can susbend thir execution
// you can execute them and press pause, do something else and tehn come back and continue

function* generatorExample() {
    console.log("amir");

    yield 8;
    yield 9;
    yield 10;

    return 11; // << thiw will be the value wehn we reach the done condition
}


const generator = generatorExample();

console.log(generator.next());
// here we can do what we want and then we can call the next() to continu
console.log(generator.next());
console.log(generator.next());
console.log(generator.next());


for (const n of generatorExample()) {
    console.log(n);
}


function* createSquareNumbersGenerator(max) {
    let n = 0;
    console.log('start');


    while (n < max) {
        n++;
        yield n ** 2;
    }

    return console.log('end');
}


const sq = createSquareNumbersGenerator(5);


console.log(sq.next().value);
console.log(sq.next().value);
console.log(sq.next().value);
console.log(sq.next().value);
console.log(sq.next().value);
console.log(sq.next().value);
console.log(sq.next().value);
console.log(sq.next().value);


for (const n of createSquareNumbersGenerator(10)) {
    console.log(n);
}


// random picker

function* createUniqeRandomGenerator(names) {
    const available = names;
    while (available.legth !== 0) {
        const randI = Math.floor(Math.random() * available.length)
        const value = available[randI]
        available.splice(randI, 1)
        yield value;
    }
}

const names = ['amir', 'ahmed', 'mohamed', 'hamada']

const uniqueNames = createUniqeRandomGenerator(names);
for (const name of uniqueNames) {
    console.log(name);
}
