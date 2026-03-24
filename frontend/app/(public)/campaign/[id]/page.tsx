'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/shared/header';
import { Footer } from '@/components/shared/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockCampaigns } from '@/lib/mock-data';

export default function CampaignDetail() {
  const params = useParams();
  const campaignId = params.id as string;
  const campaign = mockCampaigns.find((c) => c.id === campaignId);
  const [donationAmount, setDonationAmount] = useState('');

  if (!campaign) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Campaign Not Found</h1>
            <Link href="/campaigns">
              <Button>Back to Campaigns</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const progressPercentage = Math.min((( campaign.amountRaised || campaign.raisedAmount) / campaign.targetAmount) * 100, 100);
  const daysLeft = Math.max(
    Math.floor((new Date(campaign.deadline || campaign.endsAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
    0
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <div className="flex-1 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex-1">
                <h1 className="text-4xl font-bold mb-2">{campaign.title}</h1>
                <p className="text-muted-foreground text-lg">By {campaign.recipientName}</p>
              </div>
              <Badge className="text-lg px-4 py-2">{campaign.status.replace('_', ' ')}</Badge>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-6">
              {/* Campaign Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Campaign Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-lg text-muted-foreground">{campaign.description}</p>

                  <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-input">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Medical Need</p>
                      <p className="font-semibold">{campaign.medicalNeed || campaign.condition}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Hospital</p>
                      <p className="font-semibold">{campaign.hospitalName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Start Date</p>
                      <p className="font-semibold">{new Date(campaign.startDate || campaign.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Deadline</p>
                      <p className="font-semibold">{new Date(campaign.deadline || campaign.endsAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Verification Status */}
              {campaign.verification && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Verification Status</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded">
                      <span>Hospital Verification</span>
                      <Badge variant={campaign.verification.hospitalVerified ? 'default' : 'secondary'}>
                        {campaign.verification.hospitalVerified ? '✓ Verified' : 'Pending'}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded">
                      <span>Admin Approval</span>
                      <Badge variant={campaign.verification.adminApproved ? 'default' : 'secondary'}>
                        {campaign.verification.adminApproved ? '✓ Approved' : 'Pending'}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Documents */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Medical Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {campaign.documents && campaign.documents.length > 0 ? (
                      campaign.documents.map((doc, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3 border border-input rounded hover:bg-muted/50 transition"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">📄</span>
                            <div>
                              <p className="font-semibold text-sm">{doc.name}</p>
                              <p className="text-xs text-muted-foreground">{doc.type}</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
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

            {/* Sidebar: Funding and Donate */}
            <div className="md:col-span-1">
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>Funding Goal: ₦{(campaign.targetAmount / 1_000_000).toFixed(1)}M</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Progress Bar */}
                  <div>
                    <div className="bg-muted rounded-full h-3 overflow-hidden mb-2">
                      <div
                        className="bg-primary h-full transition-all"
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>₦{((campaign.amountRaised || campaign.raisedAmount) / 1_000_000).toFixed(1)}M raised</span>
                      <span>{Math.round(progressPercentage)}%</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="space-y-2 py-4 border-t border-b border-input">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Donors</span>
                      <span className="font-semibold">{campaign.donorCount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Days Left</span>
                      <span className="font-semibold">{daysLeft}</span>
                    </div>
                  </div>

                  {/* Donate Form */}
                  {campaign.status === 'approved' ? (
                    <div className="space-y-3">
                      <input
                        type="number"
                        placeholder="Enter amount (₦)"
                        value={donationAmount}
                        onChange={(e) => setDonationAmount(e.target.value)}
                        className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                      />
                      <Button className="w-full">Donate Now</Button>
                    </div>
                  ) : (
                    <Button className="w-full" disabled>
                      Campaign Not Live
                    </Button>
                  )}

                  <p className="text-xs text-muted-foreground text-center">
                    Secure payment via Interswitch
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Back Link */}
          <div className="mt-12">
            <Link href="/campaigns">
              <Button variant="outline">← Back to Campaigns</Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
