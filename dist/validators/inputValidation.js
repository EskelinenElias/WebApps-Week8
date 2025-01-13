"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateInputs = void 0;
exports.handleValidationErrors = handleValidationErrors;
const express_validator_1 = require("express-validator/");
const validateInputs = [
    // Username validation
    (0, express_validator_1.body)("username")
        .trim()
        .escape()
        .isLength({ min: 3 })
        .withMessage("Username must be at least 3 characters long"),
    // Email validation
    (0, express_validator_1.body)("email")
        .trim()
        .normalizeEmail()
        .isEmail()
        .withMessage("Invalid email address"),
    // Password validation
    (0, express_validator_1.body)("password")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long")
        .matches(/[A-Z]/)
        .withMessage("Password must contain at least 1 uppercase letter")
        .matches(/[a-z]/)
        .withMessage("Password must contain at least 1 lowercase letter")
        .matches(/[0-9]/)
        .withMessage("Password must contain at least 1 number")
        .matches(/[#?!@$%^&*-]/)
        .withMessage("Password must contain at least 1 special character (#?!@$%^&*-)"),
];
exports.validateInputs = validateInputs;
function handleValidationErrors(req, res, next) {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        console.error(errors);
        res.status(400).json({ errors: errors.array() });
        return;
    }
    next();
}
