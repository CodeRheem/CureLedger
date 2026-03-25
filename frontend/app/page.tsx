'use client';

import Link from 'next/link';
import { HugeiconsIcon } from '@hugeicons/react';
import { CheckmarkCircle02Icon, EyeIcon, MoneyAdd01Icon } from '@hugeicons/core-free-icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const steps = [
  {
    number: '01',
    title: 'Recipients Submit',
    description: 'Upload medical documents and share your story with verified proof',
  },
  {
    number: '02',
    title: 'Hospitals Verify',
    description: 'Medical professionals authenticate and validate campaign details',
  },
  {
    number: '03',
    title: 'Admin Reviews',
    description: 'Final verification ensures transparency and trust before fundraising begins',
  },
  {
    number: '04',
    title: 'Donors Contribute',
    description: 'Verified donors securely fund campaigns and track their impact',
  },
];

const stats = [
  { value: '15K+', label: 'Campaigns Funded' },
  { value: '₦2.5B+', label: 'Total Raised' },
  { value: '50K+', label: 'Active Donors' },
];

const trustFeatures = [
  {
    icon: <HugeiconsIcon icon={CheckmarkCircle02Icon} className="w-8 h-8" strokeWidth={1.5} />,
    title: '100% Verified',
    description: 'Every campaign verified by hospitals and admins',
  },
  {
    icon: <HugeiconsIcon icon={MoneyAdd01Icon} className="w-8 h-8" strokeWidth={1.5} />,
    title: 'Secure Payments',
    description: 'Integrated with Interswitch for safe transactions',
  },
  {
    icon: <HugeiconsIcon icon={EyeIcon} className="w-8 h-8" strokeWidth={1.5} />,
    title: 'Transparent Tracking',
    description: 'Follow funds from donation to recipient',
  },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white py-24">
        <div className="absolute inset-0 bg-linear-to-br from-red-50 via-white to-red-50/30" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(220, 38, 38, 0.9) 1px, transparent 0)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-100 text-red-700 text-sm font-medium mb-8">
              <span className="flex h-2 w-2 rounded-full bg-red-500"></span>
              Trusted by 50,000+ donors worldwide
            </div>

            <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Healthcare Crowdfunding,{' '}
              <span className="text-primary">Made Transparent</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Connect patients seeking medical support with compassionate donors.
              Every campaign is verified by hospitals and approved by admins.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="px-8 h-12 text-base">
                  Start a Campaign
                </Button>
              </Link>
              <Link href="/campaigns">
                <Button size="lg" variant="outline" className="px-8 h-12 text-base">
                  Browse Campaigns
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-red-50 border-y border-red-100">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {stats.map((stat, i) => (
              <div key={i} className="space-y-2">
                <p className="font-heading text-4xl md:text-5xl font-bold text-primary">{stat.value}</p>
                <p className="text-muted-foreground font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              How CureLedger Works
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Simple, transparent, and secure process from start to finish
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <Card key={i} className="border border-border bg-white hover:shadow-lg hover:border-red-200 transition-all duration-300 group">
                <CardContent className="pt-8 pb-6 px-6">
                  <span className="font-heading text-5xl font-bold text-red-100 group-hover:text-red-200 transition-colors">
                    {step.number}
                  </span>
                  <h3 className="font-heading text-lg font-semibold text-foreground mt-4 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 bg-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-12">
              Why Trust CureLedger?
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {trustFeatures.map((feature, i) => (
                <div key={i} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 text-white mb-4">
                    {feature.icon}
                  </div>
                  <p className="font-heading text-xl font-bold text-white mb-2">{feature.title}</p>
                  <p className="text-red-100 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Make an Impact?
            </h2>
            <p className="text-muted-foreground text-lg mb-10">
              Browse verified campaigns and support those in need, or share your story with the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/campaigns">
                <Button size="lg" variant="outline" className="px-8 h-12 text-base">
                  View Campaigns
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" className="px-8 h-12 text-base">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
