import { env } from '@config/env';

type AccessTokenResponse = {
  access_token: string;
  expires_in: number;
  token_type?: string;
};

let cachedAccessToken: string | null = null;
let accessTokenExpiresAt = 0;

async function createAccessToken(): Promise<string> {
  const clientId = env.INTERSWITCH_CLIENT_ID;
  const secretKey = env.INTERSWITCH_SECRET_KEY;
  const concatenatedString = `${clientId}:${secretKey}`;

  const encodedString = btoa(concatenatedString);
  const result = await fetch('https://qa.interswitchng.com/passport/oauth/token?grant_type=client_credentials', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      authorization: `Basic ${encodedString}`
    },
  });

  if (!result.ok) {
    throw new Error(`Failed to create access token: ${result.status} ${result.statusText}`);
  }

  const responseBody = await result.json() as AccessTokenResponse;
  if (!responseBody.access_token || !responseBody.expires_in) {
    throw new Error('Invalid access token response from Interswitch');
  }

  cachedAccessToken = responseBody.access_token;
  accessTokenExpiresAt = Date.now() + (responseBody.expires_in * 1000);
  return responseBody.access_token;
}

async function getAccessToken(forceRefresh = false): Promise<string> {
  const now = Date.now();
  const refreshBufferMs = 60_000;

  if (!forceRefresh && cachedAccessToken && now < accessTokenExpiresAt - refreshBufferMs) {
    return cachedAccessToken;
  }

  return createAccessToken();
}

const API_URL = env.INTERSWITCH_BASE_URL;

type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string; status?: number };

class ApiService {
  private async getHeaders(forceRefresh = false): Promise<Record<string, string>> {
    const accessToken = await getAccessToken(forceRefresh);

    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'X-Merchant-Code': env.INTERSWITCH_MERCHANT_CODE
    };
  }

  #executeRequest = async <T>(
    route: string,
    method: string,
    headers: Record<string, string>,
    body?: object,
    timeoutMs = 10_000
  ): Promise<ApiResponse<T>> => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    const options: RequestInit = {
      method,
      headers,
      signal: controller.signal
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    try {
      const normalizedRoute = route.replace(/^\/+/, '');
      const response = await fetch(`${API_URL}${normalizedRoute}`, options);
      const contentType = response.headers.get('content-type');
      const data = contentType?.includes("application/json")
        ? await response.json()
        : await response.text();

      if (!response.ok) {
        const errorMessage =
          typeof data === 'object' && data !== null && 'message' in data
            ? String((data as { message: string }).message)
            : 'Request failed';

        return {
          success: false,
          error: errorMessage,
          status: response.status
        };
      }

      return { success: true, data: data as T };
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return { success: false, error: 'Request timed out' };
      }
      if (error instanceof TypeError) {
        return { success: false, error: 'Network error' };
      }
      return { success: false, error: 'Unexpected error' };
    } finally {
      clearTimeout(timer);
    }
  };

  #callApi = async <T>(
    route: string,
    method: string,
    body?: object,
    timeoutMs = 10_000
  ): Promise<ApiResponse<T>> => {
    const firstHeaders = await this.getHeaders(false);
    const firstAttempt = await this.#executeRequest<T>(route, method, firstHeaders, body, timeoutMs);

    if (!firstAttempt.success && firstAttempt.status === 401) {
      const refreshedHeaders = await this.getHeaders(true);
      return this.#executeRequest<T>(route, method, refreshedHeaders, body, timeoutMs);
    }

    return firstAttempt;
  };

  async get<T>(route: string, params?: Record<string, string>) {
    const url = params ? `${route}?${new URLSearchParams(params)}` : route;
    return this.#callApi<T>(url, 'GET');
  }

  async post<T>(route: string, body?: object) {
    return this.#callApi<T>(route, 'POST', body);
  }

  async put<T>(route: string, body?: object) {
    return this.#callApi<T>(route, 'PUT', body);
  }

  async remove<T>(route: string) {
    return this.#callApi<T>(route, 'DELETE');
  }
}

const apiClient = new ApiService();
export default apiClient;