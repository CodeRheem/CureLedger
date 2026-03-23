import { Schema, model, Document } from 'mongoose';
import { UserRole } from './User';

export interface IRole extends Document {
  name: UserRole;
  code: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const roleSchema = new Schema<IRole>(
  {
    name: {
      type: String,
      enum: Object.values(UserRole),
      unique: true,
      required: true
    },
    code: {
      type: String,
      unique: true,
      required: true
    },
    description: {
      type: String,
      default: ''
    }
  },
  { timestamps: true }
);

export default model<IRole>('Role', roleSchema);
