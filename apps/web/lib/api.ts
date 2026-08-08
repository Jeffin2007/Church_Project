import type { ApiResponse, ApiErrorResponse } from '@qoas/types';

const API_BASE = process.env['NEXT_PUBLIC_API_URL'] ?? '/api/v1';

class ApiError extends Error {
  constructor(
    public readonly errorResponse: ApiErrorResponse,
    public readonly status: number,
  ) {
    super(errorResponse.message);
    this.name = 'ApiError';
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  const isAbsolute = path.startsWith('http');
  const targetUrl = isAbsolute ? path : `${API_BASE}${path.startsWith('/') ? path : `/${path}`}`;

  try {
    const response = await fetch(targetUrl, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include',
    });

    if (!response.ok) {
      // If relative URL failed and API_BASE was overridden to a remote server, try local /api/v1 as fallback
      if (!isAbsolute && targetUrl.startsWith('http')) {
        const fallbackUrl = `/api/v1${path.startsWith('/') ? path : `/${path}`}`;
        const fallbackResp = await fetch(fallbackUrl, {
          ...options,
          headers: {
            'Content-Type': 'application/json',
            ...options.headers,
          },
        }).catch(() => null);

        if (fallbackResp) {
          if (fallbackResp.ok) {
            return fallbackResp.json() as Promise<ApiResponse<T>>;
          }
          const fbErr = (await fallbackResp.json().catch(() => null)) as ApiErrorResponse | null;
          if (fbErr && fbErr.message) {
            throw new ApiError(fbErr, fallbackResp.status);
          }
        }
      }

      const errorResponse = (await response.json().catch(() => null)) as ApiErrorResponse | null;
      throw new ApiError(
        errorResponse || {
          success: false,
          code: 'HTTP_ERROR',
          message: `API request failed with status ${response.status}`,
          timestamp: new Date().toISOString(),
          requestId: `req_${Date.now()}`,
        },
        response.status,
      );
    }

    return response.json() as Promise<ApiResponse<T>>;
  } catch (err) {
    if (!isAbsolute && targetUrl.startsWith('http')) {
      const fallbackUrl = `/api/v1${path.startsWith('/') ? path : `/${path}`}`;
      const fallbackResp = await fetch(fallbackUrl, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      }).catch(() => null);

      if (fallbackResp) {
        if (fallbackResp.ok) {
          return fallbackResp.json() as Promise<ApiResponse<T>>;
        }
        const fbErr = (await fallbackResp.json().catch(() => null)) as ApiErrorResponse | null;
        if (fbErr && fbErr.message) {
          throw new ApiError(fbErr, fallbackResp.status);
        }
      }
    }
    throw err;
  }
}

export const api = {
  get: <T>(path: string, options?: RequestInit): Promise<ApiResponse<T>> =>
    request<T>(path, { method: 'GET', ...options }),

  post: <T>(path: string, body?: unknown, options?: RequestInit): Promise<ApiResponse<T>> =>
    request<T>(path, { method: 'POST', body: JSON.stringify(body), ...options }),

  put: <T>(path: string, body?: unknown, options?: RequestInit): Promise<ApiResponse<T>> =>
    request<T>(path, { method: 'PUT', body: JSON.stringify(body), ...options }),

  patch: <T>(path: string, body?: unknown, options?: RequestInit): Promise<ApiResponse<T>> =>
    request<T>(path, { method: 'PATCH', body: JSON.stringify(body), ...options }),

  delete: <T>(path: string, options?: RequestInit): Promise<ApiResponse<T>> =>
    request<T>(path, { method: 'DELETE', ...options }),
};

export { ApiError };
