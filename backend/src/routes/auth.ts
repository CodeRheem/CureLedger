import { Router, Request, Response } from 'express';
import Joi from 'joi';
import { AuthService } from '@auth/AuthService';
import { ApiError } from '@core/ApiError';
import { ApiResponse } from '@core/ApiResponse';
import { asyncHandler } from '@helpers/asyncHandler';
import { validateRequest } from '@helpers/validateRequest';
import { authenticate } from '@middlewares/authenticate';

const router = Router();

// Validation schemas
const registerRecipientSchema = Joi.object({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim().required(),
    phone: Joi.string().required(),
    location: Joi.string().required()
  })
});

const registerHospitalSchema = Joi.object({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim().required(),
    phone: Joi.string().required(),
    hospitalName: Joi.string().required(),
    hospitalLicense: Joi.string().required(),
    address: Joi.string().optional()
  })
});

const loginSchema = Joi.object({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })
});

// POST /auth/register-recipient
router.post(
  '/register-recipient',
  validateRequest(registerRecipientSchema),
  asyncHandler(async (req: Request, res: Response) => {
    try {
      const result = await AuthService.registerRecipient(req.body);
      ApiResponse.created(res, 'Recipient registered successfully', result);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(400).json(error.toResponse());
      } else {
        throw error;
      }
    }
  })
);

// POST /auth/register-hospital
router.post(
  '/register-hospital',
  validateRequest(registerHospitalSchema),
  asyncHandler(async (req: Request, res: Response) => {
    try {
      const result = await AuthService.registerHospital(req.body);
      ApiResponse.created(res, 'Hospital registered successfully', result);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(400).json(error.toResponse());
      } else {
        throw error;
      }
    }
  })
);

// POST /auth/login
router.post(
  '/login',
  validateRequest(loginSchema),
  asyncHandler(async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const result = await AuthService.login(email, password);
      ApiResponse.ok(res, 'Login successful', result);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(401).json(error.toResponse());
      } else {
        throw error;
      }
    }
  })
);

// GET /auth/me
router.get(
  '/me',
  authenticate,
  asyncHandler(async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        throw ApiError.unauthorized();
      }
      const user = await AuthService.getCurrentUser(req.user.userId);
      ApiResponse.ok(res, 'User profile retrieved', user);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(400).json(error.toResponse());
      } else {
        throw error;
      }
    }
  })
);

export default router;
