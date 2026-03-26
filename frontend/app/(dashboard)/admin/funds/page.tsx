'use client';

import { useState, useEffect } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowRight02Icon, MoneyAdd01Icon } from '@hugeicons/core-free-icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StatsCard } from '@/components/shared/stats-card';
import { api } from '@/lib/api';

interface FundMovement {
  id: string;
  campaignId: string;
  campaignTitle: string;
  recipientName: string;
  type: 'withdrawal' | 'divert' | 'refund';
  amount: number;
  status: 'pending' | 'completed' | 'rejected';
  requestDate: string;
  processedDate?: string;
  destination?: string;
  reason?: string;
}

const fundMovements: FundMovement[] = [
  {
    id: 'fm-1',
    campaignId: 'campaign-1',
    campaignTitle: 'Life-Saving Heart Surgery',
    recipientName: 'Jane Smith',
    type: 'withdrawal',
    amount: 500000,
    status: 'completed',
    requestDate: '2024-02-20',
    processedDate: '2024-02-22',
  },
  {
    id: 'fm-2',
    campaignId: 'campaign-3',
    campaignTitle: 'Kidney Transplant Surgery',
    recipientName: 'Muhammed Ahmed',
    type: 'withdrawal',
    amount: 300000,
    status: 'pending',
    requestDate: '2024-03-02',
  },
  {
    id: 'fm-3',
    campaignId: 'campaign-2',
    campaignTitle: 'Emergency Cancer Treatment',
    recipientName: 'Sarah Williams',
    type: 'divert',
    amount: 200000,
    status: 'pending',
    requestDate: '2024-03-01',
    destination: 'Emergency Medical Fund',
    reason: 'Campaign ended - funds diverted to similar cause',
  },
];

interface FundMovement {
  id: string;
  campaignId: string;
  campaignTitle: string;
  recipientName: string;
  type: 'withdrawal' | 'divert' | 'refund';
  amount: number;
  status: 'pending' | 'completed' | 'rejected';
  requestDate: string;
  processedDate?: string;
  destination?: string;
  reason?: string;
}

