"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

// Define the type for our record based on the provided structure
type CanteenRecord = {
  id: number;
  amount: number;
  submitedAt: string;
  submitedBy: number;
  payedBy: number | null;
  isPrepaid: boolean;
  hasPaid: boolean;
  classId: number;
  student: {
    id: number;
    firstName: string;
    lastName: string;
  } | null;
};

export const columns = (
  handlePaymentStatusChange: (id: number, isPaid: boolean) => void,
  handleAbsentStatusChange: (id: number, isAbsent: boolean) => void
): ColumnDef<CanteenRecord>[] => [
  {
    accessorKey: "student",
    header: "Student Name",
    cell: ({ row }) => {
      const student = row.original.student;
      return student ? `${student.firstName} ${student.lastName}` : "N/A";
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => `₵${row.original.amount.toFixed(2)}`,
  },
  {
    accessorKey: "submitedAt",
    header: "Submitted At",
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
  {
    id: "actions",
    cell: ({ row }) => {
      const record = row.original;
      return (
        <div className="flex space-x-2">
          <Button
            variant={record.hasPaid ? "destructive" : "default"}
            onClick={() =>
              handlePaymentStatusChange(record.id, !record.hasPaid)
            }
          >
            {record.hasPaid ? "Mark as Unpaid" : "Mark as Paid"}
          </Button>
          {!record.hasPaid && (
            <Button
              variant="outline"
              onClick={() => handleAbsentStatusChange(record.id, true)}
            >
              Mark as Absent
            </Button>
          )}
        </div>
      );
    },
  },
];
