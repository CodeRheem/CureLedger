import { Router, Request, Response } from 'express';
import Joi from 'joi';
import { PaymentService } from '@services/PaymentService';
import { ApiError } from '@core/ApiError';
import { ApiResponse } from '@core/ApiResponse';
import { asyncHandler } from '@helpers/asyncHandler';
import { validateRequest } from '@helpers/validateRequest';

const router = Router();

const initiatePaymentSchema = Joi.object({
  body: Joi.object({
    amount: Joi.number().positive().required(),
    currency: Joi.string().default('NGN'),
    customerEmail: Joi.string().email().required(),
    customerName: Joi.string().required(),
    reference: Joi.string().required(),
    callbackUrl: Joi.string().uri().optional(),
    metadata: Joi.object().optional()
  })
});

const paymentReferenceSchema = Joi.object({
  params: Joi.object({
    reference: Joi.string().required()
  })
});

router.post(
  '/initiate',
  validateRequest(initiatePaymentSchema),
  asyncHandler(async (req: Request, res: Response) => {
    try {
      const payment = await PaymentService.initiatePayment(req.body);
      ApiResponse.ok(res, 'Payment initiated successfully', payment);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.getHttpStatus()).json(error.toResponse());
        return;
      }
      throw error;
    }
  })
);

router.get(
  '/:reference',
  validateRequest(paymentReferenceSchema),
  asyncHandler(async (req: Request, res: Response) => {
    try {
      const payment = await PaymentService.getPaymentStatus(req.params.reference);
      ApiResponse.ok(res, 'Payment status fetched', payment);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.getHttpStatus()).json(error.toResponse());
        return;
      }
      throw error;
    }
  })
);

router.post(
  '/webhook',
  asyncHandler(async (req: Request, res: Response) => {
    const signature = String(req.headers['x-signature'] || '');
    const isValid = PaymentService.verifyWebhookSignature(signature, JSON.stringify(req.body));

    if (!isValid) {
      res.status(401).json(ApiError.unauthorized('Invalid webhook signature').toResponse());
      return;
    }

    
    

    ApiResponse.ok(res, 'Webhook received', { received: true });
  })
);

export default router;
