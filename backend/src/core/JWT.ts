import jwt from 'jsonwebtoken';
import { env } from '@config/env';

export interface JwtPayload {
  userId: string;
  email: string;
  roles: string[];
}

export class JWT {
  static generateToken(payload: JwtPayload): string {
    return jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRATION } as any);
  }

  static verifyToken(token: string): JwtPayload | null {
    try {
      return jwt.verify(token, env.JWT_SECRET) as JwtPayload;
    } catch (error) {
      return null;
    }
  }

  static decode(token: string): JwtPayload | null {
    try {
      return jwt.decode(token) as JwtPayload | null;
    } catch (error) {
      return null;
    }
  }
}
