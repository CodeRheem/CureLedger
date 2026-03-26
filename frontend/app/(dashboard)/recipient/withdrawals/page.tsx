'use client';

import { useEffect, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Add01Icon } from '@hugeicons/core-free-icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { StatsCard } from '@/components/shared/stats-card';
import { toast } from 'sonner';
import { api } from '@/lib/api';

interface Withdrawal {
  id: string;
  campaignTitle: string;
  amount: number;
  status: 'pending_approval' | 'approved' | 'completed' | 'rejected';
  requestDate: string;
  processedDate?: string;
}

export default function RecipientWithdrawalsPage() {
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [campaigns, setCampaigns] = useState<Array<{ id: string; title: string }>>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [form, setForm] = useState({
    campaignId: '',
    amount: '',
    bankAccount: '',
    bankName: '',
    accountName: '',
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const [withdrawalsData, campaignsData] = await Promise.all([
          api.getWithdrawals(),
          api.getRecipientCampaigns(),
        ]);

        setWithdrawals(
          (withdrawalsData.withdrawals || []).map((item: any) => ({
            id: item._id || item.id,
            campaignTitle: item.campaignId?.title || item.campaignTitle || 'Campaign',
            amount: item.amount,
            status: item.status,
            requestDate: item.createdAt || item.requestDate,
            processedDate: item.approvedAt || item.updatedAt,
          }))
        );

        setCampaigns(
          (campaignsData.campaigns || []).map((campaign: any) => ({
            id: campaign._id || campaign.id,
            title: campaign.title,
          }))
        );
      } catch (error) {
        console.error('Failed to load withdrawals:', error);
        toast.error('Failed to load withdrawals. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const totalWithdrawn = withdrawals
    .filter((w) => w.status === 'completed')
    .reduce((sum, w) => sum + w.amount, 0);
  const pendingAmount = withdrawals
    .filter((w) => w.status === 'pending_approval')
    .reduce((sum, w) => sum + w.amount, 0);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="badge-success">Completed</Badge>;
      case 'approved':
        return <Badge className="badge-success">Approved</Badge>;
      case 'pending_approval':
        return <Badge className="badge-warning">Pending</Badge>;
      case 'rejected':
        return <Badge className="badge-error">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleRequestWithdrawal = async () => {
    if (!form.campaignId || !form.amount || !form.bankAccount || !form.bankName || !form.accountName) {
      toast.error('Please complete all fields');
      return;
    }

    try {
      setSubmitting(true);

      await api.requestWithdrawal({
        campaignId: form.campaignId,
        amount: Number(form.amount),
        bankAccount: form.bankAccount,
        bankName: form.bankName,
        accountName: form.accountName,
      });

      const refreshed = await api.getWithdrawals();
      setWithdrawals(
        (refreshed.withdrawals || []).map((item: any) => ({
          id: item._id || item.id,
          campaignTitle: item.campaignId?.title || item.campaignTitle || 'Campaign',
          amount: item.amount,
          status: item.status,
          requestDate: item.createdAt || item.requestDate,
          processedDate: item.approvedAt || item.updatedAt,
        }))
      );

      toast.success(`Withdrawal request for ₦${parseInt(form.amount, 10).toLocaleString()} submitted`);
      setShowRequestModal(false);
      setForm({ campaignId: '', amount: '', bankAccount: '', bankName: '', accountName: '' });
    } catch (error) {
      console.error('Failed to submit withdrawal request:', error);
      toast.error('Failed to submit withdrawal request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold text-foreground mb-2">Withdrawals</h1>
            <p className="text-muted-foreground">View and manage your withdrawal requests</p>
          </div>
          <Button onClick={() => setShowRequestModal(true)}>
            <HugeiconsIcon icon={Add01Icon} className="w-4 h-4 mr-2" strokeWidth={1.5} />
            Request Withdrawal
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <StatsCard label="Total Withdrawn" value={`₦${totalWithdrawn.toLocaleString()}`} />
        <StatsCard label="Pending" value={`₦${pendingAmount.toLocaleString()}`} />
        <StatsCard label="Available Balance" value={'N200'} />
      </div>

      <Card className="border-border">
        <CardHeader>
          <CardTitle className="font-heading">Withdrawal History</CardTitle>
          <CardDescription>Track all your withdrawal requests</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Loading withdrawals...</p>
            </div>
          ) : withdrawals.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No withdrawal requests yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {withdrawals.map((withdrawal) => (
                <div
                  key={withdrawal.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg"
                >
                  <div>
                    <p className="font-medium text-foreground">{withdrawal.campaignTitle}</p>
                    <p className="text-sm text-muted-foreground">
                      Requested: {withdrawal.requestDate}
                      {withdrawal.processedDate && ` | Processed: ${withdrawal.processedDate}`}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-foreground">₦{withdrawal.amount.toLocaleString()}</p>
                    {getStatusBadge(withdrawal.status)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {showRequestModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="font-heading text-xl font-bold mb-4">Request Withdrawal</h3>
            <div className="space-y-4 mb-6">
              <div>
                <Label htmlFor="amount">Withdrawal Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={form.amount}
                  onChange={(e) => setForm((prev) => ({ ...prev, amount: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="campaignId">Campaign</Label>
                <select
                  id="campaignId"
                  value={form.campaignId}
                  onChange={(e) => setForm((prev) => ({ ...prev, campaignId: e.target.value }))}
                  className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                >
                  <option value="">Select campaign</option>
                  {campaigns.map((campaign) => (
                    <option key={campaign.id} value={campaign.id}>
                      {campaign.title}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="bankName">Bank Name</Label>
                <Input
                  id="bankName"
                  type="text"
                  placeholder="First Bank"
                  value={form.bankName}
                  onChange={(e) => setForm((prev) => ({ ...prev, bankName: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="accountName">Account Name</Label>
                <Input
                  id="accountName"
                  type="text"
                  placeholder="John Doe"
                  value={form.accountName}
                  onChange={(e) => setForm((prev) => ({ ...prev, accountName: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="bankAccount">Account Number</Label>
                <Input
                  id="bankAccount"
                  type="text"
                  placeholder="0123456789"
                  value={form.bankAccount}
                  onChange={(e) => setForm((prev) => ({ ...prev, bankAccount: e.target.value }))}
                />
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Withdrawal requests are reviewed by admins. Funds will be transferred to your registered bank account within 2-3 business days.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button className="flex-1" onClick={handleRequestWithdrawal} disabled={submitting}>
                {submitting ? 'Submitting...' : 'Submit Request'}
              </Button>
              <Button variant="outline" onClick={() => setShowRequestModal(false)} disabled={submitting}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}