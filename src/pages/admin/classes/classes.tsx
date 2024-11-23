import { Header } from "@/components/typography/heading";
import { useNavigate } from "react-router-dom";
import ClassesTable from "./list/table";

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
      <ClassesTable />
    </section>
  );
}
