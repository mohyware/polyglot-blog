const { body } = require('express-validator');

const postValidationRules = [
    body('title')
        .notEmpty().withMessage('Please provide Title')
        .isString().withMessage('Title must be a string')
        .isLength({ max: 50 }).withMessage('Title must be at most 50 characters long'),

    body('body')
        .notEmpty().withMessage('Please provide Body')
        .isString().withMessage('Body must be a string'),

    body('metaDescription')
        .optional()
        .isString().withMessage('Meta Description must be a string')
        .isLength({ max: 300 }).withMessage('Meta Description must be at most 300 characters long'),

    body('createdBy')
        .optional()
        .isString().withMessage('Created By must be a string')
        .isLength({ max: 10 }).withMessage('Created By must be at most 10 characters long'),

    body('tags')
        .optional()
        .isArray().withMessage('Tags must be an array')
        .custom(tags => tags.every(tag => typeof tag === 'string'))
        .withMessage('Each tag must be a string'),
];

module.exports = postValidationRules;