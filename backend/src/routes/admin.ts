import { Router, Request, Response } from 'express';
import { RecipientRepo } from '@database/repository/RecipientRepo';
import { HospitalRepo } from '@database/repository/HospitalRepo';
import { WithdrawalRepo } from '@database/repository/WithdrawalRepo';
// import CampaignModel, { CampaignStatus } from '@database/model/Campaign'; // TODO: Review
// import RecipientModel from '@database/model/Recipient'; // TODO: Review
// import HospitalModel from '@database/model/Hospital'; // TODO: Review
// import DonationModel from '@database/model/Donation'; // TODO: Review
// import VerificationModel from '@database/model/Verification'; // TODO: Review
// import WithdrawalModel from '@database/model/Withdrawal'; // TODO: Review
import { UserRole } from '@database/model/User';
import { ApiError } from '@core/ApiError';
import { ApiResponse } from '@core/ApiResponse';
import { asyncHandler } from '@helpers/asyncHandler';
import { authenticate } from '@middlewares/authenticate';
import { authorize } from '@middlewares/authorize';

const router = Router();

// TODO: Review - NEW ENDPOINT ADDED
// GET /stats - Dashboard statistics (Admin)
// router.get(
//   '/stats',
//   authenticate,
//   authorize(UserRole.ADMIN),
//   asyncHandler(async (req: Request, res: Response) => {
//     try {
//       const [
//         totalCampaigns,
//         approvedCampaigns,
//         pendingCampaigns,
//         rejectedCampaigns,
//         totalRecipients,
//         totalHospitals,
//         verifiedHospitals,
//         totalDonations,
//         totalRaised,
//         pendingWithdrawals
//       ] = await Promise.all([
//         CampaignModel.countDocuments(),
//         CampaignModel.countDocuments({ status: CampaignStatus.APPROVED }),
//         CampaignModel.countDocuments({ status: { $in: [CampaignStatus.PENDING_HOSPITAL, CampaignStatus.PENDING_ADMIN] } }),
//         CampaignModel.countDocuments({ status: CampaignStatus.REJECTED }),
//         RecipientModel.countDocuments(),
//         HospitalModel.countDocuments(),
//         HospitalModel.countDocuments({ verified: true }),
//         DonationModel.countDocuments(),
//         CampaignModel.aggregate([
//           { $group: { _id: null, total: { $sum: '$raisedAmount' } } }
//         ]),
//         WithdrawalRepo.findByStatus('pending_approval' as any, 1, 1)
//       ]);

//       const raisedAmount = totalRaised[0]?.total || 0;

//       ApiResponse.ok(res, 'Stats retrieved', {
//         campaigns: {
//           total: totalCampaigns,
//           approved: approvedCampaigns,
//           pending: pendingCampaigns,
//           rejected: rejectedCampaigns
//         },
//         users: {
//           recipients: totalRecipients,
//           hospitals: totalHospitals,
//           verifiedHospitals
//         },
//         donations: {
//           total: totalDonations,
//           totalRaised: raisedAmount
//         },
//         withdrawals: {
//           pending: pendingWithdrawals.total
//         }
//       });
//     } catch (error) {
//       if (error instanceof ApiError) {
//         res.status(error.getHttpStatus()).json(error.toResponse());
//       } else {
//         throw error;
//       }
//     }
//   })
// );

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

// TODO: Review - NEW ENDPOINT ADDED
// GET /audit-logs - Audit logs (Admin)
// router.get(
//   '/audit-logs',
//   authenticate,
//   authorize(UserRole.ADMIN),
//   asyncHandler(async (req: Request, res: Response) => {
//     try {
//       const page = parseInt(req.query.page as string) || 1;
//       const limit = parseInt(req.query.limit as string) || 50;
//       const type = req.query.type as string;

//       let logs: any[] = [];
//       let total = 0;

//       const skip = (page - 1) * limit;

//       if (!type || type === 'verifications') {
//         const verifications = await VerificationModel.find()
//           .populate('campaignId', 'title')
//           .populate('verifiedBy', 'firstName lastName email')
//           .sort({ createdAt: -1 })
//           .skip(skip)
//           .limit(limit)
//           .lean();

//         logs = verifications.map(v => ({
//           id: v._id,
//           type: 'campaign_verification',
//           action: v.verified ? 'approved' : 'rejected',
//           performedBy: v.verifiedBy,
//           targetId: v.campaignId?._id,
//           targetName: v.campaignId?.title,
//           role: v.verifiedByRole,
//           notes: v.notes,
//           createdAt: v.createdAt
//         }));
//       }

//       if (!type || type === 'withdrawals') {
//         const withdrawals = await WithdrawalModel.find()
//           .populate('campaignId', 'title')
//           .populate('approvedBy', 'firstName lastName email')
//           .sort({ createdAt: -1 })
//           .skip(skip)
//           .limit(limit)
//           .lean();

//         const withdrawalLogs = withdrawals.map(w => ({
//           id: w._id,
//           type: 'withdrawal',
//           action: w.status,
//           targetId: w.campaignId?._id,
//           targetName: w.campaignId?.title,
//           amount: w.amount,
//           notes: w.rejectionReason,
//           createdAt: w.createdAt
//         }));

//         logs = [...logs, ...withdrawalLogs];
//       }

//       logs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
//       total = logs.length;

//       ApiResponse.ok(res, 'Audit logs retrieved', {
//         logs: logs.slice(0, limit),
//         total,
//         page,
//         totalPages: Math.ceil(total / limit)
//       });
//     } catch (error) {
//       if (error instanceof ApiError) {
//         res.status(error.getHttpStatus()).json(error.toResponse());
//       } else {
//         throw error;
//       }
//     }
//   })
// );

export default router;
