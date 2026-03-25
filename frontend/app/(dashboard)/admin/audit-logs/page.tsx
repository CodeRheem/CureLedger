'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface AuditLog {
  id: string;
  action: string;
  user: string;
  role: string;
  target: string;
  details: string;
  timestamp: string;
  ip: string;
}

const mockLogs: AuditLog[] = [
  {
    id: '1',
    action: 'APPROVE_CAMPAIGN',
    user: 'Admin User',
    role: 'admin',
    target: 'Kidney Transplant Surgery',
    details: 'Campaign approved after review',
    timestamp: '2024-03-01 14:30:22',
    ip: '192.168.1.100',
  },
  {
    id: '2',
    action: 'REJECT_CAMPAIGN',
    user: 'Admin User',
    role: 'admin',
    target: 'Spinal Surgery Fund',
    details: 'Incomplete documentation',
    timestamp: '2024-03-01 12:15:10',
    ip: '192.168.1.100',
  },
  {
    id: '3',
    action: 'VERIFY_HOSPITAL',
    user: 'Admin User',
    role: 'admin',
    target: 'Kano Healthcare',
    details: 'Hospital license verified',
    timestamp: '2024-02-28 10:45:33',
    ip: '192.168.1.100',
  },
  {
    id: '4',
    action: 'PROCESS_WITHDRAWAL',
    user: 'Admin User',
    role: 'admin',
    target: 'Jane Smith',
    details: 'Withdrawal of ₦500,000 processed',
    timestamp: '2024-02-28 09:20:15',
    ip: '192.168.1.100',
  },
  {
    id: '5',
    action: 'CREATE_ADMIN',
    user: 'Super Admin',
    role: 'admin',
    target: 'New Admin',
    details: 'New admin account created',
    timestamp: '2024-02-27 16:00:00',
    ip: '192.168.1.50',
  },
  {
    id: '6',
    action: 'UPDATE_SETTINGS',
    user: 'Admin User',
    role: 'admin',
    target: 'System',
    details: 'Platform commission changed to 5%',
    timestamp: '2024-02-27 11:30:45',
    ip: '192.168.1.100',
  },
  {
    id: '7',
    action: 'SUSPEND_RECIPIENT',
    user: 'Admin User',
    role: 'admin',
    target: 'John Doe',
    details: 'Account suspended due to policy violation',
    timestamp: '2024-02-26 14:22:18',
    ip: '192.168.1.100',
  },
  {
    id: '8',
    action: 'DIVERT_FUNDS',
    user: 'Admin User',
    role: 'admin',
    target: 'Campaign #123',
    details: '₦200,000 diverted to Emergency Fund',
    timestamp: '2024-02-25 09:15:00',
    ip: '192.168.1.100',
  },
];

export default function AdminAuditLogsPage() {
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState('');

  const filteredLogs = mockLogs.filter((log) => {
    const matchesFilter = filter === 'all' || log.action.includes(filter);
    const matchesSearch =
      search === '' ||
      log.user.toLowerCase().includes(search.toLowerCase()) ||
      log.target.toLowerCase().includes(search.toLowerCase()) ||
      log.details.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getActionBadge = (action: string) => {
    if (action.includes('APPROVE') || action.includes('VERIFY') || action.includes('CREATE')) {
      return <Badge className="badge-success">{action}</Badge>;
    }
    if (action.includes('REJECT') || action.includes('SUSPEND')) {
      return <Badge className="badge-error">{action}</Badge>;
    }
    if (action.includes('WITHDRAW') || action.includes('DIVERT')) {
      return <Badge className="badge-warning">{action}</Badge>;
    }
    return <Badge variant="outline">{action}</Badge>;
  };

  const actionTypes = ['all', 'APPROVE_CAMPAIGN', 'REJECT_CAMPAIGN', 'VERIFY_HOSPITAL', 'PROCESS_WITHDRAWAL', 'CREATE_ADMIN', 'SUSPEND_RECIPIENT', 'DIVERT_FUNDS'];

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-foreground mb-2">Audit Logs</h1>
        <p className="text-muted-foreground">Track all administrative actions on the platform</p>
      </div>

      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <Card className="border-border">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-1">Total Actions</p>
            <p className="text-3xl font-bold text-foreground">{mockLogs.length}</p>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-1">Approvals</p>
            <p className="text-3xl font-bold text-green-600">
              {mockLogs.filter((l) => l.action.includes('APPROVE')).length}
            </p>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-1">Rejections</p>
            <p className="text-3xl font-bold text-red-600">
              {mockLogs.filter((l) => l.action.includes('REJECT') || l.action.includes('SUSPEND')).length}
            </p>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-1">Fund Movements</p>
            <p className="text-3xl font-bold text-yellow-600">
              {mockLogs.filter((l) => l.action.includes('WITHDRAW') || l.action.includes('DIVERT')).length}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="font-heading">Activity Log</CardTitle>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search logs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="px-3 py-2 border border-input rounded-md text-sm"
              />
            </div>
          </div>
          <CardDescription>Filter and search through all platform activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4 flex-wrap">
            {actionTypes.map((type) => (
              <Button
                key={type}
                variant={filter === type ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter(type)}
              >
                {type === 'all' ? 'All' : type.replace(/_/g, ' ')}
              </Button>
            ))}
          </div>

          <div className="space-y-3">
            {filteredLogs.map((log) => (
              <div key={log.id} className="flex items-start justify-between p-4 border border-border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {getActionBadge(log.action)}
                    <span className="text-sm text-muted-foreground">{log.timestamp}</span>
                  </div>
                  <p className="text-sm text-foreground">
                    <span className="font-medium">{log.user}</span> ({log.role}) - {log.details}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Target: {log.target} | IP: {log.ip}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}