import { Schema, model, Document, Types } from 'mongoose';

export enum DocumentType {
  MEDICAL_REPORT = 'medical_report',
  DIAGNOSIS = 'diagnosis',
  PRESCRIPTION = 'prescription',
  ID_CARD = 'id_card',
  OTHER = 'other'
}

export enum AnalysisRecommendation {
  APPROVED = 'approved',
  REJECTED = 'rejected',
  HUMAN_REVIEW = 'human_review'
}

export interface ICampaignDocument extends Document {
  campaignId: Types.ObjectId;
  type: DocumentType;
  url: string;
  aiScore: number;
  flags: string[];
  recommendation: AnalysisRecommendation;
  hospitalVerified: boolean;
  adminApproved: boolean;
  uploadedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const campaignDocumentSchema = new Schema<ICampaignDocument>(
  {
    campaignId: {
      type: Schema.Types.ObjectId,
      ref: 'Campaign',
      required: true
    },
    type: {
      type: String,
      enum: Object.values(DocumentType),
      required: true
    },
    url: {
      type: String,
      required: true
    },
    aiScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 1
    },
    flags: {
      type: [String],
      default: []
    },
    recommendation: {
      type: String,
      enum: Object.values(AnalysisRecommendation),
      default: AnalysisRecommendation.HUMAN_REVIEW
    },
    hospitalVerified: {
      type: Boolean,
      default: false
    },
    adminApproved: {
      type: Boolean,
      default: false
    },
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

campaignDocumentSchema.index({ campaignId: 1 });

export default model<ICampaignDocument>('CampaignDocument', campaignDocumentSchema);
