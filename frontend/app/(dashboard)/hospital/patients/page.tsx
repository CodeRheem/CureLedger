'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';

const mockPatients = [
  { name: 'Tobi Johnson', condition: 'Congenital Heart Disease', campaign: 'Life-Saving Heart Surgery', date: '2024-02-10', status: 'Approved' },
  { name: 'Sarah Williams', condition: 'Stage 3 Breast Cancer', campaign: 'Emergency Cancer Treatment', date: '2024-02-12', status: 'Approved' },
  { name: 'Muhammed Ahmed', condition: 'End-Stage Renal Disease', campaign: 'Kidney Transplant Surgery', date: '2024-02-28', status: 'Pending' },
];

export default function HospitalPatientsPage() {
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
              {mockPatients.map((patient, i) => (
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
