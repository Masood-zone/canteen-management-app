import { Header } from "@/components/typography/heading";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Classes() {
  const navigate = useNavigate();

  return (
    <section>
      {/* Header */}
      <Header
        title="Classes"
        buttonText="Add Class"
        buttonAction={() => navigate("/admin/classes/add")}
      />
      {/* Table */}
    </section>
  );
}
