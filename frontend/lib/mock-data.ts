import {
  IUser,
  IRecipient,
  IHospital,
  ICampaign,
  IDonation,
  IVerification,
  IWithdrawal,
} from './types';

// Mock Users
export const mockUsers: IUser[] = [
  {
    id: 'user-1',
    email: 'john@example.com',
    firstName: 'John',
    lastName: 'Doe',
    phone: '+2348012345678',
    role: 'donor',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: 'user-2',
    email: 'jane@example.com',
    firstName: 'Jane',
    lastName: 'Smith',
    phone: '+2348098765432',
    role: 'recipient',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-16'),
  },
];

// Mock Recipients
export const mockRecipients: IRecipient[] = [
  {
    id: 'recipient-1',
    email: 'jane@example.com',
    firstName: 'Jane',
    lastName: 'Smith',
    phone: '+2348098765432',
    role: 'recipient',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
    bvn: '12345678901',
    accountNumber: '1234567890',
    bankName: 'First Bank',
    totalWithdrawn: 500000,
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-16'),
  },
];

// Mock Hospitals
export const mockHospitals: IHospital[] = [
  {
    id: 'hospital-1',
    email: 'lagos.general@hospital.com',
    firstName: 'Lagos',
    lastName: 'General',
    phone: '+2348012345678',
    role: 'hospital',
    hospitalName: 'Lagos General Hospital',
    hospitalLicense: 'HOSP/2024/12345',
    address: '123 Medical Street, Lagos',
    phoneNumber: '+2348012345678',
    verificationCount: 12,
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-14'),
  },
];

// Mock Campaigns
export const mockCampaigns: ICampaign[] = [
  {
    id: 'campaign-1',
    title: 'Life-Saving Heart Surgery for Young Boy',
    description:
      'Help raise funds for Tobi, a 7-year-old boy who needs urgent heart surgery to survive. The procedure costs ₦2,500,000.',
    condition: 'Congenital Heart Disease',
    medicalNeed: 'Heart Surgery',
    targetAmount: 2500000,
    raisedAmount: 1850000,
    amountRaised: 1850000,
    donorCount: 156,
    status: 'approved',
    recipientId: 'recipient-1',
    recipientName: 'Jane Smith',
    hospitalId: 'hospital-1',
    hospitalName: 'Lagos General Hospital',
    startDate: new Date('2024-02-01'),
    deadline: new Date('2024-05-31'),
    documents: [
      { name: 'Medical Report', type: 'PDF' },
      { name: 'Doctor Recommendation', type: 'PDF' },
    ],
    verification: {
      hospitalVerified: true,
      adminApproved: true,
    },
    images: ['https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800'],
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-15'),
    endsAt: new Date('2024-05-31'),
  },
  {
    id: 'campaign-2',
    title: 'Emergency Cancer Treatment',
    description:
      'Sarah needs immediate chemotherapy treatment. Every contribution brings her closer to recovery and a second chance at life.',
    condition: 'Stage 3 Breast Cancer',
    medicalNeed: 'Chemotherapy',
    targetAmount: 3500000,
    raisedAmount: 2100000,
    amountRaised: 2100000,
    donorCount: 98,
    status: 'approved',
    recipientId: 'recipient-1',
    recipientName: 'Jane Smith',
    hospitalId: 'hospital-1',
    hospitalName: 'Lagos General Hospital',
    startDate: new Date('2024-02-10'),
    deadline: new Date('2024-06-30'),
    documents: [
      { name: 'Cancer Diagnosis', type: 'PDF' },
      { name: 'Treatment Plan', type: 'PDF' },
    ],
    verification: {
      hospitalVerified: true,
      adminApproved: true,
    },
    images: ['https://images.unsplash.com/photo-1579154204601-01d82f27e763?w=800'],
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-20'),
    endsAt: new Date('2024-06-30'),
  },
  {
    id: 'campaign-3',
    title: 'Kidney Transplant Surgery',
    description: 'Help Muhammed get life-saving kidney transplant surgery at a cost of ₦4,000,000.',
    condition: 'End-Stage Renal Disease',
    medicalNeed: 'Kidney Transplant',
    targetAmount: 4000000,
    raisedAmount: 500000,
    amountRaised: 500000,
    donorCount: 42,
    status: 'pending_admin',
    recipientId: 'recipient-1',
    recipientName: 'Jane Smith',
    hospitalId: 'hospital-1',
    hospitalName: 'Lagos General Hospital',
    startDate: new Date('2024-02-28'),
    deadline: new Date('2024-07-31'),
    documents: [
      { name: 'Kidney Test Results', type: 'PDF' },
      { name: 'Transplant Approval', type: 'PDF' },
    ],
    verification: {
      hospitalVerified: true,
      adminApproved: false,
    },
    images: ['https://images.unsplash.com/photo-1631217314160-dc5ded092a24?w=800'],
    createdAt: new Date('2024-02-28'),
    updatedAt: new Date('2024-03-01'),
    endsAt: new Date('2024-07-31'),
  },
];

// Mock Donations
export const mockDonations: IDonation[] = [
  {
    id: 'donation-1',
    campaignId: 'campaign-1',
    donorId: 'user-1',
    amount: 50000,
    transactionId: 'txn-001',
    status: 'completed',
    createdAt: new Date('2024-02-05'),
  },
  {
    id: 'donation-2',
    campaignId: 'campaign-1',
    donorId: 'user-2',
    amount: 100000,
    transactionId: 'txn-002',
    status: 'completed',
    createdAt: new Date('2024-02-06'),
  },
];

// Mock Verifications
export const mockVerifications: IVerification[] = [
  {
    id: 'verification-1',
    campaignId: 'campaign-1',
    hospitalId: 'hospital-1',
    status: 'approved',
    notes: 'Documents verified. Patient identity confirmed.',
    verifiedAt: new Date('2024-02-10'),
  },
  {
    id: 'verification-2',
    campaignId: 'campaign-3',
    hospitalId: 'hospital-1',
    status: 'pending',
    notes: '',
  },
];

// Mock Withdrawals
export const mockWithdrawals: IWithdrawal[] = [
  {
    id: 'withdrawal-1',
    campaignId: 'campaign-1',
    recipientId: 'recipient-1',
    amount: 500000,
    status: 'completed',
    requestedAt: new Date('2024-02-20'),
    processedAt: new Date('2024-02-22'),
  },
];
