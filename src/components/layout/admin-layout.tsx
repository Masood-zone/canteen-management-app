import { Outlet } from "react-router-dom";
import { Toaster } from "../ui/sonner";
import { SidebarInset, SidebarProvider } from "../ui/sidebar";
import { AdminSidebar } from "../sidebar/admin-sidebar";
import Navbar from "../navbar/admin-navbar";

export default function AdminLayout() {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Toaster />
      </SidebarInset>
    </SidebarProvider>
  );
}
