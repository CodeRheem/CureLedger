'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowLeft02Icon, CheckmarkCircle02Icon, DocumentAttachmentIcon, MoneyAdd01Icon, OctagonXIcon, Search01Icon, SecurityCheckIcon } from '@hugeicons/core-free-icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
// import { mockCampaigns } from '@/lib/mock-data';
import { api } from '@/lib/api';

export default function CampaignDetail() {
  const params = useParams();
  const campaignId = params.id as string;
  const [campaign, setCampaign] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [donationAmount, setDonationAmount] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'form' | 'processing' | 'success'>('form');
  const [paymentReference, setPaymentReference] = useState('');
  const [paymentUrl, setPaymentUrl] = useState('');
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '', name: '' });
  const [donorEmail, setDonorEmail] = useState('');

  useEffect(() => {
    async function fetchCampaign() {
      try {
        const data = await api.getCampaign(campaignId);
        setCampaign(data);
      } catch (err) {
        console.error('Failed to fetch campaign:', err);
        setError('Failed to load campaign');
        setCampaign(null);
      } finally {
        setLoading(false);
      }
    }
    if (campaignId) {
      fetchCampaign();
    }
  }, [campaignId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="w-12 h-12 mx-auto mb-4 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground">Loading campaign...</p>
        </div>
      </div>
    );
  }

  if (error || !campaign) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-50 flex items-center justify-center">
            <HugeiconsIcon icon={Search01Icon} className="w-8 h-8 text-red-500" strokeWidth={1.5} />
          </div>
          <h1 className="text-2xl font-heading font-bold mb-4">Campaign Not Found</h1>
          <p className="text-muted-foreground mb-4">{error || 'This campaign may have been removed'}</p>
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

  const handleDonate = async () => {
    try {
      setPaymentStep('processing');

      const response = await api.donate({
        campaignId,
        amount: parseInt(donationAmount, 10),
        donorName: cardDetails.name,
        donorEmail,
        message: 'Donation from campaign page',
      });

      setPaymentReference(response.paymentReference || '');
      setPaymentUrl(response.paymentUrl || '');
      setPaymentStep('success');
    } catch (err) {
      console.error('Failed to initiate donation:', err);
      setPaymentStep('form');
      setError('Failed to initiate donation. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-border bg-white">
        <div className="container mx-auto px-4 py-4">
          <Link href="/campaigns" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition">
            <HugeiconsIcon icon={ArrowLeft02Icon} className="w-4 h-4" strokeWidth={1.5} />
            Back to Campaigns
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="py-8 bg-linear-to-br from-red-50 via-white to-red-50/30">
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
                        <HugeiconsIcon icon={SecurityCheckIcon} className="w-5 h-5 text-primary" strokeWidth={1.5} />
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
                        <HugeiconsIcon icon={CheckmarkCircle02Icon} className="w-5 h-5 text-primary" strokeWidth={1.5} />
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
                      campaign.documents.map((doc: { name: string; type: string }, idx: number) => (
                        <div key={idx} className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-red-300 hover:bg-red-50/50 transition">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                              <HugeiconsIcon icon={DocumentAttachmentIcon} className="w-5 h-5 text-primary" strokeWidth={1.5} />
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
                      <Button
                        className="w-full h-12 text-base font-medium"
                        onClick={() => setShowPaymentModal(true)}
                        disabled={!donationAmount || parseInt(donationAmount) <= 0}
                      >
                        Donate Now
                      </Button>
                    </div>
                  ) : (
                    <Button className="w-full h-12" disabled>
                      Campaign Not Live
                    </Button>
                  )}

                  <p className="text-xs text-muted-foreground text-center flex items-center justify-center gap-1">
                    <HugeiconsIcon icon={SecurityCheckIcon} className="w-3 h-3" strokeWidth={1.5} />
                    Secure payment via Interswitch
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            {paymentStep === 'form' && (
              <>
                <div className="p-6 border-b border-border">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading text-xl font-bold">Payment Details</h3>
                    <button onClick={() => setShowPaymentModal(false)} className="text-muted-foreground hover:text-foreground">
                      <HugeiconsIcon icon={OctagonXIcon} className="w-5 h-5" strokeWidth={1.5} />
                    </button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Donating ₦{parseInt(donationAmount).toLocaleString()} to {campaign?.title}</p>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Card Number</label>
                    <Input
                      placeholder="1234 5678 9012 3456"
                      value={cardDetails.number}
                      onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Cardholder Name</label>
                    <Input
                      placeholder="John Doe"
                      value={cardDetails.name}
                      onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Email Address</label>
                    <Input
                      type="email"
                      placeholder="donor@example.com"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Expiry Date</label>
                      <Input
                        placeholder="MM/YY"
                        value={cardDetails.expiry}
                        onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">CVV</label>
                      <Input
                        placeholder="123"
                        value={cardDetails.cvv}
                        onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Donation Amount</span>
                      <span className="font-bold text-foreground">₦{parseInt(donationAmount).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm mt-2">
                      <span className="text-muted-foreground">Processing Fee</span>
                      <span className="font-bold text-foreground">₦0</span>
                    </div>
                    <div className="flex justify-between text-sm mt-2 pt-2 border-t border-border">
                      <span className="font-medium text-foreground">Total</span>
                      <span className="font-bold text-primary">₦{parseInt(donationAmount).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <div className="p-6 border-t border-border">
                  <Button
                    className="w-full"
                    onClick={handleDonate}
                    disabled={!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv || !cardDetails.name || !donorEmail}
                  >
                    Pay ₦{parseInt(donationAmount).toLocaleString()}
                  </Button>
                  <div className="flex items-center justify-center gap-2 mt-4 text-xs text-muted-foreground">
                    <HugeiconsIcon icon={SecurityCheckIcon} className="w-4 h-4" strokeWidth={1.5} />
                    Secured by Interswitch
                  </div>
                </div>
              </>
            )}
            {paymentStep === 'processing' && (
              <div className="p-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full empty-state-bg flex items-center justify-center">
                  <HugeiconsIcon icon={MoneyAdd01Icon} className="w-8 h-8 empty-state-icon animate-spin" strokeWidth={1.5} />
                </div>
                <h3 className="font-heading text-xl font-bold mb-2">Processing Payment</h3>
                <p className="text-muted-foreground">Please wait while we process your donation...</p>
              </div>
            )}
            {paymentStep === 'success' && (
              <div className="p-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                  <HugeiconsIcon icon={CheckmarkCircle02Icon} className="w-8 h-8 text-green-600" strokeWidth={1.5} />
                </div>
                <h3 className="font-heading text-xl font-bold mb-2">Donation Successful!</h3>
                <p className="text-muted-foreground mb-6">
                  {paymentUrl
                    ? 'Your donation has been initiated. Continue to secure checkout to complete payment.'
                    : `Thank you for your generous donation of ₦${parseInt(donationAmount).toLocaleString()}`}
                </p>
                {paymentReference && (
                  <p className="text-xs text-muted-foreground mb-6">Reference: {paymentReference}</p>
                )}
                <div className="space-y-3">
                  {paymentUrl && (
                    <Button className="w-full" onClick={() => {
                      window.location.href = paymentUrl;
                    }}>
                      Continue to Secure Checkout
                    </Button>
                  )}
                  <Button className="w-full" onClick={() => {
                    setShowPaymentModal(false);
                    setPaymentStep('form');
                    setPaymentReference('');
                    setPaymentUrl('');
                    setDonationAmount('');
                    setCardDetails({ number: '', expiry: '', cvv: '', name: '' });
                    setDonorEmail('');
                  }}>
                    Donate Again
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => {
                    setShowPaymentModal(false);
                    setPaymentStep('form');
                    setPaymentReference('');
                    setPaymentUrl('');
                    setDonationAmount('');
                    setCardDetails({ number: '', expiry: '', cvv: '', name: '' });
                    setDonorEmail('');
                  }}>
                    Close
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
