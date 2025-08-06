import { useState, useEffect } from 'react';
import { productService } from '@/services';
import { Product, ProductSearchParams } from '@/types/product';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAllProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await productService.getAllProducts();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
    } finally {
      setIsLoading(false);
    }
  };

  const searchProducts = async (params: ProductSearchParams) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await productService.searchProducts(params);
      setProducts(data.products);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search products');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const getProductById = async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const product = await productService.getProductById(id);
      return product;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch product');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const getProductsByCategory = async (category: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await productService.getProductsByCategory(category);
      setProducts(data);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch products by category');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const getFeaturedProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await productService.getFeaturedProducts();
      setProducts(data);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch featured products');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return {
    products,
    isLoading,
    error,
    fetchAllProducts,
    searchProducts,
    getProductById,
    getProductsByCategory,
    getFeaturedProducts,
  };
};