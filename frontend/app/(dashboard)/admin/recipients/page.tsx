'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { api } from '@/lib/api';
import { toast } from 'sonner';

interface RecipientRow {
  id: string;
  name: string;
  email: string;
  phone: string;
  campaigns: number;
  status: 'Active' | 'Inactive';
}

export default function AdminRecipientsPage() {
  const [search, setSearch] = useState('');
  const [recipients, setRecipients] = useState<RecipientRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecipients() {
      try {
        const data = await api.getRecipients();
        setRecipients(
          (data.recipients || []).map((recipient: any) => ({
            id: recipient._id || recipient.id,
            name: recipient.userId
              ? `${recipient.userId.firstName || ''} ${recipient.userId.lastName || ''}`.trim()
              : recipient.name || 'Recipient',
            email: recipient.userId?.email || recipient.email || '-',
            phone: recipient.userId?.phone || recipient.phone || '-',
            campaigns: recipient.campaignCount || 0,
            status: recipient.active === false ? 'Inactive' : 'Active'
          }))
        );
      } catch (error) {
        console.error('Failed to load recipients:', error);
        toast.error('Failed to load recipients');
      } finally {
        setLoading(false);
      }
    }

    fetchRecipients();
  }, []);

  const filteredRecipients = recipients.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.email.toLowerCase().includes(search.toLowerCase()) ||
    r.phone.includes(search)
  );

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-foreground mb-2">Manage Recipients</h1>
        <p className="text-muted-foreground">View and manage all recipients on the platform</p>
      </div>

      <Card className="border-border">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="font-heading">All Recipients</CardTitle>
            <div className="w-72">
              <Input
                placeholder="Search by name, email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Campaigns</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                    Loading recipients...
                  </TableCell>
                </TableRow>
              )}
              {filteredRecipients.map((recipient) => (
                <TableRow key={recipient.id}>
                  <TableCell className="font-medium">{recipient.name}</TableCell>
                  <TableCell>{recipient.email}</TableCell>
                  <TableCell>{recipient.phone}</TableCell>
                  <TableCell>{recipient.campaigns}</TableCell>
                  <TableCell>
                    <Badge className={recipient.status === 'Active' ? 'badge-success' : 'badge-neutral'}>
                      {recipient.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">View</Button>
                      <Button variant="ghost" size="sm" className="btn-danger-ghost">Suspend</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
