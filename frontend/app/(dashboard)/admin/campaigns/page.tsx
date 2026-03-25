'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';

const mockCampaigns = [
  { id: '1', title: 'Life-Saving Heart Surgery', recipient: 'Jane Smith', target: '₦2.5M', raised: '₦1.85M', status: 'Approved' },
  { id: '2', title: 'Emergency Cancer Treatment', recipient: 'Sarah W.', target: '₦3.5M', raised: '₦2.1M', status: 'Approved' },
  { id: '3', title: 'Kidney Transplant Surgery', recipient: 'Muhammed A.', target: '₦4M', raised: '₦500K', status: 'Pending' },
];

export default function AdminCampaignsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredCampaigns = mockCampaigns.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.recipient.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !statusFilter || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-foreground mb-2">Manage Campaigns</h1>
        <p className="text-muted-foreground">View and manage all campaigns on the platform</p>
      </div>

      <Card className="border-border">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <CardTitle className="font-heading">All Campaigns</CardTitle>
            <div className="flex gap-2 w-full sm:w-auto">
              <select 
                className="h-9 px-3 py-2 border border-input rounded-md bg-background text-sm"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">All Status</option>
                <option value="Approved">Approved</option>
                <option value="Pending">Pending</option>
                <option value="Rejected">Rejected</option>
              </select>
              <Input
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-9 w-48"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign Title</TableHead>
                <TableHead>Recipient</TableHead>
                <TableHead>Target</TableHead>
                <TableHead>Raised</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCampaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell className="font-medium">{campaign.title}</TableCell>
                  <TableCell>{campaign.recipient}</TableCell>
                  <TableCell>{campaign.target}</TableCell>
                  <TableCell>{campaign.raised}</TableCell>
                  <TableCell>
                    <Badge className={campaign.status === 'Approved' ? 'badge-success' : 'badge-warning'}>
                      {campaign.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">Edit</Button>
                      <Button variant="ghost" size="sm" className="btn-danger-ghost">Remove</Button>
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
