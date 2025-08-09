import { apiClient } from '@/lib/api';
import { 
  User, 
  RegisterUserRequest, 
  LoginUserRequest, 
  LoginResponse, 
  RegisterResponse, 
  UserProfile 
} from '@/types/user';

class UserService {
  // Register a new user
  async register(userData: RegisterUserRequest): Promise<RegisterResponse> {
    try {
      const response = await apiClient.post<RegisterResponse>('/users/register', userData, false);
      return response;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  }

  // User login
  async login(credentials: LoginUserRequest): Promise<LoginResponse> {
    try {
      const response = await apiClient.post<any>('/users/login', credentials, false);
      
      // Handle the backend response format which may have success/data structure
      let loginData;
      if (response.success && response.data) {
        loginData = response.data;
      } else if (response.token || response.user) {
        loginData = response;
      } else {
        throw new Error('Invalid login response format');
      }
      
      // Store the token and user in localStorage
      if (loginData.token) {
        localStorage.setItem('authToken', loginData.token);
      }
      
      if (loginData.user) {
        localStorage.setItem('user', JSON.stringify(loginData.user));
      } else if (loginData.name && loginData.email) {
        // If user data is at root level
        const userData = {
          id: loginData.id,
          name: loginData.name,
          email: loginData.email,
          phone: loginData.phone,
          address: loginData.address,
          role: loginData.role || 'CUSTOMER',
          isActive: loginData.isActive || true,
          createdAt: loginData.createdAt,
          updatedAt: loginData.updatedAt,
        };
        localStorage.setItem('user', JSON.stringify(userData));
        loginData.user = userData;
      }
      
      return {
        token: loginData.token,
        user: loginData.user,
      };
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  // Get user profile by ID
  async getProfile(userId: string): Promise<UserProfile> {
    try {
      const response = await apiClient.get<UserProfile>(`/users/profile/${userId}`);
      return response;
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      throw error;
    }
  }

  // Logout user (clear local storage)
  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }

  // Get current user from localStorage
  getCurrentUser(): User | null {
    if (typeof window === 'undefined') return null;
    
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    
    try {
      return JSON.parse(userStr) as User;
    } catch {
      return null;
    }
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('user');
    
    return !!(token && user);
  }

  // Get auth token
  getAuthToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('authToken');
  }

  // Check user role
  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user?.role === role;
  }

  // Check if user is admin
  isAdmin(): boolean {
    return this.hasRole('ADMIN');
  }

  // Check if user is seller
  isSeller(): boolean {
    return this.hasRole('SELLER');
  }

  // Check if user is customer
  isCustomer(): boolean {
    return this.hasRole('CUSTOMER');
  }
}

// Export singleton instance
export const userService = new UserService();