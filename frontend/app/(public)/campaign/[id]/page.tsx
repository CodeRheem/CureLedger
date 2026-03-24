'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockCampaigns } from '@/lib/mock-data';

export default function CampaignDetail() {
  const params = useParams();
  const campaignId = params.id as string;
  const campaign = mockCampaigns.find((c) => c.id === campaignId);
  const [donationAmount, setDonationAmount] = useState('');

  if (!campaign) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full empty-state-bg flex items-center justify-center">
            <svg className="w-8 h-8 empty-state-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.196 10.196Z" />
            </svg>
          </div>
          <h1 className="text-2xl font-heading font-bold mb-4">Campaign Not Found</h1>
          <Link href="/campaigns">
            <Button>Back to Campaigns</Button>
          </Link>
        </div>
      </div>
    );
  }

  const progressPercentage = Math.min(((campaign.amountRaised || campaign.raisedAmount) / campaign.targetAmount) * 100, 100);
  const daysLeft = Math.max(
    Math.floor((new Date(campaign.deadline || campaign.endsAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
    0
  );
  const raised = campaign.amountRaised || campaign.raisedAmount || 0;

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-border bg-white">
        <div className="container mx-auto px-4 py-4">
          <Link href="/campaigns" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            Back to Campaigns
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="py-8 bg-gradient-to-br from-red-50 via-white to-red-50/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Info */}
            <div className="md:col-span-2 space-y-6">
              {/* Image */}
              <div className="relative h-64 md:h-80 rounded-xl overflow-hidden">
                <img 
                  src={campaign.images?.[0] || 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800'} 
                  alt={campaign.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/90 text-foreground hover:bg-white">
                    {campaign.status === 'approved' ? 'Verified' : campaign.status.replace(/_/g, ' ')}
                  </Badge>
                </div>
              </div>

              {/* Title */}
              <div>
                <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
                  {campaign.title}
                </h1>
                <p className="text-lg text-muted-foreground">
                  By <span className="font-medium text-foreground">{campaign.recipientName}</span>
                </p>
              </div>

              {/* Details Card */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="font-heading text-xl">Campaign Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed">{campaign.description}</p>

                  <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-border">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Medical Need</p>
                      <p className="font-semibold text-foreground">{campaign.medicalNeed || campaign.condition}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Hospital</p>
                      <p className="font-semibold text-foreground">{campaign.hospitalName}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Start Date</p>
                      <p className="font-semibold text-foreground">{new Date(campaign.startDate || campaign.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Deadline</p>
                      <p className="font-semibold text-foreground">{new Date(campaign.deadline || campaign.endsAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Verification Status */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="font-heading text-xl">Verification Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 info-box">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                        <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.196 10.196Z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Hospital Verification</p>
                        <p className="text-sm text-muted-foreground">Verified by {campaign.hospitalName}</p>
                      </div>
                    </div>
                    <Badge className={campaign.verification?.hospitalVerified ? 'badge-success' : 'badge-warning'}>
                      {campaign.verification?.hospitalVerified ? 'Verified' : 'Pending'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 info-box">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                        <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Admin Approval</p>
                        <p className="text-sm text-muted-foreground">Final review completed</p>
                      </div>
                    </div>
                    <Badge className={campaign.verification?.adminApproved ? 'badge-success' : 'badge-warning'}>
                      {campaign.verification?.adminApproved ? 'Approved' : 'Pending'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Documents */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="font-heading text-xl">Medical Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {campaign.documents && campaign.documents.length > 0 ? (
                      campaign.documents.map((doc, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-red-300 hover:bg-red-50/50 transition">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                              <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                              </svg>
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{doc.name}</p>
                              <p className="text-sm text-muted-foreground">{doc.type}</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Download
                          </Button>
                        </div>
                      ))
                    ) : (
                      <p className="text-muted-foreground text-sm">No documents available</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="md:col-span-1">
              <Card className="sticky top-24 border-border shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="font-heading text-xl">Funding Goal</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Amount */}
                  <div className="text-center">
                    <p className="text-4xl font-heading font-bold text-primary">₦{(campaign.targetAmount / 1_000_000).toFixed(1)}M</p>
                  </div>

                  {/* Progress */}
                  <div>
                    <div className="h-3 progress-track">
                      <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${progressPercentage}%` }} />
                    </div>
                    <div className="flex justify-between mt-2 text-sm">
                      <span className="font-medium text-foreground">₦{(raised / 1_000_000).toFixed(1)}M raised</span>
                      <span className="text-muted-foreground">{Math.round(progressPercentage)}%</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-border">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-foreground">{campaign.donorCount}</p>
                      <p className="text-sm text-muted-foreground">Donors</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-foreground">{daysLeft}</p>
                      <p className="text-sm text-muted-foreground">Days Left</p>
                    </div>
                  </div>

                  {/* Donate */}
                  {campaign.status === 'approved' ? (
                    <div className="space-y-3">
                      <Input
                        type="number"
                        placeholder="Enter amount (₦)"
                        value={donationAmount}
                        onChange={(e) => setDonationAmount(e.target.value)}
                        className="h-12 text-center"
                      />
                      <Button className="w-full h-12 text-base font-medium">
                        Donate Now
                      </Button>
                    </div>
                  ) : (
                    <Button className="w-full h-12" disabled>
                      Campaign Not Live
                    </Button>
                  )}

                  <p className="text-xs text-muted-foreground text-center flex items-center justify-center gap-1">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
                    </svg>
                    Secure payment via Interswitch
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
