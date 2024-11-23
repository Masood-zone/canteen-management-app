import { Outlet } from "react-router-dom";
import Navbar from "../navbar/admin-navbar";
import { TeacherSidebar } from "../sidebar/teacher-sidebar";
import { SidebarInset, SidebarProvider } from "../ui/sidebar";
import { Toaster } from "../ui/sonner";

export default function TeacherLayout() {
  return (
    <SidebarProvider>
      <TeacherSidebar />
      <SidebarInset>
        <Navbar />
        <main className="p-5">
          <Outlet />
        </main>
        <Toaster />
      </SidebarInset>
    </SidebarProvider>
  );
}
