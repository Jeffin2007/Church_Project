import type { ApiResponse, ProblemDetail } from '@qoas/types';

const API_BASE = process.env['NEXT_PUBLIC_API_URL'] ?? 'http://localhost:3001/api/v1';

class ApiError extends Error {
  constructor(
    public readonly problem: ProblemDetail,
    public readonly status: number,
  ) {
    super(problem.detail);
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
    const problem = (await response.json()) as ProblemDetail;
    throw new ApiError(problem, response.status);
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
