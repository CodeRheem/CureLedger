'use client';

import Link from 'next/link';
import { DashboardLayout } from '@/components/shared/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockCampaigns } from '@/lib/mock-data';

const NAV_ITEMS = [
  { href: '/recipient', label: 'Dashboard', icon: '📊' },
  { href: '/recipient/campaigns', label: 'My Campaigns', icon: '📋' },
  { href: '/recipient/create', label: 'Create Campaign', icon: '➕' },
  { href: '/recipient/profile', label: 'Profile', icon: '👤' },
];

export default function RecipientDashboard() {
  const myCampaigns = mockCampaigns.slice(0, 2);
  const totalRaised = myCampaigns.reduce((sum, c) => sum + (c.amountRaised || c.raisedAmount), 0);
  const totalTarget = myCampaigns.reduce((sum, c) => sum + c.targetAmount, 0);

  return (
    <DashboardLayout
      navItems={NAV_ITEMS}
      sidebarColor="#0077BE"
      role="recipient"
    >
      <div className="max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, Patient!</h1>
          <p className="text-muted-foreground">Here's your campaign overview</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-blue-50 border-0">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-1">Active Campaigns</p>
              <p className="text-3xl font-bold text-blue-600">{myCampaigns.length}</p>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-0">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-1">Total Raised</p>
              <p className="text-3xl font-bold text-green-600">₦{(totalRaised / 1_000_000).toFixed(1)}M</p>
            </CardContent>
          </Card>

          <Card className="bg-purple-50 border-0">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-1">Total Target</p>
              <p className="text-3xl font-bold text-purple-600">₦{(totalTarget / 1_000_000).toFixed(1)}M</p>
            </CardContent>
          </Card>

          <Card className="bg-orange-50 border-0">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-1">Total Donors</p>
              <p className="text-3xl font-bold text-orange-600">
                {myCampaigns.reduce((sum, c) => sum + c.donorCount, 0)}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Link href="/recipient/create">
              <Button>
                <span className="mr-2">➕</span>
                Create New Campaign
              </Button>
            </Link>
            <Link href="/recipient/campaigns">
              <Button variant="outline">
                <span className="mr-2">📋</span>
                View My Campaigns
              </Button>
            </Link>
            <Link href="/recipient/profile">
              <Button variant="outline">
                <span className="mr-2">👤</span>
                Edit Profile
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Recent Campaigns */}
        <Card>
          <CardHeader>
            <CardTitle>Your Campaigns</CardTitle>
            <CardDescription>View and manage your fundraising campaigns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myCampaigns.map((campaign) => {
                const raised = campaign.amountRaised || campaign.raisedAmount || 0;
                const progress = (raised / campaign.targetAmount) * 100;

                return (
                  <div key={campaign.id} className="border border-input rounded-lg p-4 hover:bg-muted/50 transition">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{campaign.title}</h3>
                        <p className="text-sm text-muted-foreground">{campaign.medicalNeed || campaign.condition}</p>
                      </div>
                      <Badge>{campaign.status.replace('_', ' ')}</Badge>
                    </div>

                    <div className="bg-muted rounded-full h-2 overflow-hidden mb-3">
                      <div
                        className="bg-primary h-full transition-all"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      />
                    </div>

                    <div className="flex justify-between text-sm mb-3">
                      <span className="text-muted-foreground">
                        ₦{(raised / 1_000_000).toFixed(1)}M of ₦{(campaign.targetAmount / 1_000_000).toFixed(1)}M
                      </span>
                      <span className="font-semibold">{Math.round(progress)}%</span>
                    </div>

                    <div className="flex gap-2">
                      <Link href={`/campaign/${campaign.id}`}>
                        <Button size="sm" variant="outline">
                          View Campaign
                        </Button>
                      </Link>
                      <Link href={`/recipient/campaigns/${campaign.id}`}>
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {myCampaigns.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">No campaigns yet</p>
                <Link href="/recipient/create">
                  <Button>Create Your First Campaign</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
