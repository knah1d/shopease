// Product related types
export interface Product {
  id: string;
  name: string;
  description: string;
  aboutItem?: string[];
  price: number;
  originalPrice?: number;
  discount?: number;
  category: string;
  brand?: string;
  stock: number;
  stockItems?: number; // Alias for stock for compatibility
  images: string[];
  rating?: number;
  reviews?: Review[];
  tags?: string[];
  color?: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  author: string;
  image: string;
  content: string;
  rating: number;
  date: Date;
}

export interface CreateProductRequest {
  name: string;
  description: string;
  aboutItem?: string[];
  price: number;
  originalPrice?: number;
  category: string;
  brand?: string;
  stock: number;
  images: string[];
  tags?: string[];
  color?: string[];
}

export interface UpdateProductPriceRequest {
  price: number;
  originalPrice?: number;
}

export interface UpdateProductStockRequest {
  stock: number;
}

export interface ProductSearchParams {
  name?: string;
  category?: string;
  page?: number;
  limit?: number;
}

export interface ProductSearchResponse {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
}