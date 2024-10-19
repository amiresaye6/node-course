const getUsers = async () => {
    const res = await fetch('jsonFile.json')

    if (res.status !== 200) {
        throw new Error("error: coulding fetch the url")
    }
    const data = await res.json();
    console.log(data);
    return data;
}


getUsers()
    .then(data => console.log("resolved", data))
    .catch(err => console.log(err.message))
