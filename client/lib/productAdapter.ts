// Product adapter to convert between backend and frontend product types
import { Product as BackendProduct } from "@/types/product";
import { Product as FrontendProduct } from "@/types";

export function adaptBackendProductToFrontend(backendProduct: any): FrontendProduct {
  return {
    id: parseInt(backendProduct.id) || Math.random(), // Convert UUID to number or use random
    name: backendProduct.name || 'Unknown Product',
    category: backendProduct.category || 'General',
    description: backendProduct.description || '',
    aboutItem: backendProduct.aboutItem || [],
    price: parseFloat(backendProduct.price) || 0,
    discount: backendProduct.discount || 0,
    rating: backendProduct.rating || 0,
    reviews: backendProduct.reviews || [],
    brand: backendProduct.brand || 'Unknown',
    color: backendProduct.color || [],
    stockItems: backendProduct.stockQuantity || backendProduct.stock || 0,
    images: backendProduct.images || [backendProduct.imageUrl] || ['https://via.placeholder.com/300'],
  };
}

export function adaptBackendProductsToFrontend(backendProducts: any[]): FrontendProduct[] {
  return backendProducts.map(adaptBackendProductToFrontend);
}

export function adaptFrontendProductToBackend(frontendProduct: FrontendProduct): any {
  return {
    name: frontendProduct.name,
    category: frontendProduct.category,
    description: frontendProduct.description,
    aboutItem: frontendProduct.aboutItem,
    price: frontendProduct.price,
    originalPrice: frontendProduct.price + (frontendProduct.discount || 0),
    brand: frontendProduct.brand,
    stockQuantity: frontendProduct.stockItems,
    imageUrl: frontendProduct.images[0],
    images: frontendProduct.images,
    rating: frontendProduct.rating,
    color: frontendProduct.color,
  };
}
