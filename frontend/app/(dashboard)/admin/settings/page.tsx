'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    campaignDuration: 120,
    minAmount: 1000,
    maxAmount: 50000000,
    platformCommission: 5,
    paymentGatewayFee: 2.5,
    emailNewCampaign: true,
    alertLargeDonations: true,
    dailyReport: false,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-foreground mb-2">System Settings</h1>
        <p className="text-muted-foreground">Configure platform settings and preferences</p>
      </div>

      <div className="space-y-6">
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="font-heading">Campaign Settings</CardTitle>
            <CardDescription>Configure default campaign parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Default Campaign Duration (days)
              </label>
              <Input
                type="number"
                value={settings.campaignDuration}
                onChange={(e) => setSettings({ ...settings, campaignDuration: parseInt(e.target.value) })}
                className="max-w-xs"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Minimum Campaign Amount (₦)
              </label>
              <Input
                type="number"
                value={settings.minAmount}
                onChange={(e) => setSettings({ ...settings, minAmount: parseInt(e.target.value) })}
                className="max-w-xs"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Maximum Campaign Amount (₦)
              </label>
              <Input
                type="number"
                value={settings.maxAmount}
                onChange={(e) => setSettings({ ...settings, maxAmount: parseInt(e.target.value) })}
                className="max-w-xs"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle className="font-heading">Commission & Fees</CardTitle>
            <CardDescription>Configure platform fees and commissions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Platform Commission (%)
              </label>
              <Input
                type="number"
                step="0.1"
                value={settings.platformCommission}
                onChange={(e) => setSettings({ ...settings, platformCommission: parseFloat(e.target.value) })}
                className="max-w-xs"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Payment Gateway Fee (%)
              </label>
              <Input
                type="number"
                step="0.1"
                value={settings.paymentGatewayFee}
                onChange={(e) => setSettings({ ...settings, paymentGatewayFee: parseFloat(e.target.value) })}
                className="max-w-xs"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle className="font-heading">Notification Settings</CardTitle>
            <CardDescription>Configure how you receive updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.emailNewCampaign}
                onChange={(e) => setSettings({ ...settings, emailNewCampaign: e.target.checked })}
                className="w-4 h-4 rounded border-input"
              />
              <span className="text-foreground">Email new campaign submissions</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.alertLargeDonations}
                onChange={(e) => setSettings({ ...settings, alertLargeDonations: e.target.checked })}
                className="w-4 h-4 rounded border-input"
              />
              <span className="text-foreground">Alert on large donations</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.dailyReport}
                onChange={(e) => setSettings({ ...settings, dailyReport: e.target.checked })}
                className="w-4 h-4 rounded border-input"
              />
              <span className="text-foreground">Daily report summary</span>
            </label>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button className="flex-1" onClick={handleSave}>
            {saved ? 'Settings Saved!' : 'Save Settings'}
          </Button>
          <Button variant="outline" className="flex-1" onClick={() => setSaved(false)}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}