const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
var flash = require("connect-flash");
const setLocals = require("../middleware/setLocals");
const { bindUserWithRequest } = require("../middleware/authMiddleware");

const store = new MongoDBStore({
    uri: process.env.MONGODB_URI,
    collection: "sessions",
    expires: 60 * 1000 * 60,
});

const middleware = [
    express.json(),
    express.urlencoded({ extended: true }),
    express.static("public"),
    session({
        secret: process.env.SECRET_KEY || "secret key",
        resave: false,
        saveUninitialized: false,
        // cookie: {
        //     maxAge: 60 * 60 * 2 * 1000
        // },
        store,
    }),
    bindUserWithRequest,
    flash(),
    setLocals,
];

module.exports = (app) => middleware.forEach((m) => app.use(m));
