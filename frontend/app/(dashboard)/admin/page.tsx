'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockCampaigns } from '@/lib/mock-data';
import { StatsCard } from '@/components/shared/stats-card';

export default function AdminDashboardPage() {
  const pendingCampaigns = mockCampaigns.filter(c => c.status === 'pending_admin');

  return (
    <div className="max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage platform and approve campaigns</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <StatsCard label="Total Campaigns" value="45" variant="blue" />
        <StatsCard label="Approved" value="38" variant="green" />
        <StatsCard label="Pending" value="5" variant="yellow" />
        <StatsCard label="Total Raised" value="₦125M" variant="purple" />
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Pending Approvals */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="font-heading">Pending Approvals</CardTitle>
            <CardDescription>Campaigns awaiting final review</CardDescription>
          </CardHeader>
          <CardContent>
            {pendingCampaigns.length > 0 ? (
              <div className="space-y-3">
                {pendingCampaigns.map((campaign) => (
                  <div key={campaign.id} className="border-l-4 border-yellow-400 pl-4 py-3 rounded-r-lg bg-yellow-50/50">
                    <p className="font-semibold text-foreground">{campaign.title}</p>
                    <p className="text-sm text-muted-foreground">Waiting for your review</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No pending approvals</p>
            )}
            <Link href="/admin/approvals" className="text-primary hover:underline font-medium mt-4 inline-block flex items-center gap-1">
              View All 
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </CardContent>
        </Card>

        {/* System Stats */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="font-heading">System Stats</CardTitle>
            <CardDescription>Platform overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-muted-foreground">Active Recipients</span>
                <span className="font-bold text-foreground">156</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-muted-foreground">Hospitals</span>
                <span className="font-bold text-foreground">12</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-muted-foreground">Approved Donors</span>
                <span className="font-bold text-foreground">2,340</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-muted-foreground">Total Campaigns</span>
                <span className="font-bold text-foreground">45</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
