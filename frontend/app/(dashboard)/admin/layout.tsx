'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  DashboardSquare01Icon,
  File02Icon,
  HeartCheckIcon,
  Hospital02Icon,
  Logout01Icon,
  MoneyAdd01Icon,
  Settings03Icon,
  UserCircleIcon,
  CheckmarkCircle02Icon,
  ClockIcon,
  MenuSquareIcon,
  CancelCircleIcon,
  Cancel01Icon,
  Menu01Icon,
} from '@hugeicons/core-free-icons';
import { logout } from '@/lib/auth';

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const adminNavItems: NavItem[] = [
  {
    href: '/admin',
    label: 'Dashboard',
    icon: <HugeiconsIcon icon={DashboardSquare01Icon} className="w-5 h-5" strokeWidth={1.5} />,
  },
  {
    href: '/admin/approvals',
    label: 'Approvals',
    icon: <HugeiconsIcon icon={CheckmarkCircle02Icon} className="w-5 h-5" strokeWidth={1.5} />,
  },
  {
    href: '/admin/recipients',
    label: 'Recipients',
    icon: <HugeiconsIcon icon={UserCircleIcon} className="w-5 h-5" strokeWidth={1.5} />,
  },
  {
    href: '/admin/hospitals',
    label: 'Hospitals',
    icon: <HugeiconsIcon icon={Hospital02Icon} className="w-5 h-5" strokeWidth={1.5} />,
  },
  {
    href: '/admin/campaigns',
    label: 'Campaigns',
    icon: <HugeiconsIcon icon={File02Icon} className="w-5 h-5" strokeWidth={1.5} />,
  },
  {
    href: '/admin/funds',
    label: 'Fund Management',
    icon: <HugeiconsIcon icon={MoneyAdd01Icon} className="w-5 h-5" strokeWidth={1.5} />,
  },
  {
    href: '/admin/audit-logs',
    label: 'Audit Logs',
    icon: <HugeiconsIcon icon={ClockIcon} className="w-5 h-5" strokeWidth={1.5} />,
  },
  {
    href: '/admin/settings',
    label: 'Settings',
    icon: <HugeiconsIcon icon={Settings03Icon} className="w-5 h-5" strokeWidth={1.5} />,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Mobile menu button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="block lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-primary text-white"
      >
        <HugeiconsIcon icon={isCollapsed ? MenuSquareIcon : CancelCircleIcon} size={55} />
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40 
        bg-primary text-white flex flex-col transition-all duration-300
        ${isCollapsed ? '-translate-x-full lg:w-24 lg:translate-x-0' : 'w-64'}
        ${isCollapsed ? 'lg:translate-x-0' : ''}
      `}>
        {/* Logo */}
        <div className="p-4 lg:p-6 border-b border-primary/20">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white shrink-0">
              <HugeiconsIcon icon={HeartCheckIcon} className="h-5 w-5 text-primary" strokeWidth={1.5} />
            </div>
            <span className={`font-heading text-xl font-bold transition-opacity ${isCollapsed ? 'lg:hidden' : ''}`}>
              CureLedger
            </span>
          </Link>
          <p className={`text-sm text-white/70 mt-1 ${isCollapsed ? 'lg:hidden' : ''}`}>
            Admin Dashboard
          </p>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-2 lg:p-4 space-y-1 overflow-y-auto">
          {adminNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex ${isCollapsed ? 'w-fit' : 'w-full'} items-center gap-3 px-3 lg:px-4 py-3 rounded-lg transition ${isActive
                  ? 'bg-white/20 font-semibold'
                  : 'hover:bg-white/10 text-white/90'
                  }`}
                onClick={() => setIsCollapsed(false)}
              >
                <span className="shrink-0">{item.icon}</span>
                <span className={`transition-opacity ${isCollapsed ? 'md:hidden' : ''}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Collapse toggle - desktop only */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:flex p-4 border-t border-primary/20 items-center justify-center hover:bg-white/10"
        >
          <HugeiconsIcon icon={isCollapsed ? Menu01Icon : Cancel01Icon} className="text-white" size={16} />

          <span className={`text-sm text-white/70 transition-opacity ${isCollapsed ? 'hidden' : ''}`}>
            Collapse
          </span>
        </button>

        {/* Logout */}
        <div className="p-2 lg:p-4 border-t border-primary/20">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 lg:px-4 py-2 rounded-lg hover:bg-white/10 transition text-left text-white/90"
          >
            <HugeiconsIcon icon={Logout01Icon} className="w-5 h-5 shrink-0" strokeWidth={1.5} />
            <span className={`transition-opacity ${isCollapsed ? 'lg:hidden' : ''}`}>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-gray-50">
        <div className="p-4 lg:p-8">{children}</div>
      </main>

      {/* Mobile overlay */}
      {isCollapsed && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsCollapsed(false)}
        />
      )}
    </div>
  );
}