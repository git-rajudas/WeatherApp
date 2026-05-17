import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {

    const { user, loading } = useAuth();

    // loading state
    if (loading) {
        return (
            <div className="h-screen flex justify-center items-center">
                Loading...
            </div>
        );
    }

    // not logged in
    if (!user) {
        return <Navigate to="/app/login" replace />;
    }

    // logged in
    return children;
}

export default ProtectedRoute;