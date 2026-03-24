'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push('/recipient');
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
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-foreground mb-2">Create Campaign</h1>
        <p className="text-muted-foreground">
          Step {step} of 2: {step === 1 ? 'Campaign Details' : 'Medical Documents'}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="flex gap-2 mb-8">
        <div className={`flex-1 h-2 rounded-full ${step >= 1 ? 'bg-primary' : 'bg-gray-200'}`}></div>
        <div className={`flex-1 h-2 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-gray-200'}`}></div>
      </div>

      <Card className="border-border">
        <CardHeader>
          <CardTitle className="font-heading">Campaign Information</CardTitle>
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
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Campaign Title</label>
                  <Input
                    type="text"
                    name="title"
                    placeholder="e.g., Heart Surgery Fundraiser"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Campaign Description</label>
                  <Textarea
                    name="description"
                    placeholder="Share your story..."
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Medical Need</label>
                  <Input
                    type="text"
                    name="medicalNeed"
                    placeholder="e.g., Open-heart surgery"
                    value={formData.medicalNeed}
                    onChange={handleChange}
                    required
                    className="h-11"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    className="flex-1 h-11"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setStep(2)}
                    disabled={!canProceed()}
                    className="flex-1 h-11"
                  >
                    Next Step
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Hospital Name</label>
                  <Input
                    type="text"
                    name="hospital"
                    placeholder="e.g., National Hospital Abuja"
                    value={formData.hospital}
                    onChange={handleChange}
                    required
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Target Amount (₦)</label>
                  <Input
                    type="number"
                    name="targetAmount"
                    placeholder="2500000"
                    value={formData.targetAmount}
                    onChange={handleChange}
                    required
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Campaign Deadline</label>
                  <Input
                    type="date"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                    required
                    className="h-11"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-foreground">Medical Documents</label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-red-300 hover:bg-red-50/30 transition cursor-pointer">
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                      id="documents"
                    />
                    <label htmlFor="documents" className="cursor-pointer block">
                      <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-red-50 flex items-center justify-center">
                        <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                        </svg>
                      </div>
                      <p className="font-medium text-foreground mb-1">
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

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="flex-1 h-11"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    disabled={!canProceed() || isLoading || formData.documents.length === 0}
                    className="flex-1 h-11"
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
  );
}
