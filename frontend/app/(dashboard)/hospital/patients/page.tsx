'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { api } from '@/lib/api';

export default function HospitalPatientsPage() {
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPatients() {
      try {
        const data = await api.getVerificationHistory();
        setPatients(
          (data.verifications || []).map((v: any) => ({
            name: v.campaignId?.recipientId?.firstName + ' ' + v.campaignId?.recipientId?.lastName || 'Unknown',
            condition: v.campaignId?.condition || 'Unknown',
            campaign: v.campaignId?.title || 'Unknown',
            date: v.createdAt ? new Date(v.createdAt).toISOString().split('T')[0] : '',
            status: v.verified ? 'Approved' : 'Rejected',
          }))
        );
      } catch (err) {
        console.error('Failed to fetch patients:', err);
        setError('Failed to load patients');
      } finally {
        setLoading(false);
      }
    }
    fetchPatients();
  }, []);

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-foreground mb-2">My Verified Patients</h1>
        <p className="text-muted-foreground">View all patients you have verified</p>
      </div>

      <Card className="border-border">
        <CardHeader>
          <CardTitle className="font-heading">Verified Patients</CardTitle>
          <CardDescription>History of patient verifications</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4 p-4 border border-border rounded-lg animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-32" />
                  <div className="h-4 bg-gray-200 rounded w-40" />
                  <div className="h-4 bg-gray-200 rounded w-48" />
                  <div className="h-4 bg-gray-200 rounded w-24" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-500 mb-4">{error}</p>
              <Button variant="outline" onClick={() => window.location.reload()}>Try Again</Button>
            </div>
          ) : patients.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No patients found</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient Name</TableHead>
                  <TableHead>Medical Condition</TableHead>
                  <TableHead>Campaign</TableHead>
                  <TableHead>Verified Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {patients.map((patient, i) => (
                  <TableRow key={i}>
                  <TableCell className="font-medium">{patient.name}</TableCell>
                  <TableCell>{patient.condition}</TableCell>
                  <TableCell>{patient.campaign}</TableCell>
                  <TableCell>{patient.date}</TableCell>
                  <TableCell>
                    <Badge className={patient.status === 'Approved' ? 'badge-success' : 'badge-warning'}>
                      {patient.status}
                    </Badge>
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
