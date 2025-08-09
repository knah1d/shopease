import Link from "next/link";
import { ArrowLeft, ShieldX } from "lucide-react";

const UnauthorizedPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 text-center">
                <div>
                    <ShieldX className="mx-auto h-24 w-24 text-red-500" />
                    <h1 className="mt-6 text-6xl font-extrabold text-gray-900">
                        403
                    </h1>
                    <h2 className="mt-2 text-3xl font-bold text-gray-900">
                        Access Denied
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        You don't have permission to access this page.
                    </p>
                </div>

                <div className="space-y-4">
                    <div className="text-sm text-gray-500">
                        This page requires specific permissions that your
                        account doesn't have.
                    </div>

                    <div className="flex flex-col space-y-3">
                        <Link
                            href="/"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Go to Homepage
                        </Link>

                        <Link
                            href="/contact"
                            className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Contact Support
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UnauthorizedPage;
