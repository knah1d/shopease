"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAdmin } from "@/hooks";
import { showToast } from "@/lib/showToast";
import { useRouter } from "next/navigation";

// Define the schema for form validation
const formSchema = z.object({
    name: z
        .string()
        .min(2, "Category name must be at least 2 characters")
        .max(50, "Category name cannot exceed 50 characters"),
    imageUrl: z
        .string()
        .url({ message: "Invalid URL format" })
        .optional()
        .or(z.literal("")),
    description: z
        .string()
        .max(255, "Description cannot exceed 255 characters")
        .optional(),
});

// Define TypeScript types for form data
type FormData = z.infer<typeof formSchema>;

const CategoryForm: React.FC = () => {
    const { createCategory, isLoading } = useAdmin();
    const router = useRouter();

    // Initialize react-hook-form
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    // Form submission handler
    const onSubmit = async (data: FormData) => {
        try {
            await createCategory({
                name: data.name,
                description: data.description || undefined,
                imageUrl: data.imageUrl || undefined,
            });
            showToast("Category created successfully!", "success", "Success");
            reset();
            router.push("/dashboard/categories");
        } catch (error) {
            console.error("Error creating category:", error);
            showToast(
                "Failed to create category. Please try again.",
                "error",
                "Error"
            );
        }
    };

    return (
        <div className="max-w-screen-xl w-full mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 my-4">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Add Category
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                    <Label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 dark:text-white"
                    >
                        Category Name *
                    </Label>
                    <Input
                        type="text"
                        id="name"
                        {...register("name")}
                        className={`mt-1 p-2 w-full rounded-md border ${
                            errors.name
                                ? "border-red-500"
                                : "border-gray-300 dark:border-gray-600"
                        } focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {errors.name && (
                        <span className="text-red-500 text-sm">
                            {errors.name.message}
                        </span>
                    )}
                </div>

                <div className="space-y-2">
                    <Label
                        htmlFor="imageUrl"
                        className="block text-sm font-medium text-gray-700 dark:text-white"
                    >
                        Image URL (Optional)
                    </Label>
                    <Input
                        type="text"
                        id="imageUrl"
                        placeholder="https://example.com/image.jpg"
                        {...register("imageUrl")}
                        className={`mt-1 p-2 w-full rounded-md border ${
                            errors.imageUrl
                                ? "border-red-500"
                                : "border-gray-300 dark:border-gray-600"
                        } focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {errors.imageUrl && (
                        <span className="text-red-500 text-sm">
                            {errors.imageUrl.message}
                        </span>
                    )}
                </div>

                <div className="space-y-2">
                    <Label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700 dark:text-white"
                    >
                        Description (Optional)
                    </Label>
                    <Input
                        type="text"
                        id="description"
                        {...register("description")}
                        className={`mt-1 p-2 w-full rounded-md border ${
                            errors.description
                                ? "border-red-500"
                                : "border-gray-300 dark:border-gray-600"
                        } focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {errors.description && (
                        <span className="text-red-500 text-sm">
                            {errors.description.message}
                        </span>
                    )}
                </div>

                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 text-white font-medium rounded-lg py-2 px-4 disabled:opacity-50"
                >
                    {isLoading ? "Creating..." : "Create Category"}
                </Button>
            </form>
        </div>
    );
};

export default CategoryForm;
