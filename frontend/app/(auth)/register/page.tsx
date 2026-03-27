'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { api } from '@/lib/api';

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<'recipient' | 'hospital'>('recipient');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    password: '',
    confirmPassword: '',
    hospitalName: '',
    hospitalLicense: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      setIsSubmitting(true);

      const response = role === 'recipient'
        ? await api.registerRecipient({
            email: formData.email,
            password: formData.password,
            firstName: formData.firstName,
            lastName: formData.lastName,
            phone: formData.phone,
            location: formData.location,
          })
        : await api.registerHospital({
            email: formData.email,
            password: formData.password,
            firstName: formData.firstName,
            lastName: formData.lastName,
            phone: formData.phone,
            hospitalName: formData.hospitalName,
            hospitalLicense: formData.hospitalLicense,
          });

      localStorage.setItem('authToken', response.token);
      localStorage.setItem('userRole', response.user.role || role);
      localStorage.setItem('userEmail', response.user.email || formData.email);
      localStorage.setItem('userName', `${response.user.firstName || formData.firstName} ${response.user.lastName || formData.lastName}`);
      
      const maxAge = 60 * 60 * 24 * 30; // 30 days
      document.cookie = `authToken=${response.token}; path=/; max-age=${maxAge}`;
      document.cookie = `userRole=${response.user.role || role}; path=/; max-age=${maxAge}`;

      toast.success('Account created successfully');

      if ((response.user.role || role) === 'recipient') {
        window.location.href = '/recipient';
      } else {
        window.location.href = '/hospital';
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Registration failed';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    { icon: '✓', title: 'Secure & Verified', description: 'Your data is protected with encryption' },
    { icon: '🏥', title: 'Hospital Verified', description: 'All campaigns verified by medical professionals' },
    { icon: '💰', title: 'Transparent Tracking', description: 'Track every donation and fund transfer' },
  ];

  return (
    <div className="min-h-screen w-full max-w-2xl flex items-center justify-center px-4 py-8">
      <Card className="w-full  shadow-none!">
        <CardHeader className="space-y-3 pb-4">
          <div>
            <CardTitle className="text-3xl font-bold">Create Account</CardTitle>
            <CardDescription className="text-base mt-2">
              Step {step} of 2 • {step === 1 ? 'Basic Information' : 'Account Details'}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className='w-full'>
          {/* Progress Indicator */}
          <div className="px-6 pb-6 flex gap-2">
            <div className={`flex-1 h-2.5 rounded-full transition-all duration-300 ${step >= 1 ? 'bg-primary shadow-sm' : 'bg-muted'}`}></div>
            <div className={`flex-1 h-2.5 rounded-full transition-all duration-300 ${step >= 2 ? 'bg-primary shadow-sm' : 'bg-muted'}`}></div>
          </div>

          <form onSubmit={handleRegister} className="space-y-5 w-full">
            {step === 1 ? (
              <>
                {/* Role Selection */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-foreground">I want to register as:</label>
                  <div className="space-y-3">
                    {/* Recipient Option */}
                    <label className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${role === 'recipient'
                      ? 'border-primary bg-primary/5'
                      : 'border-input hover:border-primary/50 hover:bg-muted/50'
                      }`}>
                      <input
                        type="radio"
                        value="recipient"
                        checked={role === 'recipient'}
                        onChange={(e) => setRole(e.target.value as any)}
                        className="w-5 h-5 cursor-pointer"
                      />
                      <div>
                        <p className="font-semibold text-sm">Patient/Recipient</p>
                        <p className="text-xs text-muted-foreground">Create healthcare funding campaigns</p>
                      </div>
                    </label>

                    {/* Hospital Option */}
                    <label className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${role === 'hospital'
                      ? 'border-primary bg-primary/5'
                      : 'border-input hover:border-primary/50 hover:bg-muted/50'
                      }`}>
                      <input
                        type="radio"
                        value="hospital"
                        checked={role === 'hospital'}
                        onChange={(e) => setRole(e.target.value as any)}
                        className="w-5 h-5 cursor-pointer"
                      />
                      <div>
                        <p className="font-semibold text-sm">Hospital/Medical Facility</p>
                        <p className="text-xs text-muted-foreground">Verify and authenticate campaigns</p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-3 pt-3">
                  <div>
                    <Input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      label="First Name"
                      className="text-sm"
                    />
                  </div>

                  <div>
                    <Input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      label="Last Name"
                      className="text-sm"
                    />
                  </div>
                </div>

                <Button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={!formData.firstName || !formData.lastName}
                  className="w-full mt-6"
                  size="lg"
                >
                  Continue to Next Step
                </Button>
              </>
            ) : (
              <>
                {/* Email and Phone */}
                <div className="space-y-3">
                  <Input
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    label="Email Address"
                  />

                  <Input
                    type="tel"
                    name="phone"
                    placeholder="+234 (0) 123 456 7890"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    label="Phone Number"
                  />

                  {role === 'recipient' && (
                    <Input
                      type="text"
                      name="location"
                      placeholder="Lagos, Nigeria"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      label="Location"
                    />
                  )}
                </div>

                {/* Hospital-Specific Fields */}
                {role === 'hospital' && (
                  <div className="space-y-3 pt-2 border-t border-input">
                    <div className="pt-2">
                      <p className="text-xs font-semibold text-muted-foreground uppercase mb-3">Hospital Information</p>
                    </div>
                    <Input
                      type="text"
                      name="hospitalName"
                      placeholder="Hospital Name"
                      value={formData.hospitalName}
                      onChange={handleChange}
                      required
                      label="Hospital Name"
                    />

                    <Input
                      type="text"
                      name="hospitalLicense"
                      placeholder="HOSP/2024/12345"
                      value={formData.hospitalLicense}
                      onChange={handleChange}
                      required
                      label="Medical License Number"
                    />
                  </div>
                )}

                {/* Password Fields */}
                <div className="space-y-3 pt-2 border-t border-input">
                  <div className="pt-2">
                    <p className="text-xs font-semibold text-muted-foreground uppercase mb-3">Security</p>
                  </div>
                  <Input
                    type="password"
                    name="password"
                    placeholder="••••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    label="Password"
                  />

                  <Input
                    type="password"
                    name="confirmPassword"
                    placeholder="••••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    label="Confirm Password"
                  />
                  <p className="text-xs text-muted-foreground pt-1">Must be at least 8 characters with uppercase & numbers</p>
                </div>

                <div className="flex gap-3 pt-6">
                  <Button
                    type="button"
                    onClick={() => setStep(1)}
                    variant="outline"
                    className="flex-1"
                    size="lg"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </div>
              </>
            )}
          </form>

          {/* Sign In Link */}
          {step === 1 && (
            <>
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-input"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-background text-muted-foreground">Already have an account?</span>
                </div>
              </div>

              <Link href="/login">
                <Button type="button" variant="outline" className="w-full" size="lg">
                  Sign In Instead
                </Button>
              </Link>
            </>
          )}

          {/* Mobile CTA */}
          <div className="lg:hidden mt-6 pt-6 border-t border-input">
            <p className="text-xs text-center text-muted-foreground">
              Already have an account?{' '}
              <Link href="/login" className="text-primary font-semibold hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
