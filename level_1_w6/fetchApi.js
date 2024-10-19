fetch("jsonFile.json")
.then(data => data.json())
.then(res => console.log(res))
.catch(err => console.log("rejected", err))
