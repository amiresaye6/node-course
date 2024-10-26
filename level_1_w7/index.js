const { Command } = require('commander');
const fs = require("node:fs")
const { join } = require('path');
const program = new Command();


program
    .name("amir_courses_manager")
    .description("cli to help manage courses")
    .version("1.0.0")


program.command("add").alias("a").description("ADDING NEW COURSE")
.argument("<title>", "add course title")
.argument("<duration>", "add course duration")
.option("condition <cond>", "complete | continuing")
.action(() => {
    fs.writeFile("courses.json", JSON.stringify([{courseTitle: "params", duration: "params"}]))
})

program.parse(process.argv)


// continue the video from the minut <<01:24>>
