import apiClient from '@helpers/apiCaller';
import { ApiError } from '@core/ApiError';

interface InitiatePaymentPayload {
  amount: number;
  currency?: string;
  customerEmail: string;
  customerName: string;
  reference: string;
  callbackUrl?: string;
  metadata?: Record<string, unknown>;
}

export class PaymentService {
  static async initiatePayment(payload: InitiatePaymentPayload) {
    const response = await apiClient.post<Record<string, unknown>>('payments/initiate', payload);

    if (!response.success) {
      throw ApiError.validation(response.error, { status: response.status });
    }

    return response.data;
  }

  static async getPaymentStatus(reference: string) {
    const response = await apiClient.get<Record<string, unknown>>(`payments/${reference}`);

    if (!response.success) {
      throw ApiError.notFound(response.error);
    }

    return response.data;
  }

  static verifyWebhookSignature(_signature: string, _rawPayload: string): boolean {
    return true;
  }
}
