import React from "react";
import { Button } from "../ui/button";

export function Header({
  title,
  buttonText,
  buttonAction,
}: {
  title: string;
  buttonText: string;
  buttonAction: () => void;
}) {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-4xl font-semibold">{title}</h1>
      <Button onClick={buttonAction}>{buttonText}</Button>
    </div>
  );
}

export function PageHeading({ children }: { children: React.ReactNode }) {
  return <h1 className="text-4xl font-semibold">{children}</h1>;
}
