import { useState, useEffect } from 'react';
import { userService } from '@/services';
import { User, LoginUserRequest, RegisterUserRequest } from '@/types/user';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated
    const currentUser = userService.getCurrentUser();
    const isAuth = userService.isAuthenticated();
    
    setUser(currentUser);
    setIsAuthenticated(isAuth);
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginUserRequest) => {
    try {
      setIsLoading(true);
      const response = await userService.login(credentials);
      
      // Update state immediately
      setUser(response.user);
      setIsAuthenticated(true);
      
      // Also verify the user is stored in localStorage
      const storedUser = userService.getCurrentUser();
      if (storedUser) {
        setUser(storedUser);
        setIsAuthenticated(true);
      }
      
      return response;
    } catch (error) {
      console.error('Login failed:', error);
      setUser(null);
      setIsAuthenticated(false);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterUserRequest) => {
    try {
      setIsLoading(true);
      const response = await userService.register(userData);
      return response;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    userService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const refreshProfile = async () => {
    if (!user?.id) return;
    
    try {
      const updatedProfile = await userService.getProfile(user.id);
      setUser(updatedProfile);
    } catch (error) {
      console.error('Failed to refresh profile:', error);
    }
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    refreshProfile,
  };
};