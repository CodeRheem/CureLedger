import { Schema, model, Document, Types } from 'mongoose';

export enum VerifiedByRole {
  HOSPITAL = 'hospital',
  ADMIN = 'admin'
}

export interface IVerification extends Document {
  campaignId: Types.ObjectId;
  verifiedBy: Types.ObjectId;
  verifiedByRole: VerifiedByRole;
  verified: boolean;
  notes: string;
  createdAt: Date;
}

const verificationSchema = new Schema<IVerification>(
  {
    campaignId: {
      type: Schema.Types.ObjectId,
      ref: 'Campaign',
      required: true
    },
    verifiedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    verifiedByRole: {
      type: String,
      enum: Object.values(VerifiedByRole),
      required: true
    },
    verified: {
      type: Boolean,
      required: true
    },
    notes: {
      type: String,
      default: ''
    }
  },
  { timestamps: true }
);

verificationSchema.index({ campaignId: 1 });
verificationSchema.index({ verifiedBy: 1 });

export default model<IVerification>('Verification', verificationSchema);
