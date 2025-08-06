"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProducts } from "@/hooks";
import { adaptBackendProductsToFrontend } from "@/lib/productAdapter";
import React, { useEffect, useState } from "react";
import SingleProductCartView from "../product/SingleProductCartView";
import { Product } from "@/types";

const ProductsCollectionTwo = () => {
    const [adaptedProducts, setAdaptedProducts] = useState<Product[]>([]);
    const { products, isLoading, error, fetchAllProducts } = useProducts();

    useEffect(() => {
        fetchAllProducts();
    }, [fetchAllProducts]);

    useEffect(() => {
        if (products.length > 0) {
            const adapted = adaptBackendProductsToFrontend(products);
            setAdaptedProducts(adapted);
        }
    }, [products]);

    if (isLoading) {
        return (
            <section className="max-w-screen-xl mx-auto py-16 px-4 md:px-8 w-full">
                <div className="flex items-center justify-center">
                    <p className="text-xl">Loading products...</p>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="max-w-screen-xl mx-auto py-16 px-4 md:px-8 w-full">
                <div className="flex items-center justify-center">
                    <p className="text-red-600">
                        Error loading products: {error}
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section className="max-w-screen-xl mx-auto py-16 px-4 md:px-8 w-full">
            <Tabs defaultValue="new-arrivals" className="w-full space-y-8 mx-0">
                <TabsList className="font-semibold bg-transparent w-full text-center">
                    <TabsTrigger value="new-arrivals" className="md:text-xl">
                        New Arrivals
                    </TabsTrigger>
                    <TabsTrigger value="best-sellers" className="md:text-xl">
                        Best Sellers
                    </TabsTrigger>
                    <TabsTrigger value="feauted" className="md:text-xl">
                        Featured
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="new-arrivals" className="w-full">
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
                        {adaptedProducts?.slice(0, 8)?.map((product) => {
                            return (
                                <SingleProductCartView
                                    key={product.id}
                                    product={product}
                                />
                            );
                        })}
                    </div>
                </TabsContent>
                <TabsContent value="best-sellers" className="w-full">
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
                        {adaptedProducts?.slice(8, 16)?.map((product) => {
                            return (
                                <SingleProductCartView
                                    key={product.id}
                                    product={product}
                                />
                            );
                        })}
                    </div>
                </TabsContent>
                <TabsContent value="feauted" className="w-full">
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
                        {adaptedProducts?.slice(16, 24)?.map((product) => {
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

export default ProductsCollectionTwo;
