const fs = require('fs');
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
            await User.findOneAndUpdate({
                _id: req.user.id
            }, {
                $set: {
                    profilePics: `/uploads/${req.file.fieldname}/${req.file.filename}`
                }
            })

            const deletePrevPics = req.user.profilePics.includes('profilePics');
            if (deletePrevPics) {
                fs.unlink(`public${req.user.profilePics}`, err => {
                    if(err){
                        console.log(err)
                    }
                })
            }

            res.status(200).json({
                profilePics: `/uploads/${req.file.fieldname}/${req.file.filename}`
            })
        } catch (e) {
            console.log(e)
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

exports.removeProfilePics = async (req, res, next) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id })
        if (profile) {
            await Profile.findOneAndUpdate({
                user: req.user._id
            }, {
                $set: {
                    profilePics: '/uploads/default.jpg'
                }
            })
        }
        await User.findOneAndUpdate({
            _id: req.user.id
        }, {
            $set: {
                profilePics: `/uploads/default.jpg`
            }
        })
        fs.unlink(`public${req.user.profilePics}`, err => { })
        const user = await User.findById(req.user.id)
        res.json({
            profilePics: user.profilePics
        })
    } catch (e) {
        console.log(e)
        res.json({
            error: 'Can not remove profile picture'
        })
    }
}

exports.uploadPostImageController = (req, res) => {
    if(req.file){
        return res.status(200).json({
            imgUrl: `/uploads/post-image/${req.file.filename}`
        })
    }
    res.json.status(500).json({
        Message: "Server Error(image not found)"
    })
}
