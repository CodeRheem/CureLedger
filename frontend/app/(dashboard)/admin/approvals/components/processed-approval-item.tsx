import { Badge } from '@/components/ui/badge';
import type { ApprovalItem } from './approval-types';

export function ProcessedApprovalItem({ approval }: { approval: ApprovalItem }) {
  return (
    <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
      <div>
        <p className="font-medium text-foreground">{approval.title}</p>
        <p className="text-sm text-muted-foreground">
          {approval.recipientName} - {approval.hospitalName}
        </p>
        {approval.overrideReason && (
          <p className="text-sm text-yellow-600 mt-1">Override: {approval.overrideReason}</p>
        )}
      </div>
      <Badge className={approval.status === 'approved' ? 'badge-success' : 'badge-error'}>
        {approval.status}
      </Badge>
    </div>
  );
}