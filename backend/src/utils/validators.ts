import { body, validationResult, ValidationChain} from 'express-validator';
import express from 'express';

export const validate = (validations: ValidationChain[]) => {
    return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
      for (let validation of validations) {
        const result = await validation.run(req);
        if (!result.isEmpty()) break;
      }
  
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        return next();
      }
  
      res.status(400).json({ errors: errors.array() });
    };
  };

export const loginValidators =[ 
    body('email').trim().isEmail().withMessage("Email is required"),
    body('password').trim().isLength({min:8}).withMessage("Password should contain atleast eight characters"),

]
export const sigupValidators =[ 
    body('name').notEmpty().withMessage("Name is required"),
    ...loginValidators,

]