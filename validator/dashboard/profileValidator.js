const { body } = require('express-validator');
const validator = require('validator')
const urlValidator = value => {
    if (value) {
        if (!validator.isURL(value)) {
            throw new Error("Please provide valid url")
        }
    }
    return true
}

module.exports = [
    body('name')
        .not().isEmpty().withMessage('Name can not be empty')
        .isLength({ max: 50 }).withMessage('Name must be less then 50 character')
        .trim(),
    body('title')
        .not().isEmpty().withMessage('title can not be empty')
        .isLength({ max: 100 }).withMessage('title must be less than 100 characters')
        .trim(),
    body('bio')
        .not().isEmpty().withMessage('Bio can not be empty')
        .isLength({ max: 500 }).withMessage('Bio must be less than 500 characters')
        .trim(),
    body('website')
        .custom(urlValidator),
    body('facebook')
        .custom(urlValidator),
    body('twitter')
        .custom(urlValidator),
    body('github')
        .custom(urlValidator)

]