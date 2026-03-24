'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { hasRole, logout } from '@/lib/auth';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user has admin role
    if (!hasRole('admin')) {
      router.push('/login');
    } else {
      setIsAuthorized(true);
    }
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: '📊' },
    { href: '/admin/approvals', label: 'Approvals', icon: '✅' },
    { href: '/admin/recipients', label: 'Recipients', icon: '👥' },
    { href: '/admin/hospitals', label: 'Hospitals', icon: '🏥' },
    { href: '/admin/campaigns', label: 'Campaigns', icon: '📋' },
    { href: '/admin/funds', label: 'Fund Management', icon: '💰' },
    { href: '/admin/settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-purple-600 text-white flex flex-col">
        <div className="p-6 border-b border-purple-500">
          <h2 className="text-2xl font-bold">CureLedger</h2>
          <p className="text-sm text-purple-100">Admin Dashboard</p>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition ${
                pathname === item.href
                  ? 'bg-purple-700 font-semibold'
                  : 'hover:bg-purple-500'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-purple-500">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-purple-500 transition text-left"
          >
            <span>🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
}
