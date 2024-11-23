import { Header } from "@/components/typography/heading";
import { useNavigate } from "react-router-dom";

export default function Students() {
  const navigate = useNavigate();
  return (
    <section>
      {/* Header */}
      <Header
        title="Students"
        buttonText="Add Student"
        buttonAction={() => navigate("/admin/students/add")}
      />
      {/* Table */}
    </section>
  );
}
