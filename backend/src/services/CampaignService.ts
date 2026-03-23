import { CampaignRepo } from '@database/repository/CampaignRepo';
import { UserRepo } from '@database/repository/UserRepo';
import { HospitalRepo } from '@database/repository/HospitalRepo';
import { CampaignDocumentRepo } from '@database/repository/CampaignDocumentRepo';
import { DonationRepo } from '@database/repository/DonationRepo';
import { CampaignStatus } from '@database/model/Campaign';
import { ApiError } from '@core/ApiError';
import { Types } from 'mongoose';

export class CampaignService {
  static async createCampaign(
    recipientId: string,
    data: {
      title: string;
      description: string;
      targetAmount: number;
      condition: string;
      hospitalId: string;
      endsAt: Date;
    }
  ) {
    // Verify hospital exists
    const hospital = await HospitalRepo.findById(data.hospitalId);
    if (!hospital) {
      throw ApiError.notFound('Hospital not found');
    }

    const campaign = await CampaignRepo.create({
      title: data.title,
      description: data.description,
      targetAmount: data.targetAmount,
      condition: data.condition,
      recipientId: new Types.ObjectId(recipientId),
      hospitalId: new Types.ObjectId(data.hospitalId),
      endsAt: new Date(data.endsAt)
    });

    return campaign;
  }

  static async getCampaignDetails(campaignId: string) {
    const campaign = await CampaignRepo.findById(campaignId);
    if (!campaign) {
      throw ApiError.notFound('Campaign not found');
    }

    const documents = await CampaignDocumentRepo.findByCampaignId(campaignId);
    const { donations } = await DonationRepo.findByCampaignId(campaignId, 1, 1000);

    return {
      ...campaign.toObject(),
      documents,
      donationCount: donations.length
    };
  }

  static async getApproveCampaigns(page: number = 1, limit: number = 20) {
    return CampaignRepo.findByStatus(CampaignStatus.APPROVED, page, limit);
  }

  static async getPendingCampaigns(
    status: CampaignStatus,
    page: number = 1,
    limit: number = 20
  ) {
    if (![CampaignStatus.PENDING_HOSPITAL, CampaignStatus.PENDING_ADMIN].includes(status)) {
      throw ApiError.validation('Invalid pending status');
    }
    return CampaignRepo.findByStatus(status, page, limit);
  }

  static async updateCampaign(
    campaignId: string,
    userId: string,
    data: {
      title?: string;
      description?: string;
      endsAt?: Date;
    }
  ) {
    const campaign = await CampaignRepo.findById(campaignId);
    if (!campaign) {
      throw ApiError.notFound('Campaign not found');
    }

    // Only recipient can update
    if (campaign.recipientId.toString() !== userId) {
      throw ApiError.forbidden('Only campaign owner can update');
    }

    // Can only update pending campaigns
    if (campaign.status !== CampaignStatus.PENDING_HOSPITAL) {
      throw ApiError.validation('Cannot update non-pending campaign');
    }

    return CampaignRepo.update(campaignId, data);
  }

  static async getRecipientCampaigns(recipientId: string, page: number = 1, limit: number = 20) {
    return CampaignRepo.findByRecipientId(recipientId, page, limit);
  }
}
