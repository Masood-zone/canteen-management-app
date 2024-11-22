import { Toaster } from "./components/ui/sonner";
import { RouterProvider } from "react-router-dom";
import rootRoutes from "./routes/root-routes";

export default function App() {
  return (
    <>
      <RouterProvider router={rootRoutes} />
      <Toaster />
    </>
  );
}
