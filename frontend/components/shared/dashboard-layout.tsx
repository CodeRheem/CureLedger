'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { hasRole, logout } from '@/lib/auth';
import { Button } from '@/components/ui/button';

interface NavItem {
  href: string;
  label: string;
  icon: string;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  navItems: NavItem[];
  sidebarColor: string;
  role: 'recipient' | 'hospital' | 'admin';
}

export function DashboardLayout({
  children,
  navItems,
  sidebarColor,
  role,
}: DashboardLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!hasRole(role)) {
      router.push('/login');
    } else {
      setIsAuthorized(true);
    }
    setIsLoading(false);
  }, [router, role]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`w-64 text-white flex flex-col`}
        style={{ backgroundColor: sidebarColor }}
      >
        <div className="p-6 border-b" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          <h2 className="text-2xl font-bold">CureLedger</h2>
          <p className="text-sm opacity-80 capitalize">{role} Dashboard</p>
        </div>

        <nav className="flex-1 p-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition ${
                pathname === item.href
                  ? 'bg-white/20 font-semibold text-white'
                  : 'hover:bg-white/10 text-white/90'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          <Button
            onClick={logout}
            variant="ghost"
            size="md"
            className="w-full justify-start text-white hover:bg-white/10"
          >
            <span className="mr-2">🚪</span>
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-background">
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
}
