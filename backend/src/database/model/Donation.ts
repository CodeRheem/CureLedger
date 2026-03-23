import { Schema, model, Document, Types } from 'mongoose';

export enum DonationStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed'
}

export interface IDonation extends Document {
  campaignId: Types.ObjectId;
  amount: number;
  donorName: string;
  donorEmail: string;
  message?: string;
  status: DonationStatus;
  paymentReference?: string;
  transactionId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const donationSchema = new Schema<IDonation>(
  {
    campaignId: {
      type: Schema.Types.ObjectId,
      ref: 'Campaign',
      required: true
    },
    amount: {
      type: Number,
      required: true,
      min: 1
    },
    donorName: {
      type: String,
      required: true,
      trim: true
    },
    donorEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    message: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      enum: Object.values(DonationStatus),
      default: DonationStatus.PENDING
    },
    paymentReference: {
      type: String,
      default: null
    },
    transactionId: {
      type: String,
      default: null
    }
  },
  { timestamps: true }
);

donationSchema.index({ campaignId: 1 });
donationSchema.index({ status: 1 });

export default model<IDonation>('Donation', donationSchema);
