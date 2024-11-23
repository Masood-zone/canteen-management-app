import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { classesList } from "@/utils/mock";

export default function ClassesTable() {
  return (
    <div className="container w-full mx-auto py-10 px-4 sm:px-0 lg:px-0">
      <DataTable
        columns={columns}
        data={classesList}
        searchField="class_name"
      />
    </div>
  );
}
