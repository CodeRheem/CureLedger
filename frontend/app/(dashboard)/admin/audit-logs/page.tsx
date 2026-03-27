'use client';

import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StatsCard } from '@/components/shared/stats-card';
import { Input } from '@/components/ui/input';
import { api } from '@/lib/api';
import { toast } from 'sonner';

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

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchLogs() {
      try {
        const data = await api.getAuditLogs();
        setLogs(
          (data.logs || []).map((log: any) => ({
            id: String(log.id || log._id),
            action: String(log.action || log.type || 'ACTION').toUpperCase(),
            user: log.performedBy
              ? `${log.performedBy.firstName || ''} ${log.performedBy.lastName || ''}`.trim() || log.performedBy.email || 'System'
              : 'System',
            role: String(log.role || 'admin'),
            target: log.targetName || String(log.targetId || 'Unknown'),
            details: log.notes || `${String(log.type || '').replace(/_/g, ' ')} event`,
            timestamp: log.createdAt ? new Date(log.createdAt).toLocaleString() : '-',
            ip: 'N/A'
          }))
        );
      } catch (error) {
        console.error('Failed to load audit logs:', error);
        toast.error('Failed to load audit logs');
      } finally {
        setLoading(false);
      }
    }

    fetchLogs();
  }, []);

  const filteredLogs = logs.filter((log) => {
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

  const actionTypes = useMemo(() => {
    const types = Array.from(new Set(logs.map((log) => log.action)));
    return ['all', ...types];
  }, [logs]);

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-foreground mb-2">Audit Logs</h1>
        <p className="text-muted-foreground">Track all administrative actions on the platform</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <StatsCard label="Total Actions" value={logs.length} />
        <StatsCard label="Approvals" value={logs.filter((l) => l.action.includes('APPROVE')).length} />
        <StatsCard
          label="Rejections"
          value={logs.filter((l) => l.action.includes('REJECT') || l.action.includes('SUSPEND')).length}
        />
        <StatsCard
          label="Fund Movements"
          value={logs.filter((l) => l.action.includes('WITHDRAW') || l.action.includes('DIVERT')).length}
        />
      </div>

      <Card className="border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="font-heading">Activity Log</CardTitle>
            <div className="flex gap-2">
              <Input
                placeholder="Search logs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
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
            {loading && (
              <div className="text-center text-muted-foreground py-8">Loading audit logs...</div>
            )}
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