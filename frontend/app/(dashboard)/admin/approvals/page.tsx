'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockCampaigns } from '@/lib/mock-data';

interface ApprovalItem {
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

const pendingApprovals: ApprovalItem[] = [
  {
    id: 'approval-1',
    campaignId: 'campaign-3',
    title: 'Kidney Transplant Surgery',
    recipientName: 'Muhammed Ahmed',
    hospitalName: 'Lagos General Hospital',
    targetAmount: 4000000,
    raisedAmount: 500000,
    aiConfidence: 97,
    hospitalVerified: true,
    submittedAt: '2024-03-01',
    status: 'pending',
  },
  {
    id: 'approval-2',
    campaignId: 'campaign-new',
    title: 'Emergency Brain Surgery',
    recipientName: 'Chidi Obi',
    hospitalName: 'Abuja Medical Centre',
    targetAmount: 5000000,
    raisedAmount: 0,
    aiConfidence: 72,
    hospitalVerified: true,
    submittedAt: '2024-03-02',
    status: 'pending',
  },
];

export default function AdminApprovalsPage() {
  const [approvals, setApprovals] = useState(pendingApprovals);
  const [selectedApproval, setSelectedApproval] = useState<ApprovalItem | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [overrideReason, setOverrideReason] = useState('');

  const handleApproval = (id: string, action: 'approve' | 'reject', override = false) => {
    setApprovals((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: action === 'approve' ? 'approved' : 'rejected',
              overrideReason: override ? overrideReason : undefined,
            }
          : item
      )
    );
    setShowModal(false);
    setSelectedApproval(null);
    setOverrideReason('');
  };

  const getConfidenceColor = (score: number) => {
    if (score >= 95) return 'text-green-600';
    if (score >= 85) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getConfidenceBg = (score: number) => {
    if (score >= 95) return 'bg-green-50 border-green-200';
    if (score >= 85) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-foreground mb-2">Approval Queue</h1>
        <p className="text-muted-foreground">Review campaigns with AI confidence scores and override controls</p>
      </div>

      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100/50 border-yellow-100">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-1">Pending Review</p>
            <p className="text-3xl font-bold text-yellow-600">
              {approvals.filter((a) => a.status === 'pending').length}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100/50 border-green-100">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-1">Approved</p>
            <p className="text-3xl font-bold text-green-600">
              {approvals.filter((a) => a.status === 'approved').length}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-red-50 to-red-100/50 border-red-100">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-1">Rejected</p>
            <p className="text-3xl font-bold text-red-600">
              {approvals.filter((a) => a.status === 'rejected').length}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-100">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-1">Auto-Approved</p>
            <p className="text-3xl font-bold text-blue-600">
              {approvals.filter((a) => a.aiConfidence >= 95 && a.status === 'approved').length}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border">
        <CardHeader>
          <CardTitle className="font-heading">Pending Approvals</CardTitle>
          <CardDescription>Campaigns awaiting final admin review</CardDescription>
        </CardHeader>
        <CardContent>
          {approvals.filter((a) => a.status === 'pending').length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full empty-state-bg flex items-center justify-center">
                <svg className="w-8 h-8 empty-state-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </div>
              <p className="text-muted-foreground">No pending approvals</p>
            </div>
          ) : (
            <div className="space-y-4">
              {approvals
                .filter((a) => a.status === 'pending')
                .map((approval) => (
                  <div
                    key={approval.id}
                    className="border border-border rounded-lg p-5 hover-lint"
                  >
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <h3 className="font-heading font-semibold text-lg text-foreground">{approval.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Recipient: {approval.recipientName} | Hospital: {approval.hospitalName}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge className="badge-warning">Pending Review</Badge>
                          {approval.hospitalVerified && (
                            <Badge className="badge-success">Hospital Verified</Badge>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`p-3 rounded-lg border ${getConfidenceBg(approval.aiConfidence)}`}>
                          <p className="text-xs text-muted-foreground mb-1">AI Confidence</p>
                          <p className={`text-2xl font-bold ${getConfidenceColor(approval.aiConfidence)}`}>
                            {approval.aiConfidence}%
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 mb-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Target Amount</p>
                        <p className="font-medium text-foreground">₦{approval.targetAmount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Raised So Far</p>
                        <p className="font-medium text-foreground">₦{approval.raisedAmount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Submitted</p>
                        <p className="font-medium text-foreground">{approval.submittedAt}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={() => {
                          setSelectedApproval(approval);
                          setShowModal(true);
                        }}
                      >
                        Review & Approve
                      </Button>
                      <Button variant="outline">View Documents</Button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </CardContent>
      </Card>

      {approvals.filter((a) => a.status !== 'pending').length > 0 && (
        <Card className="border-border mt-6">
          <CardHeader>
            <CardTitle className="font-heading">Processed Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {approvals
                .filter((a) => a.status !== 'pending')
                .map((approval) => (
                  <div key={approval.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">{approval.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {approval.recipientName} - {approval.hospitalName}
                      </p>
                      {approval.overrideReason && (
                        <p className="text-sm text-yellow-600 mt-1">Override: {approval.overrideReason}</p>
                      )}
                    </div>
                    <Badge className={approval.status === 'approved' ? 'badge-success' : 'badge-error'}>
                      {approval.status}
                    </Badge>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      {showModal && selectedApproval && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="font-heading text-xl font-bold mb-4">Review Campaign</h3>
            <div className="space-y-4 mb-6">
              <div className={`p-4 rounded-lg border ${getConfidenceBg(selectedApproval.aiConfidence)}`}>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-foreground">AI Confidence Score</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedApproval.aiConfidence >= 95
                        ? 'Above auto-approval threshold'
                        : 'Below auto-approval threshold'}
                    </p>
                  </div>
                  <p className={`text-3xl font-bold ${getConfidenceColor(selectedApproval.aiConfidence)}`}>
                    {selectedApproval.aiConfidence}%
                  </p>
                </div>
              </div>
              {selectedApproval.aiConfidence < 95 && (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Override Required:</strong> This campaign's AI confidence is below the 95% auto-approval threshold.
                    Please review carefully before approving.
                  </p>
                </div>
              )}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Override Reason (if approving below threshold)</label>
                <textarea
                  className="w-full p-3 border border-input rounded-lg text-sm"
                  rows={3}
                  placeholder="Explain why you are overriding the AI recommendation..."
                  value={overrideReason}
                  onChange={(e) => setOverrideReason(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => handleApproval(selectedApproval.id, 'approve', selectedApproval.aiConfidence < 95)}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                Approve
              </Button>
              <Button
                variant="outline"
                onClick={() => handleApproval(selectedApproval.id, 'reject')}
                className="flex-1 text-red-600 border-red-200 hover:bg-red-50"
              >
                Reject
              </Button>
              <Button variant="ghost" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}