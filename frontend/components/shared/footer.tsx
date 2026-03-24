import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-border bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </div>
              <span className="font-heading text-lg font-bold text-primary">CureLedger</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Transparent health crowdfunding connecting patients with compassionate donors.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4 text-sm text-foreground">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/campaigns" className="text-muted-foreground hover:text-primary transition">
                  Browse Campaigns
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-primary transition">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4 text-sm text-foreground">For Patients</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/register" className="text-muted-foreground hover:text-primary transition">
                  Start a Campaign
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-muted-foreground hover:text-primary transition">
                  My Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4 text-sm text-foreground">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground">
                <a href="mailto:support@cureledger.com" className="hover:text-primary transition">
                  support@cureledger.com
                </a>
              </li>
              <li className="text-muted-foreground">+234 800 000 0000</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} CureLedger. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
