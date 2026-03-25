export interface ApprovalItem {
  id: string;
  campaignId: string;
  title: string;
  recipientName: string;
  hospitalName: string;
  targetAmount: number;
  raisedAmount: number;
  aiConfidence: number;
  hospitalVerified: boolean;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  overrideReason?: string;
}