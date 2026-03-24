'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function RecipientProfilePage() {
  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-foreground mb-2">My Profile</h1>
        <p className="text-muted-foreground">Manage your personal information</p>
      </div>

      {/* Profile Photo */}
      <Card className="border-border mb-6">
        <CardContent className="pt-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center overflow-hidden">
              <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </div>
            <div>
              <h2 className="font-heading text-xl font-semibold mb-1">Jane Smith</h2>
              <p className="text-sm text-muted-foreground mb-3">jane@example.com</p>
              <Button variant="outline" size="sm">Update Photo</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Form */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="font-heading">Personal Details</CardTitle>
          <CardDescription>Update your information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">First Name</label>
            <Input type="text" defaultValue="Jane" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Last Name</label>
            <Input type="text" defaultValue="Smith" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Email</label>
            <Input type="email" defaultValue="jane@example.com" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Phone</label>
            <Input type="tel" defaultValue="+2348098765432" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">BVN</label>
            <Input type="text" defaultValue="12345678901" disabled />
            <p className="text-xs text-muted-foreground">Cannot be changed</p>
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
