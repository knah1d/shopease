import DashboardPageOne from "@/components/pages/dashboard-pages/DashboardPageOne";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

const DashboardPage = () => {
    return (
        <ProtectedRoute requiredRoles={["ADMIN"]}>
            <main className="w-full">
                <DashboardPageOne />
            </main>
        </ProtectedRoute>
    );
};

export default DashboardPage;
