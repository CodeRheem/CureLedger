import RecipientModel, { IRecipient } from '../model/Recipient';
import { Types } from 'mongoose';

export class RecipientRepo {
  static async create(data: {
    userId: Types.ObjectId;
    location: string;
    medicalCondition?: string;
  }): Promise<IRecipient> {
    const recipient = new RecipientModel(data);
    return recipient.save();
  }

  static async findByUserId(userId: string | Types.ObjectId): Promise<IRecipient | null> {
    return RecipientModel.findOne({ userId }).populate('userId');
  }

  static async findAll(page: number = 1, limit: number = 20): Promise<{ recipients: IRecipient[]; total: number }> {
    const skip = (page - 1) * limit;
    const recipients = await RecipientModel.find()
      .populate('userId', 'email firstName lastName phone')
      .skip(skip)
      .limit(limit);
    const total = await RecipientModel.countDocuments();
    return { recipients, total };
  }

  static async updateProfile(
    userId: string | Types.ObjectId,
    data: Partial<IRecipient>
  ): Promise<IRecipient | null> {
    return RecipientModel.findOneAndUpdate({ userId }, data, { new: true });
  }
}
