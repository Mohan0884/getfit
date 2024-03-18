import { body, validationResult } from 'express-validator';
import { BadRequestError } from '../errors/customErrors.js';
import mongoose from 'mongoose';
import { param } from 'express-validator';
import Training from '../models/TrainingModel.js';
import User from '../models/UserModel.js';

const withValidationErrors =(validateValues) => {
    return [
      validateValues,
      (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          const errorMessages = errors.array().map((error) => error.msg);
          if (errorMessages[0].startsWith('no training')) {
            throw new NotFoundError(errorMessages);
          }
          throw new BadRequestError(errorMessages);
        }
        next();
      },
    ];
  };
  
export const validateTrainingInput = withValidationErrors([
  body('name').notEmpty().withMessage('name should not be empty'),
  body('originalPrice').notEmpty().withMessage('originalPrice should not be empty'),
  body('offerPrice').notEmpty().withMessage('offerPrice should not be empty'),
  body('desc').notEmpty().withMessage('descrition should not be empty'),
  body('time').notEmpty().withMessage('Time should not be empty'),
  body('timePrice').notEmpty().withMessage('timePrice should not be empty')
]);
export const validateIdParam=withValidationErrors([
    param('id').custom(async (value) => {
        const isValidId = mongoose.Types.ObjectId.isValid(value);
        if (!isValidId) throw new BadRequestError('invalid MongoDB id');
        const training = await Training.findById(value);
        if (!training) throw new NotFoundError(`no training with id : ${value}`);
      }),
])
export const validateRegisterInput=withValidationErrors([
  body('name').notEmpty().withMessage('name not found'),
  body('email').notEmpty().withMessage('email not found').isEmail().withMessage('please provide valid email')
  .custom(async (email)=>{
    const user=await User.findOne({email});
    if(user){
      throw new BadRequestError('email already exists');
    }
  }),
  body('password').notEmpty().withMessage('password is empty')
  .isLength({min:8}).withMessage('password must be atleast 8 characters long'),
])
export const validateLoginInput=withValidationErrors([
  body('email').notEmpty().withMessage('email should not be empty').isEmail().withMessage('invialid email'),
  body('password').notEmpty().withMessage("password should not be empty").isLength({min:8}).withMessage('password should be atleast 8 characters')
])

export const validateUpdateUserInput = withValidationErrors([
  body('name').notEmpty().withMessage('name is required'),
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format')
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (user && user._id.toString() !== req.user.userId) {
        throw new Error('email already exists');
      }
    }),
]);
