'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowRight02Icon } from '@hugeicons/core-free-icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockCampaigns } from '@/lib/mock-data';
import { StatsCard } from '@/components/shared/stats-card';
import { api } from '@/lib/api';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [pendingCampaigns, setPendingCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [statsData, campaignsData] = await Promise.all([
          api.getAdminStats(),
          api.getPendingCampaigns('pending_admin')
        ]);
        setStats(statsData);
        setPendingCampaigns(campaignsData.campaigns || []);
      } catch (err) {
        console.error('Failed to fetch admin data:', err);
        setPendingCampaigns(mockCampaigns.filter(c => c.status === 'pending_admin'));
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) return `₦${(amount / 1000000).toFixed(1)}M`;
    if (amount >= 1000) return `₦${(amount / 1000).toFixed(0)}K`;
    return `₦${amount}`;
  };

  return (
    <div className="max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage platform and approve campaigns</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        {loading ? (
          <>
            <div className="bg-white rounded-lg border border-border p-4 animate-pulse"><div className="h-4 bg-gray-200 rounded w-20 mb-2" /><div className="h-8 bg-gray-200 rounded w-16" /></div>
            <div className="bg-white rounded-lg border border-border p-4 animate-pulse"><div className="h-4 bg-gray-200 rounded w-20 mb-2" /><div className="h-8 bg-gray-200 rounded w-16" /></div>
            <div className="bg-white rounded-lg border border-border p-4 animate-pulse"><div className="h-4 bg-gray-200 rounded w-20 mb-2" /><div className="h-8 bg-gray-200 rounded w-16" /></div>
            <div className="bg-white rounded-lg border border-border p-4 animate-pulse"><div className="h-4 bg-gray-200 rounded w-20 mb-2" /><div className="h-8 bg-gray-200 rounded w-16" /></div>
          </>
        ) : (
          <>
            <StatsCard label="Total Campaigns" value={stats?.campaigns?.total || 0} />
            <StatsCard label="Approved" value={stats?.campaigns?.approved || 0} />
            <StatsCard label="Pending" value={stats?.campaigns?.pending || 0} />
            <StatsCard label="Total Raised" value={formatCurrency(stats?.donations?.totalRaised || 0)} />
          </>
        )}
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
            <Link href="/admin/approvals" className="text-primary hover:underline font-medium mt-4 inline-flex items-center gap-1">
              View All
              <HugeiconsIcon icon={ArrowRight02Icon} className="w-4 h-4" strokeWidth={1.5} />
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
