"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const columns = (
  onPaymentStatusChange: (id: string, isPaid: boolean) => void,
  onAbsentStatusChange: (id: string, isAbsent: boolean) => void
): ColumnDef<CanteenRecord>[] => [
  {
    accessorKey: "student",
    header: "Student",
    cell: ({ row }) =>
      `${row.original.student.firstName} ${row.original.student.lastName}`,
  },
  {
    accessorKey: "teacher",
    header: "Teacher",
    cell: ({ row }) =>
      `${row.original.teacher.firstName} ${row.original.teacher.lastName}`,
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => format(new Date(row.original.date), "PPP"),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: () => "Ghc5.00",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const isPaid = row.original.paid;
      const isAbsent = row.original.absent;
      return (
        <div className="flex space-x-2">
          {!isAbsent && (
            <Button
              variant={isPaid ? "destructive" : "default"}
              onClick={() => onPaymentStatusChange(row.original.id, !isPaid)}
            >
              {isPaid ? "Mark as Unpaid" : "Mark as Paid"}
            </Button>
          )}
          {!isPaid && (
            <Button
              variant={isAbsent ? "destructive" : "outline"}
              onClick={() => onAbsentStatusChange(row.original.id, !isAbsent)}
            >
              {isAbsent ? "Mark as Present" : "Mark as Absent"}
            </Button>
          )}
        </div>
      );
    },
  },
];
