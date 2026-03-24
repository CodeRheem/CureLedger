'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockCampaigns } from '@/lib/mock-data';

export default function RecipientCampaignPage() {
  const router = useRouter();
  const campaign = mockCampaigns.find((c) => c.status === 'approved' || c.status === 'pending_admin');
  
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  
  if (!campaign) {
    return (
      <div className="max-w-4xl mx-auto py-12">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full empty-state-bg flex items-center justify-center">
            <svg className="w-8 h-8 empty-state-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
            </svg>
          </div>
          <h2 className="text-xl font-heading font-bold mb-4">No Active Campaign</h2>
          <Link href="/recipient/create">
            <Button>Create Campaign</Button>
          </Link>
        </div>
      </div>
    );
  }

  const raised = campaign.amountRaised || campaign.raisedAmount || 0;
  const progress = Math.min((raised / campaign.targetAmount) * 100, 100);

  const getStatusBadge = () => {
    switch (campaign.status) {
      case 'approved':
        return <Badge className="badge-success">Live</Badge>;
      case 'pending_admin':
        return <Badge className="badge-warning">Pending Admin Review</Badge>;
      case 'pending_hospital':
        return <Badge className="badge-warning">Pending Hospital Verification</Badge>;
      default:
        return <Badge variant="outline">{campaign.status}</Badge>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link href="/recipient" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Back to Dashboard
        </Link>
      </div>

      <div className="mb-8">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h1 className="font-heading text-3xl font-bold text-foreground mb-2">{campaign.title}</h1>
            <div className="flex items-center gap-3">
              {getStatusBadge()}
              <span className="text-sm text-muted-foreground">
                Created {new Date(campaign.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Edit Campaign</Button>
            {campaign.status === 'approved' && (
              <Button onClick={() => setShowWithdrawModal(true)}>Request Withdrawal</Button>
            )}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="border-border">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-1">Amount Raised</p>
            <p className="text-2xl font-bold text-primary">₦{raised.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-1">Target Amount</p>
            <p className="text-2xl font-bold text-foreground">₦{campaign.targetAmount.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-1">Donors</p>
            <p className="text-2xl font-bold text-foreground">{campaign.donorCount}</p>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Funding Progress</span>
          <span className="font-semibold text-foreground">{Math.round(progress)}%</span>
        </div>
        <div className="h-3 progress-track">
          <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="font-heading">Campaign Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Medical Condition</p>
              <p className="font-medium text-foreground">{campaign.condition || campaign.medicalNeed}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Hospital</p>
              <p className="font-medium text-foreground">{campaign.hospitalName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Deadline</p>
              <p className="font-medium text-foreground">
                {new Date(campaign.deadline || campaign.endsAt).toLocaleDateString()}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle className="font-heading">Verification Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </div>
                <span className="font-medium text-foreground">Hospital Verification</span>
              </div>
              <Badge className={campaign.verification?.hospitalVerified ? 'badge-success' : 'badge-warning'}>
                {campaign.verification?.hospitalVerified ? 'Verified' : 'Pending'}
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </div>
                <span className="font-medium text-foreground">Admin Approval</span>
              </div>
              <Badge className={campaign.verification?.adminApproved ? 'badge-success' : 'badge-warning'}>
                {campaign.verification?.adminApproved ? 'Approved' : 'Pending'}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border mb-8">
        <CardHeader>
          <CardTitle className="font-heading">Description</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">{campaign.description}</p>
        </CardContent>
      </Card>

      <Card className="border-border">
        <CardHeader>
          <CardTitle className="font-heading">Uploaded Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {campaign.documents?.map((doc, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                  </svg>
                  <span className="font-medium text-foreground">{doc.name}</span>
                </div>
                <Button variant="ghost" size="sm">View</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="font-heading text-xl font-bold mb-4">Request Withdrawal</h3>
            <div className="space-y-4 mb-6">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Available Balance</p>
                <p className="text-2xl font-bold text-foreground">₦{raised.toLocaleString()}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Withdrawal Amount</label>
                <input
                  type="number"
                  className="w-full p-3 border border-input rounded-lg"
                  placeholder="Enter amount"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">Maximum: ₦{raised.toLocaleString()}</p>
              </div>
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  Withdrawal requests are reviewed by admins. Funds will be transferred to your registered bank account within 2-3 business days.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button className="flex-1" onClick={() => setShowWithdrawModal(false)}>
                Submit Request
              </Button>
              <Button variant="outline" onClick={() => setShowWithdrawModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}