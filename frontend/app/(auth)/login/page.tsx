'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'donor' | 'recipient' | 'hospital' | 'admin'>('donor');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('userRole', role);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userName', email.split('@')[0]);
    document.cookie = `userRole=${role}; path=/; max-age=${60 * 60 * 24 * 30}`;
    
    if (role === 'recipient') window.location.href = '/recipient';
    else if (role === 'hospital') window.location.href = '/hospital';
    else if (role === 'admin') window.location.href = '/admin';
    else window.location.href = '/campaigns';
  };

  const roleDescriptions: Record<string, string> = {
    donor: '💝 Browse and fund campaigns',
    recipient: '🏥 Create campaigns for medical needs',
    hospital: '⚕️ Verify campaign authenticity',
    admin: '⚙️ Manage platform & approve campaigns',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-primary/10 flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">Welcome to CureLedger</CardTitle>
          <CardDescription>Sign in to continue</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Role Selection with Descriptions */}
            <div>
              <label className="block text-sm font-semibold mb-3">Select your role:</label>
              <div className="space-y-2">
                {['donor', 'recipient', 'hospital', 'admin'].map((r) => (
                  <label key={r} className="flex items-center gap-3 p-3 border border-input rounded-lg cursor-pointer hover:bg-muted transition">
                    <input
                      type="radio"
                      name="role"
                      value={r}
                      checked={role === r}
                      onChange={(e) => setRole(e.target.value as any)}
                      className="w-4 h-4"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm capitalize">{r}</p>
                      <p className="text-xs text-muted-foreground">
                        {roleDescriptions[r]}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Email */}
            <div>
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                label="Email Address"
              />
            </div>

            {/* Password */}
            <div>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                label="Password"
              />
            </div>

            {/* Demo Alert */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-sm text-yellow-800">
                <span className="font-semibold">Demo Mode:</span> Use any email/password to test
              </p>
            </div>

            {/* Sign In Button */}
            <Button type="submit" className="w-full" size="lg">
              Sign In
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-input"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-background text-muted-foreground">Don't have an account?</span>
            </div>
          </div>

          {/* Sign Up Link */}
          <Link href="/register">
            <Button type="button" variant="outline" className="w-full">
              Create Account
            </Button>
          </Link>

          {/* Back Link */}
          <Link href="/" className="block text-center text-sm text-muted-foreground hover:text-foreground mt-4">
            ← Back to home
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
