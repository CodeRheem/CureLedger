'use client';

import Link from 'next/link';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            CureLedger
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600">
              Home
            </Link>
            <Link href="/campaigns" className="text-gray-700 hover:text-blue-600">
              Campaigns
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600">
              About
            </Link>
            <Link href="/faq" className="text-gray-700 hover:text-blue-600">
              FAQ
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-gray-700 hover:text-blue-600 font-semibold"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">CureLedger</h3>
              <p className="text-gray-400 text-sm">
                Connecting patients, hospitals, donors, and admins in a transparent health crowdfunding platform.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/campaigns" className="text-gray-400 hover:text-white">
                    Browse Campaigns
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-gray-400 hover:text-white">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">For Patients</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/register" className="text-gray-400 hover:text-white">
                    Start a Campaign
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="text-gray-400 hover:text-white">
                    My Campaigns
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li className="text-gray-400">
                  Email:{' '}
                  <a href="mailto:support@cureledger.com" className="hover:text-white">
                    support@cureledger.com
                  </a>
                </li>
                <li className="text-gray-400">+234 8XX XXX XXXX</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 CureLedger. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
