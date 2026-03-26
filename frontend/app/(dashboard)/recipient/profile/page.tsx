'use client';

import { useState, useEffect } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { UserCircleIcon } from '@hugeicons/core-free-icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { api } from '@/lib/api';
import { toast } from 'sonner';

interface ProfileStatus {
  complete: boolean;
  missingFields: string[];
}

export default function RecipientProfilePage() {
  const [saved, setSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    nin: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    city: '',
    state: '',
  });

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await api.getProfile();
        if (data.user) {
          setProfile({
            firstName: data.user.firstName || '',
            lastName: data.user.lastName || '',
            email: data.user.email || '',
            phone: data.user.phone || '',
            nin: data.profile?.nin || '',
            dateOfBirth: data.profile?.dateOfBirth || '',
            gender: data.profile?.gender || '',
            address: data.profile?.address || '',
            city: data.profile?.city || '',
            state: data.profile?.state || '',
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

  const checkProfileComplete = (): ProfileStatus => {
    const requiredFields = ['firstName', 'lastName', 'phone', 'nin', 'dateOfBirth', 'gender', 'address', 'city', 'state'];
    const missingFields = requiredFields.filter(field => !profile[field as keyof typeof profile]);
    return {
      complete: missingFields.length === 0,
      missingFields
    };
  };

  const profileStatus = checkProfileComplete();

  return (
    <div className="max-w-2xl">
      {isLoading && !profile.firstName ? (
        <div className="space-y-4 animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-8" />
          <div className="h-32 bg-gray-200 rounded" />
          <div className="h-64 bg-gray-200 rounded" />
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      ) : (
        <>
      {profileStatus.complete ? null : (
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.019-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            <p className="font-medium text-yellow-800">Profile Incomplete</p>
          </div>
          <p className="text-sm text-yellow-700">
            Please complete your profile to create a campaign. Missing: {profileStatus.missingFields.join(', ')}
          </p>
        </div>
      )}

      <Card className="border-border mb-6">
        <CardContent className="pt-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center overflow-hidden">
              <HugeiconsIcon icon={UserCircleIcon} className="w-10 h-10 text-primary" strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="font-heading text-xl font-semibold mb-1">{profile.firstName} {profile.lastName}</h2>
              <p className="text-sm text-muted-foreground mb-3">{profile.email}</p>
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${profileStatus.complete ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {profileStatus.complete ? 'Profile Complete' : 'Profile Incomplete'}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border">
        <CardHeader>
          <CardTitle className="font-heading">Personal Details</CardTitle>
          <CardDescription>Complete all fields to create campaigns</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">First Name *</label>
              <Input
                type="text"
                name="firstName"
                value={profile.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Last Name *</label>
              <Input
                type="text"
                name="lastName"
                value={profile.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email</label>
              <Input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                disabled
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Phone *</label>
              <Input
                type="tel"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">NIN *</label>
              <Input
                type="text"
                name="nin"
                value={profile.nin}
                onChange={handleChange}
                placeholder="Enter your NIN"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Date of Birth *</label>
              <Input
                type="date"
                name="dateOfBirth"
                value={profile.dateOfBirth}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Gender *</label>
            <select
              name="gender"
              value={profile.gender}
              onChange={handleChange}
              className="w-full h-11 px-3 rounded-md border border-input bg-background text-sm"
              required
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Address *</label>
            <Input
              type="text"
              name="address"
              value={profile.address}
              onChange={handleChange}
              placeholder="Street address"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">City *</label>
              <Input
                type="text"
                name="city"
                value={profile.city}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">State *</label>
              <Input
                type="text"
                name="state"
                value={profile.state}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t">
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