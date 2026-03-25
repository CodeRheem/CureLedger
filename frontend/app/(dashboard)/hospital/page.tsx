'use client';

import Link from 'next/link';
import { HugeiconsIcon } from '@hugeicons/react';
import { CheckmarkCircle02Icon } from '@hugeicons/core-free-icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockCampaigns } from '@/lib/mock-data';
import { StatsCard } from '@/components/shared/stats-card';

export default function HospitalDashboardPage() {
  const pendingCampaigns = mockCampaigns.filter(c => c.status === 'pending_hospital');

  return (
    <div className="max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-foreground mb-2">Hospital Dashboard</h1>
        <p className="text-muted-foreground">Verify and manage patient campaigns</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <StatsCard label="Pending Verifications" value={pendingCampaigns.length} />
        <StatsCard label="Verified Patients" value="12" />
        <StatsCard label="Verified Campaigns" value="12" />
      </div>

      {/* Pending Verifications */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="font-heading">Pending Verifications</CardTitle>
          <CardDescription>Review and verify patient medical documents</CardDescription>
        </CardHeader>
        <CardContent>
          {pendingCampaigns.length > 0 ? (
            <div className="space-y-4">
              {pendingCampaigns.map((campaign) => (
                <div key={campaign.id} className="border border-border rounded-lg p-5 hover-lint">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <h3 className="font-heading font-semibold text-lg text-foreground">{campaign.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">Recipient: {campaign.recipientName}</p>
                      <p className="text-sm text-muted-foreground">Hospital: {campaign.hospitalName}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className="badge-warning">Pending Review</Badge>
                        <span className="text-xs text-muted-foreground">Submitted 2 days ago</span>
                      </div>
                    </div>
                    <Link href={`/hospital/verify/${campaign.id}`}>
                      <Button>Review</Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-50 flex items-center justify-center">
                <HugeiconsIcon icon={CheckmarkCircle02Icon} className="w-8 h-8 text-green-600" strokeWidth={1.5} />
              </div>
              <p className="text-muted-foreground">No pending verifications</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
