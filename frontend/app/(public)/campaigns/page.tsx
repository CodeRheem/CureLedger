'use client';

import Link from 'next/link';
import { useState, useMemo, useEffect } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Search01Icon } from '@hugeicons/core-free-icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockCampaigns } from '@/lib/mock-data';
import { api } from '@/lib/api';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop';

const statusFilters = [
  { value: 'verified', label: 'Verified Only' },
  { value: 'all', label: 'All' },
];

export default function BrowseCampaigns() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('verified');
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCampaigns() {
      try {
        const data = await api.getCampaigns();
        setCampaigns(data.campaigns || []);
      } catch (err) {
        console.error('Failed to fetch campaigns:', err);
        setError('Failed to load campaigns');
        setCampaigns(mockCampaigns);
      } finally {
        setLoading(false);
      }
    }
    fetchCampaigns();
  }, []);

  const filtered = useMemo(() => {
    return campaigns.filter((campaign) => {
      const matchesSearch =
        campaign.title?.toLowerCase().includes(search.toLowerCase()) ||
        campaign.description?.toLowerCase().includes(search.toLowerCase());

      const isVerified = campaign.status === 'approved';
      const matchesStatus = statusFilter === 'all' || (statusFilter === 'verified' && isVerified);

      return matchesSearch && matchesStatus && isVerified;
    });
  }, [search, statusFilter, campaigns]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="badge-success">Verified</Badge>;
      case 'pending_admin':
        return <Badge className="badge-warning">Pending</Badge>;
      case 'pending_hospital':
        return <Badge className="badge-error">Under Review</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getProgressPercentage = (campaign: any) => {
    const raised = campaign.amountRaised || campaign.raisedAmount || 0;
    return Math.min((raised / campaign.targetAmount) * 100, 100);
  };

  const getCampaignImage = (campaign: any) => {
    return campaign.images?.[0] || FALLBACK_IMAGE;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-red-50 via-white to-red-50/30 border-b border-red-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              Browse Campaigns
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Explore verified campaigns and make a difference in someone&apos;s life
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <HugeiconsIcon icon={Search01Icon} className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" strokeWidth={1.5} />
              <Input
                placeholder="Search for campaigns, conditions, or recipients..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-14 pl-12 pr-4 text-base border-red-200 focus:border-primary focus:ring-primary"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 border-b border-border bg-white sticky top-16 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 overflow-x-auto pb-2">
            <span className="text-sm font-medium text-muted-foreground shrink-0">Filter:</span>
            <div className="flex gap-2">
              {statusFilters.map((filter) => (
                <Button
                  key={filter.value}
                  variant={statusFilter === filter.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setStatusFilter(filter.value)}
                  className="shrink-0"
                >
                  {filter.label}
                </Button>
              ))}
            </div>
            <div className="ml-auto text-sm text-muted-foreground shrink-0">
              {filtered.length} verified campaign{filtered.length !== 1 ? 's' : ''} found
            </div>
          </div>
        </div>
      </section>

      {/* Campaigns Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-lg border border-border animate-pulse">
                  <div className="h-40 bg-gray-200 rounded-t-lg" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                    <div className="h-2 bg-gray-200 rounded w-full mt-4" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full empty-state-bg flex items-center justify-center">
                <HugeiconsIcon icon={Search01Icon} className="w-8 h-8 empty-state-icon" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No campaigns found</h3>
              <p className="text-muted-foreground mb-6">Check back later for new verified campaigns</p>
              <Button onClick={() => { setSearch(''); setStatusFilter('verified'); }}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((campaign) => {
                const progress = getProgressPercentage(campaign);
                const raised = campaign.amountRaised || campaign.raisedAmount || 0;

                return (
                  <Link key={campaign.id} href={`/campaign/${campaign.id}`}>
                    <Card className="h-full border-border hover-lint hover:shadow-lg transition-all duration-300 group cursor-pointer">
                      {/* Campaign Image */}
                      <div className="relative h-40 overflow-hidden rounded-t-lg">
                        <img
                          src={getCampaignImage(campaign)}
                          alt={campaign.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
                          }}
                        />
                        <div className="absolute top-3 right-3">
                          {getStatusBadge(campaign.status)}
                        </div>
                      </div>

                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg line-clamp-2 font-heading leading-snug">
                          {campaign.title}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          By {campaign.recipientName}
                        </p>
                      </CardHeader>

                      <CardContent className="pt-0">
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                          {campaign.description}
                        </p>

                        {/* Progress */}
                        <div className="mb-3">
                          <div className="h-2 progress-track">
                            <div
                              className="h-full bg-primary rounded-full transition-all"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>

                        <div className="flex justify-between items-center text-sm">
                          <div>
                            <span className="font-semibold text-foreground">₦{(raised / 1_000_000).toFixed(1)}M</span>
                            <span className="text-muted-foreground"> raised</span>
                          </div>
                          <div className="text-muted-foreground">
                            {Math.round(progress)}% of ₦{(campaign.targetAmount / 1_000_000).toFixed(1)}M
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
