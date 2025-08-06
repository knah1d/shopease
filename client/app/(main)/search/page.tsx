"use client";
import { useEffect, useState } from "react";
import BreadcrumbComponent from "@/components/others/Breadcrumb";
import SingleProductCartView from "@/components/product/SingleProductCartView";
import SingleProductListView from "@/components/product/SingleProductListView";
import { useProducts } from "@/hooks";
import { adaptBackendProductsToFrontend } from "@/lib/productAdapter";
import { Product } from "@/types";
import Link from "next/link";
import Loader from "@/components/others/Loader";

const SearchComponent = ({
    searchParams,
}: {
    searchParams: { query: string };
}) => {
    const [foundProducts, setFoundProducts] = useState<Product[]>([]);
    const { products, isLoading, error, searchProducts } = useProducts();

    useEffect(() => {
        if (searchParams.query) {
            // Search using backend API
            searchProducts({ name: searchParams.query }).catch(() => {
                console.log("Search failed, trying with all products");
            });
        }
    }, [searchParams.query, searchProducts]);

    useEffect(() => {
        if (products.length > 0) {
            const adaptedProducts = adaptBackendProductsToFrontend(products);
            // Filter products based on search query if backend doesn't support search
            const filtered = adaptedProducts.filter((product) =>
                product.name
                    .toLowerCase()
                    .includes(searchParams.query.toLowerCase())
            );
            setFoundProducts(filtered);
        }
    }, [products, searchParams.query]);

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return (
            <div className="text-xl font-medium flex flex-col items-center justify-center h-screen w-full">
                <p className="p-4 text-center text-red-600">
                    Error searching products: {error}
                </p>
                <Link
                    className="p-2 underline text-muted-foreground"
                    href={"/"}
                >
                    Home
                </Link>
            </div>
        );
    }

    if (foundProducts.length === 0) {
        return (
            <div className="text-xl font-medium flex flex-col items-center justify-center h-screen w-full">
                <p className="p-4 text-center">
                    Sorry, no search result found for your query !
                </p>
                <Link
                    className="p-2 underline text-muted-foreground"
                    href={"/"}
                >
                    Home
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-screen-xl mx-auto p-4 md:p-8 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <BreadcrumbComponent
                    links={["/shop"]}
                    pageText={searchParams.query!}
                />
                <p className=" capitalize">
                    {foundProducts.length} results found for your search{" "}
                    <span className="text-lg font-medium">
                        {searchParams.query}
                    </span>
                </p>
            </div>
            <div className="hidden lg:grid grid-cols-1 gap-6">
                {foundProducts.map((product) => (
                    <SingleProductListView key={product.id} product={product} />
                ))}
            </div>
            <div className="grid lg:hidden grid-cols-1 md:grid-cols-3 gap-6">
                {foundProducts.map((product) => (
                    <SingleProductCartView key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default SearchComponent;
