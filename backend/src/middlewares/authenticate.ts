import { Request, Response, NextFunction } from 'express';
import { JWT } from '@core/JWT';
import { ApiError } from '@core/ApiError';

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw ApiError.unauthorized('Missing or invalid authorization header');
    }

    const token = authHeader.slice(7);
    const payload = JWT.verifyToken(token);

    if (!payload) {
      throw ApiError.unauthorized('Invalid or expired token');
    }

    req.user = {
      userId: payload.userId,
      email: payload.email,
    };
    req.roles = payload.roles;

    next();
  } catch (error) {
    if (error instanceof ApiError) {
      res.status(401).json(error.toResponse());
    } else {
      res.status(401).json(ApiError.unauthorized('Authentication failed').toResponse());
    }
  }
};
