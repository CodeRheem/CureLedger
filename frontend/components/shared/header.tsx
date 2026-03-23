'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export function Header() {
  const router = useRouter();

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userRole');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userName');
      document.cookie = 'userRole=; path=/; max-age=0';
    }
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-50 border-b border-input bg-background">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-primary">
          CureLedger
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm hover:text-primary transition">
            Home
          </Link>
          <Link href="/campaigns" className="text-sm hover:text-primary transition">
            Campaigns
          </Link>
          <Link href="/about" className="text-sm hover:text-primary transition">
            About
          </Link>
          <Link href="/faq" className="text-sm hover:text-primary transition">
            FAQ
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
          </Link>
          <Link href="/register">
            <Button size="sm">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
