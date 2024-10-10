import { body } from 'express-validator';


export const validateAddSubject = [
  body('title').notEmpty().withMessage('Title is required').isString().withMessage("title must be string"),
];


export const validateAddQuestion = [
  body('questionBody').notEmpty().withMessage('Question Body is required'),
  body('marksAlloted').notEmpty().withMessage('Marks Alloted is required').isNumeric().withMessage('Marks Alloted must be a number'),
  body('choices').optional().isArray().withMessage('Choices must be an array'),
  body('type').optional().isIn(['mcq', 'descriptive']).withMessage('Type must be "mcq" or "descriptive"'),
];


export const validateUserRegistration = [
  body('userName').notEmpty().withMessage('User Name is required').isAlphanumeric().withMessage("UserName Must be Alphanumeric"),
  body('email').isEmail().withMessage('A valid email is required'),
  body('contactNo').isNumeric().withMessage('Contact No must be a number'),
  body('password').notEmpty().withMessage('Password is required').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('confirmPassword').notEmpty().withMessage('Confirm Password is required')
    .custom((value, { req }) => value === req.body.password ? true : false)
    .withMessage('Passwords do not match')
];
