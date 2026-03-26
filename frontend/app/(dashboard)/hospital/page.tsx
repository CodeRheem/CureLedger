'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { CheckmarkCircle02Icon } from '@hugeicons/core-free-icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
// import { mockCampaigns } from '@/lib/mock-data';
import { StatsCard } from '@/components/shared/stats-card';
import { api } from '@/lib/api';

export default function HospitalDashboardPage() {
  const [pendingCampaigns, setPendingCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPendingCampaigns() {
      try {
        const data = await api.getPendingCampaigns('pending_hospital');
        setPendingCampaigns(data.campaigns || []);
      } catch (err) {
        console.error('Failed to fetch pending campaigns:', err);
        setError('Failed to load pending campaigns');
      } finally {
        setLoading(false);
      }
    }
    fetchPendingCampaigns();
  }, []);

  return (
    <div className="max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-foreground mb-2">Hospital Dashboard</h1>
        <p className="text-muted-foreground">Verify and manage patient campaigns</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {loading ? (
          <>
            <div className="bg-white rounded-lg border border-border p-4 animate-pulse"><div className="h-4 bg-gray-200 rounded w-32 mb-2" /><div className="h-8 bg-gray-200 rounded w-16" /></div>
            <div className="bg-white rounded-lg border border-border p-4 animate-pulse"><div className="h-4 bg-gray-200 rounded w-32 mb-2" /><div className="h-8 bg-gray-200 rounded w-16" /></div>
            <div className="bg-white rounded-lg border border-border p-4 animate-pulse"><div className="h-4 bg-gray-200 rounded w-32 mb-2" /><div className="h-8 bg-gray-200 rounded w-16" /></div>
          </>
        ) : (
          <>
            <StatsCard label="Pending Verifications" value={pendingCampaigns.length} />
            <StatsCard label="Verified Patients" value="-" />
            <StatsCard label="Verified Campaigns" value="-" />
          </>
        )}
      </div>

      {/* Pending Verifications */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="font-heading">Pending Verifications</CardTitle>
          <CardDescription>Review and verify patient medical documents</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border border-border rounded-lg p-5 animate-pulse">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="h-5 bg-gray-200 rounded w-3/4" />
                      <div className="h-4 bg-gray-200 rounded w-1/2" />
                      <div className="h-4 bg-gray-200 rounded w-1/3" />
                    </div>
                    <div className="h-10 bg-gray-200 rounded w-20" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-500 mb-4">{error}</p>
              <Button variant="outline" onClick={() => window.location.reload()}>Try Again</Button>
            </div>
          ) : pendingCampaigns.length > 0 ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border border-border rounded-lg p-5 animate-pulse">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="h-5 bg-gray-200 rounded w-3/4" />
                      <div className="h-4 bg-gray-200 rounded w-1/2" />
                      <div className="h-4 bg-gray-200 rounded w-1/3" />
                    </div>
                    <div className="h-10 bg-gray-200 rounded w-20" />
                  </div>
                </div>
              ))}
            </div>
          ) : pendingCampaigns.length > 0 ? (
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
