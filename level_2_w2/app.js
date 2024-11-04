const express = require('express');
const loginRoutes = require("./routes/login.routes")
const dotenv = require('dotenv')
const morgan = require('morgan')

// init and middlewares
dotenv.config({ path: './config.env' })
const app = express()

// console.log(app.env);
// console.log(process.env);
if (process.env.ENVIRONMENT === 'dev') {
    app.use(morgan('dev'))
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", 'ejs')
app.use(express.static("public"))

app.use('/', loginRoutes)


app.listen(process.env.PORT || 4000, () => {
    console.log('listenning on port 4000')
})
