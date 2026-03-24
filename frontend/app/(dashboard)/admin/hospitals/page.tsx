'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';

const mockHospitals = [
  { id: '1', name: 'Lagos General Hospital', license: 'HOSP/2024/12345', contact: 'Lagos', verified: 12, status: 'Approved' },
  { id: '2', name: 'Abuja Medical Centre', license: 'HOSP/2024/54321', contact: 'Abuja', verified: 8, status: 'Approved' },
  { id: '3', name: 'Kano Healthcare', license: 'HOSP/2024/99999', contact: 'Kano', verified: 0, status: 'Pending' },
];

export default function AdminHospitalsPage() {
  const [search, setSearch] = useState('');

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-foreground mb-2">Manage Hospitals</h1>
        <p className="text-muted-foreground">View and manage all hospital accounts</p>
      </div>

      <Card className="border-border">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="font-heading">All Hospitals</CardTitle>
            <div className="w-72">
              <Input
                placeholder="Search by name, license..."
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
                <TableHead>Hospital Name</TableHead>
                <TableHead>License</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Verified Cases</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockHospitals.map((hospital) => (
                <TableRow key={hospital.id}>
                  <TableCell className="font-medium">{hospital.name}</TableCell>
                  <TableCell>{hospital.license}</TableCell>
                  <TableCell>{hospital.contact}</TableCell>
                  <TableCell>{hospital.verified}</TableCell>
                  <TableCell>
                    <Badge className={hospital.status === 'Approved' ? 'badge-success' : 'badge-warning'}>
                      {hospital.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">View</Button>
                      <Button variant="ghost" size="sm" className="btn-danger-ghost">Revoke</Button>
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
