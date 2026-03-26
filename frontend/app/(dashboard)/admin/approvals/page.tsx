'use client';

import { useState, useEffect } from 'react';
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
import { api } from '@/lib/api';

export default function AdminApprovalsPage() {
  const [approvals, setApprovals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApproval, setSelectedApproval] = useState<ApprovalItem | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [overrideReason, setOverrideReason] = useState('');

  useEffect(() => {
    async function fetchPendingCampaigns() {
      try {
        const data = await api.getPendingCampaigns('pending_admin');
        setApprovals((data.campaigns || []).map((campaign: any, idx: number) => ({
          id: `approval-${idx}`,
          campaignId: campaign.id,
          title: campaign.title,
          recipientName: campaign.recipientName || campaign.recipient?.firstName + ' ' + campaign.recipient?.lastName,
          hospitalName: campaign.hospitalName || campaign.hospital?.hospitalName,
          targetAmount: campaign.targetAmount,
          raisedAmount: campaign.amountRaised || campaign.raisedAmount || 0,
          aiConfidence: 85, // Mock value - would come from backend if available
          hospitalVerified: campaign.verification?.hospitalVerified || false,
          submittedAt: campaign.createdAt,
          status: 'pending',
        })));
      } catch (err) {
        console.error('Failed to fetch pending campaigns:', err);
        // Fallback to mock data
        setApprovals(mockCampaigns
          .filter(c => c.status === 'pending_admin')
          .map((campaign, idx) => ({
            id: `approval-${idx}`,
            campaignId: campaign.id,
            title: campaign.title,
            recipientName: campaign.recipientName,
            hospitalName: campaign.hospitalName,
            targetAmount: campaign.targetAmount,
            raisedAmount: campaign.amountRaised || campaign.raisedAmount || 0,
            aiConfidence: 85,
            hospitalVerified: campaign.verification?.hospitalVerified || false,
            submittedAt: campaign.createdAt,
            status: 'pending',
          })));
      } finally {
        setLoading(false);
      }
    }
    fetchPendingCampaigns();
  }, []);

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
        <StatsCard label="Pending Review" value={loading ? '...' : approvals.filter((a) => a.status === 'pending').length} />
        <StatsCard label="Approved" value={loading ? '...' : approvals.filter((a) => a.status === 'approved').length} />
        <StatsCard label="Rejected" value={loading ? '...' : approvals.filter((a) => a.status === 'rejected').length} />
        <StatsCard
          label="Auto-Approved"
          value={loading ? '...' : approvals.filter((a) => a.aiConfidence >= 95 && a.status === 'approved').length}
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-border">
              <h3 className="font-heading text-xl font-bold">Campaign Review</h3>
              <p className="text-sm text-muted-foreground mt-1">Review all details before approving</p>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Campaign Summary */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Campaign Title</p>
                  <p className="font-semibold mt-1">{selectedApproval.title}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Target Amount</p>
                  <p className="font-semibold mt-1">₦{selectedApproval.targetAmount.toLocaleString()}</p>
                </div>
              </div>

              {/* Recipient Info */}
              <div className="border border-border rounded-lg p-4">
                <h4 className="font-semibold text-sm mb-3">Recipient Information</h4>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">Name</p>
                    <p className="font-medium">{selectedApproval.recipientName}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Contact</p>
                    <p className="font-medium">+234 800 000 0000</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Email</p>
                    <p className="font-medium">recipient@email.com</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Location</p>
                    <p className="font-medium">Lagos, Nigeria</p>
                  </div>
                </div>
              </div>

              {/* Hospital Info */}
              <div className="border border-border rounded-lg p-4">
                <h4 className="font-semibold text-sm mb-3">Hospital Information</h4>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">Hospital Name</p>
                    <p className="font-medium">{selectedApproval.hospitalName}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Verification Status</p>
                    <Badge className="mt-1 bg-green-100 text-green-700">Verified</Badge>
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div className="border border-border rounded-lg p-4">
                <h4 className="font-semibold text-sm mb-3">Submitted Documents</h4>
                <div className="space-y-2">
                  {['Medical Report.pdf', 'Prescription.pdf', 'Hospital Letter.pdf'].map((doc, i) => (
                    <div key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm">
                      <span className="flex items-center gap-2">
                        <HugeiconsIcon icon={CheckmarkCircle02Icon} className="w-4 h-4 text-muted-foreground" />
                        {doc}
                      </span>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Confidence */}
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

              {/* Notes */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  {selectedApproval.aiConfidence < 95 ? 'Override Reason' : 'Notes (optional)'}
                </label>
                <textarea
                  className="w-full p-3 border border-input rounded-lg text-sm"
                  rows={3}
                  placeholder={selectedApproval.aiConfidence < 95 
                    ? "Explain why you are overriding the AI recommendation..." 
                    : "Add any notes about this decision..."}
                  value={overrideReason}
                  onChange={(e) => setOverrideReason(e.target.value)}
                />
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-border flex gap-3">
              <Button
                onClick={() => handleApproval(selectedApproval.id, 'approve', selectedApproval.aiConfidence < 95)}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                Approve Campaign
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