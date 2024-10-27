import { Command } from 'commander';
import fs from 'fs';

const baseUrl = "https://api.github.com/users/"


const program = new Command()

program
    .name("github repos finder")
    .description("cli to get all the repos names for a certin username and store them in <<USERNAME.txt>>")
    .version("1.0.0")

program
    .option('-n, --name <name>', 'github userName')
    .parse();


console.log(program.opts().name);

const userUrl = `${program.opts().name}/repos`


console.log(baseUrl + userUrl);


fetch(baseUrl + userUrl)
    .then(res => res.json())
    .then((data) => {
        const payload = []
        data.forEach(repo => {
            console.log(repo.name);
            payload.push(repo.name)
        });

        // console.log(payload);
        
        
        fs.writeFile("USERNAME.txt", payload.join('\n'), (err, data) => console.log("Error: ", err))
        // console.log("all done");
    })


// console.log(data);
