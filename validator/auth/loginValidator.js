const { body } = require("express-validator");

module.exports = loginValidator = [
    body("email")
        .isEmail()
        .withMessage("Please enter a valid email address")
        // .custom(async (email) => {
        //     const userEmail = await User.findOne({ email });
        //     if (!userEmail) {
        //         return Promise.reject("Invalid Credentials");
        //     }
        // })
        .normalizeEmail(),
    body("password")
        .isLength({ min: 4 })
        .withMessage("Password atleast 4 character"),
    // .custom(async (password, { req }) => {
    //     const user = await User.findOne({ email: req.body.email });
    //     if (user) {
    //         const match = await bcrypt.compare(password, user.password);
    //         if (!match) {
    //             return Promise.reject("Invalid Credentials");
    //         }
    //         req.session.isLoggedIn = true;
    //         req.session.user = user;
    //         req.session.save(err => {
    //             if(err){
    //                 return next(err)
    //             }
    //         })
    //     }
    // }),
];
