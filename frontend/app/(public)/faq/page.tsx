'use client';

import { useState } from 'react';
import { Header } from '@/components/shared/header';
import { Footer } from '@/components/shared/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface FAQItem {
  question: string;
  answer: string;
  category: 'general' | 'donors' | 'recipients' | 'hospitals';
}

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>('general');

  const faqs: FAQItem[] = [
    {
      category: 'general',
      question: 'What is CureLedger?',
      answer:
        'CureLedger is a transparent health crowdfunding platform that connects patients seeking medical support with compassionate donors. All campaigns are verified by hospitals and approved by admins to ensure authenticity.',
    },
    {
      category: 'general',
      question: 'Is CureLedger legitimate and safe?',
      answer:
        'Yes. Every campaign is verified by verified hospitals and approved by our admin team. We use bank-level encryption for payments and maintain complete transparency of fund flow.',
    },
    {
      category: 'donors',
      question: 'How do I donate to a campaign?',
      answer:
        'Browse approved campaigns, select one, enter your donation amount, and complete payment via our secure Interswitch integration. You can track your donation in real-time.',
    },
    {
      category: 'donors',
      question: 'Can I get a receipt for tax purposes?',
      answer:
        'Yes. All donors receive receipts that can be used for tax deductions in applicable jurisdictions. Download receipts from your donor dashboard.',
    },
    {
      category: 'recipients',
      question: 'How do I start a campaign as a patient?',
      answer:
        'Register as a recipient, complete your profile with medical documents, create a campaign with your story, and submit for hospital verification. Once verified and admin-approved, your campaign goes live.',
    },
    {
      category: 'recipients',
      question: 'What documents do I need to upload?',
      answer:
        'You need medical documents like doctor letters, medical reports, and hospital recommendations to verify your medical condition. These are shared only with hospitals and admins.',
    },
    {
      category: 'hospitals',
      question: 'How can my hospital partner with CureLedger?',
      answer:
        'Contact our hospital partnerships team at partners@cureledger.com. We partner with accredited hospitals to verify campaign authenticity.',
    },
    {
      category: 'hospitals',
      question: 'What is the hospital verification process?',
      answer:
        'Hospitals review submitted medical documents, verify the patient identity, confirm the medical need, and approve or reject campaigns based on authenticity.',
    },
  ];

  const filtered = faqs.filter(
    (faq) => activeCategory === 'general' || faq.category === activeCategory
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Hero */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-muted-foreground">
            Find answers to common questions about CureLedger
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 flex-1">
        <div className="max-w-3xl mx-auto">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {['general', 'donors', 'recipients', 'hospitals'].map((cat) => (
              <Button
                key={cat}
                variant={activeCategory === cat ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveCategory(cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </Button>
            ))}
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {filtered.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-input bg-background shadow-sm cursor-pointer hover:shadow-md transition"
                onClick={() => setOpenId(openId === idx ? null : idx)}
              >
                <div className="border-b border-input px-6 py-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{faq.question}</h3>
                    <span className="text-2xl">
                      {openId === idx ? '−' : '+'}
                    </span>
                  </div>
                </div>
                {openId === idx && (
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                )}
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <Card className="mt-12 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-center">Still have questions?</CardTitle>
              <CardDescription className="text-center">
                Contact our support team
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="mb-6">
                Email:{' '}
                <a href="mailto:support@cureledger.com" className="font-semibold text-primary hover:underline">
                  support@cureledger.com
                </a>
              </p>
              <p>
                Phone:{' '}
                <a href="tel:+2348XXXXXXXX" className="font-semibold text-primary hover:underline">
                  +234 8XX XXX XXXX
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
