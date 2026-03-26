'use client';

import { useState, useEffect } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { CheckmarkCircle02Icon, Hospital02Icon } from '@hugeicons/core-free-icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { api } from '@/lib/api';
import { toast } from 'sonner';

export default function HospitalProfilePage() {
  const [saved, setSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState({
    hospitalName: '',
    hospitalLicense: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await api.getProfile();
        if (data.user) {
          setProfile({
            hospitalName: data.profile?.hospitalName || '',
            hospitalLicense: data.profile?.hospitalLicense || '',
            contactPerson: data.user.firstName + ' ' + data.user.lastName,
            email: data.user.email || '',
            phone: data.user.phone || '',
            address: data.profile?.address || '',
          });
        }
      } catch (err) {
        console.error('Failed to fetch profile:', err);
        setError('Failed to load profile');
      } finally {
        setIsLoading(false);
      }
    }
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
    setSaved(false);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await api.updateProfile(profile);
      setSaved(true);
      toast.success('Profile saved successfully');
    } catch (err) {
      console.error('Failed to save profile:', err);
      toast.error('Failed to save profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-foreground mb-2">Hospital Profile</h1>
        <p className="text-muted-foreground">Manage your hospital information</p>
      </div>

      <Card className="border-border mb-6">
        <CardContent className="pt-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center overflow-hidden">
              <HugeiconsIcon icon={Hospital02Icon} className="w-10 h-10 text-primary" strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="font-heading text-xl font-semibold mb-1">{profile.hospitalName}</h2>
              <p className="text-sm text-muted-foreground">License: {profile.hospitalLicense}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs">
                  <HugeiconsIcon icon={CheckmarkCircle02Icon} className="w-3 h-3" strokeWidth={1.5} />
                  Verified
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border">
        <CardHeader>
          <CardTitle className="font-heading">Hospital Details</CardTitle>
          <CardDescription>Update your hospital information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Hospital Name</label>
            <Input
              type="text"
              name="hospitalName"
              value={profile.hospitalName}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Hospital License</label>
            <Input type="text" value={profile.hospitalLicense} disabled />
            <p className="text-xs text-muted-foreground">Cannot be changed</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Contact Person</label>
            <Input
              type="text"
              name="contactPerson"
              value={profile.contactPerson}
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
            <label className="text-sm font-medium text-foreground">Address</label>
            <Input
              type="text"
              name="address"
              value={profile.address}
              onChange={handleChange}
            />
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