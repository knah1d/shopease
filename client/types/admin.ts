// Category types for frontend
export interface Category {
  id: number;
  name: string;
  description?: string;
  imageUrl?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryRequest {
  name: string;
  description?: string;
  imageUrl?: string;
}

export interface AdminDashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalCustomers: number;
  totalSellers: number;
  totalAdmins: number;
  totalProducts: number;
  totalOrders: number;
  totalCategories: number;
}
