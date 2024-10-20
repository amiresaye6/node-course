const replaceOddNumbers = (str) => {
    console.log(str.replaceAll(/\d./ig, number => number % 2 !== 0 ? "Beep" : number));
    
}

replaceOddNumbers("I have 12 cars, 11 of which are 89 years old")
