'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function AdminSettingsPage() {
  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-foreground mb-2">System Settings</h1>
        <p className="text-muted-foreground">Configure platform settings and preferences</p>
      </div>

      <div className="space-y-6">
        {/* Campaign Settings */}
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
              <Input type="number" defaultValue="120" className="max-w-xs" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Minimum Campaign Amount (₦)
              </label>
              <Input type="number" defaultValue="1000" className="max-w-xs" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Maximum Campaign Amount (₦)
              </label>
              <Input type="number" defaultValue="50000000" className="max-w-xs" />
            </div>
          </CardContent>
        </Card>

        {/* Commission Settings */}
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
              <Input type="number" defaultValue="5" className="max-w-xs" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Payment Gateway Fee (%)
              </label>
              <Input type="number" defaultValue="2.5" className="max-w-xs" />
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="font-heading">Notification Settings</CardTitle>
            <CardDescription>Configure how you receive updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-input" />
              <span className="text-foreground">Email new campaign submissions</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-input" />
              <span className="text-foreground">Alert on large donations</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-input" />
              <span className="text-foreground">Daily report summary</span>
            </label>
          </CardContent>
        </Card>

        {/* Save */}
        <div className="flex gap-4">
          <Button className="flex-1">Save Settings</Button>
          <Button variant="outline" className="flex-1">Cancel</Button>
        </div>
      </div>
    </div>
  );
}
