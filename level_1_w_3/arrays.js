// JavaScript Higher Order Functions & Arrays


const data = [
    {
        name: "company name",
        category: "company category",
        start: 1960,
        end: 2020
    },
    {
        name: "company name",
        category: "botato",
        start: 1960,
        end: 2020
    },
    {
        name: "company name",
        category: "company category",
        start: 1960,
        end: 2020
    },
    {
        name: "company name",
        category: "company category",
        start: 1960,
        end: 2020
    },
    {
        name: "company name",
        category: "company category",
        start: 1960,
        end: 2020
    },
    {
        name: "company name",
        category: "company category",
        start: 1988,
        end: 2021
    },
]


// first with for loop
for (let i = 0; i < data.length; i++) {
    console.log(data[i].name)
}

// with foreach

data.forEach(company => {
    console.log(company.name)
})


// filter
const ages = [10, 35, 90, 19, 81, 91, 50, 13, 14]

let oldEnough = []
for (let i = 0; i < ages.length; i++) {
    if (ages[i] > 20) {
        oldEnough.push(ages[i]);
    }
}

console.log(oldEnough);

const oldEonoughFilter = ages.filter(age => {
    if (age > 21) {
        return true;
    }
})

// the same AS

const newAges = ages.filter(age => age >= 20);

console.log(oldEonoughFilter);


const botato = data.filter(company => company.category === "botato");
console.log(botato);

const earlyComanies = data.filter(company => company.end <= 2020 && company.start >= 1960);
console.log(earlyComanies);


// map :>> creats a new array

const companyNames = data.map(company => company.name);
console.log(companyNames);

const details = data.map((company, index) => `[${index}] - ${company.name} started at ${company.start} and ends at ${company.end}`);
console.log(details);

// sort

// const sortedCompanies = data.sort((c1, c2) => {
//     if (c1.start > c2.start) {
//         return 1
//     } else {
//         return -1
//     }
// })

const sortedCompanies = data.sort((a, b) => a.start > b.start ? 1 : -1);
const sortedCompaniesA = data.sort((a, b) => a.start - b.start); // assending
const sortedCompaniesD = data.sort((a, b) => b.start - a.start); // descending
console.log(sortedCompanies, sortedCompaniesA, sortedCompaniesD)

// reduce
//                           the total, iterator,          inint value
const totalAges = ages.reduce((total, age) => total + age, 0);
console.log(totalAges)


console.log(data.reduce((total, company) => total + (company.end - company.start), 0));

// compine methods

const combine = ages
    .map(age => age * 2)
    .filter(age => age > 40)
    .sort((a, b) => a - b)
    .reduce((total, age) => total + age, 0);

console.log(combine)
