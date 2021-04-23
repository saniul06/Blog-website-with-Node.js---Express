const Flash = require("../utils/Flash");
const User = require("../models/User");
const Profile = require("../models/Profile");
const { validationResult } = require('express-validator');
const errorFormatter = require('../utils/errorValiatorFormatter')

exports.dashboardGetController = async (req, res, next) => {
    try {
        const profile = await Profile.findOne({ user: req.user._id });
        if (profile) {
            return res.render("pages/dashboard/dashboard", {
                title: "dashboard",
                message: Flash.getMessage(req),
            });
        }
        res.redirect("/dashboard/create-profile");
    } catch (e) {
        next(e);
    }
};

exports.createProfileGetController = async (req, res, next) => {
    const profile = await Profile.findOne({ user: req.user._id })
    if (profile) {
        return res.redirect('/dashboard')
    }
    res.render("pages/dashboard/create-profile", {
        title: "Create Your Profile",
        message: Flash.getMessage(req),
        errors: {}
    });
};

exports.createProfilePostController = async (req, res, next) => {
    const { name, title, bio, website, facebook, twitter, github } = req.body;
    try {
        const user = await Profile.findOne({ user: req.user._id })
        if (user) {
            return res.redirect('/dashboard/edit-profile')
        }
        const errors = validationResult(req).formatWith(errorFormatter)
        if (!errors.isEmpty()) {
            return res.render('pages/dashboard/create-profile', {
                title: "Create your profile",
                message: Flash.getMessage(req),
                errors: errors.mapped()
            })
        }
        const profile = new Profile({
            user: req.user._id,
            name,
            title,
            bio,
            profilePic: req.user.profilePics,
            links: {
                website,
                facebook,
                twitter,
                github
            },
            posts: [],
            bookmarks: []

        })
        const createdProfile = await profile.save();
        await User.findOneAndUpdate({
            _id: req.user._id
        }, {
            $set: {
                profile: createdProfile._id
            }
        })
        req.flash("success", "Profile Created Successfully");
        res.redirect('/dashboard')
    } catch (e) {
        next(e)
    }
}

exports.editProfileGetController = async (req, res, next) => {
    try {
        const profile = await Profile.findOne({ user: req.user._id });
        if (profile) {
            res.locals.profile = profile;
            return res.render("pages/dashboard/edit-profile", {
                title: "Edit Your Profile",
                message: Flash.getMessage(req),
                errors: {}
            });
        }
        res.redirect("/dashboard/create-profile");
    } catch (e) {
        next(e);
    }
};

exports.editProfilePostController = async (req, res, next) => {
    const { name, title, bio, website, facebook, twitter, github } = req.body;
    const errors = validationResult(req).formatWith(errorFormatter);
    try {
        var profile = await Profile.findOne({user: req.user._id})
    } catch(e){
        next(e)
    }
    if (!errors.isEmpty()) {
        return res.render('pages/dashboard/edit-profile', {
            title: "Create your profile",
            errors: errors.mapped(),
            profile: req.body
        })
    }
    try {
        await User.findOneAndUpdate({
            _id: req.user._id
        }, {
            $set: {
                email: req.body.email
            }
        })
        const profile = await Profile.findOneAndUpdate({
            user: req.user._id
        }, {
            $set: {
                name,
                title,
                bio,
                links: {
                    website,
                    facebook,
                    twitter,
                    github
                }
            }
        },{
            new: true
        })
        req.flash('success', 'Profile Updated Successfully')
        return res.render('pages/dashboard/edit-profile', {
            title: "Create your profile",
            errors: errors.mapped(),
            profile,
            message: Flash.getMessage(req)
        })
    } catch (e) {
        next(e)
    }
}
