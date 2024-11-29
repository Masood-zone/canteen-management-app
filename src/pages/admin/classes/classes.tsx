import { Header } from "@/components/typography/heading";
import { useNavigate } from "react-router-dom";
import ClassesTable from "./list/table";
import { useFetchClasses } from "@/services/api/queries";

export default function Classes() {
  const navigate = useNavigate();
  const { data: classes, isLoading, error } = useFetchClasses();

  return (
    <section>
      {/* Header */}
      <Header
        title="Classes"
        buttonText="Add Class"
        buttonAction={() => navigate("/admin/classes/add")}
      />
      {/* Table */}
      <ClassesTable data={classes || []} isLoading={isLoading} error={error} />
    </section>
  );
}
