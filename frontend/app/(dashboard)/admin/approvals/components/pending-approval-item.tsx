import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { ApprovalItem } from './approval-types';

export function PendingApprovalItem({
  approval,
  getConfidenceBg,
  getConfidenceColor,
  onReview,
}: {
  approval: ApprovalItem;
  getConfidenceBg: (score: number) => string;
  getConfidenceColor: (score: number) => string;
  onReview: () => void;
}) {
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
        <div className="text-right">
          <div className={`p-3 rounded-lg border ${getConfidenceBg(approval.aiConfidence)}`}>
            <p className="text-xs text-muted-foreground mb-1">AI Confidence</p>
            <p className={`text-2xl font-bold ${getConfidenceColor(approval.aiConfidence)}`}>
              {approval.aiConfidence}%
            </p>
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