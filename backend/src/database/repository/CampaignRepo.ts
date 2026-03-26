import CampaignModel, { ICampaign, CampaignStatus } from '../model/Campaign';
import { Types } from 'mongoose';

export class CampaignRepo {
  static async create(data: {
    title: string;
    description: string;
    targetAmount: number;
    condition: string;
    recipientId: Types.ObjectId;
    hospitalId: Types.ObjectId;
    endsAt: Date;
  }): Promise<ICampaign> {
    const campaign = new CampaignModel(data);
    return campaign.save();
  }

  static async findById(id: string | Types.ObjectId): Promise<ICampaign | null> {
    return CampaignModel.findById(id)
      .populate('recipientId', 'email firstName lastName phone avatar')
      .populate('hospitalId', 'hospitalName');
  }

  static async findByStatus(
    status: CampaignStatus,
    page: number = 1,
    limit: number = 20
  ): Promise<{ campaigns: ICampaign[]; total: number }> {
    const skip = (page - 1) * limit;
    const campaigns = await CampaignModel.find({ status })
      .populate('recipientId', 'email firstName lastName phone avatar')
      .populate('hospitalId', 'hospitalName')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    const total = await CampaignModel.countDocuments({ status });
    return { campaigns, total };
  }

  static async findByStatusAndHospital(
    status: CampaignStatus,
    page: number = 1,
    limit: number = 20,
    hospitalId?: string
  ): Promise<{ campaigns: ICampaign[]; total: number }> {
    const skip = (page - 1) * limit;
    const query: { status: CampaignStatus; hospitalId?: string } = { status };
    if (hospitalId) {
      query.hospitalId = hospitalId;
    }
    const campaigns = await CampaignModel.find(query)
      .populate('recipientId', 'email firstName lastName phone avatar')
      .populate('hospitalId', 'hospitalName')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    const total = await CampaignModel.countDocuments(query);
    return { campaigns, total };
  }

  static async findAll(page: number = 1, limit: number = 20): Promise<{ campaigns: ICampaign[]; total: number }> {
    const skip = (page - 1) * limit;
    const campaigns = await CampaignModel.find()
      .populate('recipientId', 'email firstName lastName phone avatar')
      .populate('hospitalId', 'hospitalName')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    const total = await CampaignModel.countDocuments();
    return { campaigns, total };
  }

  static async findByRecipientId(
    recipientId: string | Types.ObjectId,
    page: number = 1,
    limit: number = 20
  ): Promise<{ campaigns: ICampaign[]; total: number }> {
    const skip = (page - 1) * limit;
    const campaigns = await CampaignModel.find({ recipientId })
      .populate('recipientId', 'email firstName lastName phone avatar')
      .populate('hospitalId', 'hospitalName')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    const total = await CampaignModel.countDocuments({ recipientId });
    return { campaigns, total };
  }

  static async findByHospitalId(
    hospitalId: string | Types.ObjectId,
    page: number = 1,
    limit: number = 20
  ): Promise<{ campaigns: ICampaign[]; total: number }> {
    const skip = (page - 1) * limit;
    const campaigns = await CampaignModel.find({ hospitalId })
      .populate('recipientId', 'email firstName lastName phone avatar')
      .populate('hospitalId', 'hospitalName')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    const total = await CampaignModel.countDocuments({ hospitalId });
    return { campaigns, total };
  }

  static async updateStatus(
    id: string | Types.ObjectId,
    status: CampaignStatus
  ): Promise<ICampaign | null> {
    return CampaignModel.findByIdAndUpdate(id, { status }, { new: true });
  }

  static async updateRaisedAmount(
    id: string | Types.ObjectId,
    amount: number
  ): Promise<ICampaign | null> {
    return CampaignModel.findByIdAndUpdate(
      id,
      { $inc: { raisedAmount: amount, donorCount: 1 } },
      { new: true }
    );
  }

  static async update(
    id: string | Types.ObjectId,
    data: Partial<ICampaign>
  ): Promise<ICampaign | null> {
    return CampaignModel.findByIdAndUpdate(id, data, { new: true });
  }
}
