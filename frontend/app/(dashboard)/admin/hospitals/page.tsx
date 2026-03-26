'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { api } from '@/lib/api';
import { toast } from 'sonner';

interface HospitalRow {
  id: string;
  name: string;
  license: string;
  contact: string;
  verified: number;
  status: 'Approved' | 'Pending';
}

export default function AdminHospitalsPage() {
  const [search, setSearch] = useState('');
  const [hospitals, setHospitals] = useState<HospitalRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHospitals() {
      try {
        const data = await api.getAdminHospitals();
        setHospitals(
          (data.hospitals || []).map((hospital: any) => ({
            id: hospital._id || hospital.id,
            name: hospital.hospitalName || hospital.name || 'Hospital',
            license: hospital.hospitalLicense || hospital.license || '-',
            contact: hospital.address || hospital.contact || '-',
            verified: hospital.verifiedCases || 0,
            status: hospital.verified ? 'Approved' : 'Pending'
          }))
        );
      } catch (error) {
        console.error('Failed to load hospitals:', error);
        toast.error('Failed to load hospitals');
      } finally {
        setLoading(false);
      }
    }

    fetchHospitals();
  }, []);

  const handleVerifyHospital = async (hospitalId: string) => {
    try {
      await api.verifyHospital(hospitalId);
      setHospitals((prev) => prev.map((hospital) => (
        hospital.id === hospitalId
          ? { ...hospital, status: 'Approved' }
          : hospital
      )));
      toast.success('Hospital verified successfully');
    } catch (error) {
      console.error('Failed to verify hospital:', error);
      toast.error('Failed to verify hospital');
    }
  };

  const filteredHospitals = hospitals.filter(h =>
    h.name.toLowerCase().includes(search.toLowerCase()) ||
    h.license.toLowerCase().includes(search.toLowerCase()) ||
    h.contact.toLowerCase().includes(search.toLowerCase())
  );

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
              {loading && (
                <TableRow>
                  <td colSpan={6} className="text-center text-muted-foreground py-8">
                    Loading hospitals...
                  </td>
                </TableRow>
              )}
              {filteredHospitals.map((hospital) => (
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
                      {hospital.status === 'Pending' ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleVerifyHospital(hospital.id)}
                        >
                          Verify
                        </Button>
                      ) : (
                        <Button variant="ghost" size="sm" className="btn-danger-ghost">Revoke</Button>
                      )}
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
