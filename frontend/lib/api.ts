const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://cureledger.campuscart.com.ng/api/v1';

interface FetchOptions extends RequestInit {
  token?: string;
}

async function fetchApi<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { token, ...fetchOptions } = options;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (token) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...fetchOptions,
    headers,
  });

  if (!response.ok) {
    let error: any = { message: 'An error occurred' };
    try {
      error = await response.json();
    } catch {
      // Response is not JSON, use status text or default message
      error = { message: response.statusText || 'An error occurred' };
    }

    const errorMessage = error.message || error.error || `HTTP error! status: ${response.status}`;
    const customError = new Error(errorMessage);
    (customError as any).statusCode = response.status;
    (customError as any).fullResponse = error;
    
    // Debug log for troubleshooting
    if (typeof window !== 'undefined') {
      console.error(`API Error [${response.status}] ${endpoint}:`, error);
    }
    
    throw customError;
  }

  const data = await response.json();
  return data.data || data;
}

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  const token = localStorage.getItem('authToken');
  // Prevent accidental 'undefined' string from being stored
  if (token === 'undefined' || token === 'null') {
    localStorage.removeItem('authToken');
    return null;
  }
  return token;
}

export const api = {
  // Auth
  login: (email: string, password: string) =>
    fetchApi<{ user: any; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  registerRecipient: (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
    location: string;
  }) =>
    fetchApi<{ user: any; token: string }>('/auth/register-recipient', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  registerHospital: (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
    hospitalName: string;
    hospitalLicense: string;
    address?: string;
  }) =>
    fetchApi<{ user: any; token: string }>('/auth/register-hospital', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getProfile: () => fetchApi<any>('/auth/me', { token: getToken() || undefined }),

  updateProfile: (data: any) =>
    fetchApi<any>('/profile', {
      method: 'PATCH',
      body: JSON.stringify(data),
      token: getToken() || undefined,
    }),

  // Campaigns
  getCampaigns: (page = 1, limit = 20) =>
    fetchApi<{ campaigns: any[]; total: number; page: number }>(
      `/campaigns?page=${page}&limit=${limit}`
    ),

  getCampaign: (id: string) => fetchApi<any>(`/campaigns/${id}`),

  getPendingCampaigns: (status?: string, page = 1, limit = 20) => {
    const params = new URLSearchParams({ page: String(page), limit: String(limit) });
    if (status) params.append('status', status);
    return fetchApi<{ campaigns: any[]; total: number }>(
      `/campaigns/pending?${params}`,
      { token: getToken() || undefined }
    );
  },

  getRecipientCampaigns: (page = 1, limit = 20) =>
    fetchApi<{ campaigns: any[]; total: number }>(
      `/campaigns/current-user?page=${page}&limit=${limit}`,
      { token: getToken() || undefined }
    ),

  createCampaign: (data: {
    title: string;
    description: string;
    targetAmount: number;
    condition: string;
    hospitalId: string;
    endsAt: string;
  }) =>
    fetchApi<any>('/campaigns', {
      method: 'POST',
      body: JSON.stringify(data),
      token: getToken() || undefined,
    }),

  updateCampaign: (id: string, data: any) =>
    fetchApi<any>(`/campaigns/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      token: getToken() || undefined,
    }),

  // Hospitals
  getHospitals: () => fetchApi<{ hospitals: any[] }>('/hospitals'),

  // Verifications
  verifyCampaign: (campaignId: string, verified: boolean, notes?: string) =>
    fetchApi<any>(`/campaigns/${campaignId}/verify`, {
      method: 'POST',
      body: JSON.stringify({ verified, notes }),
      token: getToken() || undefined,
    }),

  approveCampaign: (campaignId: string, approved: boolean, notes?: string) =>
    fetchApi<any>(`/campaigns/${campaignId}/approve`, {
      method: 'POST',
      body: JSON.stringify({ approved, notes }),
      token: getToken() || undefined,
    }),

  rejectCampaign: (campaignId: string, reason: string) =>
    fetchApi<any>(`/campaigns/${campaignId}/reject`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
      token: getToken() || undefined,
    }),

  getVerificationHistory: (page = 1, limit = 20) =>
    fetchApi<{ verifications: any[]; total: number }>(
      `/campaigns/verifications/history?page=${page}&limit=${limit}`,
      { token: getToken() || undefined }
    ),

  // Donations
  donate: (data: {
    campaignId: string;
    amount: number;
    donorName: string;
    donorEmail: string;
    message?: string;
  }) =>
    fetchApi<any>('/donate', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getCampaignDonations: (campaignId: string, page = 1, limit = 20) =>
    fetchApi<any>(
      `/campaigns/${campaignId}/donations?page=${page}&limit=${limit}`,
      { token: getToken() || undefined }
    ),

  // Withdrawals
  getWithdrawals: (page = 1, limit = 20) =>
    fetchApi<{ withdrawals: any[]; total: number }>(
      `/withdrawals?page=${page}&limit=${limit}`,
      { token: getToken() || undefined }
    ),

  requestWithdrawal: (data: {
    campaignId: string;
    amount: number;
    bankAccount: string;
    bankName: string;
    accountName: string;
  }) =>
    fetchApi<any>('/withdraw', {
      method: 'POST',
      body: JSON.stringify(data),
      token: getToken() || undefined,
    }),

  // Admin
  getAdminStats: () =>
    fetchApi<any>('/admin/stats', { token: getToken() || undefined }),

  getRecipients: (page = 1, limit = 20) =>
    fetchApi<{ recipients: any[]; total: number }>(
      `/admin/recipients?page=${page}&limit=${limit}`,
      { token: getToken() || undefined }
    ),

  getAdminHospitals: (page = 1, limit = 20) =>
    fetchApi<{ hospitals: any[]; total: number }>(
      `/admin/hospitals?page=${page}&limit=${limit}`,
      { token: getToken() || undefined }
    ),

  verifyHospital: (hospitalId: string) =>
    fetchApi<any>(`/admin/hospitals/${hospitalId}/verify`, {
      method: 'POST',
      token: getToken() || undefined,
    }),

  getPendingWithdrawals: (page = 1, limit = 20) =>
    fetchApi<{ withdrawals: any[]; total: number }>(
      `/admin/withdrawals/pending?page=${page}&limit=${limit}`,
      { token: getToken() || undefined }
    ),

  processWithdrawal: (withdrawalId: string, approved: boolean) =>
    fetchApi<any>(`/withdraw/${withdrawalId}/approve`, {
      method: 'POST',
      body: JSON.stringify({ approved }),
      token: getToken() || undefined,
    }),

  getAuditLogs: (type?: string, page = 1, limit = 50) => {
    const params = new URLSearchParams({ page: String(page), limit: String(limit) });
    if (type) params.append('type', type);
    return fetchApi<{ logs: any[]; total: number }>(
      `/admin/audit-logs?${params}`,
      { token: getToken() || undefined }
    );
  },
};
