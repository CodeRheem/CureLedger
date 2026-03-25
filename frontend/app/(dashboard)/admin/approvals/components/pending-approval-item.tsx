import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { ApprovalItem } from './approval-types';

export function PendingApprovalItem({
  approval,
  getConfidenceColor,
  onReview,
}: {
  approval: ApprovalItem;
  getConfidenceColor: (score: number) => string;
  onReview: () => void;
}) {
  const confidenceProgress = `${approval.aiConfidence * 3.6}deg`;
  const confidenceTone =
    approval.aiConfidence >= 75 ? 'green' : approval.aiConfidence >= 50 ? 'yellow' : 'red';

  const confidenceRingClasses = {
    green: 'text-green-600 border-green-100 bg-green-50',
    yellow: 'text-yellow-600 border-yellow-100 bg-yellow-50',
    red: 'text-red-600 border-red-100 bg-red-50',
  }[confidenceTone];

  return (
    <div className="border border-border rounded-lg p-5 hover-lint">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1">
          <h3 className="font-heading font-semibold text-lg text-foreground">{approval.title}</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Recipient: {approval.recipientName} | Hospital: {approval.hospitalName}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <Badge className="badge-warning">Pending Review</Badge>
            {approval.hospitalVerified && <Badge className="badge-success">Hospital Verified</Badge>}
          </div>
        </div>
        <div className="shrink-0 text-right">
          <div className="flex flex-col items-center gap-2">
            <div
              className={`relative h-24 w-24 rounded-full border ${confidenceRingClasses}`}
              style={{
                background: `conic-gradient(currentColor 0 ${confidenceProgress}, rgba(148, 163, 184, 0.14) ${confidenceProgress} 360deg)`,
              }}
            >
              <div className="absolute inset-2 rounded-full bg-background border border-border flex items-center justify-center">
                <div className="text-center">
                  <p className={`text-2xl font-bold ${getConfidenceColor(approval.aiConfidence)}`}>
                    {approval.aiConfidence}%
                  </p>
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">AI Confidence</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-4 text-sm">
        <div>
          <p className="text-muted-foreground">Target Amount</p>
          <p className="font-medium text-foreground">₦{approval.targetAmount.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Raised So Far</p>
          <p className="font-medium text-foreground">₦{approval.raisedAmount.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Submitted</p>
          <p className="font-medium text-foreground">{approval.submittedAt}</p>
        </div>
      </div>

      <div className="flex gap-2">
        <Button onClick={onReview}>Review & Approve</Button>
        <Button variant="outline">View Documents</Button>
      </div>
    </div>
  );
}