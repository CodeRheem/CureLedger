'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { HugeiconsIcon } from '@hugeicons/react';
import { CheckmarkCircle02Icon, FileUploadIcon, AlertIcon } from '@hugeicons/core-free-icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { mockHospitals } from '@/lib/mock-data';
import { api } from '@/lib/api';

interface Hospital {
  id: string;
  name: string;
  license?: string;
  address?: string;
}

export default function CreateCampaignPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loadingHospitals, setLoadingHospitals] = useState(true);
  const [hospitalError, setHospitalError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    medicalNeed: '',
    hospital: '',
    targetAmount: '',
    deadline: '',
    documents: [] as File[],
  });

  useEffect(() => {
    async function fetchHospitals() {
      try {
        const data = await api.getHospitals();
        setHospitals(
          (data.hospitals || []).map((h: any) => ({
            id: h._id || h.id,
            name: h.hospitalName,
            license: h.hospitalLicense,
            address: h.address,
          }))
        );
      } catch (err) {
        console.error('Failed to fetch hospitals:', err);
        setHospitalError('Failed to load hospitals');
        setHospitals([]);
      } finally {
        setLoadingHospitals(false);
      }
    }
    fetchHospitals();
  }, []);

  const profileComplete = true;
  const missingFields: string[] = [];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({
        ...formData,
        documents: Array.from(e.target.files),
      });
    }
  };

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.title.trim()) {
        newErrors.title = 'Campaign title is required';
      } else if (formData.title.length < 5) {
        newErrors.title = 'Title must be at least 5 characters';
      }
      if (!formData.description.trim()) {
        newErrors.description = 'Description is required';
      } else if (formData.description.length < 20) {
        newErrors.description = 'Description must be at least 20 characters';
      }
      if (!formData.medicalNeed.trim()) {
        newErrors.medicalNeed = 'Medical condition is required';
      }
    }

    if (currentStep === 2) {
      if (!formData.hospital) {
        newErrors.hospital = 'Please select a verified hospital';
      }
      if (!formData.targetAmount) {
        newErrors.targetAmount = 'Target amount is required';
      } else if (parseInt(formData.targetAmount) < 1000) {
        newErrors.targetAmount = 'Minimum amount is ₦1,000';
      }
      if (!formData.deadline) {
        newErrors.deadline = 'Deadline is required';
      }
      if (formData.documents.length === 0) {
        newErrors.documents = 'At least one document is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(1)) {
      setStep(2);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep(2)) {
      return;
    }

    setIsLoading(true);

    try {
      const createdCampaign = await api.createCampaign({
        title: formData.title,
        description: formData.description,
        condition: formData.medicalNeed,
        hospitalId: formData.hospital,
        targetAmount: Number(formData.targetAmount),
        endsAt: formData.deadline,
      });

      const campaignId = createdCampaign._id || createdCampaign.id;

      if (campaignId && formData.documents.length > 0) {
        for (const file of formData.documents) {
          await api.uploadCampaignDocument(campaignId, file, 'medical_report');
        }
      }

      setIsSuccess(true);

      setTimeout(() => {
        router.push('/recipient/campaign');
      }, 2000);
    } catch (error) {
      console.error('Error creating campaign:', error);
      setErrors({ submit: 'Failed to create campaign. Please try again.' });
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

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="border-border">
          <CardContent className="py-12 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
              <HugeiconsIcon icon={CheckmarkCircle02Icon} className="w-10 h-10 text-green-600" strokeWidth={1.5} />
            </div>
            <h2 className="font-heading text-2xl font-bold text-foreground mb-2">Campaign Submitted!</h2>
            <p className="text-muted-foreground">
              Your campaign is pending review. You'll be notified once verified.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!profileComplete) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="border-border">
          <CardContent className="py-12 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-yellow-100 flex items-center justify-center">
              <HugeiconsIcon icon={AlertIcon} className="w-10 h-10 text-yellow-600" strokeWidth={1.5} />
            </div>
            <h2 className="font-heading text-2xl font-bold text-foreground mb-2">Complete Your Profile</h2>
            <p className="text-muted-foreground mb-4">
              You need to complete your profile before creating a campaign.
            </p>
            <p className="text-sm text-yellow-600 mb-6">
              Missing: {missingFields.join(', ')}
            </p>
            <Button onClick={() => router.push('/recipient/profile')}>
              Go to Profile
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-foreground mb-2">Create Campaign</h1>
        <p className="text-muted-foreground">
          Step {step} of 2: {step === 1 ? 'Campaign Details' : 'Medical Documents'}
        </p>
      </div>

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
                    placeholder="e.g., Heart Surgery Fundraiser for My Son"
                    value={formData.title}
                    onChange={handleChange}
                    className={`h-11 ${errors.title ? 'border-red-500' : ''}`}
                  />
                  {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Campaign Description</label>
                  <Textarea
                    name="description"
                    placeholder="Share your story in detail. Explain your medical condition, treatment plan, and how the funds will be used..."
                    value={formData.description}
                    onChange={handleChange}
                    rows={5}
                    className={`resize-none ${errors.description ? 'border-red-500' : ''}`}
                  />
                  {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                  <p className="text-xs text-muted-foreground">{formData.description.length} / 50 minimum characters</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Medical Need / Condition</label>
                  <Input
                    type="text"
                    name="medicalNeed"
                    placeholder="e.g., Open-heart surgery for congenital heart disease"
                    value={formData.medicalNeed}
                    onChange={handleChange}
                    className={`h-11 ${errors.medicalNeed ? 'border-red-500' : ''}`}
                  />
                  {errors.medicalNeed && <p className="text-sm text-red-500">{errors.medicalNeed}</p>}
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
                    onClick={handleNextStep}
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
                  <label className="text-sm font-medium text-foreground">Select Hospital *</label>
                  <select
                    name="hospital"
                    value={formData.hospital}
                    onChange={handleChange}
                    className={`w-full h-11 px-3 rounded-md border border-input bg-background text-sm ${errors.hospital ? 'border-red-500' : ''}`}
                    required
                  >
                    <option value="">Select a verified hospital</option>
                    {loadingHospitals ? (
                      <option disabled>Loading hospitals...</option>
                    ) : hospitalError ? (
                      <option disabled>Failed to load hospitals</option>
                    ) : hospitals.length === 0 ? (
                      <option disabled>No hospitals available</option>
                    ) : (
                      hospitals.map((h) => (
                        <option key={h.id} value={h.id}>
                          {h.name} - {h.address}
                        </option>
                      ))
                    )}
                  </select>
                  {errors.hospital && <p className="text-sm text-red-500">{errors.hospital}</p>}
                  {hospitalError && <p className="text-sm text-red-500">{hospitalError}</p>}
                  <p className="text-xs text-muted-foreground">Only verified hospitals are shown</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Target Amount (₦)</label>
                  <Input
                    type="number"
                    name="targetAmount"
                    placeholder="2500000"
                    value={formData.targetAmount}
                    onChange={handleChange}
                    className={`h-11 ${errors.targetAmount ? 'border-red-500' : ''}`}
                  />
                  {errors.targetAmount && <p className="text-sm text-red-500">{errors.targetAmount}</p>}
                  <p className="text-xs text-muted-foreground">Minimum: ₦1,000</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Campaign Deadline</label>
                  <Input
                    type="date"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    className={`h-11 ${errors.deadline ? 'border-red-500' : ''}`}
                  />
                  {errors.deadline && <p className="text-sm text-red-500">{errors.deadline}</p>}
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-foreground">Medical Documents</label>
                  <div className={`border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-red-300 hover:bg-red-50/30 transition cursor-pointer ${errors.documents ? 'border-red-500' : ''}`}>
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
                        <HugeiconsIcon icon={FileUploadIcon} className="w-6 h-6 text-primary" strokeWidth={1.5} />
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
                  {errors.documents && <p className="text-sm text-red-500">{errors.documents}</p>}
                </div>

                {errors.submit && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">{errors.submit}</p>
                  </div>
                )}

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
                    {isLoading ? 'Creating...' : 'Submit Campaign'}
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