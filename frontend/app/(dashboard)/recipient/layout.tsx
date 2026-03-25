'use client';

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
    label: 'Campaign',
    icon: <HugeiconsIcon icon={Add01Icon} className="w-5 h-5" strokeWidth={1.5} />,
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

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-white flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-primary/20">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white">
              <HugeiconsIcon icon={HeartCheckIcon} className="h-5 w-5 text-primary" strokeWidth={1.5} />
            </div>
            <span className="font-heading text-xl font-bold">CureLedger</span>
          </Link>
          <p className="text-sm text-white/70 mt-1">Recipient Dashboard</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {recipientNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${isActive
                  ? 'bg-white/20 font-semibold'
                  : 'hover:bg-white/10 text-white/90'
                  }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-primary/20">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/10 transition text-left text-white/90"
          >
            <HugeiconsIcon icon={Logout01Icon} className="w-5 h-5" strokeWidth={1.5} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-gray-50">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
