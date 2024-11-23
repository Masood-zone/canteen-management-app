import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { studentsList } from "@/utils/mock";

export default function StudentsTable() {
  return (
    <div className="container w-full mx-auto py-10 px-4 sm:px-0 lg:px-0">
      <DataTable
        columns={columns}
        data={studentsList}
        searchField="first_name"
      />
    </div>
  );
}
