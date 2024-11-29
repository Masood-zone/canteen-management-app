import { Header } from "@/components/typography/heading";
import { useNavigate } from "react-router-dom";
import StudentsTable from "./list/table";
import { useFetchStudents } from "@/services/api/queries";

export default function Students() {
  const navigate = useNavigate();
  const { data: students, isLoading, error } = useFetchStudents();

  return (
    <section>
      {/* Header */}
      <Header
        title="Students"
        buttonText="Add Student"
        buttonAction={() => navigate("/admin/students/add")}
      />
      {/* Table */}
      <StudentsTable
        data={students || []}
        isLoading={isLoading}
        error={error}
      />
    </section>
  );
}
