import { Router, Request, Response } from 'express';
import Joi from 'joi';
import { CampaignRepo } from '@database/repository/CampaignRepo';
import { VerificationRepo } from '@database/repository/VerificationRepo';
import { CampaignStatus } from '@database/model/Campaign';
import { VerifiedByRole } from '@database/model/Verification';
import { ApiError } from '@core/ApiError';
import { ApiResponse } from '@core/ApiResponse';
import { asyncHandler } from '@helpers/asyncHandler';
import { validateRequest } from '@helpers/validateRequest';
import { authenticate } from '@middlewares/authenticate';
import { authorize } from '@middlewares/authorize';
import { UserRole } from '@database/model/User';
import { Types } from 'mongoose';

const router = Router();

const verifySchema = Joi.object({
  body: Joi.object({
    verified: Joi.boolean().required(),
    notes: Joi.string().optional()
  })
});

const approveSchema = Joi.object({
  body: Joi.object({
    approved: Joi.boolean().required(),
    notes: Joi.string().optional()
  })
});

const rejectSchema = Joi.object({
  body: Joi.object({
    reason: Joi.string().required()
  })
});

// POST /verify/:campaignId - Hospital verification
router.post(
  '/:campaignId/verify',
  authenticate,
  authorize(UserRole.HOSPITAL),
  validateRequest(verifySchema),
  asyncHandler(async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        throw ApiError.unauthorized();
      }

      const campaign = await CampaignRepo.findById(req.params.campaignId);
      if (!campaign) {
        throw ApiError.notFound('Campaign not found');
      }

      if (campaign.status !== CampaignStatus.PENDING_HOSPITAL) {
        throw ApiError.validation('Campaign is not pending hospital verification');
      }

      // Update campaign status
      const newStatus = req.body.verified ? CampaignStatus.PENDING_ADMIN : CampaignStatus.REJECTED;
      await CampaignRepo.updateStatus(req.params.campaignId, newStatus);

      // Log verification
      await VerificationRepo.create({
        campaignId: new Types.ObjectId(req.params.campaignId),
        verifiedBy: new Types.ObjectId(req.user.userId),
        verifiedByRole: VerifiedByRole.HOSPITAL,
        verified: req.body.verified,
        notes: req.body.notes || ''
      });

      ApiResponse.ok(res, 'Campaign verification completed', { status: newStatus });
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.getHttpStatus()).json(error.toResponse());
      } else {
        throw error;
      }
    }
  })
);

// POST /approve/:campaignId - Admin approval
router.post(
  '/:campaignId/approve',
  authenticate,
  authorize(UserRole.ADMIN),
  validateRequest(approveSchema),
  asyncHandler(async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        throw ApiError.unauthorized();
      }

      const campaign = await CampaignRepo.findById(req.params.campaignId);
      if (!campaign) {
        throw ApiError.notFound('Campaign not found');
      }

      if (campaign.status !== CampaignStatus.PENDING_ADMIN) {
        throw ApiError.validation('Campaign is not pending admin approval');
      }

      const newStatus = req.body.approved ? CampaignStatus.APPROVED : CampaignStatus.REJECTED;
      await CampaignRepo.updateStatus(req.params.campaignId, newStatus);

      await VerificationRepo.create({
        campaignId: new Types.ObjectId(req.params.campaignId),
        verifiedBy: new Types.ObjectId(req.user.userId),
        verifiedByRole: VerifiedByRole.ADMIN,
        verified: req.body.approved,
        notes: req.body.notes || ''
      });

      ApiResponse.ok(res, 'Campaign approval completed', { status: newStatus });
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.getHttpStatus()).json(error.toResponse());
      } else {
        throw error;
      }
    }
  })
);

// GET /history - Get verification history (Hospital)
router.get(
  '/history',
  authenticate,
  authorize(UserRole.HOSPITAL),
  asyncHandler(async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        throw ApiError.unauthorized();
      }

      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;

      const { verifications, total } = await VerificationRepo.findByVerifiedBy(
        req.user.userId,
        page,
        limit
      );

      ApiResponse.ok(res, 'Verification history retrieved', {
        verifications,
        total,
        page,
        totalPages: Math.ceil(total / limit)
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

// POST /reject/:campaignId - Reject campaign
router.post(
  '/:campaignId/reject',
  authenticate,
  authorize(UserRole.HOSPITAL, UserRole.ADMIN),
  validateRequest(rejectSchema),
  asyncHandler(async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        throw ApiError.unauthorized();
      }

      const campaign = await CampaignRepo.findById(req.params.campaignId);
      if (!campaign) {
        throw ApiError.notFound('Campaign not found');
      }

      const role = req.roles?.[0] === UserRole.HOSPITAL ? VerifiedByRole.HOSPITAL : VerifiedByRole.ADMIN;

      await CampaignRepo.updateStatus(req.params.campaignId, CampaignStatus.REJECTED);

      await VerificationRepo.create({
        campaignId: new Types.ObjectId(req.params.campaignId),
        verifiedBy: new Types.ObjectId(req.user.userId),
        verifiedByRole: role,
        verified: false,
        notes: req.body.reason
      });

      ApiResponse.ok(res, 'Campaign rejected', { status: CampaignStatus.REJECTED });
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
