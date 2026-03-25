'use client';

import { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { UserCircleIcon } from '@hugeicons/core-free-icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function RecipientProfilePage() {
  const [saved, setSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState({
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@example.com',
    phone: '+2348098765432',
    bvn: '12345678901',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
    setSaved(false);
  };

  const handleSave = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-foreground mb-2">My Profile</h1>
        <p className="text-muted-foreground">Manage your personal information</p>
      </div>

      <Card className="border-border mb-6">
        <CardContent className="pt-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center overflow-hidden">
              <HugeiconsIcon icon={UserCircleIcon} className="w-10 h-10 text-primary" strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="font-heading text-xl font-semibold mb-1">{profile.firstName} {profile.lastName}</h2>
              <p className="text-sm text-muted-foreground mb-3">{profile.email}</p>
              <Button variant="outline" size="sm">Update Photo</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border">
        <CardHeader>
          <CardTitle className="font-heading">Personal Details</CardTitle>
          <CardDescription>Update your information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">First Name</label>
            <Input
              type="text"
              name="firstName"
              value={profile.firstName}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Last Name</label>
            <Input
              type="text"
              name="lastName"
              value={profile.lastName}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Email</label>
            <Input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Phone</label>
            <Input
              type="tel"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">BVN</label>
            <Input type="text" value={profile.bvn} disabled />
            <p className="text-xs text-muted-foreground">Cannot be changed</p>
          </div>

          <div className="flex gap-4 pt-6">
            <Button className="flex-1" onClick={handleSave} disabled={isLoading}>
              {isLoading ? 'Saving...' : saved ? 'Changes Saved!' : 'Save Changes'}
            </Button>
            <Button variant="outline" className="flex-1" onClick={() => window.location.reload()}>
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}