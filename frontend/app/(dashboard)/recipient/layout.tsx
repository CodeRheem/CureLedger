'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Add01Icon,
  DashboardSquare01Icon,
  HeartCheckIcon,
  Logout01Icon,
  Settings03Icon,
  UserCircleIcon,
  WalletIcon,
  MenuSquareIcon,
  CancelCircleIcon,
} from '@hugeicons/core-free-icons';
import { logout } from '@/lib/auth';

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const recipientNavItems: NavItem[] = [
  {
    href: '/recipient',
    label: 'Dashboard',
    icon: <HugeiconsIcon icon={DashboardSquare01Icon} className="w-5 h-5" strokeWidth={1.5} />,
  },
  {
    href: '/recipient/campaign',
    label: 'My Campaign',
    icon: <HugeiconsIcon icon={Add01Icon} className="w-5 h-5" strokeWidth={1.5} />,
  },
  {
    href: '/recipient/withdrawals',
    label: 'Withdrawals',
    icon: <HugeiconsIcon icon={WalletIcon} className="w-5 h-5" strokeWidth={1.5} />,
  },
  {
    href: '/recipient/profile',
    label: 'My Profile',
    icon: <HugeiconsIcon icon={UserCircleIcon} className="w-5 h-5" strokeWidth={1.5} />,
  },
  {
    href: '/recipient/settings',
    label: 'Settings',
    icon: <HugeiconsIcon icon={Settings03Icon} className="w-5 h-5" strokeWidth={1.5} />,
  },
];

export default function RecipientLayout({
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
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-primary text-white"
      >
        <HugeiconsIcon icon={isCollapsed ? MenuSquareIcon : CancelCircleIcon} className="w-5 h-5" strokeWidth={1.5} />
      </button>

      {/* Sidebar - responsive */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40 
        bg-primary text-white flex flex-col transition-all duration-300
        ${isCollapsed ? '-translate-x-full lg:w-16 lg:translate-x-0' : 'w-64'}
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
            Recipient Dashboard
          </p>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-2 lg:p-4 space-y-1 overflow-y-auto">
          {recipientNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 lg:px-4 py-3 rounded-lg transition ${isActive
                    ? 'bg-white/20 font-semibold'
                    : 'hover:bg-white/10 text-white/90'
                  }`}
                onClick={() => setIsCollapsed(false)}
              >
                <span className="shrink-0">{item.icon}</span>
                <span className={`transition-opacity ${isCollapsed ? 'lg:hidden' : ''}`}>
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
          <span className={`text-sm text-white/70 transition-opacity ${isCollapsed ? 'opacity-0' : ''}`}>
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