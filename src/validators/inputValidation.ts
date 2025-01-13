import { Request, Response, NextFunction } from 'express';
import { body, Result, ValidationError, validationResult } from 'express-validator/';

const validateInputs = [
  
  // Username validation
  body("username")
    .trim()
    .escape()
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long"),
  
  // Email validation
  body("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Invalid email address"),
  
  // Password validation
  body("password")
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

function handleValidationErrors(req: Request, res: Response, next: NextFunction) {
  const errors: Result<ValidationError> = validationResult(req)
  if(!errors.isEmpty()) {
    console.error(errors);
    res.status(400).json({ errors: errors.array() });
    return; 
  }
  next(); 
}

export { validateInputs, handleValidationErrors };