import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ProtectedRoute = ({ children, roles = [] }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore() as AuthStore;
  const { role } = user?.user ?? { role: "" };

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("You need to be logged in to access this page.");
    } else if (roles.length && role && !roles.includes(role)) {
      toast.error("You do not have permission to access this page.");
      navigate("/"); // Redirect unauthorized users
    }
  }, [isAuthenticated, navigate, user, roles, role]);

  // Redirect unauthenticated users
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
