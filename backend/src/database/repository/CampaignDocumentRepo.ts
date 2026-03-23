import CampaignDocumentModel, { ICampaignDocument, AnalysisRecommendation } from '../model/CampaignDocument';
import { Types } from 'mongoose';

export class CampaignDocumentRepo {
  static async create(data: {
    campaignId: Types.ObjectId;
    type: string;
    url: string;
  }): Promise<ICampaignDocument> {
    const document = new CampaignDocumentModel(data);
    return document.save();
  }

  static async findById(id: string | Types.ObjectId): Promise<ICampaignDocument | null> {
    return CampaignDocumentModel.findById(id);
  }

  static async findByCampaignId(campaignId: string | Types.ObjectId): Promise<ICampaignDocument[]> {
    return CampaignDocumentModel.find({ campaignId });
  }

  static async updateAnalysis(
    id: string | Types.ObjectId,
    data: {
      aiScore: number;
      flags: string[];
      recommendation: AnalysisRecommendation;
    }
  ): Promise<ICampaignDocument | null> {
    return CampaignDocumentModel.findByIdAndUpdate(id, data, { new: true });
  }

  static async markHospitalVerified(id: string | Types.ObjectId): Promise<ICampaignDocument | null> {
    return CampaignDocumentModel.findByIdAndUpdate(id, { hospitalVerified: true }, { new: true });
  }

  static async markAdminApproved(id: string | Types.ObjectId): Promise<ICampaignDocument | null> {
    return CampaignDocumentModel.findByIdAndUpdate(id, { adminApproved: true }, { new: true });
  }
}
