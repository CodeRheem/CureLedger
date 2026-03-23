import { Schema, model, Document, Types } from 'mongoose';

export enum CampaignStatus {
  PENDING_HOSPITAL = 'pending_hospital',
  PENDING_ADMIN = 'pending_admin',
  APPROVED = 'approved',
  REJECTED = 'rejected'
}

export interface ICampaign extends Document {
  title: string;
  description: string;
  targetAmount: number;
  raisedAmount: number;
  donorCount: number;
  status: CampaignStatus;
  recipientId: Types.ObjectId;
  hospitalId: Types.ObjectId;
  condition: string;
  images: string[];
  endsAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const campaignSchema = new Schema<ICampaign>(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    targetAmount: {
      type: Number,
      required: true,
      min: 1000
    },
    raisedAmount: {
      type: Number,
      default: 0,
      min: 0
    },
    donorCount: {
      type: Number,
      default: 0,
      min: 0
    },
    status: {
      type: String,
      enum: Object.values(CampaignStatus),
      default: CampaignStatus.PENDING_HOSPITAL,
      required: true
    },
    recipientId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    hospitalId: {
      type: Schema.Types.ObjectId,
      ref: 'Hospital',
      required: true
    },
    condition: {
      type: String,
      required: true
    },
    images: {
      type: [String],
      default: []
    },
    endsAt: {
      type: Date,
      required: true
    }
  },
  { timestamps: true }
);

// Create index for faster queries
campaignSchema.index({ status: 1 });
campaignSchema.index({ recipientId: 1 });
campaignSchema.index({ hospitalId: 1 });
campaignSchema.index({ createdAt: -1 });

export default model<ICampaign>('Campaign', campaignSchema);
