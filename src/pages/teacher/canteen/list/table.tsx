import { CanteenTable } from "@/components/tables/canteen-table";
import { columns } from "./columns";
import { canteenRecords } from "@/utils/mock";

export default function CanteenList() {
  return (
    <div className="container w-full mx-auto py-10 px-4 sm:px-0 lg:px-0">
      <CanteenTable
        columns={columns}
        data={canteenRecords}
        searchField="teacher.name"
      />
    </div>
  );
}
