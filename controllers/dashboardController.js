const flash = require("../utils/Flash");
const User = require("../models/User");
const Profile = require("../models/Profile");

exports.dashboardGetController = async (req, res, next) => {
    try {
        const user = await Profile.findOne({ user: req.user._id });
        if (user) {
            res.render("pages/dashboard/dashboard", {
                title: "dashboard",
                message: flash.getMessage(req),
            });
        }
        res.redirect("/dashboard/create-profile");
    } catch (e) {
        next(e);
    }
};

exports.createProfileGetController = (req, res, next) => {
    res.render("pages/dashboard/create-profile", {
        title: "Create Your Profile",
        message: flash.getMessage(req),
    });
};

exports.editProfileGetController = async (req, res, next) => {
    try {
        const user = await Profile.findOne({ user: req.user_id });
        if (user) {
            res.render("pages/dashboard/edit-profile", {
                title: "Edit Your Profile",
                message: flash.getMessage(req),
            });
        }
        res.redirect("/dashboard/create-profile");
    } catch (e) {
        next(e);
    }
};

exports.editProfilePostController = (req, res, next) => {
    res.render('pages/dashboard/edit-profile')
    console.log('add console')
}

