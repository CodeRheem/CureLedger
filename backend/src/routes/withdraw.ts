import { Router, Request, Response } from 'express';
import Joi from 'joi';
import { WithdrawalRepo } from '@database/repository/WithdrawalRepo';
import { CampaignRepo } from '@database/repository/CampaignRepo';
import { ApiError } from '@core/ApiError';
import { ApiResponse } from '@core/ApiResponse';
import { asyncHandler } from '@helpers/asyncHandler';
import { validateRequest } from '@helpers/validateRequest';
import { authenticate } from '@middlewares/authenticate';
import { authorize } from '@middlewares/authorize';
import { UserRole } from '@database/model/User';
import { Types } from 'mongoose';

const router = Router();

const withdrawRequestSchema = Joi.object({
  body: Joi.object({
    campaignId: Joi.string().required(),
    amount: Joi.number().min(1).required(),
    bankAccount: Joi.string().required(),
    bankName: Joi.string().required(),
    accountName: Joi.string().required()
  })
});

const approveSchema = Joi.object({
  body: Joi.object({
    approved: Joi.boolean().required()
  })
});

// TODO: Review - NEW ENDPOINT ADDED
// GET / - List recipient's withdrawals
// router.get(
//   '/',
//   authenticate,
//   authorize(UserRole.RECIPIENT),
//   asyncHandler(async (req: Request, res: Response) => {
//     try {
//       if (!req.user) {
//         throw ApiError.unauthorized();
//       }

//       const page = parseInt(req.query.page as string) || 1;
//       const limit = parseInt(req.query.limit as string) || 20;

//       const { campaigns } = await CampaignRepo.findByRecipientId(req.user.userId, 1, 100);

//       if (campaigns.length === 0) {
//         return ApiResponse.ok(res, 'No campaigns found', { withdrawals: [], total: 0 });
//       }

//       const campaignIds = campaigns.map(c => c._id);
//       const { withdrawals, total } = await WithdrawalRepo.findByCampaignIds(campaignIds, page, limit);

//       ApiResponse.ok(res, 'Withdrawals retrieved', { withdrawals, total });
//     } catch (error) {
//       if (error instanceof ApiError) {
//         res.status(error.getHttpStatus()).json(error.toResponse());
//       } else {
//         throw error;
//       }
//     }
//   })
// );

// POST / - Request withdrawal (Recipient)
router.post(
  '/',
  authenticate,
  authorize(UserRole.RECIPIENT),
  validateRequest(withdrawRequestSchema),
  asyncHandler(async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        throw ApiError.unauthorized();
      }

      const campaign = await CampaignRepo.findById(req.body.campaignId);
      if (!campaign) {
        throw ApiError.notFound('Campaign not found');
      }

      if (campaign.recipientId.toString() !== req.user.userId) {
        throw ApiError.forbidden('Can only withdraw from own campaign');
      }

      if (req.body.amount > campaign.raisedAmount) {
        throw ApiError.validation('Withdrawal amount exceeds available balance');
      }

      const withdrawal = await WithdrawalRepo.create({
        campaignId: new Types.ObjectId(req.body.campaignId),
        amount: req.body.amount,
        bankAccount: req.body.bankAccount,
        bankName: req.body.bankName,
        accountName: req.body.accountName
      });

      ApiResponse.created(res, 'Withdrawal request created', {
        id: withdrawal._id,
        amount: withdrawal.amount,
        status: withdrawal.status
      });
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.getHttpStatus()).json(error.toResponse());
      } else {
        throw error;
      }
    }
  })
);

// POST /:id/approve - Approve/Reject withdrawal (Admin)
router.post(
  '/:id/approve',
  authenticate,
  authorize(UserRole.ADMIN),
  validateRequest(approveSchema),
  asyncHandler(async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        throw ApiError.unauthorized();
      }

      const withdrawal = await WithdrawalRepo.findById(req.params.id);
      if (!withdrawal) {
        throw ApiError.notFound('Withdrawal not found');
      }

      if (req.body.approved) {
        await WithdrawalRepo.approve(req.params.id, new Types.ObjectId(req.user.userId));
        // TODO: Call payment API to process actual payout
      } else {
        await WithdrawalRepo.reject(req.params.id, 'Rejected by admin');
      }

      const updatedWithdrawal = await WithdrawalRepo.findById(req.params.id);
      ApiResponse.ok(res, 'Withdrawal processed', updatedWithdrawal);
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
