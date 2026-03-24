'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<'recipient' | 'hospital'>('recipient');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    hospitalName: '',
    hospitalLicense: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    localStorage.setItem('userRole', role);
    localStorage.setItem('userEmail', formData.email);
    localStorage.setItem('userName', `${formData.firstName} ${formData.lastName}`);
    document.cookie = `userRole=${role}; path=/; max-age=${60 * 60 * 24 * 30}`;
    
    if (role === 'recipient') window.location.href = '/recipient';
    else window.location.href = '/hospital';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-primary/10 flex items-center justify-center px-4 py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">Join CureLedger</CardTitle>
          <CardDescription>Step {step} of 2: {step === 1 ? 'Basic Info' : 'Account Details'}</CardDescription>
        </CardHeader>

        {/* Progress Indicator */}
        <div className="px-6 flex gap-2 mb-6">
          <div className={`flex-1 h-2 rounded-full transition-colors ${step >= 1 ? 'bg-primary' : 'bg-muted'}`}></div>
          <div className={`flex-1 h-2 rounded-full transition-colors ${step >= 2 ? 'bg-primary' : 'bg-muted'}`}></div>
        </div>

        <CardContent>
          <form onSubmit={handleRegister} className="space-y-6">
            {step === 1 ? (
              <>
                {/* Role Selection */}
                <div>
                  <label className="block text-sm font-semibold mb-3">Register as:</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 p-3 border border-input rounded-lg cursor-pointer hover:bg-muted transition">
                      <input
                        type="radio"
                        value="recipient"
                        checked={role === 'recipient'}
                        onChange={(e) => setRole(e.target.value as any)}
                        className="w-4 h-4"
                      />
                      <div>
                        <p className="font-medium text-sm">Patient/Recipient</p>
                        <p className="text-xs text-muted-foreground">📋 Create campaigns</p>
                      </div>
                    </label>
                    <label className="flex items-center gap-3 p-3 border border-input rounded-lg cursor-pointer hover:bg-muted transition">
                      <input
                        type="radio"
                        value="hospital"
                        checked={role === 'hospital'}
                        onChange={(e) => setRole(e.target.value as any)}
                        className="w-4 h-4"
                      />
                      <div>
                        <p className="font-medium text-sm">Hospital</p>
                        <p className="text-xs text-muted-foreground">🏥 Verify campaigns</p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Basic Info */}
                <div>
                  <Input
                    type="text"
                    name="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    label="First Name"
                  />
                </div>

                <div>
                  <Input
                    type="text"
                    name="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    label="Last Name"
                  />
                </div>

                <Button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={!formData.firstName || !formData.lastName}
                  className="w-full"
                  size="lg"
                >
                  Next
                </Button>
              </>
            ) : (
              <>
                <div>
                  <Input
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    label="Email Address"
                  />
                </div>

                <div>
                  <Input
                    type="tel"
                    name="phone"
                    placeholder="+234..."
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    label="Phone Number"
                  />
                </div>

                {role === 'hospital' && (
                  <>
                    <div>
                      <Input
                        type="text"
                        name="hospitalName"
                        placeholder="Hospital Name"
                        value={formData.hospitalName}
                        onChange={handleChange}
                        required
                        label="Hospital Name"
                      />
                    </div>

                    <div>
                      <Input
                        type="text"
                        name="hospitalLicense"
                        placeholder="HOSP/2024/..."
                        value={formData.hospitalLicense}
                        onChange={handleChange}
                        required
                        label="License Number"
                      />
                    </div>
                  </>
                )}

                <div>
                  <Input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    label="Password"
                  />
                </div>

                <div>
                  <Input
                    type="password"
                    name="confirmPassword"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    label="Confirm Password"
                  />
                </div>

                <div className="flex gap-3">
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
                  >
                    Create Account
                  </Button>
                </div>
              </>
            )}
          </form>

          {/* Divider */}
          {step === 1 && (
            <>
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-input"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-background text-muted-foreground">Already registered?</span>
                </div>
              </div>

              <Link href="/login">
                <Button type="button" variant="outline" className="w-full">
                  Sign In Instead
                </Button>
              </Link>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
