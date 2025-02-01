const { body } = require('express-validator');

const validateUser = [
    body('firstName')
        .trim()
        .isLength({ min: 1, max: 50 }).withMessage('First name must be between 1 and 50 characters')
        .matches(/^[A-Za-z\s]+$/).withMessage('First name must contain only letters'),

    body('lastName')
        .trim()
        .isLength({ min: 1, max: 50 }).withMessage('Last name must be between 1 and 50 characters')
        .matches(/^[A-Za-z\s]+$/).withMessage('Last name must contain only letters'),

    body('interest')
        .isArray({ min: 1 }).withMessage('At least one interest is required'),

    body('age')
        .isInt({ min: 18, max: 100 }).withMessage('Age must be between 18 and 100'),

    body('email')
        .trim()
        .isEmail().withMessage('Invalid email id'),

    body('mobile')
        .trim()
        .matches(/^\d{10}$/).withMessage('Mobile number must be exactly 10 digits')
];

module.exports = validateUser;
