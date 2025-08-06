// User related types
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  address?: string;
  createdAt: string;
  updatedAt: string;
}

export interface RegisterUserRequest {
  name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
}

export interface LoginUserRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  createdAt: string;
  updatedAt: string;
}