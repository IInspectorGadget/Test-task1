import { body } from "express-validator";

export const validateCreateUser = [
  body('firstName').notEmpty().isString(),
  body('lastName').notEmpty().isString(),
  body('age').notEmpty().custom((value) => {
    if (!Number.isInteger(value)) {
      throw new Error('Age must be an integer');
    }
    if (value < 0 ){
      throw new Error('Age must be > 0');
    }
    return true;
  }),
  body('gender').notEmpty().isIn(['MALE', 'FEMALE', 'OTHER']),
];

export const validateUpdateUser = [
  body('firstName') .optional().notEmpty().isString(),
  body('lastName') .optional().notEmpty().isString(),
  body('age') .optional().notEmpty().custom((value) => {
    if (!Number.isInteger(value)) {
      throw new Error('Age must be an integer');
    }
    if (value < 0 ){
      throw new Error('Age must be > 0');
    }
    return true;
  }),
  body('gender').optional().notEmpty().isIn(['MALE', 'FEMALE', 'OTHER']),
];