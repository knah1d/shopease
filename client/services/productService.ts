import { apiClient } from '../lib/api';
import { Product, Review } from '@/types';

// Backend API response types
interface BackendProductResponse {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  stockQuantity: number;
  category: string;
  imageUrl: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

interface BackendApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// Category mapping for images
const categoryImageMapping: Record<string, string[]> = {
  'Watches': [
    '/images/products/watches/apple-watch-9-removebg-preview.png',
    '/images/products/watches/apple-watch-9-3-removebg-preview.png',
    '/images/products/watches/apple-watch-se-removebg-preview.png',
    '/images/products/watches/apple-watch-se-2-removebg-preview.png',
    '/images/products/watches/firebolt-ninja-removebg-preview.png',
    '/images/products/watches/galaxy-watch-4-removebg-preview.png',
    '/images/products/watches/galaxy-watch-4-2-removebg-preview.png',
  ],
  'Computers': [
    '/images/products/computers/asus-vivobook-removebg-preview.png',
    '/images/products/computers/asus-vivobook-2-removebg-preview.png',
    '/images/products/computers/dell-gaming-removebg-preview.png',
    '/images/products/computers/lenova-removebg-preview.png',
    '/images/products/computers/lenova-2-removebg-preview.png',
    '/images/products/computers/msi-modern-14-removebg-preview.png',
    '/images/products/computers/msi-modern-14-2-removebg-preview.png',
    '/images/products/computers/msi-modern-14-3-removebg-preview.png',
    '/images/products/computers/readme-13-c-removebg-preview.png',
    '/images/products/computers/readme-13c-2-removebg-preview.png',
    '/images/products/computers/galaxy-15-removebg-preview.png',
  ],
  'Headphones': [
    '/images/products/headphones/sony-dynamic-removebg-preview.png',
    '/images/products/headphones/sony-dynamic-2-removebg-preview.png',
    '/images/products/headphones/song-wh-removebg-preview.png',
    '/images/products/headphones/senheiser-removebg-preview.png',
    '/images/products/headphones/prothonics-removebg-preview.png',
    '/images/products/headphones/peco-m6-removebg-preview.png',
    '/images/products/headphones/peco-m6-2-removebg-preview.png',
  ],
  'Smartphones': [
    '/images/products/phones/peco-m6-removebg-preview.png',
    '/images/products/phones/peco-m6-2-removebg-preview.png',
    '/images/products/phones/readme-13-c-removebg-preview.png',
    '/images/products/phones/readme-13c-2-removebg-preview.png',
    '/images/products/phones/lava_agni-removebg-preview.png',
    '/images/products/phones/galaxy-15-removebg-preview.png',
  ],
  // Add more generic category mappings
  'Electronics': [
    '/images/products/computers/asus-vivobook-removebg-preview.png',
    '/images/products/watches/apple-watch-9-removebg-preview.png',
    '/images/products/headphones/sony-dynamic-removebg-preview.png',
    '/images/products/phones/peco-m6-removebg-preview.png',
  ],
  'Technology': [
    '/images/products/computers/dell-gaming-removebg-preview.png',
    '/images/products/phones/galaxy-15-removebg-preview.png',
    '/images/products/watches/galaxy-watch-4-removebg-preview.png',
  ],
  'Accessories': [
    '/images/products/headphones/senheiser-removebg-preview.png',
    '/images/products/watches/firebolt-ninja-removebg-preview.png',
  ]
};

// Helper function to get random images for a category
function getRandomImagesForCategory(category: string, count: number = 2): string[] {
  const images = categoryImageMapping[category] || [];
  if (images.length === 0) {
    // Return default placeholder images if category not found
    return [
      '/images/products/default-product.png', 
      '/images/products/default-product-2.png'
    ].slice(0, count);
  }
  
  const shuffled = [...images].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, images.length));
}

// Helper function to generate dummy data for missing fields
function generateDummyData(backendProduct: BackendProductResponse): Partial<Product> {
  return {
    aboutItem: [
      "High-quality product with excellent features and performance.",
      "Designed for optimal user experience and durability.",
      "Comes with comprehensive warranty and support.",
    ],
    discount: Math.floor(Math.random() * 20) + 5, // Random discount 5-25%
    rating: 4.0 + (Math.random() * 0.5), // Random rating 4.0-4.5
    reviews: [
      {
        content: "Great product, highly recommended!",
        rating: 4,
        author: "Customer",
        image: "/images/people/person.jpg",
        date: new Date(),
      },
    ] as Review[],
    brand: backendProduct.name.split(' ')[0] || "Brand",
    color: ['black', 'white', 'gray'],
  };
}

// Transform backend product to frontend format
function transformBackendProduct(backendProduct: BackendProductResponse): Product {
  const dummyData = generateDummyData(backendProduct);
  const images = getRandomImagesForCategory(backendProduct.category);
  
  return {
    id: parseInt(backendProduct.id, 10) || Math.floor(Math.random() * 10000),
    name: backendProduct.name,
    category: backendProduct.category,
    description: backendProduct.description,
    price: backendProduct.price,
    stockItems: backendProduct.stockQuantity,
    images,
    ...dummyData,
  } as Product;
}

export class ProductService {
  // Get all products
  async getAllProducts(): Promise<Product[]> {
    try {
      const response = await apiClient.get<BackendProductResponse[] | BackendApiResponse<BackendProductResponse[]>>('/products/getAllProducts');
      
      // Handle different response formats
      let products: BackendProductResponse[];
      if (Array.isArray(response)) {
        products = response;
      } else if ('data' in response && response.data && Array.isArray(response.data)) {
        products = response.data;
      } else {
        console.warn('Unexpected API response format:', response);
        products = [];
      }
      
      return products.map(transformBackendProduct);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      // Return empty array if API fails
      return [];
    }
  }

  // Get product by ID
  async getProductById(id: string): Promise<Product | null> {
    try {
      const response = await apiClient.get<BackendProductResponse | BackendApiResponse<BackendProductResponse>>(`/products/${id}`);
      
      // Handle different response formats
      let product: BackendProductResponse;
      if ('data' in response && response.data && typeof response.data === 'object') {
        product = response.data;
      } else if ('id' in response && response.id) {
        product = response as BackendProductResponse;
      } else {
        console.warn('Unexpected API response format:', response);
        return null;
      }
      
      return transformBackendProduct(product);
    } catch (error) {
      console.error(`Failed to fetch product ${id}:`, error);
      return null;
    }
  }

  // Search products
  async searchProducts(params: { name?: string; category?: string }): Promise<Product[]> {
    try {
      const searchParams = new URLSearchParams();
      if (params.name) searchParams.append('name', params.name);
      if (params.category) searchParams.append('category', params.category);
      
      const endpoint = `/products/search${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
      const response = await apiClient.get<BackendProductResponse[] | BackendApiResponse<BackendProductResponse[]>>(endpoint);
      
      // Handle different response formats
      let products: BackendProductResponse[];
      if (Array.isArray(response)) {
        products = response;
      } else if ('data' in response && response.data && Array.isArray(response.data)) {
        products = response.data;
      } else {
        console.warn('Unexpected API response format:', response);
        products = [];
      }
      
      return products.map(transformBackendProduct);
    } catch (error) {
      console.error('Failed to search products:', error);
      return [];
    }
  }

  // Get products by category
  async getProductsByCategory(category: string): Promise<Product[]> {
    return this.searchProducts({ category });
  }
}

// Export singleton instance
export const productService = new ProductService();
export default productService;