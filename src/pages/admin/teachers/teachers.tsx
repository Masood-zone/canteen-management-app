import { Header } from "@/components/typography/heading";
import { useNavigate } from "react-router-dom";
import TeachersTable from "./list/table";
import { useFetchTeachers } from "@/services/api/queries";

export default function Teachers() {
  const navigate = useNavigate();
  const { data: teachers, isLoading, error } = useFetchTeachers();

  return (
    <section>
      {/* Header */}
      <Header
        title="Teachers"
        buttonText="Add Teacher"
        buttonAction={() => navigate("/admin/teachers/add")}
      />
      {/* Table */}
      <TeachersTable
        data={teachers || []}
        isLoading={isLoading}
        error={error}
      />
    </section>
  );
}
