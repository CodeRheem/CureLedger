import { Schema, model, Document, Types } from 'mongoose';

export enum WithdrawalStatus {
  PENDING_APPROVAL = 'pending_approval',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  COMPLETED = 'completed'
}

export interface IWithdrawal extends Document {
  campaignId: Types.ObjectId;
  amount: number;
  bankAccount: string;
  bankName: string;
  accountName: string;
  status: WithdrawalStatus;
  approvedBy?: Types.ObjectId;
  approvedAt?: Date;
  rejectionReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

const withdrawalSchema = new Schema<IWithdrawal>(
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
    bankAccount: {
      type: String,
      required: true
    },
    bankName: {
      type: String,
      required: true
    },
    accountName: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: Object.values(WithdrawalStatus),
      default: WithdrawalStatus.PENDING_APPROVAL
    },
    approvedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },
    approvedAt: {
      type: Date,
      default: null
    },
    rejectionReason: {
      type: String,
      default: null
    }
  },
  { timestamps: true }
);

withdrawalSchema.index({ campaignId: 1 });
withdrawalSchema.index({ status: 1 });

export default model<IWithdrawal>('Withdrawal', withdrawalSchema);
