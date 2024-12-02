import {
  useAbsentStudentRecordsByClassAndDate,
  useUpdateStudentStatus,
} from "@/services/api/queries";
import { useAuthStore } from "@/store/authStore";
import { TableSkeleton } from "../../page-loader/loaders";
import { Button } from "@/components/ui/button";
import ButtonLoader from "../../button-loader/button-loader";
import { format } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import { CanteenTable } from "@/components/tables/canteen-table";

export default function AbsentStudentsTable() {
  const { assigned_class } = useAuthStore();
  const classId = assigned_class?.id ?? 0;
  const today = new Date().toISOString().split("T")[0];
  const {
    data: absent_students,
    isLoading,
    error,
  } = useAbsentStudentRecordsByClassAndDate(classId, today);
  // Update student status
  const { mutate: updateToPaid, isLoading: updatingLoader } =
    useUpdateStudentStatus();

  const handleUpdateToPresent = async (record: CanteenRecord) => {
    const confirm = window.confirm(
      `Are you sure you want to mark ${record.student?.name} as present?`
    );
    if (!confirm) return;
    try {
      await updateToPaid({
        ...record,
        hasPaid: false,
        isAbsent: false,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdateToPaid = async (record: CanteenRecord) => {
    const confirm = window.confirm(
      `Are you sure you want to mark ${record.student?.name} as paid?`
    );
    if (!confirm) return;
    try {
      await updateToPaid({
        ...record,
        hasPaid: true,
        isAbsent: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Loading and error states
  if (isLoading) return <TableSkeleton />;
  if (error) return <div>Error fetching absent students</div>;

  //   Columns
  const columnsAbsent: ColumnDef<CanteenRecord>[] = [
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

        return (
          <div className="flex space-x-2">
            <Button
              variant={record.hasPaid ? "destructive" : "default"}
              onClick={() => handleUpdateToPaid(record)}
              disabled={updatingLoader}
            >
              <ButtonLoader
                fallback="Mark as Paid"
                isPending={updatingLoader}
                loadingText="Updating..."
              />
            </Button>
            {record.isAbsent && (
              <Button
                variant="outline"
                onClick={() => handleUpdateToPresent(record)}
              >
                Mark as Present
              </Button>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <>
      <CanteenTable
        columns={columnsAbsent}
        data={absent_students || []}
        searchField="student.name"
      />
    </>
  );
}
