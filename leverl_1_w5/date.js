let date;

// first we can create a datea object by calling the instructor of the current date and time
date = new Date();



date = new Date(1164411006456)


date = new Date('2002-05-05T11:30:00+03:00')

// this will rethrn like that Wed May 01 2002 00:00:00 GMT+0300 (Eastern European Summer Time)
date = new Date(2002, 4)
//year, index of the month >> starts from 0, day, hours, minuts, seconds, millisecods

date = new Date(2002, 4, 5, 11, 30, 27, 1)

console.log(date.toString());

console.log(new Date().getFullYear());

console.log(date.getFullYear());
console.log(date.getMonth()); // will return the moths's index
console.log(date.getDate());
console.log(date.getSeconds());

date.setMinutes(10)
date.setDate(15)
console.log(date.toString());

//display and format

console.log(date.toISOString()); // 2002-05-15T08:10:27.001Z

console.log(date.toLocaleString("ar-EG")); // ١٥/٥/٢٠٠٢ ١١:١٠:٢٧ ص

console.log(date.toLocaleString("en-US")); // 5/15/2002, 11:10:27 AM

console.log(date.toLocaleString("en-AU", {
    timeZone: "America/Los_Angeles"
})); // 15/05/2002, 1:10:27 am


console.log(JSON.stringify({
    myDate: date,
})); // {"myDate":"2002-05-15T08:10:27.001Z"} retun it in the toisostring method result
