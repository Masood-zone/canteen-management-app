import { Header } from "@/components/typography/heading";
import { useNavigate } from "react-router-dom";
import TeachersTable from "./list/table";

export default function Teachers() {
  const navigate = useNavigate();
  return (
    <section>
      {/* Header */}
      <Header
        title="Teachers"
        buttonText="Add Teacher"
        buttonAction={() => navigate("/admin/teachers/add")}
      />
      {/* Table */}
      <TeachersTable />
    </section>
  );
}
