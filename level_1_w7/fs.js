import * as fs from 'node:fs';

// read files synchronously >> blocking code
const data = fs.readFileSync("./text.txt", "utf8")
console.log(data)



// read files async >> blocking code

console.log("first");

fs.readFile("./text.txt", 'utf-8', (err, data) => {
    if (err) {
        console.log("error while reading ", err);
        
    } else {
        console.log(data);
    }
})


console.log("second");


// so you have the blocking >> sync version of each functin and the non blocking >> async one
// ex >> readFileSync, readFile

// Write to a file
// it will overwrite not append
fs.writeFile("text.txt", "data written from  index.js", 'utf8', (err, data) => {
    err? console.log("error while writing to text.txt file", err) : console.log("done");
})


// append to the end of a file

fs.appendFile("text.txt", 'appended text from index.js', 'utf8', (err, data) => err? console.log(err) : console.log("done"))

console.log(fs.readFileSync('text.txt', 'utf8'));

// delete file

// creat a new file then we will delete it
fs.writeFile('newFile.json', JSON.stringify([{name: "amir", age: 22}]), 'utf8', (err, data) => err? console.log(err) : console.log("done"))


fs.unlink('newFile.json', (err, data) => err? console.log(err) : console.log("done deleting"))


// streams to deal with larg files es: 1Gb file or video

// they devide the file into chunks and read them one by one

// there is two types of streams >> readable, writable


const rStream = fs.createReadStream('./text.txt', 'utf-8');
const wStream = fs.createWriteStream('./stream.txt', 'utf-8')

rStream.on('data', chunk => {

    console.log("chunk  ", chunk)
    wStream.write("\n+++++++chunk+++++++++\n")
    wStream.write(chunk)
})
