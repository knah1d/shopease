"use client";
import ProductGallery from "@/components/product/ProductGallery";
import { useProducts } from "@/hooks";
import { adaptBackendProductsToFrontend } from "@/lib/productAdapter";
import { Product } from "@/types";
import React, { useEffect, useState } from "react";
import RelatedProducts from "@/components/products/RelatedProducts";
import BreadcrumbComponent from "@/components/others/Breadcrumb";
import ProductDetails from "@/components/product/ProductDetails";
import Loader from "@/components/others/Loader";
import Link from "next/link";

// Define the props interface for the component
interface ProductIdPageProps {
    params: { productId: string };
}

// Define the main component
const ProductIdPage = ({ params }: ProductIdPageProps) => {
    const [product, setProduct] = useState<Product | null>(null);
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
    const { products, isLoading, error, fetchAllProducts, getProductById } =
        useProducts();

    useEffect(() => {
        fetchAllProducts();
    }, [fetchAllProducts]);

    useEffect(() => {
        if (products.length > 0) {
            const adaptedProducts = adaptBackendProductsToFrontend(products);

            // Find the product with the specified ID
            const foundProduct = adaptedProducts.find(
                (prod) => prod.id === Number(params.productId)
            );
            setProduct(foundProduct || null);

            // Filter related products based on the category of the current product
            if (foundProduct) {
                const related = adaptedProducts.filter(
                    (prod) =>
                        prod.category === foundProduct.category &&
                        prod.id !== foundProduct.id
                );
                setRelatedProducts(related);
            }
        }
    }, [products, params.productId]);

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return (
            <div className="max-w-screen-xl mx-auto p-4 md:p-8 flex flex-col items-center justify-center min-h-screen">
                <p className="text-red-600 text-xl mb-4">
                    Error loading product: {error}
                </p>
                <Link href="/shop" className="text-blue-500 underline">
                    Back to Shop
                </Link>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="max-w-screen-xl mx-auto p-4 md:p-8 flex flex-col items-center justify-center min-h-screen">
                <p className="text-xl mb-4">Product not found</p>
                <Link href="/shop" className="text-blue-500 underline">
                    Back to Shop
                </Link>
            </div>
        );
    }

    // Return the JSX structure of the component
    return (
        <div className="max-w-screen-xl mx-auto p-4 md:p-8 flex flex-col items-start gap-2 min-h-screen">
            {/* Breadcrumb Component */}
            <div className="my-2">
                <BreadcrumbComponent
                    links={["/shop"]}
                    pageText={product?.name!}
                />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
                {/* Product Gallery */}
                <ProductGallery isInModal={false} images={product?.images!} />
                {/* product details */}
                <ProductDetails product={product!} />
            </div>
            {/* Related Products */}
            <RelatedProducts products={relatedProducts} />
        </div>
    );
};

// Export the component as default
export default ProductIdPage;
