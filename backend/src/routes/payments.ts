import { Router, Request, Response } from 'express';
import Joi from 'joi';
import { PaymentService } from '@services/PaymentService';
import { ApiError } from '@core/ApiError';
import { ApiResponse } from '@core/ApiResponse';
import { asyncHandler } from '@helpers/asyncHandler';
import { validateRequest } from '@helpers/validateRequest';
import { DonationRepo } from '@database/repository/DonationRepo';
import { DonationService } from '@services/DonationService';

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
      const donation = await DonationRepo.findByPaymentReference(req.params.reference);
      const amountInMinorUnits = donation ? Math.round(donation.amount * 100) : undefined;
      const payment = await PaymentService.getPaymentStatus(req.params.reference, amountInMinorUnits);
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
    const signature = String(
      req.headers['x-interswitch-signature'] || req.headers['x-signature'] || ''
    );
    const rawPayload = req.body ? JSON.stringify(req.body) : '';
    const isValid = PaymentService.verifyWebhookSignature(signature, rawPayload);

    if (!isValid) {
      res.status(401).json(ApiError.unauthorized('Invalid webhook signature').toResponse());
      return;
    }

    const reference =
      req.body?.paymentReference ||
      req.body?.transactionReference ||
      req.body?.txn_ref ||
      req.body?.reference;

    const transactionId = req.body?.transactionId || req.body?.paymentId;

    if (!reference) {
      throw ApiError.validation('Missing payment reference in webhook payload');
    }

    const donation = await DonationRepo.findByPaymentReference(String(reference));
    if (!donation) {
      throw ApiError.notFound('Donation not found for webhook reference');
    }

    const status = await PaymentService.getPaymentStatus(String(reference), Math.round(donation.amount * 100));

    if (!status.isSuccessful) {
      ApiResponse.ok(res, 'Webhook received - payment not successful', {
        received: true,
        processed: false,
        reference
      });
      return;
    }

    await DonationService.confirmDonation(String(reference), transactionId ? String(transactionId) : undefined);

    ApiResponse.ok(res, 'Webhook received and processed', {
      received: true,
      processed: true,
      reference
    });
  })
);

export default router;
