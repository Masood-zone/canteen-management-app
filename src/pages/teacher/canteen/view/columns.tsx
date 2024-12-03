import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const viewColumns: ColumnDef<CanteenRecord>[] = [
  {
    accessorKey: "student.name",
    header: "Student Name",
  },
  {
    accessorKey: "settingsAmount",
    header: "Amount",
    cell: ({ row }) => `₵${row.original.settingsAmount.toFixed(2)}`,
  },
  {
    accessorKey: "submitedAt",
    header: "Date",
    cell: ({ row }) => format(new Date(row.original.submitedAt), "PPp"),
  },
  {
    accessorKey: "isPrepaid",
    header: "Prepaid",
    cell: ({ row }) => (row.original.isPrepaid ? "Yes" : "No"),
  },
  {
    accessorKey: "hasPaid",
    header: "Payment Status",
    cell: ({ row }) => (row.original.hasPaid ? "Paid" : "Unpaid"),
  },
];
