const Flash = require("../utils/Flash");

module.exports = (req, res, next) => {
    res.locals.message = {};
    res.locals.user = req.user;
    res.locals.isLoggedIn = req.session.isLoggedIn;
    next();
};
