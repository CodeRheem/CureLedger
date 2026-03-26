import WithdrawalModel, { IWithdrawal, WithdrawalStatus } from '../model/Withdrawal';
import { Types } from 'mongoose';

export class WithdrawalRepo {
  static async create(data: {
    campaignId: Types.ObjectId;
    amount: number;
    bankAccount: string;
    bankName: string;
    accountName: string;
  }): Promise<IWithdrawal> {
    const withdrawal = new WithdrawalModel(data);
    return withdrawal.save();
  }

  static async findById(id: string | Types.ObjectId): Promise<IWithdrawal | null> {
    return WithdrawalModel.findById(id)
      .populate('campaignId', 'title')
      .populate('approvedBy', 'email firstName lastName');
  }

  static async findByCampaignId(
    campaignId: string | Types.ObjectId,
    page: number = 1,
    limit: number = 20
  ): Promise<{ withdrawals: IWithdrawal[]; total: number }> {
    const skip = (page - 1) * limit;
    const withdrawals = await WithdrawalModel.find({ campaignId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    const total = await WithdrawalModel.countDocuments({ campaignId });
    return { withdrawals, total };
  }

  static async findByCampaignIds(
    campaignIds: Types.ObjectId[],
    page: number = 1,
    limit: number = 20
  ): Promise<{ withdrawals: IWithdrawal[]; total: number }> {
    const skip = (page - 1) * limit;
    const withdrawals = await WithdrawalModel.find({ campaignId: { $in: campaignIds } })
      .populate('campaignId', 'title')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    const total = await WithdrawalModel.countDocuments({ campaignId: { $in: campaignIds } });
    return { withdrawals, total };
  }

  static async findByStatus(
    status: WithdrawalStatus,
    page: number = 1,
    limit: number = 20
  ): Promise<{ withdrawals: IWithdrawal[]; total: number }> {
    const skip = (page - 1) * limit;
    const withdrawals = await WithdrawalModel.find({ status })
      .populate('campaignId', 'title')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    const total = await WithdrawalModel.countDocuments({ status });
    return { withdrawals, total };
  }

  static async approve(
    id: string | Types.ObjectId,
    approvedBy: Types.ObjectId
  ): Promise<IWithdrawal | null> {
    return WithdrawalModel.findByIdAndUpdate(
      id,
      { status: WithdrawalStatus.APPROVED, approvedBy, approvedAt: new Date() },
      { new: true }
    );
  }

  static async reject(
    id: string | Types.ObjectId,
    rejectionReason: string
  ): Promise<IWithdrawal | null> {
    return WithdrawalModel.findByIdAndUpdate(
      id,
      { status: WithdrawalStatus.REJECTED, rejectionReason },
      { new: true }
    );
  }

  static async markCompleted(id: string | Types.ObjectId): Promise<IWithdrawal | null> {
    return WithdrawalModel.findByIdAndUpdate(
      id,
      { status: WithdrawalStatus.COMPLETED },
      { new: true }
    );
  }
}