export default function AdminFundsPage() {
  const [movements, setMovements] = useState<FundMovement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDivertModal, setShowDivertModal] = useState(false);
  const [selectedMovement, setSelectedMovement] = useState<FundMovement | null>(null);

  useEffect(() => {
    async function fetchWithdrawals() {
      try {
        const data = await api.getPendingWithdrawals();
        const formatted: FundMovement[] = (data.withdrawals || []).map((w: any) => ({
          id: w._id || w.id,
          campaignId: w.campaignId?._id || w.campaignId,
          campaignTitle: w.campaignId?.title || 'Unknown Campaign',
          recipientName: 'Unknown',
          type: 'withdrawal',
          amount: w.amount,
          status: w.status === 'pending_approval' ? 'pending' : w.status,
          requestDate: w.createdAt ? new Date(w.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
          processedDate: w.processedAt ? new Date(w.processedAt).toISOString().split('T')[0] : undefined,
        }));
        setMovements(formatted);
      } catch (err) {
        console.error('Failed to fetch withdrawals:', err);
        setError('Failed to load fund requests');
      } finally {
        setLoading(false);
      }
    }
    fetchWithdrawals();
  }, []);

  const handleProcess = async (id: string, action: 'approve' | 'reject') => {
    try {
      await api.processWithdrawal(id, action === 'approve');
      setMovements((prev) =>
        prev.map((m) =>
          m.id === id
            ? {
                ...m,
                status: action === 'approve' ? 'completed' : 'rejected',
                processedDate: new Date().toISOString().split('T')[0],
              }
            : m
        )
      );
    } catch (err) {
      console.error('Failed to process withdrawal:', err);
      setError('Failed to process request');
    }
  };

  const totalRaised = movements.reduce((sum, m) => sum + m.amount, 0);
  const totalWithdrawn = movements
    .filter((m) => m.type === 'withdrawal' && m.status === 'completed')
    .reduce((sum, m) => sum + m.amount, 0);
  const pendingAmount = movements
    .filter((m) => m.status === 'pending')
    .reduce((sum, m) => sum + m.amount, 0);

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-foreground mb-2">Fund Management</h1>
        <p className="text-muted-foreground">Monitor and manage campaign fund movements</p>
      </div>

      <div className="grid md:grid-cols-4 gap-4 mb-8">
        {loading ? (
          <>
            <div className="bg-white rounded-lg border border-border p-4 animate-pulse"><div className="h-4 bg-gray-200 rounded w-24 mb-2" /><div className="h-8 bg-gray-200 rounded w-20" /></div>
            <div className="bg-white rounded-lg border border-border p-4 animate-pulse"><div className="h-4 bg-gray-200 rounded w-24 mb-2" /><div className="h-8 bg-gray-200 rounded w-20" /></div>
            <div className="bg-white rounded-lg border border-border p-4 animate-pulse"><div className="h-4 bg-gray-200 rounded w-24 mb-2" /><div className="h-8 bg-gray-200 rounded w-20" /></div>
            <div className="bg-white rounded-lg border border-border p-4 animate-pulse"><div className="h-4 bg-gray-200 rounded w-24 mb-2" /><div className="h-8 bg-gray-200 rounded w-20" /></div>
          </>
        ) : error ? (
          <div className="col-span-4 bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <p className="text-red-600">{error}</p>
            <Button variant="outline" size="sm" className="mt-2" onClick={() => window.location.reload()}>Try Again</Button>
          </div>
        ) : (
          <>
            <StatsCard label="Total Raised" value={`₦${(totalRaised / 1_000_000).toFixed(1)}M`} />
            <StatsCard label="Total Withdrawn" value={`₦${(totalWithdrawn / 1_000_000).toFixed(1)}M`} />
            <StatsCard label="Pending Requests" value={pendingAmount.toLocaleString()} />
            <StatsCard
              label="Available Balance"
              value={`₦${((totalRaised - totalWithdrawn - pendingAmount) / 1_000_000).toFixed(1)}M`}
            />
          </>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="font-heading">Pending Fund Requests</CardTitle>
            <CardDescription>Funds awaiting admin approval</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="border border-border rounded-lg p-4 animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : movements.filter((m) => m.status === 'pending').length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No pending fund requests</p>
            ) : (
              <div className="space-y-4">
                {movements
                  .filter((m) => m.status === 'pending')
                  .map((movement) => (
                    <div key={movement.id} className="border border-border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-medium text-foreground">{movement.campaignTitle}</p>
                          <p className="text-sm text-muted-foreground">
                            {movement.recipientName} - {movement.type === 'divert' ? 'Fund Divert' : 'Withdrawal'}
                          </p>
                        </div>
                        <Badge
                          className={
                            movement.type === 'divert' ? 'badge-warning' : 'badge-success'
                          }
                        >
                          {movement.type === 'divert' ? 'Divert Request' : 'Withdrawal'}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-lg font-bold text-foreground">₦{movement.amount.toLocaleString()}</p>
                          {movement.destination && (
                            <p className="text-sm text-muted-foreground">
                              To: {movement.destination}
                            </p>
                          )}
                          {movement.reason && (
                            <p className="text-sm text-yellow-600">{movement.reason}</p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleProcess(movement.id, 'approve')}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleProcess(movement.id, 'reject')}
                            className="text-red-600 border-red-200"
                          >
                            Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle className="font-heading">Fund Divert Configuration</CardTitle>
            <CardDescription>Configure automatic fund diversion rules</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium text-foreground">Expired Campaign Divert</p>
                <Badge className="badge-success">Active</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Automatically divert remaining funds from expired campaigns to similar active campaigns
              </p>
              <Button variant="outline" size="sm">
                Configure
              </Button>
            </div>
            <div className="p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium text-foreground">Goal Reached Divert</p>
                <Badge className="badge-warning">Disabled</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Divert excess funds when campaign reaches 150% of target
              </p>
              <Button variant="outline" size="sm">
                Enable
              </Button>
            </div>
            <div className="p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium text-foreground">Emergency Medical Reserve</p>
                <Badge className="badge-success">Active</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Maintain 5% of all funds in emergency reserve for urgent cases
              </p>
              <Button variant="outline" size="sm">
                Configure
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border">
        <CardHeader>
          <CardTitle className="font-heading">Fund Movement History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {movements.map((movement) => (
              <div
                key={movement.id}
                className="flex items-center justify-between p-4 bg-muted/30 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${movement.type === 'withdrawal'
                      ? 'bg-blue-100'
                      : movement.type === 'divert'
                        ? 'bg-yellow-100'
                        : 'bg-red-100'
                      }`}
                  >
                    {movement.type === 'withdrawal' ? (
                      <HugeiconsIcon icon={MoneyAdd01Icon} className="w-5 h-5 text-blue-600" strokeWidth={1.5} />
                    ) : (
                      <HugeiconsIcon icon={ArrowRight02Icon} className="w-5 h-5 text-yellow-600" strokeWidth={1.5} />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{movement.campaignTitle}</p>
                    <p className="text-sm text-muted-foreground">
                      {movement.recipientName} - {movement.type === 'divert' ? 'Fund Divert' : 'Withdrawal'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-foreground">₦{movement.amount.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">{movement.requestDate}</p>
                  <Badge
                    className={`mt-1 ${movement.status === 'completed'
                      ? 'badge-success'
                      : movement.status === 'rejected'
                        ? 'badge-error'
                        : 'badge-warning'
                      }`}
                  >
                    {movement.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}