const express = require('express');
const mongoose = require('mongoose')
const urlRoutes = require('./routes/url.routes.js')

// init and middlewares
const app = express()
app.use(express.json());
app.set("view engine", 'ejs')
app.use(express.static("public"))

mongoose.connect("mongodb://localhost:27017/urlShortner")
    .then(() => {
        console.log("connected to the database correctly");
        app.listen(3000, () => console.log("server running on port 3000"))
    })
    .catch(err => console.log("error: ", err))

// routes
app.use('/', urlRoutes)

app.use((req, res) => {
    res.status(404).render('error')
})
