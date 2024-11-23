import { BookOpen, Bot, Settings2, SquareTerminal } from "lucide-react";

export const super_nav = {
  navMain: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Home",
          url: "/admin",
        },
        {
          title: "Teachers",
          url: "/admin/teachers",
        },
      ],
    },
    {
      title: "Administartion",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Students",
          url: "/admin/students",
        },
        {
          title: "Classes",
          url: "/admin/classes",
        },
      ],
    },
    {
      title: "Accounting",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Canteen Records",
          url: "/admin/canteen-records",
        },
        {
          title: "Payment History",
          url: "/accounting/payment-history",
        },
      ],
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "/settings",
        },
        {
          title: "Teachers",
          url: "/settings/teachers",
        },
        {
          title: "Notifications",
          url: "#",
        },
      ],
    },
  ],
};
