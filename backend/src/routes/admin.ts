import { Router, Request, Response } from 'express';
import { RecipientRepo } from '@database/repository/RecipientRepo';
import { HospitalRepo } from '@database/repository/HospitalRepo';
import { WithdrawalRepo } from '@database/repository/WithdrawalRepo';
import { UserRole } from '@database/model/User';
import { ApiError } from '@core/ApiError';
import { ApiResponse } from '@core/ApiResponse';
import { asyncHandler } from '@helpers/asyncHandler';
import { authenticate } from '@middlewares/authenticate';
import { authorize } from '@middlewares/authorize';

const router = Router();

// GET /recipients - List all recipients (Admin)
router.get(
  '/recipients',
  authenticate,
  authorize(UserRole.ADMIN),
  asyncHandler(async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;

      const { recipients, total } = await RecipientRepo.findAll(page, limit);

      ApiResponse.ok(res, 'Recipients retrieved', {
        recipients,
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

// GET /hospitals - List all hospitals (Admin)
router.get(
  '/hospitals',
  authenticate,
  authorize(UserRole.ADMIN),
  asyncHandler(async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;

      const { hospitals, total } = await HospitalRepo.findAll(page, limit);

      ApiResponse.ok(res, 'Hospitals retrieved', {
        hospitals,
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

// POST /hospitals/:id/verify - Verify hospital (Admin)
router.post(
  '/hospitals/:id/verify',
  authenticate,
  authorize(UserRole.ADMIN),
  asyncHandler(async (req: Request, res: Response) => {
    try {
      const hospital = await HospitalRepo.verify(req.params.id);

      if (!hospital) {
        throw ApiError.notFound('Hospital not found');
      }

      ApiResponse.ok(res, 'Hospital verified', hospital);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.getHttpStatus()).json(error.toResponse());
      } else {
        throw error;
      }
    }
  })
);

// GET /withdrawals/pending - List pending withdrawals (Admin)
router.get(
  '/withdrawals/pending',
  authenticate,
  authorize(UserRole.ADMIN),
  asyncHandler(async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;

      const { withdrawals, total } = await WithdrawalRepo.findByStatus('pending_approval' as any, page, limit);

      ApiResponse.ok(res, 'Pending withdrawals retrieved', {
        withdrawals,
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

export default router;
