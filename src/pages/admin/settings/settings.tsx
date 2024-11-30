import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { User, Coffee } from "lucide-react";

const settingsItems = [
  {
    title: "Profile",
    description: "Manage your personal information and account settings",
    href: "/admin/settings/profile",
    icon: User,
  },
  {
    title: "Canteen",
    description: "Configure canteen preferences and notification settings",
    href: "/admin/settings/canteen",
    icon: Coffee,
  },
];

export default function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {settingsItems.map((item) => (
          <Link key={item.href} to={item.href}>
            <Card className="h-full hover:bg-accent/20 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="rounded-md bg-primary/10 p-2">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </div>
                <CardDescription className="pt-2">
                  {item.description}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
