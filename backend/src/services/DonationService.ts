import { DonationRepo } from '@database/repository/DonationRepo';
import { CampaignRepo } from '@database/repository/CampaignRepo';
import { CampaignStatus } from '@database/model/Campaign';
import { DonationStatus } from '@database/model/Donation';
import { ApiError } from '@core/ApiError';
import { Types } from 'mongoose';

export class DonationService {
  static async createDonation(data: {
    campaignId: string;
    amount: number;
    donorName: string;
    donorEmail: string;
    message?: string;
  }) {
    // Verify campaign exists and is approved
    const campaign = await CampaignRepo.findById(data.campaignId);
    if (!campaign) {
      throw ApiError.notFound('Campaign not found');
    }

    if (campaign.status !== CampaignStatus.APPROVED) {
      throw ApiError.validation('Can only donate to approved campaigns');
    }

    const paymentReference = `PAY_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const donation = await DonationRepo.create({
      campaignId: new Types.ObjectId(data.campaignId),
      amount: data.amount,
      donorName: data.donorName,
      donorEmail: data.donorEmail.toLowerCase(),
      message: data.message || '',
      paymentReference
    });

    // TODO: Call Interswitch or payment gateway here

    return {
      id: donation._id,
      campaignId: donation.campaignId,
      amount: donation.amount,
      status: donation.status,
      paymentReference: donation.paymentReference,
      createdAt: donation.createdAt
    };
  }

  static async getCampaignDonations(
    campaignId: string,
    userId: string,
    userRole: string,
    page: number = 1,
    limit: number = 20
  ) {
    // Verify campaign exists
    const campaign = await CampaignRepo.findById(campaignId);
    if (!campaign) {
      throw ApiError.notFound('Campaign not found');
    }

    // Check permissions: recipient (owns campaign) or admin
    const isRecipient = campaign.recipientId.toString() === userId;
    const isAdmin = userRole === 'admin';

    if (!isRecipient && !isAdmin) {
      throw ApiError.forbidden('Cannot view donations for this campaign');
    }

    const { donations, total } = await DonationRepo.findByCampaignId(campaignId, page, limit);

    return {
      donations: donations.map(d => ({
        id: d._id,
        amount: d.amount,
        donorName: d.donorName,
        message: d.message,
        createdAt: d.createdAt
      })),
      total,
      page,
      totalPages: Math.ceil(total / limit)
    };
  }

  static async confirmDonation(paymentReference: string, transactionId?: string) {
    const donation = await DonationRepo.findByPaymentReference(paymentReference);

    if (!donation) {
      throw ApiError.notFound('Donation not found');
    }

    // Update donation status
    await DonationRepo.updateStatus(donation._id, DonationStatus.COMPLETED, transactionId);

    // Update campaign raised amount
    await CampaignRepo.updateRaisedAmount(donation.campaignId, donation.amount);

    return donation;
  }
}
