import ActionMenu from "@/components/actions/action-menu";
import { CanteenRecord } from "@/utils/all-types";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";

export const columns: ColumnDef<CanteenRecord>[] = [
  {
    accessorKey: "student",
    header: "Student",
    cell: ({ row }) =>
      `${row.original.student.firstName} ${row.original.student.lastName}`,
  },
  {
    accessorKey: "teacher.name",
    header: "Teacher",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const date = row.original.date;
      const formattedDate = moment(date).format("LLL");
      return formattedDate;
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const id = row.original.id;
      return (
        <ActionMenu
          id={id}
          onDelete={() => console.log("Delete", id)}
          resourceName="canteen record"
          hasEdit={false}
        />
      );
    },
  },
];
