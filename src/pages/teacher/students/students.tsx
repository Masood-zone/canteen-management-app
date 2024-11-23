import { Header } from "@/components/typography/heading";
import { useNavigate } from "react-router-dom";
import StudentsTable from "./list/table";

export default function Students() {
  const navigate = useNavigate();
  return (
    <section>
      {/* Header */}
      <Header
        title="Students"
        buttonText="Add Student"
        buttonAction={() => navigate("/teacher/students/add")}
      />
      {/* Table */}
      <StudentsTable />
    </section>
  );
}
