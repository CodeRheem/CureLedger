'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowLeft02Icon, CheckmarkCircle02Icon, DocumentAttachmentIcon, OctagonXIcon, Search01Icon } from '@hugeicons/core-free-icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockCampaigns } from '@/lib/mock-data';

interface AIDocumentScore {
  document: string;
  score: number;
  flags: string[];
}

const mockAIDocumentScores: AIDocumentScore[] = [
  { document: 'Medical Report.pdf', score: 96, flags: [] },
  { document: 'Doctor Recommendation.pdf', score: 94, flags: ['Signature slightly unclear'] },
  { document: 'Patient ID Verification.pdf', score: 98, flags: [] },
];

export default function HospitalVerifyPage() {
  const params = useParams();
  const router = useRouter();
  const campaignId = params.id as string;
  const campaign = mockCampaigns.find((c) => c.id === campaignId);
  const [isVerifying, setIsVerifying] = useState(false);
  const [decision, setDecision] = useState<'approve' | 'reject' | null>(null);
  const [notes, setNotes] = useState('');

  if (!campaign) {
    return (
      <div className="max-w-4xl mx-auto py-12">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full empty-state-bg flex items-center justify-center">
            <HugeiconsIcon icon={Search01Icon} className="w-8 h-8 empty-state-icon" strokeWidth={1.5} />
          </div>
          <h2 className="text-xl font-heading font-bold mb-4">Campaign Not Found</h2>
          <Link href="/hospital">
            <Button>Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  const averageScore = Math.round(
    mockAIDocumentScores.reduce((sum, doc) => sum + doc.score, 0) / mockAIDocumentScores.length
  );

  const getScoreColor = (score: number) => {
    if (score >= 95) return 'text-green-600';
    if (score >= 85) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 95) return 'bg-green-50 border-green-200';
    if (score >= 85) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      router.push('/hospital');
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link href="/hospital" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition">
          <HugeiconsIcon icon={ArrowLeft02Icon} className="w-4 h-4" strokeWidth={1.5} />
          Back to Dashboard
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-foreground mb-2">Verify Campaign</h1>
        <p className="text-muted-foreground">Review documents and AI analysis before approving</p>
      </div>

      <div className="grid gap-6">
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="font-heading">Campaign Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Campaign Title</p>
                <p className="font-medium text-foreground">{campaign.title}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Recipient</p>
                <p className="font-medium text-foreground">{campaign.recipientName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Medical Condition</p>
                <p className="font-medium text-foreground">{campaign.condition}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Target Amount</p>
                <p className="font-medium text-foreground">₦{campaign.targetAmount.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle className="font-heading">AI Document Analysis</CardTitle>
            <CardDescription>Automated verification scores for submitted documents</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className={`p-4 rounded-lg border ${getScoreBg(averageScore)}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Overall AI Confidence</p>
                  <p className="text-sm text-muted-foreground">Based on document analysis</p>
                </div>
                <div className="text-right">
                  <p className={`text-3xl font-bold ${getScoreColor(averageScore)}`}>{averageScore}%</p>
                  {averageScore >= 95 && (
                    <Badge className="badge-success mt-1">Auto-Approve Eligible</Badge>
                  )}
                  {averageScore < 95 && averageScore >= 85 && (
                    <Badge className="badge-warning mt-1">Manual Review Required</Badge>
                  )}
                  {averageScore < 85 && (
                    <Badge className="badge-error mt-1">High Risk - Careful Review</Badge>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {mockAIDocumentScores.map((doc, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                      <HugeiconsIcon icon={DocumentAttachmentIcon} className="w-5 h-5 text-primary" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{doc.document}</p>
                      {doc.flags.length > 0 && (
                        <p className="text-sm text-yellow-600">{doc.flags.join(', ')}</p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-xl font-bold ${getScoreColor(doc.score)}`}>{doc.score}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle className="font-heading">Uploaded Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {campaign.documents?.map((doc, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <HugeiconsIcon icon={DocumentAttachmentIcon} className="w-5 h-5 text-muted-foreground" strokeWidth={1.5} />
                    <span className="font-medium text-foreground">{doc.name}</span>
                    <Badge variant="outline">{doc.type}</Badge>
                  </div>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle className="font-heading">Verification Decision</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {decision && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Notes (Optional)</label>
                  <textarea
                    className="w-full p-3 border border-input rounded-lg text-sm"
                    rows={3}
                    placeholder="Add any notes about your decision..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={handleVerify}
                    disabled={isVerifying}
                    className="flex-1"
                  >
                    {isVerifying ? 'Processing...' : `Confirm ${decision === 'approve' ? 'Approval' : 'Rejection'}`}
                  </Button>
                  <Button variant="outline" onClick={() => setDecision(null)}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}
            {!decision && (
              <div className="flex gap-3">
                <Button onClick={() => setDecision('approve')} className="flex-1 bg-green-600 hover:bg-green-700">
                  <HugeiconsIcon icon={CheckmarkCircle02Icon} className="w-4 h-4 mr-2" strokeWidth={1.5} />
                  Approve Campaign
                </Button>
                <Button variant="outline" onClick={() => setDecision('reject')} className="flex-1 text-red-600 border-red-200 hover:bg-red-50">
                  <HugeiconsIcon icon={OctagonXIcon} className="w-4 h-4 mr-2" strokeWidth={1.5} />
                  Reject Campaign
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}