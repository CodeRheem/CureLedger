import HospitalModel, { IHospital } from '../model/Hospital';
import { Types } from 'mongoose';

export class HospitalRepo {
  static async create(data: {
    userId: Types.ObjectId;
    hospitalName: string;
    hospitalLicense: string;
    address?: string;
  }): Promise<IHospital> {
    const hospital = new HospitalModel(data);
    return hospital.save();
  }

  static async findByUserId(userId: string | Types.ObjectId): Promise<IHospital | null> {
    return HospitalModel.findOne({ userId }).populate('userId');
  }

  static async findById(id: string | Types.ObjectId): Promise<IHospital | null> {
    return HospitalModel.findById(id).populate('userId', 'email firstName lastName phone');
  }

  static async findAll(page: number = 1, limit: number = 20): Promise<{ hospitals: IHospital[]; total: number }> {
    const skip = (page - 1) * limit;
    const hospitals = await HospitalModel.find()
      .populate('userId', 'email firstName lastName phone')
      .skip(skip)
      .limit(limit);
    const total = await HospitalModel.countDocuments();
    return { hospitals, total };
  }

  static async findAllVerified(): Promise<IHospital[]> {
    return HospitalModel.find({ verified: true }).populate('userId', 'email firstName lastName phone');
  }

  static async verify(id: string | Types.ObjectId): Promise<IHospital | null> {
    return HospitalModel.findByIdAndUpdate(
      id,
      { verified: true, verifiedAt: new Date() },
      { new: true }
    );
  }

  static async updateProfile(
    userId: string | Types.ObjectId,
    data: Partial<IHospital>
  ): Promise<IHospital | null> {
    return HospitalModel.findOneAndUpdate({ userId }, data, { new: true });
  }
}
