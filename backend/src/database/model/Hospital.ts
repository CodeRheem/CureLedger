import { Schema, model, Document, Types } from 'mongoose';

export interface IHospital extends Document {
  userId: Types.ObjectId;
  hospitalName: string;
  hospitalLicense: string;
  address: string;
  verified: boolean;
  verifiedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const hospitalSchema = new Schema<IHospital>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    hospitalName: {
      type: String,
      required: true,
      trim: true
    },
    hospitalLicense: {
      type: String,
      required: true,
      unique: true
    },
    address: {
      type: String,
      default: ''
    },
    verified: {
      type: Boolean,
      default: false
    },
    verifiedAt: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

export default model<IHospital>('Hospital', hospitalSchema);
