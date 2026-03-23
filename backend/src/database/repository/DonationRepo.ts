import DonationModel, { IDonation, DonationStatus } from '../model/Donation';
import { Types } from 'mongoose';

export class DonationRepo {
  static async create(data: {
    campaignId: Types.ObjectId;
    amount: number;
    donorName: string;
    donorEmail: string;
    message?: string;
    paymentReference?: string;
  }): Promise<IDonation> {
    const donation = new DonationModel(data);
    return donation.save();
  }

  static async findById(id: string | Types.ObjectId): Promise<IDonation | null> {
    return DonationModel.findById(id);
  }

  static async findByCampaignId(
    campaignId: string | Types.ObjectId,
    page: number = 1,
    limit: number = 20
  ): Promise<{ donations: IDonation[]; total: number }> {
    const skip = (page - 1) * limit;
    const donations = await DonationModel.find({ campaignId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    const total = await DonationModel.countDocuments({ campaignId });
    return { donations, total };
  }

  static async getTotalByCampaignId(campaignId: string | Types.ObjectId): Promise<number> {
    const result = await DonationModel.aggregate([
      { $match: { campaignId: new Types.ObjectId(String(campaignId)), status: DonationStatus.COMPLETED } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    return result.length > 0 ? result[0].total : 0;
  }

  static async updateStatus(
    id: string | Types.ObjectId,
    status: DonationStatus,
    transactionId?: string
  ): Promise<IDonation | null> {
    const updateData: any = { status };
    if (transactionId) {
      updateData.transactionId = transactionId;
    }
    return DonationModel.findByIdAndUpdate(id, updateData, { new: true });
  }

  static async findByPaymentReference(reference: string): Promise<IDonation | null> {
    return DonationModel.findOne({ paymentReference: reference });
  }
}
