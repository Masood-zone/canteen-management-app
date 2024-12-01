import { Outlet } from "react-router-dom";
import { Settings, User, Coffee } from "lucide-react";
import { SettingsSidebar } from "@/components/sidebar/settings-sidebar";

const settingsPages = [
  {
    title: "Overview",
    href: "",
    icon: Settings,
  },
  {
    title: "Profile",
    href: "/teacher/settings/profile",
    icon: User,
  },
  {
    title: "Canteen",
    href: "/teacher/settings/canteen",
    icon: Coffee,
  },
];
export default function SettingsLayout() {
  return (
    <div className="flex h-screen">
      <SettingsSidebar items={settingsPages} />
      <main className="flex-1 overflow-y-auto">
        <div className="container max-w-6xl p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
