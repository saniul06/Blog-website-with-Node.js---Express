const { body } = require("express-validator");

module.exports = [
    body('title')
        .not().isEmpty().withMessage('Title can not be empty')
        .isLength({ max: 50 }).withMessage('"Title can not be more than 50 character')
        .trim(),
    body('body')
        .not().isEmpty().withMessage('Body can not be empty')
        .isLength({max: 10}).withMessage('less than 10')
];