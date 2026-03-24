'use client';

import Link from 'next/link';
import { Header } from '@/components/shared/header';
import { Footer } from '@/components/shared/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function Home() {
  const steps = [
    {
      icon: '🩺',
      title: 'Recipients Submit',
      description: 'Upload medical documents and share your story with verified proof',
    },
    {
      icon: '🏥',
      title: 'Hospitals Verify',
      description: 'Medical professionals authenticate and validate campaign details',
    },
    {
      icon: '✅',
      title: 'Admin Reviews',
      description: 'Final verification ensures transparency and trust before fundraising begins',
    },
    {
      icon: '❤️',
      title: 'Donors Contribute',
      description: 'Verified donors securely fund campaigns and track their impact',
    },
  ];

  const stats = [
    { value: '15K+', label: 'Campaigns Funded' },
    { value: '₦2.5B+', label: 'Total Raised' },
    { value: '50K+', label: 'Active Donors' },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 text-foreground">
            Healthcare Crowdfunding, <span className="text-primary">Made Transparent</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Connect patients seeking medical support with compassionate donors. Verified by hospitals, approved by admins.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg">Start a Campaign</Button>
            </Link>
            <Link href="/campaigns">
              <Button size="lg" variant="outline">
                Browse Campaigns
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-muted">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {stats.map((stat, i) => (
              <div key={i}>
                <p className="text-4xl font-bold text-primary mb-2">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How CureLedger Works</h2>
            <p className="text-muted-foreground">Simple, transparent, and secure process from start to finish</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <Card key={i} className="border-0 bg-muted/50">
                <CardContent className="pt-6">
                  <div className="text-5xl mb-4">{step.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 px-4 bg-primary/5">
        <div className="max-w-5xl mx-auto">
          <div className="bg-primary text-primary-foreground rounded-lg p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Why Trust CureLedger?</h2>
            <div className="grid md:grid-cols-3 gap-8 mt-8">
              <div>
                <p className="text-2xl font-bold mb-2">100% Verified</p>
                <p className="opacity-90">Every campaign verified by hospitals and admins</p>
              </div>
              <div>
                <p className="text-2xl font-bold mb-2">Secure Payments</p>
                <p className="opacity-90">Integrated with Interswitch for safe transactions</p>
              </div>
              <div>
                <p className="text-2xl font-bold mb-2">Transparent Tracking</p>
                <p className="opacity-90">Follow funds from donation to recipient</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Make an Impact?</h2>
          <p className="text-muted-foreground mb-8">
            Browse verified campaigns and support those in need, or share your story with the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/campaigns">
              <Button size="lg" variant="outline">
                View Campaigns
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg">Sign In</Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
