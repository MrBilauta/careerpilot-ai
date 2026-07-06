/**
 * API client for communicating with the CareerPilot AI backend.
 *
 * All requests are proxied through Next.js rewrites to the FastAPI backend.
 * This module provides typed fetch wrappers with error handling.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

interface ApiError {
  detail: string;
  status: number;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}/api/v1${endpoint}`;

    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error: ApiError = {
        detail: "An unexpected error occurred",
        status: response.status,
      };
      try {
        const body = await response.json();
        error.detail = body.detail || error.detail;
      } catch {
        // ignore parse errors
      }
      throw error;
    }

    return response.json();
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "GET" });
  }

  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async upload<T>(endpoint: string, formData: FormData): Promise<T> {
    const url = `${this.baseUrl}/api/v1${endpoint}`;
    const response = await fetch(url, {
      method: "POST",
      body: formData,
      // Don't set Content-Type — browser will set multipart/form-data with boundary
    });

    if (!response.ok) {
      const body = await response.json().catch(() => ({ detail: "Upload failed" }));
      throw { detail: body.detail, status: response.status };
    }

    return response.json();
  }
}

export const api = new ApiClient();
export type { ApiError };
