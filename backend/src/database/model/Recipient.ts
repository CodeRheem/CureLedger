import { Schema, model, Document, Types } from 'mongoose';

export interface IRecipient extends Document {
  userId: Types.ObjectId;
  location: string;
  medicalCondition: string;
  bankAccount?: string;
  bankName?: string;
  accountName?: string;
  createdAt: Date;
  updatedAt: Date;
}

const recipientSchema = new Schema<IRecipient>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    location: {
      type: String,
      required: true,
      trim: true
    },
    medicalCondition: {
      type: String,
      default: ''
    },
    bankAccount: {
      type: String,
      default: null
    },
    bankName: {
      type: String,
      default: null
    },
    accountName: {
      type: String,
      default: null
    }
  },
  { timestamps: true }
);

export default model<IRecipient>('Recipient', recipientSchema);
