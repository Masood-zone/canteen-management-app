import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Breadcrumbs } from "./breadcrumb";

export default function Navbar() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      {/* Navbar */}
      <div className="flex items-center justify-between gap-2 px-4 w-full">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          {/* Breadcrumb component*/}
          <Breadcrumbs />
        </div>
        {/* Date, Time (24 hour countdown), day */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">10:00 AM</span>
          <Separator orientation="vertical" className="h-4" />
          <span className="text-sm text-gray-500">
            Monday, 23rd November 2024
          </span>
        </div>
      </div>
    </header>
  );
}
