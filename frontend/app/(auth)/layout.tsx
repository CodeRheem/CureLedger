import Link from 'next/link';
import { HugeiconsIcon } from '@hugeicons/react';
import { HeartCheckIcon } from '@hugeicons/core-free-icons';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <HugeiconsIcon icon={HeartCheckIcon} className="h-5 w-5 text-white" strokeWidth={1.5} />
              </div>
              <span className="font-heading text-xl font-bold text-primary">CureLedger</span>
            </Link>
            <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition">
              ← Back to home
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        {children}
      </main>
    </div>
  );
}
