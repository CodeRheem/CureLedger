'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Add01Icon, File02Icon } from '@hugeicons/core-free-icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StatsCard } from '@/components/shared/stats-card';
import { api } from '@/lib/api';

export default function RecipientDashboard() {
  const [myCampaigns, setMyCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCampaigns() {
      try {
        setError(null);
        const data = await api.getRecipientCampaigns();
        setMyCampaigns((data.campaigns || []).filter((c: any) => c.status !== 'rejected'));
      } catch (err) {
        console.error('Failed to fetch campaigns:', err);
        setError('Failed to load campaigns. Please try again later.');
        setMyCampaigns([]);
      } finally {
        setLoading(false);
      }
    }
    fetchCampaigns();
  }, []);

  if (error) {
    return (
      <div className="max-w-6xl">
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-foreground mb-2">Welcome back!</h1>
          <p className="text-muted-foreground">Here's your campaign overview</p>
        </div>
        <Card className="border-destructive bg-destructive/5">
          <CardContent className="py-8">
            <div className="flex items-center gap-3">
              <div className="text-destructive text-2xl">⚠️</div>
              <div>
                <p className="font-semibold text-destructive">{error}</p>
                <p className="text-sm text-muted-foreground mt-1">Please refresh the page or contact support if the problem persists.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const hasActiveCampaign = myCampaigns.length > 0;
  const totalRaised = myCampaigns.reduce((sum, c) => sum + (c.amountRaised || c.raisedAmount), 0);
  const totalTarget = myCampaigns.reduce((sum, c) => sum + c.targetAmount, 0);

  return (
    <div className="max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-foreground mb-2">Welcome back!</h1>
        <p className="text-muted-foreground">Here's your campaign overview</p>
      </div>


      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <StatsCard label="Total Raised" value={`₦${(totalRaised / 1_000_000).toFixed(1)}M`} />
        <StatsCard label="Total Target" value={`₦${(totalTarget / 1_000_000).toFixed(1)}M`} />
        <StatsCard label="Total Donors" value={hasActiveCampaign ? myCampaigns[0].donorCount : 0} />
      </div>


      {/* Active Campaign */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="font-heading">Your Campaign</CardTitle>
          <CardDescription>View and manage your fundraising campaign</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-muted-foreground">Loading campaigns...</p>
          ) : hasActiveCampaign ? (
            <div className="space-y-4">
              {myCampaigns.slice(0, 1).map((campaign) => {
                const raised = campaign.amountRaised || campaign.raisedAmount || 0;
                const progress = (raised / campaign.targetAmount) * 100;

                return (
                  <div key={campaign.id} className="border border-border rounded-lg p-5 hover-lint">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <h3 className="font-heading font-semibold text-lg text-foreground">{campaign.title}</h3>
                        <p className="text-sm text-muted-foreground">{campaign.medicalNeed || campaign.condition}</p>
                      </div>
                      <Badge className={campaign.status === 'approved' ? 'badge-success' : 'badge-warning'}>
                        {campaign.status === 'approved' ? 'Live' : campaign.status.replace('_', ' ')}
                      </Badge>
                    </div>

                    <div className="h-2 progress-track mb-3">
                      <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${Math.min(progress, 100)}%` }} />
                    </div>

                    <div className="flex justify-between text-sm mb-4">
                      <span className="text-muted-foreground">
                        ₦{(raised / 1_000_000).toFixed(1)}M of ₦{(campaign.targetAmount / 1_000_000).toFixed(1)}M
                      </span>
                      <span className="font-semibold text-foreground">{Math.round(progress)}%</span>
                    </div>

                    <div className="flex gap-2">
                      <Link href={`/campaign/${campaign.id}`}>
                        <Button size="sm" variant="outline">View Campaign</Button>
                      </Link>
                      <Link href={`/recipient/campaigns/${campaign.id}`}>
                        <Button size="sm" variant="outline">Edit</Button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-50 flex items-center justify-center">
                <HugeiconsIcon icon={Add01Icon} className="w-8 h-8 text-primary" strokeWidth={1.5} />
              </div>
              <p className="text-muted-foreground mb-4">No active campaign yet</p>
              <Link href="/recipient/create">
                <Button>Create Your Campaign</Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
