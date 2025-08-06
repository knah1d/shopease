// Base API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api';

// API client with common configurations
class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  // Get authentication token from localStorage
  private getAuthToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('authToken');
  }

  // Common headers for API requests
  private getHeaders(includeAuth: boolean = true): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (includeAuth) {
      const token = this.getAuthToken();
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
    }

    return headers;
  }

  // Generic API request method
  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    includeAuth: boolean = true
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      ...options,
      headers: {
        ...this.getHeaders(includeAuth),
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      // Handle non-200 responses
      if (!response.ok) {
        let errorMessage = `API Error: ${response.status}`;
        try {
          const errorData = await response.json();
          if (errorData.message) {
            errorMessage = errorData.message;
          }
          if (errorData.errors) {
            // Handle validation errors
            const validationErrors = Object.entries(errorData.errors)
              .map(([field, message]) => `${field}: ${message}`)
              .join(', ');
            errorMessage = `${errorData.message || 'Validation failed'}: ${validationErrors}`;
          }
        } catch {
          errorMessage = await response.text() || errorMessage;
        }
        throw new Error(errorMessage);
      }

      // Check if response has content
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        // Handle backend response format that wraps data
        if (data.success !== undefined) {
          if (!data.success) {
            throw new Error(data.message || 'API request failed');
          }
          return data.data || data;
        }
        return data;
      } else {
        return {} as T;
      }
    } catch (error) {
      console.error(`API request failed for ${url}:`, error);
      throw error;
    }
  }

  // HTTP Methods
  async get<T>(endpoint: string, includeAuth: boolean = true): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' }, includeAuth);
  }

  async post<T>(endpoint: string, data?: any, includeAuth: boolean = true): Promise<T> {
    return this.request<T>(
      endpoint,
      {
        method: 'POST',
        body: data ? JSON.stringify(data) : undefined,
      },
      includeAuth
    );
  }

  async put<T>(endpoint: string, data?: any, includeAuth: boolean = true): Promise<T> {
    return this.request<T>(
      endpoint,
      {
        method: 'PUT',
        body: data ? JSON.stringify(data) : undefined,
      },
      includeAuth
    );
  }

  async delete<T>(endpoint: string, includeAuth: boolean = true): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' }, includeAuth);
  }
}

// Export the API client instance
export const apiClient = new ApiClient(API_BASE_URL);

// Export base URL for direct usage
export { API_BASE_URL };