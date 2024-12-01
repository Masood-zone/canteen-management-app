import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";

type CanteenRecord = {
  id: number;
  settingsAmount: number;
  submitedAt: string;
  submitedBy: number;
  payedBy: number | null;
  isPrepaid: boolean;
  hasPaid: boolean;
  isAbsent: boolean;
  classId: number;
  student: {
    id: number;
    name: string;
  } | null;
};

export const columns = (
  handlePaymentStatusChange: (
    id: number,
    isPaid: boolean,
    record: StudentRecord
  ) => Promise<void>,
  handleAbsentStatusChange: (id: number, isAbsent: boolean) => Promise<void>,
  updatingStudentId: number | null
): ColumnDef<CanteenRecord>[] => [
  {
    accessorKey: "student",
    header: "Student Name",
    cell: ({ row }) => {
      const student = row.original.student;
      return student ? `${student.name}` : "N/A";
    },
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
  {
    id: "actions",
    cell: ({ row }) => {
      const record = row.original;
      const isUpdating = updatingStudentId === record.id;

      return (
        <div className="flex space-x-2">
          <Button
            variant={record.hasPaid ? "destructive" : "default"}
            onClick={() =>
              handlePaymentStatusChange(record.id, !record.hasPaid, record)
            }
            disabled={isUpdating}
          >
            {isUpdating ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : record.hasPaid ? (
              "Mark as Unpaid"
            ) : (
              "Mark as Paid"
            )}
          </Button>
          {!record.hasPaid && !record.isAbsent && (
            <Button
              variant="outline"
              onClick={() => handleAbsentStatusChange(record.id, true)}
              disabled={isUpdating}
            >
              {isUpdating ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Mark as Absent"
              )}
            </Button>
          )}
        </div>
      );
    },
  },
];
