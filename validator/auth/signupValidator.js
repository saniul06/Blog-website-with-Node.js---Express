const { body } = require("express-validator");

const User = require("../../models/User");

module.exports = signupValidator = [
    body("username")
        .isLength({ min: 2, max: 15 })
        .withMessage("Username must be between 2 to 15 characters"),
    // .custom(async (username) => {
    //     const userName = await User.findOne({ username });
    //     if (userName) {
    //         return Promise.reject("Username already in use");
    //     }
    // })
    body("email")
        .isEmail()
        .withMessage("Please enter a valid email address")
        // .custom(async (email) => {
        //     const userEmail = await User.findOne({ email });
        //     if (userEmail) {
        //         return Promise.reject("E-mail already in use");
        //     }
        // })
        .normalizeEmail(),
    body("password")
        .isLength({ min: 4 })
        .withMessage("Password atleast 4 character"),
    body("confirmPassword")
        // .custom((confirmPass, { req }) => {
        //     if (confirmPass !== req.body.password) {
        //         throw new Error("Password doesn't match");
        //     }
        //     return true;
        // })
        .isLength({ min: 4 })
        .withMessage("password atleast 4 characters"),
];
