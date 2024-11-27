import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";

const ProtectedRoute = ({ children, roles = [] }: ProtectedRouteProps) => {
  const { user, isAuthenticated } = useAuthStore() as AuthStore;

  // Toast error if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("You need to be logged in to access this page.");
    }
  }, [isAuthenticated]);

  // Redirect unauthenticated users
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Restrict access if the user's role doesn't match allowed roles
  if (roles.length && user && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
