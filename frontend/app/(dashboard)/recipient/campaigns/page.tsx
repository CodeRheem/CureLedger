'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { HugeiconsIcon } from '@hugeicons/react';
import { Add01Icon, File02Icon } from '@hugeicons/core-free-icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockCampaigns } from '@/lib/mock-data';
import { api } from '@/lib/api';

export default function RecipientCampaignsPage() {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed' | 'rejected'>('all');
  const [myCampaigns, setMyCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCampaigns() {
      try {
        const data = await api.getRecipientCampaigns();
        setMyCampaigns(data.campaigns || []);
      } catch (err) {
        console.error('Failed to fetch campaigns:', err);
        setMyCampaigns(mockCampaigns.filter(c => c.recipientId === 'recipient-1'));
      } finally {
        setLoading(false);
      }
    }
    fetchCampaigns();
  }, []);

  const filteredCampaigns = myCampaigns.filter(c => {
    if (filter === 'all') return true;
    if (filter === 'active') return c.status === 'approved' || c.status === 'pending_admin';
    if (filter === 'completed') return c.status === 'completed';
    if (filter === 'rejected') return c.status === 'rejected';
    return true;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="badge-success">Active</Badge>;
      case 'pending_admin':
        return <Badge className="badge-warning">Pending Review</Badge>;
      case 'pending_hospital':
        return <Badge className="badge-warning">Under Review</Badge>;
      case 'completed':
        return <Badge className="badge-neutral">Completed</Badge>;
      case 'rejected':
        return <Badge className="badge-error">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const activeCount = myCampaigns.filter(c => c.status === 'approved' || c.status === 'pending_admin').length;
  const completedCount = myCampaigns.filter(c => c.status === 'completed').length;

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-foreground mb-2">My Campaigns</h1>
        <p className="text-muted-foreground">Manage and track all your fundraising campaigns</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <Card className="border-border">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-1">Total Campaigns</p>
            <p className="text-3xl font-bold text-foreground">{loading ? '...' : myCampaigns.length}</p>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-1">Active Campaigns</p>
            <p className="text-3xl font-bold text-primary">{loading ? '...' : activeCount}</p>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-1">Completed</p>
            <p className="text-3xl font-bold text-green-600">{loading ? '...' : completedCount}</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          {(['all', 'active', 'completed', 'rejected'] as const).map((f) => (
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
        <Link href="/recipient/create">
          <Button disabled={activeCount > 0}>
            <HugeiconsIcon icon={Add01Icon} className="w-4 h-4 mr-2" strokeWidth={1.5} />
            New Campaign
          </Button>
        </Link>
      </div>

      {loading ? (
        <Card className="border-border">
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground">Loading campaigns...</p>
          </CardContent>
        </Card>
      ) : filteredCampaigns.length === 0 ? (
        <Card className="border-border">
          <CardContent className="py-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full empty-state-bg flex items-center justify-center">
              <HugeiconsIcon icon={File02Icon} className="w-8 h-8 empty-state-icon" strokeWidth={1.5} />
            </div>
            <p className="text-muted-foreground mb-4">No campaigns found</p>
            <Link href="/recipient/create">
              <Button>Create Your First Campaign</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredCampaigns.map((campaign) => {
            const raised = campaign.amountRaised || campaign.raisedAmount || 0;
            const progress = Math.min((raised / campaign.targetAmount) * 100, 100);

            return (
              <Card key={campaign.id} className="border-border hover-lint">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-heading text-lg font-semibold text-foreground">{campaign.title}</h3>
                        {getStatusBadge(campaign.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">{campaign.condition}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">₦{(raised / 1_000_000).toFixed(1)}M</p>
                      <p className="text-sm text-muted-foreground">of ₦{(campaign.targetAmount / 1_000_000).toFixed(1)}M</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="h-2 progress-track">
                      <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${progress}%` }} />
                    </div>
                    <div className="flex justify-between mt-1 text-sm">
                      <span className="text-muted-foreground">{Math.round(progress)}% funded</span>
                      <span className="text-muted-foreground">{campaign.donorCount} donors</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link href={`/campaign/${campaign.id}`}>
                      <Button size="sm" variant="outline">View</Button>
                    </Link>
                    {campaign.status === 'approved' && (
                      <Link href={`/recipient/campaign/${campaign.id}/withdraw`}>
                        <Button size="sm" variant="outline">Withdraw</Button>
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}