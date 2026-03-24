'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import { Header } from '@/components/shared/header';
import { Footer } from '@/components/shared/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockCampaigns } from '@/lib/mock-data';

export default function BrowseCampaigns() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = useMemo(() => {
    return mockCampaigns.filter((campaign) => {
      const matchesSearch =
        campaign.title.toLowerCase().includes(search.toLowerCase()) ||
        campaign.description.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'approved':
        return 'default';
      case 'pending_admin':
      case 'pending_hospital':
        return 'secondary';
      case 'draft':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const getProgressPercentage = (campaign: any) => {
    const raised = campaign.amountRaised || campaign.raisedAmount || 0;
    return Math.min((raised / campaign.targetAmount) * 100, 100);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="py-12 px-4 bg-muted">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Browse Campaigns</h1>
          <p className="text-muted-foreground">
            Explore verified campaigns and make a difference in someone's life
          </p>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="py-8 px-4 border-b border-input">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              placeholder="Search campaigns..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1"
            />

            <div className="flex gap-2 flex-wrap">
              {['all', 'approved', 'pending_admin', 'pending_hospital'].map((status) => {
                const label = status === 'all' ? 'All' : status.replace(/_/g, ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
                return (
                  <Button
                    key={status}
                    variant={statusFilter === status ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setStatusFilter(status)}
                  >
                    {label}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Campaigns Grid */}
      <section className="py-12 px-4 flex-1">
        <div className="max-w-5xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No campaigns found</p>
              <Link href="/">
                <Button>Go Home</Button>
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((campaign) => (
                <Card key={campaign.id} className="overflow-hidden hover:shadow-lg transition">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <CardTitle className="text-lg line-clamp-2">
                          {campaign.title}
                        </CardTitle>
                        <CardDescription className="text-xs mt-1">
                          By {campaign.recipientName}
                        </CardDescription>
                      </div>
                      <Badge variant={getStatusVariant(campaign.status)}>
                        {campaign.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {campaign.description}
                    </p>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="bg-muted rounded-full h-2 overflow-hidden mb-2">
                        <div
                          className="bg-primary h-full transition-all"
                          style={{
                            width: `${getProgressPercentage(campaign)}%`,
                          }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>₦{((campaign.amountRaised || campaign.raisedAmount) / 1_000_000).toFixed(1)}M</span>
                        <span>₦{(campaign.targetAmount / 1_000_000).toFixed(1)}M</span>
                      </div>
                    </div>

                    <Link href={`/campaign/${campaign.id}`}>
                      <Button size="sm" className="w-full">
                        View Campaign
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
