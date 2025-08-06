import { apiClient } from '@/lib/api';
import { 
  Product, 
  CreateProductRequest, 
  UpdateProductPriceRequest, 
  UpdateProductStockRequest,
  ProductSearchParams,
  ProductSearchResponse 
} from '@/types/product';

class ProductService {
  // Create a new product
  async createProduct(productData: CreateProductRequest): Promise<Product> {
    try {
      const response = await apiClient.post<Product>('/products/createProduct', productData);
      return response;
    } catch (error) {
      console.error('Failed to create product:', error);
      throw error;
    }
  }

  // Get product by ID
  async getProductById(id: string): Promise<Product> {
    try {
      const response = await apiClient.get<Product>(`/products/${id}`, false);
      return response;
    } catch (error) {
      console.error('Failed to fetch product:', error);
      throw error;
    }
  }

  // Get all active products
  async getAllProducts(): Promise<Product[]> {
    try {
      const response = await apiClient.get<Product[]>('/products/getAllProducts', false);
      return response;
    } catch (error) {
      console.error('Failed to fetch products:', error);
      throw error;
    }
  }

  // Search products by name or category
  async searchProducts(params: ProductSearchParams): Promise<ProductSearchResponse> {
    try {
      const queryParams = new URLSearchParams();
      
      if (params.name) queryParams.append('name', params.name);
      if (params.category) queryParams.append('category', params.category);
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.limit) queryParams.append('limit', params.limit.toString());

      const queryString = queryParams.toString();
      const endpoint = `/products/search${queryString ? `?${queryString}` : ''}`;
      
      const response = await apiClient.get<ProductSearchResponse>(endpoint, false);
      return response;
    } catch (error) {
      console.error('Failed to search products:', error);
      throw error;
    }
  }

  // Update product price
  async updateProductPrice(id: string, priceData: UpdateProductPriceRequest): Promise<Product> {
    try {
      const response = await apiClient.put<Product>(`/products/${id}/price`, priceData);
      return response;
    } catch (error) {
      console.error('Failed to update product price:', error);
      throw error;
    }
  }

  // Update product stock
  async updateProductStock(id: string, stockData: UpdateProductStockRequest): Promise<Product> {
    try {
      const response = await apiClient.put<Product>(`/products/${id}/stock`, stockData);
      return response;
    } catch (error) {
      console.error('Failed to update product stock:', error);
      throw error;
    }
  }

  // Get products by category
  async getProductsByCategory(category: string): Promise<Product[]> {
    try {
      const response = await this.searchProducts({ category });
      return response.products;
    } catch (error) {
      console.error('Failed to fetch products by category:', error);
      throw error;
    }
  }

  // Get featured products (you can modify this based on your backend logic)
  async getFeaturedProducts(): Promise<Product[]> {
    try {
      const response = await this.getAllProducts();
      // For now, return first 8 products as featured
      return response.slice(0, 8);
    } catch (error) {
      console.error('Failed to fetch featured products:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const productService = new ProductService();