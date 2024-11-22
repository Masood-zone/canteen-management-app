import { Toaster } from "@/components/ui/sonner";
import { Link, Outlet } from "react-router-dom";
import Logo from "../../assets/svgs/logo.svg";

export default function BaseLayout() {
  return (
    <>
      {/* Navbar */}
      <Link to="/">
        <header className="p-5 flex items-center hover:cursor-pointer">
          <img src={Logo} alt="Logo" width={40} height={40} />
          <h1 className="text-2xl font-bold ml-2">Canteen Management System</h1>
        </header>
      </Link>
      <main>
        <Outlet />
      </main>
      <Toaster />
    </>
  );
}
