'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StatsCard } from '@/components/shared/stats-card';

interface VerificationRecord {
  id: string;
  patientName: string;
  condition: string;
  campaignTitle: string;
  action: 'approved' | 'rejected' | 'pending';
  date: string;
  notes?: string;
}

const mockHistory: VerificationRecord[] = [
  {
    id: 'v1',
    patientName: 'Tobi Johnson',
    condition: 'Congenital Heart Disease',
    campaignTitle: 'Life-Saving Heart Surgery',
    action: 'approved',
    date: '2024-02-10',
    notes: 'All documents verified. Patient identity confirmed.',
  },
  {
    id: 'v2',
    patientName: 'Sarah Williams',
    condition: 'Stage 3 Breast Cancer',
    campaignTitle: 'Emergency Cancer Treatment',
    action: 'approved',
    date: '2024-02-12',
    notes: 'Medical reports authentic. Treatment plan verified.',
  },
  {
    id: 'v3',
    patientName: 'Muhammed Ahmed',
    condition: 'End-Stage Renal Disease',
    campaignTitle: 'Kidney Transplant Surgery',
    action: 'pending',
    date: '2024-02-28',
  },
  {
    id: 'v4',
    patientName: 'Grace Peters',
    condition: 'Spinal Cord Injury',
    campaignTitle: 'Spinal Surgery Fund',
    action: 'rejected',
    date: '2024-02-05',
    notes: 'Incomplete medical documentation. Missing doctor recommendation.',
  },
];

export default function HospitalHistoryPage() {
  const [filter, setFilter] = useState<'all' | 'approved' | 'rejected'>('all');

  const filteredHistory = mockHistory.filter((h) => {
    if (filter === 'all') return true;
    return h.action === filter;
  });

  const totalVerified = mockHistory.filter((h) => h.action === 'approved').length;
  const totalRejected = mockHistory.filter((h) => h.action === 'rejected').length;

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-foreground mb-2">Verification History</h1>
        <p className="text-muted-foreground">View your past verification decisions</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <StatsCard label="Total Verified" value={totalVerified} />
        <StatsCard label="Total Rejected" value={totalRejected} />
        <StatsCard label="Pending Review" value={mockHistory.filter((h) => h.action === 'pending').length} />
      </div>

      <div className="flex gap-2 mb-6">
        {(['all', 'approved', 'rejected'] as const).map((f) => (
          <Button
            key={f}
            variant={filter === f ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </Button>
        ))}
      </div>

      <Card className="border-border">
        <CardHeader>
          <CardTitle className="font-heading">Verification Records</CardTitle>
          <CardDescription>Complete history of your verification decisions</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredHistory.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No records found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredHistory.map((record) => (
                <div
                  key={record.id}
                  className="flex items-start justify-between p-4 border border-border rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <p className="font-medium text-foreground">{record.patientName}</p>
                      <Badge
                        className={
                          record.action === 'approved'
                            ? 'badge-success'
                            : record.action === 'rejected'
                              ? 'badge-error'
                              : 'badge-warning'
                        }
                      >
                        {record.action.charAt(0).toUpperCase() + record.action.slice(1)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {record.condition} - {record.campaignTitle}
                    </p>
                    {record.notes && (
                      <p className="text-sm text-muted-foreground mt-1 italic">{record.notes}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">{record.date}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}