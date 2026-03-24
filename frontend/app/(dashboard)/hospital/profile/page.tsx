'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function HospitalProfilePage() {
  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-foreground mb-2">Hospital Profile</h1>
        <p className="text-muted-foreground">Manage your hospital information</p>
      </div>

      <Card className="border-border">
        <CardHeader>
          <CardTitle className="font-heading">Hospital Details</CardTitle>
          <CardDescription>Update your hospital information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Hospital Name</label>
            <Input type="text" defaultValue="Lagos General Hospital" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Hospital License</label>
            <Input type="text" defaultValue="HOSP/2024/12345" disabled />
            <p className="text-xs text-muted-foreground">Cannot be changed</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Contact Person</label>
            <Input type="text" defaultValue="Dr. John Smith" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Email</label>
            <Input type="email" defaultValue="lagos.general@hospital.com" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Phone</label>
            <Input type="tel" defaultValue="+2348012345678" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Address</label>
            <Input type="text" defaultValue="123 Medical Street, Lagos" />
          </div>

          <div className="flex gap-4 pt-6">
            <Button className="flex-1">Save Changes</Button>
            <Button variant="outline" className="flex-1">Cancel</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
