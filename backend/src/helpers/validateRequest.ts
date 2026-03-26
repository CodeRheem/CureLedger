import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';
import { ApiError } from '@core/ApiError';

export const validateRequest = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error, value } = schema.validate(
      {
        body: req.body,
        params: req.params,
        query: req.query
      },
      { abortEarly: false, allowUnknown: true }
    );

    if (error) {
      const details = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));

      res.status(422).json(
        ApiError.validation('Validation failed', details).toResponse()
      );
      return;
    }

    req.body = value.body || req.body;
    req.params = value.params || req.params;
    req.query = value.query || req.query;

    next();
  };
};
