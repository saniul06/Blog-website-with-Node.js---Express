const User = require("../models/User");

exports.bindUserWithRequest = async (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return next();
    }
    try {
        if (req.session.user) {
            const user = await User.findById(req.session.user._id);
            req.user = user;
        }
        next();
    } catch (e) {
        next(e);
    }
};

exports.isAuthenticated = (req, res, next) => {
    if (req.session.isLoggedIn) {
        return next();
    }
    res.redirect("/auth/login");
};

exports.isUnAuthenticated = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return next();
    }
    res.redirect("../dashboard");
};
