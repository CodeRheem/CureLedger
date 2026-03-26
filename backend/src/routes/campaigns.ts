import { Router, Request, Response } from 'express';
import Joi from 'joi';
import { CampaignService } from '@services/CampaignService';
import { DonationService } from '@services/DonationService';
import { ApiError } from '@core/ApiError';
import { ApiResponse } from '@core/ApiResponse';
import { asyncHandler } from '@helpers/asyncHandler';
import { validateRequest } from '@helpers/validateRequest';
import { authenticate } from '@middlewares/authenticate';
import { authorize } from '@middlewares/authorize';
import { UserRole } from '@database/model/User';

const router = Router();

// Validation schemas
const createCampaignSchema = Joi.object({
  body: Joi.object({
    title: Joi.string().min(5).required(),
    description: Joi.string().min(20).required(),
    targetAmount: Joi.number().min(1000).required(),
    condition: Joi.string().required(),
    hospitalId: Joi.string().required(),
    endsAt: Joi.date().required()
  })
});

const updateCampaignSchema = Joi.object({
  body: Joi.object({
    title: Joi.string().min(5).optional(),
    description: Joi.string().min(20).optional(),
    endsAt: Joi.date().optional()
  })
});

// GET /campaigns - Public list approved campaigns
router.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;
      const { campaigns, total } = await CampaignService.getApproveCampaigns(page, limit);

      ApiResponse.ok(res, 'Approved campaigns retrieved', {
        campaigns,
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

// GET /campaigns/pending - Hospital/Admin list pending campaigns
router.get(
  '/pending',
  authenticate,
  authorize(UserRole.HOSPITAL, UserRole.ADMIN),
  asyncHandler(async (req: Request, res: Response) => {
    try {
      const status = req.query.status as string;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;

      let hospitalId: string | undefined;
      if (req.roles?.[0] === UserRole.HOSPITAL && req.user) {
        const { HospitalRepo } = await import('@database/repository/HospitalRepo');
        const hospital = await HospitalRepo.findByUserId(req.user.userId);
        hospitalId = hospital?._id?.toString();
      }

      const { campaigns, total } = await CampaignService.getPendingCampaigns(
        status as any,
        page,
        limit,
        hospitalId
      );

      ApiResponse.ok(res, 'Pending campaigns retrieved', {
        campaigns,
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

// GET /campaigns/current-user - Recipient list own campaigns
router.get(
  '/current-user',
  authenticate,
  authorize(UserRole.RECIPIENT),
  asyncHandler(async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        throw ApiError.unauthorized();
      }

      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;
      const { campaigns, total } = await CampaignService.getRecipientCampaigns(
        req.user.userId,
        page,
        limit
      );

      ApiResponse.ok(res, 'Current user campaigns retrieved', {
        campaigns,
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

// GET /campaigns/:id - Get campaign details
router.get(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    try {
      const campaign = await CampaignService.getCampaignDetails(req.params.id);
      ApiResponse.ok(res, 'Campaign details retrieved', campaign);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.getHttpStatus()).json(error.toResponse());
      } else {
        throw error;
      }
    }
  })
);

// POST /campaigns - Create campaign (Recipient only)
router.post(
  '/',
  authenticate,
  authorize(UserRole.RECIPIENT),
  validateRequest(createCampaignSchema),
  asyncHandler(async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        throw ApiError.unauthorized();
      }

      const campaign = await CampaignService.createCampaign(req.user.userId, req.body);
      ApiResponse.created(res, 'Campaign created successfully', campaign);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.getHttpStatus()).json(error.toResponse());
      } else {
        throw error;
      }
    }
  })
);

// PATCH /campaigns/:id - Update campaign
router.patch(
  '/:id',
  authenticate,
  validateRequest(updateCampaignSchema),
  asyncHandler(async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        throw ApiError.unauthorized();
      }

      const campaign = await CampaignService.updateCampaign(req.params.id, req.user.userId, req.body);
      ApiResponse.ok(res, 'Campaign updated successfully', campaign);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.getHttpStatus()).json(error.toResponse());
      } else {
        throw error;
      }
    }
  })
);

// GET /campaigns/:id/donations - Get campaign donations
router.get(
  '/:id/donations',
  authenticate,
  asyncHandler(async (req: Request, res: Response) => {
    try {
      if (!req.user || !req.roles) {
        throw ApiError.unauthorized();
      }

      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;

      const donations = await DonationService.getCampaignDonations(
        req.params.id,
        req.user.userId,
        req.roles[0],
        page,
        limit
      );

      ApiResponse.ok(res, 'Campaign donations retrieved', donations);
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
