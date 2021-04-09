const userModel = require("../models/User");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const errorValiatorFormatter = require("../utils/errorValiatorFormatter");
const Flash = require("../utils/Flash");

exports.signupGetController = function (req, res, next) {
    res.render("pages/auth/signup", {
        title: "Create a new Account",
        error: {},
        value: {},
        message: Flash.getMessage(req),
    });
};

exports.signupPostController = async (req, res, next) => {
    const { username, email, password, confirmPassword } = req.body;
    const error = validationResult(req);
    const errorResult = error.formatWith(errorValiatorFormatter);
    if (!errorResult.isEmpty()) {
        return res.render("pages/auth/signup", {
            title: "Create a new Account",
            error: errorResult.mapped(),
            value: {
                username,
                email,
                password,
            },
            message: Flash.getMessage(req),
        });
    }
    try {
        const userName = await userModel.findOne({ username });
        if (userName) {
            req.flash("fail", "Username already in use");
            return res.render("pages/auth/signup", {
                title: "Create a new Account",
                error: errorResult.mapped(),
                value: {
                    username,
                    email,
                    password,
                },
                message: Flash.getMessage(req),
            });
        }
    } catch (e) {
        next(e);
    }

    try {
        const userEmail = await userModel.findOne({ email });
        if (userEmail) {
            req.flash("fail", "E-mail already in use");
            return res.render("pages/auth/signup", {
                title: "Create a new Account",
                error: errorResult.mapped(),
                value: {
                    username,
                    email,
                    password,
                },
                message: Flash.getMessage(req),
            });
        }
    } catch (e) {
        next(e);
    }

    try {
        if (confirmPassword !== req.body.password) {
            req.flash("fail", "Password doesn't match");
            return res.render("pages/auth/signup", {
                title: "Create a new Account",
                error: errorResult.mapped(),
                value: {
                    username,
                    email,
                    password,
                },
                message: Flash.getMessage(req),
            });
        }
    } catch (e) {
        next(e);
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 11);
        const user = new userModel({
            username,
            email,
            password: hashedPassword,
        });
        try {
            await user.save();
            req.flash("success", "Your Registration is Successful");
            res.render("pages/auth/login", {
                title: "Login page",
                error: {},
                message: Flash.getMessage(req),
            });
        } catch (e) {
            next(e);
        }
    } catch (e) {
        next(e);
    }
};

exports.loginGetController = (req, res, next) => {
    res.render("pages/auth/login", {
        title: "Login",
        error: {},
        message: Flash.getMessage(req),
    });
};

exports.loginPostController = async (req, res, next) => {
    const { email, password } = req.body;
    const error = validationResult(req);
    const errorResult = error.formatWith(errorValiatorFormatter);
    if (!errorResult.isEmpty()) {
        return res.render("pages/auth/login", {
            title: "Login",
            error: errorResult.mapped(),
            message: Flash.getMessage(req),
        });
    }
    try {
        var user = await userModel.findOne({ email });
        if (!user) {
            req.flash("fail", "Invalid Credentials");
            res.locals.message = Flash.getMessage(req);
            return res.render("pages/auth/login", {
                title: "Login",
                error: {},
                // message: Flash.getMessage(req),
            });
        }
    } catch (e) {
        return next(e);
    }

    try {
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            req.flash("fail", "Invalid Credentials");
            res.locals.message = Flash.getMessage(req);
            return res.render("pages/auth/login", {
                title: "Login",
                error: {},
                // message: Flash.getMessage(req),
            });
        }
    } catch (e) {
        return next(e);
    }
    req.session.isLoggedIn = true;
    req.session.user = user;
    req.session.save((err) => {
        if (err) {
            return next(err);
        }
    });
    req.flash("success", "Successfully logged in");
    res.redirect("../dashboard");
};

exports.logoutController = (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            return next(err);
        }
        return res.redirect("/auth/login");
    });
};
