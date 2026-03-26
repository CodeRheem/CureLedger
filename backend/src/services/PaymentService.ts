import apiClient from '@helpers/apiCaller';
import { ApiError } from '@core/ApiError';
import { env } from '@config/env';
import crypto from 'crypto';

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
    const merchantCode = env.INTERSWITCH_MERCHANT_CODE;
    const payableCode = env.INTERSWITCH_PAY_ITEM_ID;

    if (!merchantCode || !payableCode) {
      throw ApiError.validation('Interswitch merchant configuration is missing');
    }

    const response = await apiClient.post<Record<string, unknown>>('collections/api/v1/pay-bill', {
      merchantCode,
      payableCode,
      amount: Math.round(payload.amount * 100),
      redirectUrl: payload.callbackUrl || env.FRONTEND_CALLBACK_URL,
      customerId: payload.customerEmail,
      customerEmail: payload.customerEmail,
      currencyCode: payload.currency || '566',
      transactionReference: payload.reference,
      customerName: payload.customerName,
      metadata: payload.metadata || {}
    });

    if (!response.success) {
      throw ApiError.validation(response.error, { status: response.status });
    }

    const data = response.data as Record<string, unknown>;
    return {
      paymentReference: payload.reference,
      paymentUrl: data.paymentUrl || data.redirectUrl || null,
      providerResponse: data
    };
  }

  static async getPaymentStatus(reference: string, amountInMinorUnits?: number) {
    const merchantCode = env.INTERSWITCH_MERCHANT_CODE;
    if (!merchantCode) {
      throw ApiError.validation('Interswitch merchant configuration is missing');
    }

    const params: Record<string, string> = {
      merchantcode: merchantCode,
      transactionreference: reference,
    };

    if (typeof amountInMinorUnits === 'number' && amountInMinorUnits > 0) {
      params.amount = String(Math.round(amountInMinorUnits));
    }

    const response = await apiClient.get<Record<string, unknown>>('collections/api/v1/gettransaction.json', params);

    if (!response.success) {
      throw ApiError.notFound(response.error);
    }

    const data = response.data as Record<string, unknown>;
    const responseCode = String(data.responseCode || data.ResponseCode || '');

    return {
      ...data,
      isSuccessful: responseCode === '00',
      responseCode,
      paymentReference: reference
    };
  }

  static verifyWebhookSignature(signature: string, rawPayload: string): boolean {
    const secret = env.INTERSWITCH_WEBHOOK_SECRET;
    if (!secret) {
      return false;
    }

    const computed = crypto
      .createHmac('sha512', secret)
      .update(rawPayload, 'utf8')
      .digest('hex');

    if (!signature || computed.length !== signature.length) {
      return false;
    }

    return crypto.timingSafeEqual(Buffer.from(computed), Buffer.from(signature));
  }
}
