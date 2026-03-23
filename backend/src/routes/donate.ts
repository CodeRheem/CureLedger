import { Router, Request, Response } from 'express';
import Joi from 'joi';
import { DonationService } from '@services/DonationService';
import { ApiError } from '@core/ApiError';
import { ApiResponse } from '@core/ApiResponse';
import { asyncHandler } from '@helpers/asyncHandler';
import { validateRequest } from '@helpers/validateRequest';

const router = Router();

const donateSchema = Joi.object({
  body: Joi.object({
    campaignId: Joi.string().required(),
    amount: Joi.number().min(100).required(),
    donorName: Joi.string().required(),
    donorEmail: Joi.string().email().required(),
    message: Joi.string().optional().allow('')
  })
});

// POST /donate - Public donation endpoint
router.post(
  '/',
  validateRequest(donateSchema),
  asyncHandler(async (req: Request, res: Response) => {
    try {
      const result = await DonationService.createDonation(req.body);
      ApiResponse.ok(res, 'Donation initiated successfully', result);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.getHttpStatus()).json(error.toResponse());
      } else {
        throw error;
      }
    }
  })
);

// POST /donate/webhook - Payment confirmation webhook
router.post(
  '/webhook',
  asyncHandler(async (req: Request, res: Response) => {
    try {
      const { paymentReference, transactionId } = req.body;

      if (!paymentReference) {
        throw ApiError.validation('Payment reference is required');
      }

      await DonationService.confirmDonation(paymentReference, transactionId);
      ApiResponse.ok(res, 'Donation confirmed', { success: true });
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.getHttpStatus()).json(error.toResponse());
      } else {
        throw error;
      }
    }
  })
);

export default router;
