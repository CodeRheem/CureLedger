'use client';

import { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Add01Icon } from '@hugeicons/core-free-icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Withdrawal {
  id: string;
  campaignTitle: string;
  amount: number;
  status: 'pending' | 'approved' | 'completed' | 'rejected';
  requestDate: string;
  processedDate?: string;
}

const mockWithdrawals: Withdrawal[] = [
  {
    id: 'w1',
    campaignTitle: 'Life-Saving Heart Surgery',
    amount: 500000,
    status: 'completed',
    requestDate: '2024-02-15',
    processedDate: '2024-02-18',
  },
  {
    id: 'w2',
    campaignTitle: 'Emergency Cancer Treatment',
    amount: 300000,
    status: 'pending',
    requestDate: '2024-03-01',
  },
];

export default function RecipientWithdrawalsPage() {
  const [withdrawals] = useState(mockWithdrawals);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');

  const totalWithdrawn = withdrawals
    .filter((w) => w.status === 'completed')
    .reduce((sum, w) => sum + w.amount, 0);
  const pendingAmount = withdrawals
    .filter((w) => w.status === 'pending')
    .reduce((sum, w) => sum + w.amount, 0);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="badge-success">Completed</Badge>;
      case 'approved':
        return <Badge className="badge-success">Approved</Badge>;
      case 'pending':
        return <Badge className="badge-warning">Pending</Badge>;
      case 'rejected':
        return <Badge className="badge-error">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleRequestWithdrawal = () => {
    alert(`Withdrawal request for ₦${parseInt(withdrawAmount).toLocaleString()} submitted!`);
    setShowRequestModal(false);
    setWithdrawAmount('');
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

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <Card className="border-border">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-1">Total Withdrawn</p>
            <p className="text-3xl font-bold text-green-600">₦{totalWithdrawn.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-1">Pending</p>
            <p className="text-3xl font-bold text-yellow-600">₦{pendingAmount.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-1">Available Balance</p>
            <p className="text-3xl font-bold text-primary">₦1,350,000</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border">
        <CardHeader>
          <CardTitle className="font-heading">Withdrawal History</CardTitle>
          <CardDescription>Track all your withdrawal requests</CardDescription>
        </CardHeader>
        <CardContent>
          {withdrawals.length === 0 ? (
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
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">Available: ₦1,350,000</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Withdrawal requests are reviewed by admins. Funds will be transferred to your registered bank account within 2-3 business days.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button className="flex-1" onClick={handleRequestWithdrawal}>
                Submit Request
              </Button>
              <Button variant="outline" onClick={() => setShowRequestModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}