import React, { useMemo } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

export const Breadcrumbs = () => {
  const pathname = window.location.pathname;

  // Generate breadcrumb items based on the current path
  const breadcrumbItems = useMemo(() => {
    const paths = pathname.split("/").filter(Boolean);
    return [
      { name: "Dashboard", href: "#" },
      ...paths.slice(1).map((p, idx) => ({
        name: p.charAt(0).toUpperCase() + p.slice(1),
        href: "/" + paths.slice(0, idx + 2).join("/"),
      })),
    ];
  }, [pathname]);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbItems.map((item, index) => (
          <React.Fragment key={item.href}>
            <BreadcrumbItem className={index === 0 ? "hidden md:block" : ""}>
              {index === breadcrumbItems.length - 1 ? (
                <span className="font-semibold text-gray-900">{item.name}</span>
              ) : (
                <BreadcrumbLink
                  href={item.href}
                  className="hover:text-gray-700"
                >
                  {item.name}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < breadcrumbItems.length - 1 && (
              <BreadcrumbSeparator className="hidden md:block" />
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
