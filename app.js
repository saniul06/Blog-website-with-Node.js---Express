require("dotenv").config();

const express = require("express");

const app = express();

const setRoutes = require("./routes/routes");

const middleware = require("./middleware/middlewares");

const mongoose = require("mongoose");

const config = require("config");

const chalk = require("chalk");

//setup view engine
app.set("view engine", "ejs");
app.set("views", "views");

//Set Middlewares
middleware(app);

//Set Routes
setRoutes(app);


// Page Not Found handler
app.use((req, res, next) => {
    const error = new Error('Page not found so it is 404')
    error.status = 404;
    next(error);
});

// Defauld Error Handler
app.use((error, req, res, next) => {
    console.log(chalk.white.bgRed.bold(error))
    console.log('here i am')
    if(error.status === 404){
        res.render('pages/error/404')
    }
    // if(error.status === 500){
        res.render('pages/error/500')
    // }
})

//database connection
mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(
                chalk.white.bgGreen.bold(`I am starting at port ${process.env.PORT}`)
            );
        });
    })
    .catch((e) => {
        console.log(e);
    });
