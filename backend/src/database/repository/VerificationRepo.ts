import VerificationModel, { IVerification, VerifiedByRole } from '../model/Verification';
import { Types } from 'mongoose';

export class VerificationRepo {
  static async create(data: {
    campaignId: Types.ObjectId;
    verifiedBy: Types.ObjectId;
    verifiedByRole: VerifiedByRole;
    verified: boolean;
    notes?: string;
  }): Promise<IVerification> {
    const verification = new VerificationModel(data);
    return verification.save();
  }

  static async findByCampaignId(campaignId: string | Types.ObjectId): Promise<IVerification[]> {
    return VerificationModel.find({ campaignId })
      .populate('verifiedBy', 'email firstName lastName')
      .sort({ createdAt: -1 });
  }

  static async findLatestByCampaignId(campaignId: string | Types.ObjectId): Promise<IVerification | null> {
    return VerificationModel.findOne({ campaignId })
      .populate('verifiedBy', 'email firstName lastName')
      .sort({ createdAt: -1 });
  }

  static async findByVerifiedBy(
    verifiedBy: string | Types.ObjectId,
    page: number = 1,
    limit: number = 20
  ): Promise<{ verifications: IVerification[]; total: number }> {
    const skip = (page - 1) * limit;
    const verifications = await VerificationModel.find({ verifiedBy })
      .populate('campaignId', 'title status')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    const total = await VerificationModel.countDocuments({ verifiedBy });
    return { verifications, total };
  }
}
