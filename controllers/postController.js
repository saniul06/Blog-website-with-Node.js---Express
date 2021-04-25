const Flash = require("../utils/Flash");
const { validationResult } = require('express-validator');
const errorValiatorFormatter = require('../utils/errorValiatorFormatter')

exports.createPostGetController = (req, res, next) => {

    res.render('pages/dashboard/post/create-post', {
        title: "Create Post",
        errors: {},
        message: Flash.getMessage(req)
    })
}

exports.createPostPostController = (req, res, next) => {
    console.log('firs line')
    const { title, body } = req.body;
    console.log(req.body)
    // console.log('title is: ', title, typeof title)
    const errors = validationResult(req).formatWith(errorValiatorFormatter);
    // console.log(errors)
    if (!errors.isEmpty()) {
        return res.render('pages/dashboard/post/create-post', {
            title: "Create Post",
            errors: errors.mapped(),
            message: Flash.getMessage(req)
        })
    }

}