import { Request, Response, NextFunction } from 'express';
import { ApiError } from '@core/ApiError';

export const authorize = (...requiredRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json(ApiError.unauthorized().toResponse());
      return;
    }

    if (!req.roles || !req.roles.some(role => requiredRoles.includes(role))) {
      res.status(403).json(ApiError.forbidden('Insufficient permissions').toResponse());
      return;
    }

    next();
  };
};
