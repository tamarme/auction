import { Request, Response, NextFunction, RequestHandler } from 'express';
import Joi from 'joi';
import joi from 'joi';

function validationMiddleware(schema: joi.Schema) {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const validationOptions = {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true,
    };
    try {
      const value = await schema.validateAsync(req.body, validationOptions);
      req.body = value;
      next();
    } catch (error: any) {
      const errors: string[] = [];
      error.details.forEach((e: Joi.ValidationErrorItem) => {
        errors.push(e.message);
      });
      res.status(400).send({ errors });
    }
  };
}

export default validationMiddleware;
