import UserModel, { IUser, UserRole } from '../model/User';
import { Types } from 'mongoose';

export class UserRepo {
  static async create(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
    role: UserRole;
  }): Promise<IUser> {
    const user = new UserModel(data);
    return user.save();
  }

  static async findById(id: string | Types.ObjectId): Promise<IUser | null> {
    return UserModel.findById(id);
  }

  static async findByEmail(email: string): Promise<IUser | null> {
    return UserModel.findOne({ email: email.toLowerCase() });
  }

  static async findByEmailWithPassword(email: string): Promise<IUser | null> {
    return UserModel.findOne({ email: email.toLowerCase() }).select('+password');
  }

  static async findByRole(role: UserRole): Promise<IUser[]> {
    return UserModel.find({ role });
  }

  static async updateProfile(
    id: string | Types.ObjectId,
    data: Partial<IUser>
  ): Promise<IUser | null> {
    return UserModel.findByIdAndUpdate(id, data, { new: true });
  }

  static async findAll(page: number = 1, limit: number = 20): Promise<{ users: IUser[]; total: number }> {
    const skip = (page - 1) * limit;
    const users = await UserModel.find().skip(skip).limit(limit);
    const total = await UserModel.countDocuments();
    return { users, total };
  }

  static async delete(id: string | Types.ObjectId): Promise<boolean> {
    const result = await UserModel.findByIdAndDelete(id);
    return result !== null;
  }
}
