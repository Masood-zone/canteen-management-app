import { Toaster } from "./components/ui/sonner";
import { RouterProvider } from "react-router-dom";
import rootRoutes from "./routes/root-routes";
import { useAuthStore } from "./store/authStore";
import LoadingOverlay from "./components/shared/page-loader/loading-overlay";

export default function App() {
  const { isLoading } = useAuthStore();
  return (
    <>
      {isLoading && <LoadingOverlay />}
      <RouterProvider router={rootRoutes} />
      <Toaster />
    </>
  );
}
