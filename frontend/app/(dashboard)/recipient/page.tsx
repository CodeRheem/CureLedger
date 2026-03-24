'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockCampaigns } from '@/lib/mock-data';
import { StatsCard } from '@/components/shared/stats-card';

export default function RecipientDashboard() {
  const myCampaigns = mockCampaigns.filter(c => c.status !== 'rejected').slice(0, 1);
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

      {/* Campaign Limit Notice */}
      {hasActiveCampaign && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.019-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            <p className="text-sm text-red-700">
              <span className="font-semibold">One campaign at a time:</span> You can only have one active campaign. Complete or withdraw your current campaign before creating a new one.
            </p>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <StatsCard label="Active Campaigns" value={hasActiveCampaign ? 1 : 0} variant="red" />
        <StatsCard label="Total Raised" value={`₦${(totalRaised / 1_000_000).toFixed(1)}M`} variant="green" />
        <StatsCard label="Total Target" value={`₦${(totalTarget / 1_000_000).toFixed(1)}M`} variant="purple" />
        <StatsCard label="Total Donors" value={hasActiveCampaign ? myCampaigns[0].donorCount : 0} variant="orange" />
      </div>

      {/* Quick Actions */}
      <Card className="mb-8 border-border">
        <CardHeader>
          <CardTitle className="font-heading">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Link href={hasActiveCampaign ? '#' : '/recipient/create'}>
            <Button disabled={hasActiveCampaign}>
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m6-6h-6" />
              </svg>
              {hasActiveCampaign ? 'Campaign Active' : 'Create New Campaign'}
            </Button>
          </Link>
          <Link href="/recipient/profile">
            <Button variant="outline">
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
              Edit Profile
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Active Campaign */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="font-heading">Your Campaign</CardTitle>
          <CardDescription>View and manage your fundraising campaign</CardDescription>
        </CardHeader>
        <CardContent>
          {hasActiveCampaign ? (
            <div className="space-y-4">
              {myCampaigns.map((campaign) => {
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
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m6-6h-6" />
                </svg>
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
