// TODO:  remove this file

const router = require("express").Router();

const upload = require('../middleware/uploadMiddleware');

const Flash = require('../utils/Flash');

const { check, validationResult, body } = require("express-validator");

const User = require("../models/User");

router.get("/", (req, res) => {
    // res.render("play/play", { title: "validator" });
    res.redirect('/auth/login')
    console.log('i am after render function')
   
    

});

router.post("/", upload.single('file-name'), (req, res) => {
    console.log(req.file)
    res.render('play/play', {title: 'play'})
})
        




module.exports = router;
