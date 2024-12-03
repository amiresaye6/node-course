require("dotenv").config();
const express = require("express");
const expressLayout = require("express-ejs-layouts");
const morgan = require('morgan')


// routes import
const homeRoutes = require("./routes/home.routes");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static("public"))

// Templating Engine
app.use(expressLayout);
app.set("layout", "layout/main");
app.set("view engine", "ejs");

// middlewares
app.use(morgan("dev"));

// routes
app.use("/", homeRoutes);

app.listen(port, () => {
    console.log(`server runnin on http://localhost:${port}`);
})
