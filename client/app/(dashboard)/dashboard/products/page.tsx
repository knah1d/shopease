'use client';
import ProductActions from "@/components/dashboard/product/ProductActions";
import ProductHeader from "@/components/dashboard/product/ProductHeader";
import Loader from "@/components/others/Loader";
import Pagination from "@/components/others/Pagination";
import { useProducts } from "@/hooks";
import { adaptBackendProductsToFrontend } from "@/lib/productAdapter";
import { Product } from "@/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { products: backendProducts, isLoading, error, fetchAllProducts } = useProducts();

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  useEffect(() => {
    if (backendProducts.length > 0) {
      const adaptedProducts = adaptBackendProductsToFrontend(backendProducts);
      setProducts(adaptedProducts);
    }
  }, [backendProducts]);

  if (isLoading) {
    return (
      <div className="max-w-screen-xl mx-auto w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 my-4">
        <div className="flex items-center justify-center h-64">
          <Loader />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-screen-xl mx-auto w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 my-4">
        <div className="flex items-center justify-center h-64">
          <p className="text-red-600">Error loading products: {error}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="max-w-screen-xl mx-auto w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 my-4">
      <ProductHeader />
      <div className="overflow-x-auto">
        <table className="min-w-full overflow-x-scroll divide-y divide-gray-200 dark:divide-gray-700 border dark:border-gray-500">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {products.slice(0, 6).map((product) => (
              <tr key={product.id} className="bg-white dark:bg-gray-800">
                <td className="px-6 py-4 whitespace-nowrap">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {product.name.slice(0, 30)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{product.price}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {product.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <ProductActions />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
                <Pagination />
      </div>
    </div>
  );
};

export default ProductsPage;
      </div>
    </div>
  );
};

export default ProductsPage;
