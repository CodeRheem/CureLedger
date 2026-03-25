import { env } from '@config/env';

const API_URL = env.INTERSWITCH_BASE_URL;

type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string; status?: number };

class ApiService {
  private getHeaders(): Record<string, string> {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${env.INTERSWITCH_API_KEY}`,
      'X-Merchant-Code': env.INTERSWITCH_MERCHANT_CODE
    };
  }

  #callApi = async <T>(
    route: string,
    method: string,
    body?: object,
    timeoutMs = 10_000
  ): Promise<ApiResponse<T>> => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    const options: RequestInit = {
      method,
      headers: this.getHeaders(),
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