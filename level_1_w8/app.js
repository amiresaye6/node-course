// mvc stands for model, views, controllers




const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config(); // loods env variables in the .env file like the connection string
const Blog = require('./models/blogs.model')
const BlogsRouter = require('./routes/blogs.routes')

const app = express();
app.use(express.json());

// tells express where to look for the views file, but its default value is views
// app.set('views', 'myViewsFileName')
app.set("view engine", 'ejs')


// lets connnect with mongodb
mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING)
    .then(() => {
        // after connecting to the db, start listening to the server
        console.log('connected correctly to mongoDb')
        app.listen(5555, () => console.log("listening on port 5555"))
    })
    .catch(err => console.log("error: ", err))



// let's add a middleware to console some data about each request

// app.use((req, res, next) => {
//     console.log("new request made");
//     console.log("request host: ", req.hostname);
//     console.log("request path: ", req.path);
//     console.log("request method: ", req.method);
//     // res.redirect(req.path)
//     // this tells express to go to the next middleware wahtever it is
//     next();
// })



// lets user a prebuild logger backage as a middle ware called morgan
app.use(morgan('dev'))

//lets user our express middle ware to allow serve static files

// the public here is the directory name that will server static files like .png, .jpj, .css etc...
app.use(express.static("public"))

app.get('/', (req, res) => {
    // res.send("<p>Amir Alsayed</p>")
    res.render("index")
})

app.get("/home", (req, res) => {
    // serves an html file
    //          the file absolute path  the current directory we are in
    // res.sendFile("./views/home.html", {root: __dirname})

    // we will redirect to the '/'
    res.status(301).redirect('/');
})


app.get('/about', (req, res) => {
    // we can pass some data to the renderd page like so 
    res.status(200).render("about", { title: "About Adel Shakal!" })
})




app.get('/blogs/blog/:id', (req, res) => {
    const id = req.params.id;

    Blog.findById(id)
        .then(data => res.render('blog', { adelShakalQuotes: data, title: "A wise Man Once Said" }))
        .catch(err => console.log(err))
})
// how to redirect a request

app.get('/redirected', (req, res) => {
    res.redirect('/home')
})





// testing our db
app.get('/all-blogs', (req, res) => {
    Blog.find()
        .then(data => res.status(200).send(data))
        // .then(() => console.log(req))
        .catch(err => console.log("error: ", err));
})

app.get('/blogs-db', (req, res) => {
    const blog = new Blog({
        title: "adel shakal as a backend dev",
        content: "nothing so fancy, just some routes, controllers, db connection and stuff like so",
        author: "Amir Alsayed"
    })

    blog.save()
        .then(result => res.send(result))
        .catch(err => console.log('error: ', err));
})

// collab with views

app.get('/db-blogs', (req, res) => {
    Blog.find()
        .sort({ createdAt: -1 })
        .then(result => {
            res.render('blogs', { title: "blogs from mongoDb", adelShakalQuotes: result })
        })
        .catch(err => console.log('error: ', err));
})




// add router for blogs from blogs.routers.js
// middleware to user routes from a seperated file 
app.use('/blogs', BlogsRouter)




// 404 page >> middlewares


// middlewares are the code that runs on the server between receiving a request and sending
// a response
// https://www.youtube.com/watch?v=_GJKAs7A0_4&list=PL4cUxeGkcC9jsz4LDYc6kv3ymONOKxwBU&index=8

// this middle ware will fire each request that reaches this point in code
// which means sending request to any thing but the ones aupove it
app.use((req, res) => {
    // res.status(404).sendFile('./views/404.html', {root: __dirname})
    res.status(404).render('404')
})
