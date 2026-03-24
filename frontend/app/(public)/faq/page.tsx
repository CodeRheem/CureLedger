'use client';

import { useState } from 'react';

const faqs = [
  {
    id: 1,
    question: 'How does CureLedger work?',
    answer:
      'Patients create campaigns with medical documentation, hospitals verify authenticity, admins approve verified campaigns, and donors can then contribute funds to help save lives.',
  },
  {
    id: 2,
    question: 'Is my donation secure?',
    answer:
      'Yes, all donations are processed through secure payment gateways using industry-standard encryption. We partner with trusted payment providers to ensure your financial information is protected.',
  },
  {
    id: 3,
    question: 'How do I know a campaign is legitimate?',
    answer:
      'All campaigns on CureLedger have been verified by certified hospitals and reviewed by our admin team. We only display campaigns that meet our strict verification standards.',
  },
  {
    id: 4,
    question: 'Can I get a refund for my donation?',
    answer:
      'Donations are generally non-refundable as they directly support patient care. However, if there are exceptional circumstances, please contact our support team.',
  },
  {
    id: 5,
    question: 'How long do campaigns run?',
    answer:
      'Campaigns typically run for 120 days (4 months). However, if a campaign reaches its target amount before the deadline, it may close early.',
  },
  {
    id: 6,
    question: 'What happens after a campaign reaches its goal?',
    answer:
      'Once a campaign reaches its funding goal, the patient can request a withdrawal. Funds are then transferred to their verified hospital account within 5-7 business days.',
  },
  {
    id: 7,
    question: 'How do I create a campaign?',
    answer:
      'First, register as a recipient on CureLedger. Then provide your personal information, medical details, hospital documents, and create your campaign. Your hospital will verify the documents before it goes live.',
  },
  {
    id: 8,
    question: 'What documents do I need to upload?',
    answer:
      'You will need to upload medical reports, prescriptions, hospital recommendation letters, and proof of medical need. Exact requirements depend on your medical condition.',
  },
];

export default function FAQPage() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto py-20 px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600">
            Find answers to common questions about CureLedger
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-white rounded-lg border hover:shadow-md transition"
            >
              <button
                onClick={() =>
                  setExpandedId(expandedId === faq.id ? null : faq.id)
                }
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50"
              >
                <h3 className="font-semibold text-lg">{faq.question}</h3>
                <span
                  className={`text-2xl text-blue-600 transition-transform ${
                    expandedId === faq.id ? 'rotate-180' : ''
                  }`}
                >
                  ▼
                </span>
              </button>

              {expandedId === faq.id && (
                <div className="px-6 pb-6 text-gray-700 border-t">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 bg-blue-50 rounded-lg p-8 text-center">
          <h3 className="text-xl font-semibold mb-2">
            Can't find your answer?
          </h3>
          <p className="text-gray-700 mb-4">
            Contact our support team for further assistance
          </p>
          <a
            href="mailto:support@cureledger.com"
            className="text-blue-600 hover:underline font-semibold"
          >
            support@cureledger.com
          </a>
        </div>
      </div>
    </div>
  );
}
