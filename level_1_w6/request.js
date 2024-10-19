const myFetch = (callBackFunction) => {
    const request = new XMLHttpRequest(); // creates the request object

    request.addEventListener("readystatechange", () => {
        console.log(request, request.readyState);
        if (request.readyState === 4 && request.status === 200) { //  when the response is done fand ok
            // console.log('holllla', request.response);
            // console.log('holllla', request.responseText);
            callBackFunction(undefined, request.responseText)
        } else if (request.readyState === 4) {
            callBackFunction('Error: could not fetch data', undefined)
        }
    })
    // setting the request objects
    request.open("GET", "https://jsonplaceholder.typicode.com/todos/")


    // requesting it now
    request.send()

}


myFetch((error, data) => {
    console.log(error, JSON.parse(data));
})


const getDataFromJsonFile = (callback) => {
    const req = new XMLHttpRequest();

    req.addEventListener("readystatechange", () => {
        if (req.readyState === 4 && req.status === 200) {
            callback(undefined, JSON.parse(req.responseText));
        } else if (req.readyState === 4) {
            callback("error fetching data from the json file", undefined);
        }
    })

    req.open("GET", 'jsonFile.json')

    req.send()
}


getDataFromJsonFile((error, data) => {
    if (error) {
        console.log(error);
    } else {
        data.forEach(element => {
            console.log("elment is ", element);
        });
    }
})


const getSomething = () => {
    return new Promise((resolve, reject) => {
        // network call here like in the myFetch for example
        resolve("all good :)")
        // reject("eorror occured :)")
    })
}

getSomething().
    then(
        data => console.log(data), //coms from the resolve
        error => console.log(error) // comes from the reject
    )


// or you can do it like so for clarity


getSomething()
    .then(data => console.log(data))
    .catch(error => console.log(error))





const getDataFromJsonFileWithPromis = () => {
    return new Promise((resolve, reject) => {
        const req = new XMLHttpRequest();

        req.addEventListener("readystatechange", () => {
            if (req.readyState === 4 && req.status === 200) {
                resolve(JSON.parse(req.responseText));
            } else if (req.readyState === 4) {
                reject("error fetching data from the json file");
            }
        })

        req.open("GET", 'jsonFile.json')

        req.send()
    })
}


getDataFromJsonFileWithPromis().then(data => console.log('promis data here', data)).catch(error => console.log(error))



// chainning promisses

getDataFromJsonFileWithPromis()
.then(data => {
    console.log(data);
    return getDataFromJsonFileWithPromis(); // this will allow us to user then after the first then we are in
})
.then(data2 => {
    console.log(data2);
    return getDataFromJsonFileWithPromis();
})
.then(data3 => console.log(data3))
.catch(error => console.log(error)) // the problem here is we do not know which promis is failing and return error

