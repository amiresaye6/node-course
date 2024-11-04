const express = require("express")
require("dotenv").config()
const morgan = require("morgan")

const homeRouter = require('./routes/home.routes')
const productsRouter = require('./routes/products.routes')


// init and middlewares
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", 'ejs')
app.use(express.static('assets'))
app.use(express.static('images'))

if(process.env.Environment === 'dev') {
    app.use(morgan('dev'))
}

app.use('/', homeRouter)
app.use('/products', productsRouter)


const port = process.env.Port || 5000

app.listen(port , () => {
    console.log(`listenning on port ${port}`);
})
