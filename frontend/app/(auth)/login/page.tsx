'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
import { api } from '@/lib/api';

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
  {
    value: 'admin',
    label: 'Admin',
    description: 'Manage platform',
    icon: Settings03Icon,
  },
];

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('recipient');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const router = useRouter();

  const validate = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsLoading(true);
    setError('');

    try {
      const data = await api.login(email, password);
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userRole', role);
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userName', `${data.user.firstName} ${data.user.lastName}`);

      if (role === 'recipient') router.push('/recipient');
      else if (role === 'hospital') router.push('/hospital');
      else if (role === 'admin') router.push('/admin');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-xl border-border">
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
              onChange={(e) => { setEmail(e.target.value); setErrors({ ...errors, email: undefined }); }}
              required
              className={`h-11 ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Password</label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setErrors({ ...errors, password: undefined }); }}
              required
              className={`h-11 ${errors.password ? 'border-red-500' : ''}`}
            />
            {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
          </div>

          {/* Demo Notice */}
          <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-100">
            <HugeiconsIcon icon={AlertCircleIcon} size={16} strokeWidth={1.5} className="shrink-0 text-primary" />
            <p className="text-sm text-red-700">
              <span className="font-semibold">Demo Mode:</span> Enter any credentials to test
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
              {error}
            </div>
          )}
          <Button type="submit" disabled={isLoading} className="w-full h-11 text-base font-medium" size="lg">
            {isLoading ? 'Signing in...' : 'Sign In'}
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
