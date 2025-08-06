import { API_BASE_URL } from '@/lib/api';
import { showToast } from '@/lib/showToast';
import { Category, CreateCategoryRequest, AdminDashboardStats } from '@/types/admin';
import { User } from '@/types/user';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

class AdminService {
  private baseURL = API_BASE_URL;

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    try {
      const token = localStorage.getItem('authToken');
      
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
          ...options.headers,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error(`AdminService.${endpoint} error:`, error);
      showToast('Error occurred while processing admin request', 'error', 'Admin Error');
      throw error;
    }
  }

  // Category Management
  async createCategory(request: CreateCategoryRequest): Promise<Category> {
    return this.makeRequest<Category>('/admin/categories', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async getAllCategories(): Promise<Category[]> {
    return this.makeRequest<Category[]>('/admin/categories');
  }

  async getActiveCategories(): Promise<Category[]> {
    return this.makeRequest<Category[]>('/admin/categories/active');
  }

  async getCategoryById(id: number): Promise<Category> {
    return this.makeRequest<Category>(`/admin/categories/${id}`);
  }

  async updateCategory(id: number, request: CreateCategoryRequest): Promise<Category> {
    return this.makeRequest<Category>(`/admin/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(request),
    });
  }

  async deleteCategory(id: number): Promise<string> {
    return this.makeRequest<string>(`/admin/categories/${id}`, {
      method: 'DELETE',
    });
  }

  async activateCategory(id: number): Promise<Category> {
    return this.makeRequest<Category>(`/admin/categories/${id}/activate`, {
      method: 'PUT',
    });
  }

  // User Management
  async getAllUsers(): Promise<User[]> {
    return this.makeRequest<User[]>('/admin/users');
  }

  async getCustomers(): Promise<User[]> {
    return this.makeRequest<User[]>('/admin/users/customers');
  }

  async getSellers(): Promise<User[]> {
    return this.makeRequest<User[]>('/admin/users/sellers');
  }

  async updateUserRole(userId: string, role: string): Promise<User> {
    return this.makeRequest<User>(`/admin/users/${userId}/role?role=${role}`, {
      method: 'PUT',
    });
  }

  async activateUser(userId: string): Promise<User> {
    return this.makeRequest<User>(`/admin/users/${userId}/activate`, {
      method: 'PUT',
    });
  }

  async deactivateUser(userId: string): Promise<User> {
    return this.makeRequest<User>(`/admin/users/${userId}/deactivate`, {
      method: 'PUT',
    });
  }

  // Dashboard Stats
  async getDashboardStats(): Promise<AdminDashboardStats> {
    return this.makeRequest<AdminDashboardStats>('/admin/dashboard/stats');
  }
}

export const adminService = new AdminService();
