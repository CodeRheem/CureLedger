'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const roles = [
  {
    value: 'recipient',
    label: 'Recipient',
    description: 'Create campaigns for medical needs',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
    ),
  },
  {
    value: 'hospital',
    label: 'Hospital',
    description: 'Verify campaign authenticity',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M4.5 15.75h12a2.25 2.25 0 002.25-2.25v-1.5a2.25 2.25 0 00-2.25-2.25h-12A2.25 2.25 0 001.5 12.75v1.5a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
  {
    value: 'admin',
    label: 'Admin',
    description: 'Manage platform & approve campaigns',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('recipient');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('userRole', role);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userName', email.split('@')[0]);
    document.cookie = `userRole=${role}; path=/; max-age=${60 * 60 * 24 * 30}`;
    
    if (role === 'recipient') router.push('/recipient');
    else if (role === 'hospital') router.push('/hospital');
    else if (role === 'admin') router.push('/admin');
  };

  return (
    <Card className="w-full max-w-md border-border shadow-xl">
      <CardHeader className="text-center pb-4">
        <CardTitle className="font-heading text-2xl">Welcome back</CardTitle>
        <CardDescription>Sign in to your account to continue</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">Select your role</label>
            <div className="grid grid-cols-2 gap-2">
              {roles.map((r) => (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => setRole(r.value)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-all duration-200 ${
                    role === r.value
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-border hover:border-red-300 hover:bg-red-50'
                  }`}
                >
                  <div className={role === r.value ? 'text-primary' : 'text-muted-foreground'}>
                    {r.icon}
                  </div>
                  <span className="text-sm font-medium">{r.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Email</label>
            <Input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-11"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Password</label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-11"
            />
          </div>

          {/* Demo Notice */}
          <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-100">
            <svg className="w-4 h-4 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.019-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            <p className="text-sm text-red-700">
              <span className="font-semibold">Demo Mode:</span> Enter any credentials to test
            </p>
          </div>

          <Button type="submit" className="w-full h-11 text-base font-medium" size="lg">
            Sign In
          </Button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-2 bg-white text-muted-foreground">Don&apos;t have an account?</span>
          </div>
        </div>

        <Link href="/register">
          <Button type="button" variant="outline" className="w-full h-11">
            Create Account
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
