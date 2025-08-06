import { useState, useCallback } from 'react';
import { adminService } from '@/services/adminService';
import { Category, CreateCategoryRequest, AdminDashboardStats } from '@/types/admin';
import { User } from '@/types/user';

export const useAdmin = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [dashboardStats, setDashboardStats] = useState<AdminDashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Category Management
  const fetchAllCategories = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await adminService.getAllCategories();
      setCategories(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch categories');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createCategory = useCallback(async (request: CreateCategoryRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const newCategory = await adminService.createCategory(request);
      setCategories(prev => [...prev, newCategory]);
      return newCategory;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create category');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateCategory = useCallback(async (id: number, request: CreateCategoryRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedCategory = await adminService.updateCategory(id, request);
      setCategories(prev => prev.map(cat => cat.id === id ? updatedCategory : cat));
      return updatedCategory;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update category');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteCategory = useCallback(async (id: number) => {
    setIsLoading(true);
    setError(null);
    try {
      await adminService.deleteCategory(id);
      setCategories(prev => prev.filter(cat => cat.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete category');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const activateCategory = useCallback(async (id: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const activatedCategory = await adminService.activateCategory(id);
      setCategories(prev => prev.map(cat => cat.id === id ? activatedCategory : cat));
      return activatedCategory;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to activate category');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // User Management
  const fetchAllUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await adminService.getAllUsers();
      setUsers(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch users');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateUserRole = useCallback(async (userId: string, role: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedUser = await adminService.updateUserRole(userId, role);
      setUsers(prev => prev.map(user => user.id === userId ? updatedUser : user));
      return updatedUser;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update user role');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const activateUser = useCallback(async (userId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const activatedUser = await adminService.activateUser(userId);
      setUsers(prev => prev.map(user => user.id === userId ? activatedUser : user));
      return activatedUser;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to activate user');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deactivateUser = useCallback(async (userId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const deactivatedUser = await adminService.deactivateUser(userId);
      setUsers(prev => prev.map(user => user.id === userId ? deactivatedUser : user));
      return deactivatedUser;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to deactivate user');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Dashboard Stats
  const fetchDashboardStats = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const stats = await adminService.getDashboardStats();
      setDashboardStats(stats);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch dashboard stats');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    // State
    categories,
    users,
    dashboardStats,
    isLoading,
    error,
    
    // Category methods
    fetchAllCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    activateCategory,
    
    // User methods
    fetchAllUsers,
    updateUserRole,
    activateUser,
    deactivateUser,
    
    // Dashboard methods
    fetchDashboardStats,
  };
};
