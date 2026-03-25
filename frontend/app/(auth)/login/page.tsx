'use client';

import { useState } from 'react';
import Link from 'next/link';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  AlertCircleIcon,
  Hospital02Icon,
  Settings03Icon,
  UserCircleIcon,
} from '@hugeicons/core-free-icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

const roles = [
  {
    value: 'recipient',
    label: 'Recipient',
    description: 'Create campaigns for medical needs',
    icon: UserCircleIcon,
  },
  {
    value: 'hospital',
    label: 'Hospital',
    description: 'Verify campaign authenticity',
    icon: Hospital02Icon,
  },
];

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('recipient');
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (role === 'recipient') router.push('/recipient');
    else if (role === 'hospital') router.push('/hospital');
    else if (role === 'admin') router.push('/admin');
  };

  return (
    <Card className="w-full max-w-xl border-border">
      <CardHeader className="text-center pb-4">
        <CardTitle className="font-heading text-2xl">Welcome back</CardTitle>
        <CardDescription>Sign in to your account to continue</CardDescription>
      </CardHeader>

      <CardContent>
        <form className="space-y-5">
          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">Select your role</label>
            <div className="grid grid-cols-2 gap-2">
              {roles.map((r) => (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => setRole(r.value)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-all duration-200 ${role === r.value
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-border hover:border-red-300 hover:bg-red-50'
                    }`}
                >
                  <div className={role === r.value ? 'text-primary' : 'text-muted-foreground'}>
                    <HugeiconsIcon icon={r.icon} size={20} strokeWidth={1.5} />
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
            <HugeiconsIcon icon={AlertCircleIcon} size={16} strokeWidth={1.5} className="shrink-0 text-primary" />
            <p className="text-sm text-red-700">
              <span className="font-semibold">Demo Mode:</span> Enter any credentials to test
            </p>
          </div>

          <Button type="submit" onSubmit={handleLogin} className="w-full h-11 text-base font-medium" size="lg">
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
