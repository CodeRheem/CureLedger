// User Roles
export type UserRole = 'donor' | 'recipient' | 'hospital' | 'admin';

// User
export interface IUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Recipient Profile
export interface IRecipient extends IUser {
  role: 'recipient';
  bvn: string;
  accountNumber: string;
  bankName: string;
  totalWithdrawn: number;
}

// Hospital Profile
export interface IHospital extends IUser {
  role: 'hospital';
  hospitalName: string;
  hospitalLicense: string;
  address: string;
  phoneNumber: string;
  verificationCount: number;
}

// Campaign Status
export type CampaignStatus = 'pending_hospital' | 'pending_admin' | 'approved' | 'rejected' | 'completed' | 'draft';

// Campaign
export interface ICampaign {
  id: string;
  title: string;
  description: string;
  condition: string;
  medicalNeed?: string; // alias for condition
  targetAmount: number;
  raisedAmount: number;
  amountRaised?: number; // alias for raisedAmount
  donorCount: number;
  status: CampaignStatus;
  recipientId: string;
  recipientName?: string;
  hospitalId?: string;
  hospitalName?: string;
  startDate?: Date;
  deadline?: Date;
  images: string[];
  documents?: { name: string; type: string }[];
  verification?: { hospitalVerified: boolean; adminApproved: boolean };
  createdAt: Date;
  updatedAt: Date;
  endsAt: Date;
}

// Campaign Document
export interface ICampaignDocument {
  id: string;
  campaignId: string;
  fileName: string;
  fileUrl: string;
  docType: 'medical_report' | 'prescription' | 'hospital_letter' | 'other';
  uploadedAt: Date;
  aiScore?: number;
}

// Donation
export interface IDonation {
  id: string;
  campaignId: string;
  donorId: string;
  amount: number;
  transactionId: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: Date;
}

// Verification (Hospital verifies campaign)
export interface IVerification {
  id: string;
  campaignId: string;
  hospitalId: string;
  status: 'pending' | 'approved' | 'rejected';
  notes: string;
  verifiedAt?: Date;
}

// Withdrawal Request
export interface IWithdrawal {
  id: string;
  campaignId: string;
  recipientId: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  requestedAt: Date;
  processedAt?: Date;
}
