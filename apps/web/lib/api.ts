import type { ApiResponse, ApiErrorResponse } from '@qoas/types';

const API_BASE = process.env['NEXT_PUBLIC_API_URL'] ?? 'http://localhost:3001/api/v1';

class ApiError extends Error {
  constructor(
    public readonly errorResponse: ApiErrorResponse,
    public readonly status: number,
  ) {
    super(errorResponse.message);
    this.name = 'ApiError';
  }
}

async function request<T>(
  path: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {
  const url = path.startsWith('http') ? path : `${API_BASE}${path}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include', // Send HttpOnly cookies
  });

  if (!response.ok) {
    const errorResponse = (await response.json()) as ApiErrorResponse;
    throw new ApiError(errorResponse, response.status);
  }

  return response.json() as Promise<ApiResponse<T>>;
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
