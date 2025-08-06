"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProducts } from "@/hooks";
import { adaptBackendProductsToFrontend } from "@/lib/productAdapter";

import React, { useEffect, useState } from "react";
import SingleProductCartView from "../product/SingleProductCartView";
import Loader from "../others/Loader";
import { Product } from "@/types";

const ProductsCollectionOne = () => {
    const [isMounted, setIsMounted] = useState(false);
    const [displayProducts, setDisplayProducts] = useState<Product[]>([]);
    const { products, isLoading, error, fetchAllProducts } = useProducts();

    useEffect(() => {
        setIsMounted(true);
        // Fetch products from backend API only
        fetchAllProducts();
    }, [fetchAllProducts]);

    useEffect(() => {
        if (products.length > 0) {
            // Convert backend products to frontend format
            const adaptedProducts = adaptBackendProductsToFrontend(products);
            setDisplayProducts(adaptedProducts);
        }
    }, [products]);

    if (!isMounted) {
        return null;
    }

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return (
            <div className="max-w-screen-xl mx-auto py-16 px-4 md:px-8 w-full">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold text-red-600 mb-4">
                        Error Loading Products
                    </h2>
                    <p className="text-gray-600">
                        {error}
                    </p>
                    <button 
                        onClick={fetchAllProducts}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    if (displayProducts.length === 0) {
        return (
            <div className="max-w-screen-xl mx-auto py-16 px-4 md:px-8 w-full">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold text-gray-600 mb-4">
                        No Products Available
                    </h2>
                    <p className="text-gray-500">
                        Please check back later or contact support.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <section className="max-w-screen-xl mx-auto py-16 px-4 md:px-8 w-full">
            <Tabs defaultValue="top-rated" className="w-full space-y-8 mx-0">
                <div className="flex items-center flex-col md:flex-row justify-between gap-2 flex-wrap w-full">
                    <h2 className="text-3xl md:text-5xl font-semibold border-l-4 border-l-rose-500 p-2">
                        Featured Products
                    </h2>
                    <TabsList className="font-semibold bg-transparent text-center">
                        <TabsTrigger value="top-rated" className="md:text-xl">
                            Top Rated
                        </TabsTrigger>
                        <TabsTrigger
                            value="most-popular"
                            className="md:text-xl"
                        >
                            Most Popular
                        </TabsTrigger>
                        <TabsTrigger value="new-items" className="md:text-xl">
                            New Items
                        </TabsTrigger>
                    </TabsList>
                </div>
                <TabsContent value="top-rated" className="w-full">
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
                        {displayProducts?.slice(0, 8)?.map((product) => {
                            return (
                                <SingleProductCartView
                                    key={product.id}
                                    product={product}
                                />
                            );
                        })}
                    </div>
                </TabsContent>
                <TabsContent value="most-popular">
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {displayProducts?.slice(0, 8)?.map((product) => {
                            return (
                                <SingleProductCartView
                                    key={product.id}
                                    product={product}
                                />
                            );
                        })}
                    </div>
                </TabsContent>
                <TabsContent value="new-items">
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {displayProducts?.slice(0, 8)?.map((product) => {
                            return (
                                <SingleProductCartView
                                    key={product.id}
                                    product={product}
                                />
                            );
                        })}
                    </div>
                </TabsContent>
            </Tabs>
        </section>
    );
};

export default ProductsCollectionOne;
