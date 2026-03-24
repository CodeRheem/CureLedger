'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockCampaigns } from '@/lib/mock-data';

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

export default function AdminFundsPage() {
  const [movements, setMovements] = useState(fundMovements);
  const [showDivertModal, setShowDivertModal] = useState(false);
  const [selectedMovement, setSelectedMovement] = useState<FundMovement | null>(null);

  const handleProcess = (id: string, action: 'approve' | 'reject') => {
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
  };

  const totalRaised = mockCampaigns.reduce((sum, c) => sum + (c.amountRaised || 0), 0);
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
        <Card className="bg-gradient-to-br from-red-50 to-red-100/50 border-red-100">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-1">Total Raised</p>
            <p className="text-2xl font-bold text-primary">₦{(totalRaised / 1_000_000).toFixed(1)}M</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100/50 border-green-100">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-1">Total Withdrawn</p>
            <p className="text-2xl font-bold text-green-600">₦{(totalWithdrawn / 1_000_000).toFixed(1)}M</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100/50 border-yellow-100">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-1">Pending Requests</p>
            <p className="text-2xl font-bold text-yellow-600">{pendingAmount.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-100">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-1">Available Balance</p>
            <p className="text-2xl font-bold text-blue-600">
              ₦{((totalRaised - totalWithdrawn - pendingAmount) / 1_000_000).toFixed(1)}M
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="font-heading">Pending Fund Requests</CardTitle>
            <CardDescription>Funds awaiting admin approval</CardDescription>
          </CardHeader>
          <CardContent>
            {movements.filter((m) => m.status === 'pending').length === 0 ? (
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
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      movement.type === 'withdrawal'
                        ? 'bg-blue-100'
                        : movement.type === 'divert'
                        ? 'bg-yellow-100'
                        : 'bg-red-100'
                    }`}
                  >
                    {movement.type === 'withdrawal' ? (
                      <svg
                        className="w-5 h-5 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5 text-yellow-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                        />
                      </svg>
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
                    className={`mt-1 ${
                      movement.status === 'completed'
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