const User = require('../models/User');
const Profile = require('../models/Profile');
const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false);

exports.uploadProfilePics = async (req, res, next) => {
    if (req.file) {
        try {
            const profile = await Profile.findOne({ id: req.user._id })
            if (profile) {
                Profile.findOneAndUpdate({
                    user: req.user._id
                }, {
                    $set: {
                        profilePics: `/uploads/${req.file.fieldname}/${req.file.filename}`
                    }
                })
            }
            console.log(req.user.id)
            await User.findOneAndUpdate({
                _id: req.user.id
            }, {
                $set: {
                    profilePics: `/uploads/${req.file.fieldname}/${req.file.filename}`
                }
            })
            res.status(200).json({
                profilePics: `/uploads/${req.file.fieldname}/${req.file.filename}`,
                destination: req.file.destination
            })
        } catch (e) {
            res.status(500).json({
                profilePics: req.user.profilePics
            })
        }
    } else {
        res.status(500).json({
            profilePics: req.user.profilePics
        })
    }
}
