'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { hasRole } from '@/lib/auth';
import { DashboardLayout } from '@/components/shared/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const NAV_ITEMS = [
  { href: '/recipient', label: 'Dashboard', icon: '📊' },
  { href: '/recipient/campaigns', label: 'My Campaigns', icon: '📋' },
  { href: '/recipient/create', label: 'Create Campaign', icon: '➕' },
  { href: '/recipient/profile', label: 'Profile', icon: '👤' },
];

export default function CreateCampaignPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    medicalNeed: '',
    hospital: '',
    targetAmount: '',
    deadline: '',
    documents: [] as File[],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({
        ...formData,
        documents: Array.from(e.target.files),
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push('/recipient/campaigns');
    } catch (error) {
      console.error('Error creating campaign:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const canProceed = () => {
    if (step === 1) {
      return formData.title && formData.description && formData.medicalNeed;
    } else if (step === 2) {
      return formData.hospital && formData.targetAmount && formData.deadline;
    }
    return false;
  };

  return (
    <DashboardLayout
      navItems={NAV_ITEMS}
      sidebarColor="#0077BE"
      role="recipient"
    >
      <div className="max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Create Campaign</h1>
          <p className="text-muted-foreground">
            Step {step} of 2: {step === 1 ? 'Campaign Details' : 'Medical Documents'}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="flex gap-2 mb-8">
          <div className={`flex-1 h-2 rounded-full ${step >= 1 ? 'bg-primary' : 'bg-muted'}`}></div>
          <div className={`flex-1 h-2 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-muted'}`}></div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Campaign Information</CardTitle>
            <CardDescription>
              {step === 1
                ? 'Tell your story and explain your medical need'
                : 'Upload medical documents to verify your case'}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {step === 1 ? (
                <>
                  <div>
                    <Input
                      type="text"
                      name="title"
                      placeholder="e.g., Heart Surgery Fundraiser"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      label="Campaign Title"
                    />
                  </div>

                  <div>
                    <Textarea
                      name="description"
                      placeholder="Share your story..."
                      value={formData.description}
                      onChange={handleChange}
                      required
                      label="Campaign Description"
                      rows={5}
                    />
                  </div>

                  <div>
                    <Input
                      type="text"
                      name="medicalNeed"
                      placeholder="e.g., Open-heart surgery"
                      value={formData.medicalNeed}
                      onChange={handleChange}
                      required
                      label="Medical Need"
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.back()}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setStep(2)}
                      disabled={!canProceed()}
                      className="flex-1"
                    >
                      Next Step
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <Input
                      type="text"
                      name="hospital"
                      placeholder="e.g., National Hospital Abuja"
                      value={formData.hospital}
                      onChange={handleChange}
                      required
                      label="Hospital Name"
                    />
                  </div>

                  <div>
                    <Input
                      type="number"
                      name="targetAmount"
                      placeholder="2500000"
                      value={formData.targetAmount}
                      onChange={handleChange}
                      required
                      label="Target Amount (₦)"
                    />
                  </div>

                  <div>
                    <Input
                      type="date"
                      name="deadline"
                      value={formData.deadline}
                      onChange={handleChange}
                      required
                      label="Campaign Deadline"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-3">
                      Medical Documents
                    </label>
                    <div className="border-2 border-dashed border-input rounded-lg p-8 text-center hover:bg-muted/50 transition">
                      <input
                        type="file"
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                        onChange={handleFileChange}
                        className="hidden"
                        id="documents"
                      />
                      <label htmlFor="documents" className="cursor-pointer block">
                        <p className="text-2xl mb-2">📄</p>
                        <p className="font-semibold mb-1">
                          {formData.documents.length > 0
                            ? `${formData.documents.length} file(s) selected`
                            : 'Click to upload medical documents'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          PDF, DOC, JPG, PNG up to 10MB each
                        </p>
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(1)}
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      disabled={!canProceed() || isLoading || formData.documents.length === 0}
                      className="flex-1"
                    >
                      {isLoading ? 'Creating...' : 'Create Campaign'}
                    </Button>
                  </div>
                </>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
