'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { hasRole, logout } from '@/lib/auth';

export default function HospitalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user has hospital role
    if (!hasRole('hospital')) {
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
    { href: '/hospital', label: 'Dashboard', icon: '🏥' },
    { href: '/hospital/patients', label: 'My Patients', icon: '👥' },
    { href: '/hospital/profile', label: 'Hospital Profile', icon: '📋' },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-green-600 text-white flex flex-col">
        <div className="p-6 border-b border-green-500">
          <h2 className="text-2xl font-bold">CureLedger</h2>
          <p className="text-sm text-green-100">Hospital Dashboard</p>
        </div>

        <nav className="flex-1 p-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition ${
                pathname === item.href
                  ? 'bg-green-700 font-semibold'
                  : 'hover:bg-green-500'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-green-500">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-green-500 transition text-left"
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
