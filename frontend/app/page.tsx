'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import { CheckmarkCircle02Icon, EyeIcon, MoneyAdd01Icon } from '@hugeicons/core-free-icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PulsingBadge } from '@/components/shared/pulsing-badge';
import { AnimatedSteps } from '@/components/shared/animated-steps';
import { StatCard } from '@/components/shared/stat-card';

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
  { 
    value: '15K+', 
    label: 'Campaigns Funded',
    trend: 24,
    sparklineData: [2, 4, 3, 7, 6, 8, 9, 12, 15]
  },
  { 
    value: '₦2.5B+', 
    label: 'Total Raised',
    trend: 18,
    sparklineData: [3, 5, 4, 8, 7, 10, 11, 14, 18]
  },
  { 
    value: '50K+', 
    label: 'Active Donors',
    trend: 31,
    sparklineData: [1, 3, 2, 6, 5, 9, 10, 13, 17]
  },
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
              <PulsingBadge text="Live: 156 active campaigns" />
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
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, i) => (
              <StatCard
                key={i}
                label={stat.label}
                value={stat.value}
                trend={stat.trend}
                sparklineData={stat.sparklineData}
              />
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

          <AnimatedSteps steps={steps} />
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 bg-primary relative overflow-hidden">
        {/* Animated background elements */}
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.5) 1px, transparent 0)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-12">
              Why Trust CureLedger?
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {trustFeatures.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="text-center group cursor-pointer"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 text-white mb-4 group-hover:bg-white/20 transition-all duration-300 group-hover:scale-110">
                    {feature.icon}
                  </div>
                  <p className="font-heading text-xl font-bold text-white mb-2">{feature.title}</p>
                  <p className="text-red-100 text-sm">{feature.description}</p>
                </motion.div>
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
