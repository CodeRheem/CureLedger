'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';

const mockRecipients = [
  { id: '1', name: 'Jane Smith', email: 'jane@example.com', phone: '+2348098765432', campaigns: 1, status: 'Active' },
  { id: '2', name: 'John Doe', email: 'john@example.com', phone: '+2348012345678', campaigns: 1, status: 'Active' },
  { id: '3', name: 'Alice Johnson', email: 'alice@example.com', phone: '+2349012345678', campaigns: 0, status: 'Inactive' },
];

export default function AdminRecipientsPage() {
  const [search, setSearch] = useState('');

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
              {mockRecipients.map((recipient) => (
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
