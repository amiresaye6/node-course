// clousers hold the value or th referance of teh data they 
// user in the future

function clickHandler(size) {
    document.body.style.fontSize = size+"px";
}

document.getElementById("exampleId").onclick = clickHandler(12);
// we invoked clickhandler function and it didnt return any thing
// so we need to return a function

function clickHandler2(size) {
    // clouser will save the size value in the inner function to user in the funture
    return () => {
        document.body.style.fontSize = size+"px";
    }
}

// now when the clickhande2 invoked it returns the innder function and then ends
// so teh size value is no longer exists right?
// wrong, the clouser saved it because we need it in the inner function later
document.getElementById("exampleId").onclick = clickHandler(12);


// so hier order functions can create and return functions which benfits of the clousers approach

