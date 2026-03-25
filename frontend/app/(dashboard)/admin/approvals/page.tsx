'use client';

import { useState } from 'react';
import Link from 'next/link';
import { HugeiconsIcon } from '@hugeicons/react';
import { CheckmarkCircle02Icon } from '@hugeicons/core-free-icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockCampaigns } from '@/lib/mock-data';
import { StatsCard } from '@/components/shared/stats-card';
import { PendingApprovalItem } from './components/pending-approval-item';
import { ProcessedApprovalItem } from './components/processed-approval-item';
import type { ApprovalItem } from './components/approval-types';

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
        <StatsCard label="Pending Review" value={approvals.filter((a) => a.status === 'pending').length} />
        <StatsCard label="Approved" value={approvals.filter((a) => a.status === 'approved').length} />
        <StatsCard label="Rejected" value={approvals.filter((a) => a.status === 'rejected').length} />
        <StatsCard
          label="Auto-Approved"
          value={approvals.filter((a) => a.aiConfidence >= 95 && a.status === 'approved').length}
        />
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
                <HugeiconsIcon icon={CheckmarkCircle02Icon} className="w-8 h-8 empty-state-icon" strokeWidth={1.5} />
              </div>
              <p className="text-muted-foreground">No pending approvals</p>
            </div>
          ) : (
            <div className="space-y-4">
              {approvals
                .filter((a) => a.status === 'pending')
                .map((approval) => (
                  <PendingApprovalItem
                    key={approval.id}
                    approval={approval}
                    getConfidenceColor={getConfidenceColor}
                    onReview={() => {
                      setSelectedApproval(approval);
                      setShowModal(true);
                    }}
                  />
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
                  <ProcessedApprovalItem key={approval.id} approval={approval} />
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