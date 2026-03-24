export function Footer() {
  return (
    <footer className="border-t border-input bg-muted py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">CureLedger</h3>
            <p className="text-sm text-muted-foreground">
              Connecting patients, hospitals, donors, and admins in transparent health crowdfunding.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/campaigns" className="text-muted-foreground hover:text-foreground transition">
                  Browse Campaigns
                </a>
              </li>
              <li>
                <a href="/about" className="text-muted-foreground hover:text-foreground transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="/faq" className="text-muted-foreground hover:text-foreground transition">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">For Patients</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/register" className="text-muted-foreground hover:text-foreground transition">
                  Start a Campaign
                </a>
              </li>
              <li>
                <a href="/login" className="text-muted-foreground hover:text-foreground transition">
                  My Campaigns
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground">
                Email:{' '}
                <a href="mailto:support@cureledger.com" className="hover:text-foreground transition">
                  support@cureledger.com
                </a>
              </li>
              <li className="text-muted-foreground">+234 8XX XXX XXXX</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-input pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 CureLedger. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
